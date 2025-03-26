import React, { useEffect, useRef, useState } from 'react';
import mainLogo from '../../assets/main_logo.png';
import { Calendar, Home, Inbox, Search, Settings, Menu } from 'lucide-react';
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

const items = [
  { title: 'Home', url: '#', icon: Home },
  { title: 'Inbox', url: '#', icon: Inbox },
  { title: 'Calendar', url: '#', icon: Calendar },
  { title: 'Search', url: '#', icon: Search },
  { title: 'Settings', url: '#', icon: Settings }
];

export function AppSidebar({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [active, setActive] = useState('Home');
  const showRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlerClickOutside = (event: MouseEvent) => {
      if (showRef.current && !showRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handlerClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handlerClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className="relative"
      onClick={() => {
        console.log('d');
      }}
    >
      {/* Sidebar Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={showRef}
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-0 w-72 h-screen bg-[#1E1E2E] text-white shadow-xl border-r border-gray-700"
          >
            <SidebarContent className="relative flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="flex justify-center mt-6">
                <Image src={mainLogo} alt="Logo" width={180} height={80} />
              </div>

              <SidebarGroup>
                <SidebarGroupLabel className="text-gray-400 text-xs uppercase px-6 py-2">
                  Menu
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <motion.a
                            href={item.url}
                            onClick={() => setActive(item.title)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-4 px-6 py-3 rounded-lg transition-all duration-200 font-medium text-sm ${
                              active === item.title
                                ? 'bg-[#2A2A3A] text-white shadow-md'
                                : 'hover:bg-[#232334] text-gray-300'
                            }`}
                          >
                            <item.icon
                              className={`w-5 h-5 transition ${
                                active === item.title
                                  ? 'text-white'
                                  : 'text-gray-400'
                              }`}
                            />
                            {item.title}
                          </motion.a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button Animation */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 bg-[#1E1E2E] text-white p-3 rounded-full shadow-md hover:bg-[#2A2A3A] transition"
        >
          <Menu className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
}
