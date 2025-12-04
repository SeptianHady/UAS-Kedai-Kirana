"use client";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fffbeb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ================= HERO SECTION ================= */}
      <div
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src="/banner.jpg"
          alt="Banner Kedai Kirana"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            minHeight: "350px",
            objectFit: "cover",
            filter: "brightness(0.85)", // Sedikit gelapkan gambar biar tulisan putih lebih jelas
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(255, 153, 0, 0.2))", // Overlay gradasi oranye tipis
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <Container>
            <div className="bg-white px-4 py-2 rounded-pill d-inline-block mb-3 shadow-sm animate-fade-in">
              <span
                className="text-warning fw-bold text-uppercase"
                style={{ letterSpacing: "2px" }}
              >
                ✨ Taste of Happiness ✨
              </span>
            </div>
            <h1 className="fw-bold text-white display-3 mb-2 text-shadow animate-fade-in">
              Selamat Datang di{" "}
              <span style={{ color: "#ffdd59" }}>Kedai Kirana</span> 🍜
            </h1>
            <p className="text-white fs-4 fw-light text-shadow mt-3">
              Nikmati hidangan lezat dengan suasana yang nyaman dan harga
              bersahabat.
            </p>
          </Container>
        </div>
      </div>

      {/* ================= PILIHAN AKSES ================= */}
      <Container
        className="py-5 flex-grow-1"
        style={{ marginTop: "-80px", position: "relative", zIndex: 10 }}
      >
        <Row className="justify-content-center g-4 mb-5">
          {/* KARTU PELANGGAN */}
          <Col md={5} lg={4}>
            <Card
              className="h-100 border-0 shadow-lg hover-card text-center p-4"
              style={{
                borderRadius: "20px",
                background:
                  "linear-gradient(to bottom right, #ffffff, #fff8e1)",
              }}
            >
              <Card.Body>
                <div className="icon-wrapper mb-4 mx-auto bg-warning text-white shadow">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "3rem" }}
                  >
                    restaurant_menu
                  </span>
                </div>
                <Card.Title className="fw-bold fs-2 mb-2 text-dark">
                  Pelanggan
                </Card.Title>
                <Card.Text className="text-muted mb-4">
                  Lapar? Yuk intip menu spesial hari ini dan pesan langsung dari
                  sini.
                </Card.Text>

                {/* Link Style Button */}
                <Link
                  href="/menu"
                  className="btn btn-lg w-100 rounded-pill fw-bold shadow-sm btn-gradient-orange"
                >
                  Mulai Pesan 🍛
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* KARTU ADMIN */}
          <Col md={5} lg={4}>
            <Card
              className="h-100 border-0 shadow-lg hover-card text-center p-4"
              style={{
                borderRadius: "20px",
                background:
                  "linear-gradient(to bottom right, #ffffff, #f0f0f0)",
              }}
            >
              <Card.Body>
                <div className="icon-wrapper mb-4 mx-auto bg-dark text-white shadow">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "3rem" }}
                  >
                    admin_panel_settings
                  </span>
                </div>
                <Card.Title className="fw-bold fs-2 mb-2 text-dark">
                  Admin
                </Card.Title>
                <Card.Text className="text-muted mb-4">
                  Khusus pengelola kedai. Masuk untuk kelola stok, menu, dan
                  laporan.
                </Card.Text>

                {/* Link Style Button */}
                <Link
                  href="/login"
                  className="btn btn-outline-dark btn-lg w-100 rounded-pill fw-bold shadow-sm"
                  style={{ borderWidth: "2px" }}
                >
                  Login Pengelola 🔒
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* ================= FOOTER BERWARNA ================= */}
      <footer
        className="pt-5 pb-3 mt-auto text-white"
        style={{ background: "linear-gradient(to right, #d35400, #e67e22)" }}
      >
        <Container>
          <Row className="gy-4">
            <Col md={6}>
              <h4 className="fw-bold mb-4 text-white d-flex align-items-center gap-2">
                <span
                  className="bg-white text-warning rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  <span className="material-symbols-outlined">storefront</span>
                </span>
                Kedai Kirana
              </h4>
              <p className="opacity-75">
                Kami menyajikan masakan rumahan terbaik dengan bahan segar dan
                harga terjangkau. Cocok untuk makan siang, kumpul keluarga, atau
                acara spesial.
              </p>
              <ul className="list-unstyled mt-3 opacity-90">
                <li className="mb-2 d-flex align-items-center gap-2">
                  <span className="material-symbols-outlined">location_on</span>
                  <span>Jalan Taman S. Parman Blok A 1D</span>
                </li>
                <li className="mb-2 d-flex align-items-center gap-2">
                  <span className="material-symbols-outlined">call</span>
                  <span>+62 812-8762-9850</span>
                </li>
              </ul>
            </Col>

            <Col md={6}>
              <h5 className="fw-bold mb-3 text-white">Lokasi Kami</h5>
              <div
                className="rounded-4 overflow-hidden shadow-sm border border-2 border-white"
                style={{ height: "200px" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d416.9487797760962!2d106.7892933235679!3d-6.169953331793749!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f79f81044ded%3A0x8ac216bcced14764!2sSevenads%20Indonesia!5e0!3m2!1sen!2sid!4v1764860743362!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
              </div>
            </Col>
          </Row>

          <hr className="border-white opacity-50 my-4" />
          <div className="text-center small opacity-75">
            &copy; {new Date().getFullYear()} Kedai Kirana. Dibuat dengan ❤️.
          </div>
        </Container>
      </footer>

      {/* CUSTOM STYLE */}
      <style jsx global>{`
        /* Animasi Card Naik saat Hover */
        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
        }

        /* Icon Bulat */
        .icon-wrapper {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Tombol Gradasi Oranye */
        .btn-gradient-orange {
          background: linear-gradient(to right, #ff9966, #ff5e62);
          border: none;
          color: white;
          transition: transform 0.2s;
        }
        .btn-gradient-orange:hover {
          background: linear-gradient(to right, #e67e22, #d35400);
          transform: scale(1.05);
          color: white;
        }

        .text-shadow {
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
        }
        .animate-fade-in {
          animation: fadeIn 1.2s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Hilangkan garis bawah link */
        a {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
