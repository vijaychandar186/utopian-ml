'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Laptop } from 'lucide-react';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentTheme: string | undefined;
  setTheme: (theme: ThemeMode) => void;
  onTransition: (newTheme: ThemeMode, e?: React.MouseEvent) => void;
  DialogTriggerButton: React.ReactNode;
}

const THEME_OPTIONS: {
  value: ThemeMode;
  label: string;
  icon: React.ReactElement;
}[] = [
  { value: 'light', label: 'Light', icon: <Sun className='h-4 w-4' /> },
  { value: 'dark', label: 'Dark', icon: <Moon className='h-4 w-4' /> },
  { value: 'system', label: 'System', icon: <Laptop className='h-4 w-4' /> }
];

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  setIsOpen,
  currentTheme,
  onTransition,
  DialogTriggerButton
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{DialogTriggerButton}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Select Theme</DialogTitle>
        </DialogHeader>
        <div className='grid gap-2 py-4'>
          {THEME_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              variant={currentTheme === opt.value ? 'secondary' : 'outline'}
              className='w-full justify-start'
              onClick={(e) => onTransition(opt.value, e)}
            >
              <div className='flex items-center gap-2'>
                {opt.icon}
                {opt.label}
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
