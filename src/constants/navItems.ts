import { NavItem } from '@/types/navigation';
import GlobalSearch from '@/features/kbar/GlobalSearch';
import SchemeSelector from '@/features/scheme/SchemeSelector';
import ThemeToggle from '@/features/theme/ThemeToggle';
import AIChatButton from '@/features/ai-chat/AIChatButton';

export const PROJECT_INFO = {
  name: 'Utopian ML',
  initials: 'UM'
};

export const navItems: NavItem[] = [
  {
    title: 'Navigation',
    items: [
      {
        title: 'Transformer',
        url: '/transformer',
        icon: 'Transformer',
        isActive: false,
        shortcut: ['t']
      }
    ]
  },
  {
    title: 'Settings',
    items: [
      {
        title: 'Search',
        icon: 'Search',
        isActive: false,
        component: GlobalSearch
      },
      {
        title: 'Scheme',
        icon: 'Scheme',
        isActive: false,
        component: SchemeSelector
      },
      {
        title: 'Theme',
        icon: 'Theme',
        isActive: false,
        component: ThemeToggle
      },
      {
        title: 'AI Chat',
        icon: 'AIChat',
        isActive: false,
        component: AIChatButton
      }
    ]
  }
];
