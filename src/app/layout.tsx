import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Kedai Kirana',
  description: 'Aplikasi Pemesanan Makanan Online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        {/* Link Google Font Icons sesuai request */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body className={`${poppins.className} bg-light`}>
        {children}
      </body>
    </html>
  );
}