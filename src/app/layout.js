import { Outfit } from 'next/font/google';
import "./globals.css";
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import ClientProviders from '@/Components/ClientProviders';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata = {
  title: "PhotoParkk",
  description: "Capture your moments with PhotoParkk",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${outfit.variable} font-sans antialiased text-secondary bg-white`}>
        <ClientProviders>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-24">
              {children}
            </main>
            <Footer />
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
