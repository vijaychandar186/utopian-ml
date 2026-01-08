'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Paintbrush, Pipette, ChevronRight } from 'lucide-react';
import { CustomSchemePicker } from './CustomSchemePicker';

type SchemeKey =
  | 'default'
  | 'blue'
  | 'green'
  | 'amber'
  | 'custom'
  | 'default-scaled'
  | 'blue-scaled'
  | 'custom-scaled'
  | 'mono-scaled';

interface SchemeModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  activeScheme: string;
  setActiveScheme: (scheme: SchemeKey) => void;
  customColor: string;
  currentSchemeName: string;
  DialogTriggerButton: React.ReactNode;
}

export const SchemeModal: React.FC<SchemeModalProps> = ({
  isOpen,
  setIsOpen,
  isDropdownOpen,
  setIsDropdownOpen,
  activeScheme,
  setActiveScheme,
  customColor,
  currentSchemeName,
  DialogTriggerButton
}) => {
  const SCHEMES = [
    {
      group: 'Default',
      items: [
        { name: 'Default', value: 'default' },
        { name: 'Blue', value: 'blue' },
        { name: 'Green', value: 'green' },
        { name: 'Amber', value: 'amber' },
        { name: 'Custom', value: 'custom' }
      ]
    },
    {
      group: 'Scaled',
      items: [
        { name: 'Default', value: 'default-scaled' },
        { name: 'Blue', value: 'blue-scaled' },
        { name: 'Custom', value: 'custom-scaled' }
      ]
    },
    { group: 'Monospaced', items: [{ name: 'Mono', value: 'mono-scaled' }] }
  ];

  const handleColorPickerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{DialogTriggerButton}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Select Scheme</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='w-full justify-between'>
                <div className='flex items-center'>
                  <Paintbrush className='mr-2 h-4 w-4' />
                  {currentSchemeName}
                </div>
                <ChevronRight
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-90' : ''
                  }`}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='w-full'>
              {SCHEMES.map((group, index) => (
                <React.Fragment key={group.group}>
                  {index > 0 && <DropdownMenuSeparator />}
                  <DropdownMenuLabel>{group.group}</DropdownMenuLabel>
                  {group.items.map((scheme) => (
                    <DropdownMenuItem
                      key={scheme.value}
                      onClick={() => {
                        setActiveScheme(scheme.value as SchemeKey);
                        setIsDropdownOpen(false);
                        if (
                          !['custom', 'custom-scaled'].includes(scheme.value)
                        ) {
                          setIsOpen(false);
                        }
                      }}
                      className={`flex cursor-pointer items-center justify-between ${
                        activeScheme === scheme.value ? 'bg-accent' : ''
                      }`}
                    >
                      <span>{scheme.name}</span>
                      {['custom', 'custom-scaled'].includes(scheme.value) && (
                        <div
                          className='flex items-center gap-2'
                          onClick={handleColorPickerClick}
                        >
                          <Pipette className='h-4 w-4' />
                          <CustomSchemePicker
                            customColor={customColor}
                            activeScheme={activeScheme}
                            disabled={activeScheme !== scheme.value}
                          />
                        </div>
                      )}
                    </DropdownMenuItem>
                  ))}
                </React.Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </DialogContent>
    </Dialog>
  );
};
