'use client';
import React from 'react';
import { useSchemeConfig } from '@/components/providers/scheme-provider';
import { NavIcons } from '@/components/Icons';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { SchemeModal } from './SchemeModal';

const SchemeSelector: React.FC = () => {
  const { activeScheme, setActiveScheme, customColor } = useSchemeConfig();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const SchemeIcon = NavIcons.Scheme;

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

  const currentSchemeName =
    SCHEMES.flatMap((g) => g.items).find((s) => s.value === activeScheme)
      ?.name || 'Select';

  return (
    <SchemeModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isDropdownOpen={isDropdownOpen}
      setIsDropdownOpen={setIsDropdownOpen}
      activeScheme={activeScheme}
      setActiveScheme={setActiveScheme}
      customColor={customColor}
      currentSchemeName={currentSchemeName}
      DialogTriggerButton={
        <SidebarMenuButton
          tooltip='Select Scheme'
          className='h-9 w-full cursor-pointer justify-start rounded-[0.5rem] text-sm font-normal'
        >
          <SchemeIcon className='h-4 w-4' />
          <span>Scheme</span>
        </SidebarMenuButton>
      }
    />
  );
};

export default SchemeSelector;
