import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ThemeProvider } from '../components/ThemeProvider';
import { Inter, Playfair_Display } from 'next/font/google';

// Modern clean font para sa paragraphs
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
// Elegant elegant font para sa headings
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata = {
  title: 'Duane | Portfolio',
  description: 'Computer Engineer & Software Developer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}