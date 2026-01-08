import {
  Github,
  Mail,
  ExternalLink,
  Code,
  BrainCircuit,
  Layers,
  Cloud,
  Layout,
  Terminal,
  Search,
  Settings,
  Server,
  Monitor,
  Brain,
  Contrast,
  Palette,
  Command
} from 'lucide-react';

export const GuideIcons = {
  Languages: Terminal,
  MachineLearning: BrainCircuit,
  Optimization: Settings,
  VectorSearch: Search,
  BackendFrameworks: Code,
  FrontendFrameworks: Layout,
  Infrastructure: Server,
  CloudServices: Cloud,
  Monitoring: Monitor
};

export const SocialIcons = {
  Github,
  Mail,
  ExternalLink
};

export const NavIcons = {
  AIChat: Brain,
  Theme: Contrast,
  Scheme: Palette,
  Search: Command
};

export const ArchitectureIcons = {
  Transformer: Layers
};

export const AllIcons = {
  ...NavIcons,
  ...ArchitectureIcons
};
