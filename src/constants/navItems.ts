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
    title: 'Guides',
    items: [
      {
        // 1805–1980s: pre-deep-learning foundations (chronological)
        title: 'Foundations',
        icon: 'Perceptron',
        items: [
          {
            title: 'Linear Regression',
            url: '/linear-regression',
            icon: 'LinearRegression',
            shortcut: ['l']
          },
          {
            title: 'Logistic Regression',
            url: '/logistic-regression',
            icon: 'LogisticRegression',
            shortcut: ['g']
          },
          {
            title: 'Perceptron',
            url: '/perceptron',
            icon: 'Perceptron',
            shortcut: ['p']
          }
        ]
      },
      {
        // 2017–present: modern architectures
        title: 'Architecture',
        icon: 'Transformer',
        items: [
          {
            title: 'Transformer',
            url: '/transformer',
            icon: 'Transformer',
            shortcut: ['t']
          },
          {
            title: 'Diffusion LMs',
            url: '/diffusion-lm',
            icon: 'DiffusionLM',
            shortcut: ['d']
          }
        ]
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
