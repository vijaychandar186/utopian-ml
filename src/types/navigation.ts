import { NavIcons, ArchitectureIcons } from '@/components/Icons';

export interface NavItem {
  title: string;
  url?: string;
  icon?: keyof typeof NavIcons | keyof typeof ArchitectureIcons;
  isActive?: boolean;
  shortcut?: string[];
  component?: React.ComponentType;
  items?: NavItem[];
}
