import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Reviews — Genesis Cleaning Service',
  robots: { index: false, follow: false }
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: '#FBFDFE', color: '#12203F', fontFamily: 'Manrope, system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
