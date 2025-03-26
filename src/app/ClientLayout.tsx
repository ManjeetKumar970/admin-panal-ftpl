'use client';
import { AppSidebar } from '@/components/SideBar/AppSidebar';
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
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('Dashboard');

  return (
    <>
      {!isLoginPage ? (
        <SidebarProvider>
          <div className="flex">
            {/* Sidebar */}
            <AppSidebar
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />

            {/* Main Content */}
            <main
              className={`transition-all duration-300 ${
                isOpen ? 'ml-72 mt-14' : 'ml-16 mt-14'
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
