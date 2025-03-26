import React, { useEffect, useRef } from 'react';
import mainLogo from '../../assets/main_logo.png';
import { Home, Inbox, Settings, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const items = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Banner', url: '/banner', icon: Inbox },
  { title: 'Settings', url: '#', icon: Settings }
];

const SidebarItem = ({ item, activeTab, handleNavigation }: any) => (
  <SidebarMenuItem>
    <SidebarMenuButton asChild>
      <motion.div
        onClick={() => handleNavigation(item.url, item.title)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-4 px-6 py-3 rounded-lg transition-all duration-200 font-medium text-sm cursor-pointer ${
          activeTab === item.title
            ? 'bg-[#2c313a] text-white shadow-md'
            : 'hover:bg-[#23272e] text-gray-300'
        }`}
      >
        <item.icon
          className={`w-5 h-5 transition ${activeTab === item.title ? 'text-white' : 'text-gray-400'}`}
        />
        {item.title}
      </motion.div>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

export function AppSidebar({
  isOpen,
  setIsOpen,
  activeTab,
  setActiveTab
}: any) {
  const router = useRouter();
  const showRef = useRef<HTMLDivElement | null>(null);

  const handleNavigation = async (url: string, title: string) => {
    if (activeTab !== title) {
      await router.push(url);
      setActiveTab(title);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handlerClickOutside = (event: MouseEvent) => {
      if (showRef.current && !showRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handlerClickOutside);
    return () => document.removeEventListener('mousedown', handlerClickOutside);
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Sidebar Header */}
      <div className="fixed top-0 left-0 w-full bg-[#161b22] text-white shadow-md px-6 py-4 flex items-center justify-between z-50">
        <Image src={mainLogo} alt="Logo" width={120} height={50} />
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            ref={showRef}
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-14 w-72 h-screen bg-[#1c1f26] text-white shadow-xl border-r border-[#2d333b]"
          >
            <SidebarContent className="relative flex flex-col h-full">
              <SidebarGroup>
                <SidebarGroupLabel className="text-gray-400 text-xs uppercase px-6 py-2">
                  Menu
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => (
                      <SidebarItem
                        key={item.title}
                        item={item}
                        activeTab={activeTab}
                        handleNavigation={handleNavigation}
                      />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </motion.div>
        ) : (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-14 w-16 h-screen bg-[#1c1f26] text-white shadow-xl border-r border-[#2d333b] flex flex-col items-center py-6"
          >
            {items.map((item) => (
              <motion.button
                key={item.title}
                onClick={() => handleNavigation(item.url, item.title)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 flex items-center justify-center rounded-lg mb-4 transition ${
                  activeTab === item.title
                    ? 'bg-[#2c313a] text-white'
                    : 'hover:bg-[#23272e] text-gray-400'
                }`}
                aria-label={item.title}
              >
                <item.icon className="w-6 h-6" />
              </motion.button>
            ))}

            {/* Move button to the bottom */}
            <div className="mt-auto mb-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="bg-[#2c313a] text-white p-3 rounded-full shadow-md hover:bg-[#383848] transition"
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
