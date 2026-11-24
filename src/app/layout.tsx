import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { AuthProvider } from '../contexts/auth';
import './globals.css';

const montserratSans = Montserrat({
  variable: '--font-montserrat-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

const interSans = Inter({
  variable: '--font-inter-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Agendamento LAB',
  description: 'Sistema de agendamento de Laboratório',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='pt-BR'
      className={`${montserratSans.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col'>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
