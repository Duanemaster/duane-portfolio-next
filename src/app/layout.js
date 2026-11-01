import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';
import { IBM_Plex_Sans, IBM_Plex_Mono, Chakra_Petch } from 'next/font/google';

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
  display: 'swap',
});
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});
const display = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-chakra',
  display: 'swap',
});

const TITLE = 'Duane Benedict Mahinay | Computer Engineer & Software Developer';
const DESCRIPTION =
  'Portfolio of Duane Benedict Mahinay, a Computer Engineering graduate building software systems, automation, and AI integrations.';

export const metadata = {
  title: { default: TITLE, template: '%s | Duane Benedict Mahinay' },
  description: DESCRIPTION,
  authors: [{ name: 'Duane Benedict Mahinay' }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    siteName: 'Duane Benedict Mahinay',
    // TODO: add `url` and an `images: ['/og.png']` entry once you have a domain and a 1200x630 image in /public
  },
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION },
};

// Sets saved faction before first paint (no flash)
const initFaction = `try{var f=localStorage.getItem('dbm-faction');if(f==='terran'||f==='protoss'||f==='zerg'){document.documentElement.dataset.faction=f}}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-faction="terran" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initFaction }} />
      </head>
      <body
        className={`${sans.variable} ${mono.variable} ${display.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}