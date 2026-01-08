'use client';
import { useRegisterActions } from 'kbar';
import { useSchemeConfig } from '@/components/providers/scheme-provider';
import { useMemo, useCallback } from 'react';

// Define valid scheme keys, excluding custom schemes
type SchemeKey =
  | 'default'
  | 'blue'
  | 'green'
  | 'amber'
  | 'default-scaled'
  | 'blue-scaled'
  | 'mono-scaled';

const SCHEMES: Record<SchemeKey, { name: string; group: string }> = {
  default: { name: 'Default', group: 'Default' },
  blue: { name: 'Blue', group: 'Default' },
  green: { name: 'Green', group: 'Default' },
  amber: { name: 'Amber', group: 'Default' },
  'default-scaled': { name: 'Default', group: 'Scaled' },
  'blue-scaled': { name: 'Blue', group: 'Scaled' },
  'mono-scaled': { name: 'Mono', group: 'Monospaced' }
};

// Define the sequence of schemes for toggling, excluding custom schemes
const SCHEME_ORDER: SchemeKey[] = [
  'default',
  'blue',
  'green',
  'amber',
  'default-scaled',
  'blue-scaled',
  'mono-scaled'
];

const useSchemeSwitching = () => {
  const { activeScheme, setActiveScheme } = useSchemeConfig();

  // Toggle to the next scheme in the sequence
  const toggleScheme = useCallback(() => {
    const currentIndex = SCHEME_ORDER.indexOf(activeScheme as SchemeKey);
    const nextIndex = (currentIndex + 1) % SCHEME_ORDER.length;
    setActiveScheme(SCHEME_ORDER[nextIndex]);
  }, [activeScheme, setActiveScheme]);

  // Create actions for each scheme and a toggle action
  const schemeActions = useMemo(
    () => [
      {
        id: 'toggleScheme',
        name: 'Toggle Scheme',
        shortcut: ['s', 's'],
        section: 'Scheme',
        perform: toggleScheme
      },
      ...Object.entries(SCHEMES).map(([key, { name, group }]) => ({
        id: `setScheme${key}`,
        name: `Set ${name} Scheme${group !== 'Default' ? ` (${group})` : ''}`,
        section: 'Scheme',
        perform: () => setActiveScheme(key as SchemeKey)
      }))
    ],
    [toggleScheme, setActiveScheme]
  );

  useRegisterActions(schemeActions, [activeScheme]);
};

export default useSchemeSwitching;
