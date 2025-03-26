'use client';
import { AppSidebar } from '@/components/SideBar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function ClientLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/';
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {!isLoginPage ? (
        <SidebarProvider>
          <div className="flex">
            {/* Sidebar */}
            <AppSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* Main Content */}
            <main
              className={`transition-all duration-300 ${
                isOpen ? 'ml-72' : ''
              } w-full`}
            >
              {children}
            </main>
          </div>
        </SidebarProvider>
      ) : (
        <main>{children}</main>
      )}
    </>
  );
}
