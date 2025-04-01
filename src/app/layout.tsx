import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import QueryProvider from '@/providers/QueryProvider';
import ClientLayout from './ClientLayout';
import { Alert } from '@/components/Alert/Alert';

export const metadata: Metadata = {
  title: process.env.APP_NAME
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <ClientLayout>
            <Alert />
            {children}
          </ClientLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
