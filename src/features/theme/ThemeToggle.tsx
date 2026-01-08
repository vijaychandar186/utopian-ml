'use client';
import React, { useState, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { NavIcons } from '@/components/Icons';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { ThemeModal } from './ThemeModal';

type ThemeMode = 'light' | 'dark' | 'system';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const ThemeIcon = NavIcons.Theme;

  const handleThemeChange = useCallback(
    (newTheme: ThemeMode, e?: React.MouseEvent) => {
      const root = document.documentElement;

      if (!document.startViewTransition) {
        setTheme(newTheme);
        setIsOpen(false);
        return;
      }

      if (e) {
        root.style.setProperty('--x', `${e.clientX}px`);
        root.style.setProperty('--y', `${e.clientY}px`);
      } else {
        root.style.setProperty('--x', '50%');
        root.style.setProperty('--y', '50%');
      }

      document.startViewTransition(() => {
        setTheme(newTheme);
        setIsOpen(false);
      });
    },
    [setTheme]
  );

  return (
    <ThemeModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      currentTheme={theme}
      setTheme={setTheme}
      onTransition={handleThemeChange}
      DialogTriggerButton={
        <SidebarMenuButton
          tooltip='Select Theme'
          className='h-9 w-full cursor-pointer justify-start rounded-[0.5rem] text-sm font-normal'
        >
          <ThemeIcon className='h-4 w-4' />
          <span>Theme</span>
        </SidebarMenuButton>
      }
    />
  );
};

export default ThemeToggle;
