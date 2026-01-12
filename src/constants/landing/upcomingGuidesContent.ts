export const upcomingGuidesContent = {
  sectionTitle: 'Coming Soon',
  guides: [
    // ═══════════════════════════════════════════════════════════════════════
    // FOUNDATIONS - Statistical & Probabilistic Models (Pre-Deep Learning)
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Perceptron',
      description:
        'The first neural model: linear classification inspired by biological neurons.',
      category: 'Foundations',
      icon: 'Brain'
    },
    {
      title: 'Linear & Logistic Regression',
      description:
        'Statistical learning foundations that influenced neural network optimization.',
      category: 'Foundations',
      icon: 'Sigma'
    },
    {
      title: 'Decision Trees & Ensembles',
      description:
        'Tree-based models and ensemble methods like Random Forests and Gradient Boosting.',
      category: 'Foundations',
      icon: 'GitBranch'
    },
    {
      title: 'Support Vector Machines (SVMs)',
      description:
        'Maximum-margin classifiers with kernel methods for nonlinear boundaries.',
      category: 'Foundations',
      icon: 'Maximize'
    },
    {
      title: 'Markov Chains',
      description: 'Probabilistic sequence models with the Markov assumption.',
      category: 'Foundations',
      icon: 'Link'
    },
    {
      title: 'N-gram Models',
      description:
        'Higher-order Markov models for statistical language modeling.',
      category: 'Foundations',
      icon: 'Layers'
    },
    {
      title: 'Hidden Markov Models (HMMs)',
      description:
        'Latent-state probabilistic models that dominated early sequence learning.',
      category: 'Foundations',
      icon: 'Eye'
    },
    {
      title: 'State Space Models & Kalman Filters',
      description:
        'Continuous latent dynamical systems for time-series modeling.',
      category: 'Foundations',
      icon: 'Activity'
    },
    {
      title: 'Dynamic Bayesian Networks',
      description: 'Generalized probabilistic graphical models over time.',
      category: 'Foundations',
      icon: 'Network'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // CORE NEURAL NETWORKS - Fundamental Architectures & Training
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Feedforward Neural Networks (MLP)',
      description:
        'Multilayer perceptrons and universal nonlinear function approximation.',
      category: 'Core Neural Networks',
      icon: 'Layers'
    },
    {
      title: 'Activation Functions',
      description:
        'Sigmoid, tanh, ReLU, GELU, and SwiGLU—nonlinearities that power deep learning.',
      category: 'Core Neural Networks',
      icon: 'Zap'
    },
    {
      title: 'Backpropagation',
      description:
        'Gradient-based learning algorithm that enabled training deep networks.',
      category: 'Core Neural Networks',
      icon: 'CornerDownLeft'
    },
    {
      title: 'Weight Initialization',
      description:
        'Xavier, He, and other initialization strategies for stable training.',
      category: 'Core Neural Networks',
      icon: 'Dices'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // OPTIMIZATION - Training Techniques & Regularization
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Gradient Descent & Optimizers',
      description:
        'SGD, Momentum, Adam, AdamW, and modern optimization algorithms.',
      category: 'Optimization',
      icon: 'TrendingDown'
    },
    {
      title: 'Learning Rate Schedules',
      description:
        'Warmup, decay, cosine annealing, and cyclical learning rates.',
      category: 'Optimization',
      icon: 'LineChart'
    },
    {
      title: 'Batch Normalization',
      description:
        'Stabilizing deep network training through internal normalization.',
      category: 'Optimization',
      icon: 'Sliders'
    },
    {
      title: 'Layer Normalization',
      description:
        'Normalization technique essential for Transformers and sequence models.',
      category: 'Optimization',
      icon: 'AlignCenter'
    },
    {
      title: 'Dropout & Regularization',
      description:
        'Techniques to prevent overfitting: dropout, weight decay, and early stopping.',
      category: 'Optimization',
      icon: 'Eraser'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SEQUENCE MODELS - Recurrent Architectures (Pre-Transformer)
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Recurrent Neural Networks (RNNs)',
      description:
        'Neural networks with temporal recurrence for sequence modeling.',
      category: 'Sequence Models',
      icon: 'Repeat'
    },
    {
      title: 'Long Short-Term Memory (LSTM)',
      description:
        'Gated recurrent architecture solving the vanishing gradient problem.',
      category: 'Sequence Models',
      icon: 'Clock'
    },
    {
      title: 'Gated Recurrent Units (GRU)',
      description:
        'Simplified gated recurrent architecture with fewer parameters.',
      category: 'Sequence Models',
      icon: 'Shuffle'
    },
    {
      title: 'Bidirectional RNNs',
      description:
        'Sequence models that process information in both directions.',
      category: 'Sequence Models',
      icon: 'ArrowLeftRight'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // COMPUTER VISION - CNNs & Visual Architectures
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Convolutional Neural Networks (CNNs)',
      description:
        'Spatially structured neural networks with local connectivity and weight sharing.',
      category: 'Computer Vision',
      icon: 'Grid'
    },
    {
      title: 'Pooling & Invariance',
      description:
        'Downsampling techniques for spatial robustness and translation invariance.',
      category: 'Computer Vision',
      icon: 'Minimize'
    },
    {
      title: 'Classic CNN Architectures',
      description:
        'LeNet, AlexNet, VGG, Inception, and the evolution of deep vision networks.',
      category: 'Computer Vision',
      icon: 'Landmark'
    },
    {
      title: 'Residual Connections',
      description:
        'Skip connections that enabled training very deep networks (ResNet).',
      category: 'Computer Vision',
      icon: 'CornerUpRight'
    },
    {
      title: 'Object Detection',
      description:
        'R-CNN family, YOLO, SSD—locating and classifying objects in images.',
      category: 'Computer Vision',
      icon: 'ScanSearch'
    },
    {
      title: 'Semantic & Instance Segmentation',
      description:
        'Pixel-level classification with FCN, U-Net, and Mask R-CNN.',
      category: 'Computer Vision',
      icon: 'Shapes'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // REPRESENTATION LEARNING - Unsupervised & Self-Supervised Methods
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Autoencoders',
      description: 'Unsupervised representation learning via reconstruction.',
      category: 'Representation Learning',
      icon: 'Database'
    },
    {
      title: 'Word Embeddings',
      description:
        'Word2Vec, GloVe, and FastText—distributional word representations.',
      category: 'Representation Learning',
      icon: 'Search'
    },
    {
      title: 'Contrastive Learning',
      description:
        'SimCLR, MoCo, and self-supervised learning through contrastive objectives.',
      category: 'Representation Learning',
      icon: 'Contrast'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // GRAPH NEURAL NETWORKS - Learning on Graph-Structured Data
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Graph Neural Networks (GNNs)',
      description:
        'Message passing on graphs with GCN, GAT, and GraphSAGE architectures.',
      category: 'Graph Learning',
      icon: 'Network'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // NLP (PRE-TRANSFORMER) - Sequence-to-Sequence Learning
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Seq2Seq Models',
      description:
        'Encoder–decoder architectures for sequence transduction tasks.',
      category: 'NLP',
      icon: 'ArrowLeftRight'
    },
    {
      title: 'ELMo',
      description:
        'Contextualized word embeddings from bidirectional language models.',
      category: 'NLP',
      icon: 'MessageSquare'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ATTENTION & TRANSFORMERS - The Architectural Revolution
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Attention Mechanism',
      description:
        'Selective information routing enabling focus on relevant inputs.',
      category: 'Architecture',
      icon: 'Focus'
    },
    {
      title: 'Self-Attention',
      description:
        'Attention applied within a single sequence for contextual representations.',
      category: 'Architecture',
      icon: 'Radar'
    },
    {
      title: 'Positional Encodings',
      description:
        'Sinusoidal, learned, RoPE, and ALiBi—encoding sequence position.',
      category: 'Architecture',
      icon: 'Hash'
    },
    {
      title: 'Multi-Head Attention',
      description:
        'Parallel attention heads capturing different relationship patterns.',
      category: 'Architecture',
      icon: 'Split'
    },
    {
      title: 'Transformer',
      description:
        'Attention-only architecture that replaced recurrence entirely.',
      category: 'Architecture',
      icon: 'Transformer'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // NLP (TRANSFORMER ERA) - Modern Language Models
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'BERT',
      description:
        'Bidirectional Transformer encoder pretrained with masked language modeling.',
      category: 'NLP',
      icon: 'MessageSquare'
    },
    {
      title: 'GPT',
      description: 'Autoregressive Transformer decoder for text generation.',
      category: 'NLP',
      icon: 'Sparkles'
    },
    {
      title: 'T5 & Encoder–Decoder Transformers',
      description: 'Unified text-to-text Transformer framework.',
      category: 'NLP',
      icon: 'ArrowLeftRight'
    },
    {
      title: 'RoBERTa, ALBERT & Variants',
      description:
        'Optimized BERT variants with improved pretraining and efficiency.',
      category: 'NLP',
      icon: 'Sparkles'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // VISION TRANSFORMERS - Transformers for Images
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Vision Transformer (ViT)',
      description: 'Transformers applied to images via patch embeddings.',
      category: 'Computer Vision',
      icon: 'Grid'
    },
    {
      title: 'Swin Transformer',
      description:
        'Hierarchical vision Transformer with shifted window attention.',
      category: 'Computer Vision',
      icon: 'LayoutGrid'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // GENERATIVE MODELS - Learning Data Distributions
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Variational Autoencoders (VAE)',
      description:
        'Probabilistic latent-variable models for generative learning.',
      category: 'Generative Models',
      icon: 'Cloud'
    },
    {
      title: 'Generative Adversarial Networks (GANs)',
      description: 'Adversarial training framework for realistic generation.',
      category: 'Generative Models',
      icon: 'Flame'
    },
    {
      title: 'Normalizing Flows',
      description:
        'Invertible generative models with exact likelihood computation.',
      category: 'Generative Models',
      icon: 'Waves'
    },
    {
      title: 'Diffusion Models',
      description: 'Generative models based on iterative denoising processes.',
      category: 'Generative Models',
      icon: 'Sparkles'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MULTIMODAL - Cross-Modal Learning
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'CLIP',
      description:
        'Contrastive language–image pretraining for multimodal alignment.',
      category: 'Multimodal',
      icon: 'Image'
    },
    {
      title: 'Multimodal LLMs',
      description: 'Vision-language models like LLaVA, GPT-4V, and Gemini.',
      category: 'Multimodal',
      icon: 'Eye'
    },
    {
      title: 'Text-to-Image Generation',
      description:
        'DALL-E, Stable Diffusion, and Midjourney—generating images from text.',
      category: 'Multimodal',
      icon: 'Wand'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // REINFORCEMENT LEARNING - Learning from Interaction
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Reinforcement Learning Fundamentals',
      description:
        'MDPs, value functions, and the exploration-exploitation tradeoff.',
      category: 'Reinforcement Learning',
      icon: 'Gamepad'
    },
    {
      title: 'Q-Learning & DQN',
      description: 'Value-based RL from tabular Q-learning to deep Q-networks.',
      category: 'Reinforcement Learning',
      icon: 'Target'
    },
    {
      title: 'Policy Gradients & PPO',
      description: 'Policy optimization methods from REINFORCE to PPO.',
      category: 'Reinforcement Learning',
      icon: 'Compass'
    },
    {
      title: 'Actor-Critic Methods',
      description: 'Combining value and policy learning with A2C and SAC.',
      category: 'Reinforcement Learning',
      icon: 'Users'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // FOUNDATION MODELS - Large-Scale Pretrained Models
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Large Language Models (LLMs)',
      description:
        'Massively scaled Transformer models exhibiting emergent capabilities.',
      category: 'Foundation Models',
      icon: 'Globe'
    },
    {
      title: 'Instruction Tuning & RLHF',
      description: 'Aligning models with human intent through feedback.',
      category: 'Foundation Models',
      icon: 'CheckCircle'
    },
    {
      title: 'In-Context Learning',
      description: 'Few-shot and zero-shot learning without parameter updates.',
      category: 'Foundation Models',
      icon: 'BookOpen'
    },
    {
      title: 'Chain-of-Thought Reasoning',
      description: 'Prompting techniques for step-by-step reasoning in LLMs.',
      category: 'Foundation Models',
      icon: 'ListOrdered'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // EFFICIENT ML - Scaling & Optimization Techniques
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Transfer Learning & Fine-tuning',
      description: 'Adapting pretrained models to downstream tasks.',
      category: 'Efficient ML',
      icon: 'RefreshCw'
    },
    {
      title: 'Knowledge Distillation',
      description: 'Training smaller models to mimic larger teacher networks.',
      category: 'Efficient ML',
      icon: 'Filter'
    },
    {
      title: 'LoRA & Parameter-Efficient Fine-Tuning',
      description:
        'Low-rank adapters and efficient methods for adapting large models.',
      category: 'Efficient ML',
      icon: 'Minimize'
    },
    {
      title: 'Quantization & Pruning',
      description:
        'Compressing models through reduced precision and weight removal.',
      category: 'Efficient ML',
      icon: 'Scissors'
    },
    {
      title: 'Flash Attention',
      description:
        'IO-aware attention algorithms for efficient Transformer training.',
      category: 'Efficient ML',
      icon: 'Zap'
    },
    {
      title: 'KV Cache & Inference Optimization',
      description: 'Techniques for efficient autoregressive generation.',
      category: 'Efficient ML',
      icon: 'HardDrive'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // RETRIEVAL & AGENTS - External Knowledge & Tool Use
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Retrieval-Augmented Generation (RAG)',
      description: 'Grounding LLM outputs with retrieved external knowledge.',
      category: 'Retrieval & Agents',
      icon: 'BookSearch'
    },
    {
      title: 'Vector Databases & Embeddings',
      description: 'Storing and retrieving embeddings for semantic search.',
      category: 'Retrieval & Agents',
      icon: 'Database'
    },
    {
      title: 'Tool Use & Function Calling',
      description: 'Enabling LLMs to interact with external tools and APIs.',
      category: 'Retrieval & Agents',
      icon: 'Wrench'
    },
    {
      title: 'AI Agents & Multi-Agent Systems',
      description:
        'Autonomous agents and collaborative multi-agent architectures.',
      category: 'Retrieval & Agents',
      icon: 'Bot'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MODERN ARCHITECTURES - Beyond Standard Transformers
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Mixture of Experts (MoE)',
      description: 'Conditional computation for efficient model scaling.',
      category: 'Architecture',
      icon: 'Boxes'
    },
    {
      title: 'State Space Models (S4/S6)',
      description:
        'Structured state-space models for efficient long-sequence learning.',
      category: 'Architecture',
      icon: 'Waveform'
    },
    {
      title: 'Mamba',
      description:
        'Selective state-space models as an efficient alternative to attention.',
      category: 'Architecture',
      icon: 'Cpu'
    },
    {
      title: 'xLSTM & Modern Recurrence',
      description:
        'Revisiting recurrent architectures with modern improvements.',
      category: 'Architecture',
      icon: 'RotateCcw'
    },
    {
      title: 'Hyena & Convolution-Based Models',
      description:
        'Long convolutions as an alternative to attention mechanisms.',
      category: 'Architecture',
      icon: 'Waves'
    }
  ]
};
