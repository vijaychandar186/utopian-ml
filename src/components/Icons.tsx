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
  Command,
  Sigma,
  Link,
  Eye,
  Activity,
  Network,
  GitBranch,
  Zap,
  Grid3x3,
  Minimize2,
  CornerUpRight,
  CornerDownLeft,
  SlidersHorizontal,
  Repeat,
  ArrowLeftRight,
  Clock,
  Shuffle,
  Database,
  Focus,
  Radar,
  Split,
  Flame,
  Globe,
  CheckCircle,
  Boxes,
  AudioWaveform,
  Sparkles,
  MessageSquare,
  ImageIcon,
  Cpu,
  Maximize2,
  Dices,
  TrendingDown,
  LineChart,
  AlignCenter,
  Eraser,
  Landmark,
  ScanSearch,
  Shapes,
  Hash,
  LayoutGrid,
  Waves,
  Wand2,
  Gamepad2,
  Target,
  Compass,
  Users,
  BookOpen,
  ListOrdered,
  RefreshCw,
  Filter,
  Scissors,
  HardDrive,
  BookMarked,
  Wrench,
  Bot,
  RotateCcw,
  Smartphone,
  TrendingUp,
  Triangle,
  Share2,
  Map,
  Highlighter,
  Microscope
} from 'lucide-react';

export const GuideIcons = {
  // Foundations
  Brain: Brain,
  Sigma: Sigma,
  Link: Link,
  Eye: Eye,
  Activity: Activity,
  Network: Network,
  GitBranch: GitBranch,
  Maximize: Maximize2,

  // Core Neural Networks
  Layers: Layers,
  Zap: Zap,
  CornerDownLeft: CornerDownLeft,
  Dices: Dices,

  // Optimization
  TrendingDown: TrendingDown,
  LineChart: LineChart,
  Sliders: SlidersHorizontal,
  AlignCenter: AlignCenter,
  Eraser: Eraser,

  // Sequence Models
  Repeat: Repeat,
  ArrowLeftRight: ArrowLeftRight,
  Clock: Clock,
  Shuffle: Shuffle,

  // Computer Vision
  Grid: Grid3x3,
  Minimize: Minimize2,
  CornerUpRight: CornerUpRight,
  Landmark: Landmark,
  ScanSearch: ScanSearch,
  Shapes: Shapes,
  LayoutGrid: LayoutGrid,

  // Representation Learning
  Database: Database,
  Search: Search,
  Contrast: Contrast,

  // Architecture
  Focus: Focus,
  Radar: Radar,
  Hash: Hash,
  Split: Split,
  Transformer: Layers,
  Boxes: Boxes,
  Waveform: AudioWaveform,
  Cpu: Cpu,
  RotateCcw: RotateCcw,
  Waves: Waves,

  // Generative Models
  Cloud: Cloud,
  Flame: Flame,
  Sparkles: Sparkles,

  // Multimodal
  Image: ImageIcon,
  Wand: Wand2,

  // Reinforcement Learning
  Gamepad: Gamepad2,
  Target: Target,
  Compass: Compass,
  Users: Users,

  // Foundation Models
  Globe: Globe,
  CheckCircle: CheckCircle,
  MessageSquare: MessageSquare,
  BookOpen: BookOpen,
  ListOrdered: ListOrdered,

  // Efficient ML
  RefreshCw: RefreshCw,
  Filter: Filter,
  Scissors: Scissors,
  HardDrive: HardDrive,

  // Retrieval & Agents
  BookSearch: BookMarked,
  Wrench: Wrench,
  Bot: Bot,

  // Computer Vision (new)
  Smartphone: Smartphone,
  TrendingUp: TrendingUp,
  Triangle: Triangle,

  // Optimization (new)
  Share2: Share2,

  // Interpretability
  Map: Map,
  Highlighter: Highlighter,
  Microscope: Microscope,

  // Legacy mappings
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
  Transformer: Layers,
  DiffusionLM: Sparkles,
  Perceptron: Brain,
  LinearRegression: TrendingUp,
  LogisticRegression: Sigma
};

export const AllIcons = {
  ...NavIcons,
  ...ArchitectureIcons
};
