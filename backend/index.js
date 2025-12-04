const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'backend_kedai-kirana',
  password: process.env.DB_PASS || '12345',
  port: 5432,
});

// --- API ROUTES ---

// 1. GET MENU
app.get('/api/menus', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menus ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) { res.status(500).json(err); }
});

// 2. TAMBAH MENU
app.post('/api/menus', async (req, res) => {
  try {
    const { nama, kategori, harga, stok, gambar } = req.body;
    await pool.query('INSERT INTO menus (nama, kategori, harga, stok, gambar) VALUES ($1, $2, $3, $4, $5)', [nama, kategori, harga, stok, gambar]);
    res.json({ message: "Sukses" });
  } catch (err) { res.status(500).json(err); }
});

// 3. EDIT MENU
app.put('/api/menus/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, kategori, harga, stok, gambar } = req.body;
    await pool.query('UPDATE menus SET nama=$1, kategori=$2, harga=$3, stok=$4, gambar=$5 WHERE id=$6', [nama, kategori, harga, stok, gambar, id]);
    res.json({ message: "Sukses" });
  } catch (err) { res.status(500).json(err); }
});

// 4. HAPUS MENU
app.delete('/api/menus/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM menus WHERE id = $1', [id]);
    res.json({ message: "Dihapus" });
  } catch (err) { res.status(500).json(err); }
});

// 5. ORDER (Checkout dengan Nama)
app.post('/api/order', async (req, res) => {
  const client = await pool.connect();
  try {
    const { items, metode, nama_pelanggan } = req.body; 
    
    await client.query('BEGIN');

    for (const item of items) {
      const resMenu = await client.query('SELECT * FROM menus WHERE id = $1', [item.id]);
      const menuData = resMenu.rows[0];
      
      // Kurangi Stok
      await client.query('UPDATE menus SET stok = stok - $1 WHERE id = $2', [item.qty, item.id]);
      
      const totalHarga = menuData.harga * item.qty; 
      
      // Masukkan ke Transaksi (Lengkap dengan Nama)
      await client.query(
        'INSERT INTO transaksi (menu_id, nama_menu, harga, metode_pembayaran, nama_pelanggan, status) VALUES ($1, $2, $3, $4, $5, $6)', 
        [menuData.id, `${menuData.nama} (x${item.qty})`, totalHarga, metode, nama_pelanggan, 'Pending']
      );
    }

    await client.query('COMMIT');
    res.json({ message: "Order Berhasil" });
  } catch (err) { 
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ message: "Gagal Order" }); 
  } finally {
    client.release();
  }
});

// 6. GET PESANAN (UNTUK ADMIN) - WAJIB ADA!
app.get('/api/pesanan', async (req, res) => {
  try {
    // Ambil semua data transaksi, urutkan dari yang terbaru
    const result = await pool.query('SELECT * FROM transaksi ORDER BY id DESC');
    
    // Kirim data sebagai JSON ke frontend
    res.json(result.rows);
  } catch (err) {
    console.error("Gagal ambil pesanan:", err);
    res.status(500).json({ message: "Gagal ambil data pesanan" });
  }
});

// 7. KONFIRMASI PESANAN (Ubah status jadi 'Selesai')
app.put('/api/pesanan/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("UPDATE transaksi SET status = 'Selesai' WHERE id = $1", [id]);
    res.json({ message: "Status pesanan diperbarui" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// 8. DASHBOARD & LOGIN
app.get('/api/dashboard', async (req, res) => {
    try {
        const totalProduk = await pool.query('SELECT COUNT(*) FROM menus');
        const totalPesanan = await pool.query('SELECT COUNT(*) FROM transaksi');
        const totalPendapatan = await pool.query('SELECT SUM(harga) FROM transaksi');
        
        // Grafik Bulanan
        const grafikQuery = await pool.query(`
          SELECT EXTRACT(MONTH FROM tanggal) as bulan, SUM(harga) as total 
          FROM transaksi 
          WHERE EXTRACT(YEAR FROM tanggal) = EXTRACT(YEAR FROM CURRENT_DATE)
          GROUP BY bulan ORDER BY bulan ASC
        `);
    
        let grafikBulanan = new Array(12).fill(0);
        grafikQuery.rows.forEach(row => {
          grafikBulanan[row.bulan - 1] = parseInt(row.total);
        });
    
        res.json({
          totalProduk: parseInt(totalProduk.rows[0].count),
          totalPesanan: parseInt(totalPesanan.rows[0].count) || 0,
          totalPendapatan: parseInt(totalPendapatan.rows[0].sum) || 0,
          grafikBulanan
        });
      } catch (err) { res.status(500).json(err); }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await pool.query('SELECT * FROM admins WHERE username = $1 AND password = $2', [username, password]);
        if (result.rows.length > 0) res.json({ success: true });
        else res.status(401).json({ success: false });
    } catch (err) { res.status(500).json(err); }
});

app.listen(port, () => console.log(`Backend running on port ${port}`));