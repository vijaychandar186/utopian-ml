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
      title: 'Linear Regression',
      description:
        'Foundational supervised learning for continuous prediction tasks.',
      category: 'Foundations',
      icon: 'Sigma'
    },
    {
      title: 'Logistic Regression',
      description:
        'Probabilistic classification model using the sigmoid function.',
      category: 'Foundations',
      icon: 'Sigma'
    },
    {
      title: 'Decision Trees',
      description:
        'Hierarchical models that learn decision rules from data features.',
      category: 'Foundations',
      icon: 'GitBranch'
    },
    {
      title: 'Ensembles',
      description:
        'Random Forests, Gradient Boosting, and combining multiple models.',
      category: 'Foundations',
      icon: 'GitBranch'
    },
    {
      title: 'SVMs',
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
      title: 'N-grams',
      description:
        'Higher-order Markov models for statistical language modeling.',
      category: 'Foundations',
      icon: 'Layers'
    },
    {
      title: 'HMMs',
      description:
        'Latent-state probabilistic models that dominated early sequence learning.',
      category: 'Foundations',
      icon: 'Eye'
    },
    {
      title: 'Kalman Filters',
      description:
        'Continuous latent dynamical systems for time-series modeling.',
      category: 'Foundations',
      icon: 'Activity'
    },
    {
      title: 'Bayesian Networks',
      description: 'Generalized probabilistic graphical models over time.',
      category: 'Foundations',
      icon: 'Network'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // CORE NEURAL NETWORKS - Fundamental Architectures & Training
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'MLPs',
      description:
        'Multilayer perceptrons and universal nonlinear function approximation.',
      category: 'Neural Networks',
      icon: 'Layers'
    },
    {
      title: 'Activations',
      description:
        'Sigmoid, tanh, ReLU, GELU, and SwiGLU—nonlinearities that power deep learning.',
      category: 'Neural Networks',
      icon: 'Zap'
    },
    {
      title: 'Backpropagation',
      description:
        'Gradient-based learning algorithm that enabled training deep networks.',
      category: 'Neural Networks',
      icon: 'CornerDownLeft'
    },
    {
      title: 'Initialization',
      description:
        'Xavier, He, and other initialization strategies for stable training.',
      category: 'Neural Networks',
      icon: 'Dices'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // OPTIMIZATION - Training Techniques & Regularization
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Optimizers',
      description:
        'SGD, Momentum, Adam, AdamW, and modern optimization algorithms.',
      category: 'Optimization',
      icon: 'TrendingDown'
    },
    {
      title: 'Learning Rates',
      description:
        'Warmup, decay, cosine annealing, and cyclical learning rates.',
      category: 'Optimization',
      icon: 'LineChart'
    },
    {
      title: 'Batch Norm',
      description:
        'Stabilizing deep network training through internal normalization.',
      category: 'Optimization',
      icon: 'Sliders'
    },
    {
      title: 'Layer Norm',
      description:
        'Normalization technique essential for Transformers and sequence models.',
      category: 'Optimization',
      icon: 'AlignCenter'
    },
    {
      title: 'Regularization',
      description:
        'Techniques to prevent overfitting: dropout, weight decay, and early stopping.',
      category: 'Optimization',
      icon: 'Eraser'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SEQUENCE MODELS - Recurrent Architectures (Pre-Transformer)
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'RNNs',
      description:
        'Neural networks with temporal recurrence for sequence modeling.',
      category: 'Sequence Models',
      icon: 'Repeat'
    },
    {
      title: 'LSTMs',
      description:
        'Gated recurrent architecture solving the vanishing gradient problem.',
      category: 'Sequence Models',
      icon: 'Clock'
    },
    {
      title: 'GRUs',
      description:
        'Simplified gated recurrent architecture with fewer parameters.',
      category: 'Sequence Models',
      icon: 'Shuffle'
    },
    {
      title: 'Bidirectional',
      description:
        'Sequence models that process information in both directions.',
      category: 'Sequence Models',
      icon: 'ArrowLeftRight'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // COMPUTER VISION - CNNs & Visual Architectures
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'CNNs',
      description:
        'Spatially structured neural networks with local connectivity and weight sharing.',
      category: 'Computer Vision',
      icon: 'Grid'
    },
    {
      title: 'Pooling',
      description:
        'Downsampling techniques for spatial robustness and translation invariance.',
      category: 'Computer Vision',
      icon: 'Minimize'
    },
    {
      title: 'CNN Classics',
      description:
        'LeNet, AlexNet, VGG, Inception, and the evolution of deep vision networks.',
      category: 'Computer Vision',
      icon: 'Landmark'
    },
    {
      title: 'ResNets',
      description: 'Skip connections that enabled training very deep networks.',
      category: 'Computer Vision',
      icon: 'CornerUpRight'
    },
    {
      title: 'Detection',
      description:
        'R-CNN family, YOLO, SSD—locating and classifying objects in images.',
      category: 'Computer Vision',
      icon: 'ScanSearch'
    },
    {
      title: 'Segmentation',
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
      category: 'Representation',
      icon: 'Database'
    },
    {
      title: 'Embeddings',
      description:
        'Word2Vec, GloVe, and FastText—distributional word representations.',
      category: 'Representation',
      icon: 'Search'
    },
    {
      title: 'Contrastive',
      description:
        'SimCLR, MoCo, and self-supervised learning through contrastive objectives.',
      category: 'Representation',
      icon: 'Contrast'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // GRAPH NEURAL NETWORKS - Learning on Graph-Structured Data
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'GNNs',
      description:
        'Message passing on graphs with GCN, GAT, and GraphSAGE architectures.',
      category: 'Graph Learning',
      icon: 'Network'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // NLP (PRE-TRANSFORMER) - Sequence-to-Sequence Learning
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Seq2Seq',
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
      title: 'Attention',
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
      title: 'Positional',
      description:
        'Sinusoidal, learned, RoPE, and ALiBi—encoding sequence position.',
      category: 'Architecture',
      icon: 'Hash'
    },
    {
      title: 'Multi-Head',
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
      title: 'T5',
      description: 'Unified text-to-text Transformer framework.',
      category: 'NLP',
      icon: 'ArrowLeftRight'
    },
    {
      title: 'BERT Variants',
      description:
        'RoBERTa, ALBERT, and optimized encoders with improved pretraining.',
      category: 'NLP',
      icon: 'Sparkles'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // VISION TRANSFORMERS - Transformers for Images
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'ViT',
      description: 'Transformers applied to images via patch embeddings.',
      category: 'Computer Vision',
      icon: 'Grid'
    },
    {
      title: 'Swin',
      description:
        'Hierarchical vision Transformer with shifted window attention.',
      category: 'Computer Vision',
      icon: 'LayoutGrid'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // GENERATIVE MODELS - Learning Data Distributions
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'VAEs',
      description:
        'Probabilistic latent-variable models for generative learning.',
      category: 'Generative',
      icon: 'Cloud'
    },
    {
      title: 'GANs',
      description: 'Adversarial training framework for realistic generation.',
      category: 'Generative',
      icon: 'Flame'
    },
    {
      title: 'Flows',
      description:
        'Invertible generative models with exact likelihood computation.',
      category: 'Generative',
      icon: 'Waves'
    },
    {
      title: 'Diffusion',
      description: 'Generative models based on iterative denoising processes.',
      category: 'Generative',
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
      title: 'VLMs',
      description: 'Vision-language models like LLaVA, GPT-4V, and Gemini.',
      category: 'Multimodal',
      icon: 'Eye'
    },
    {
      title: 'Text-to-Image',
      description:
        'DALL-E, Stable Diffusion, and Midjourney—generating images from text.',
      category: 'Multimodal',
      icon: 'Wand'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // REINFORCEMENT LEARNING - Learning from Interaction
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'RL Basics',
      description:
        'MDPs, value functions, and the exploration-exploitation tradeoff.',
      category: 'RL',
      icon: 'Gamepad'
    },
    {
      title: 'Q-Learning',
      description: 'Value-based RL from tabular Q-learning to deep Q-networks.',
      category: 'RL',
      icon: 'Target'
    },
    {
      title: 'Policy Gradients',
      description: 'Policy optimization methods from REINFORCE to PPO.',
      category: 'RL',
      icon: 'Compass'
    },
    {
      title: 'Actor-Critic',
      description: 'Combining value and policy learning with A2C and SAC.',
      category: 'RL',
      icon: 'Users'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // FOUNDATION MODELS - Large-Scale Pretrained Models
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'LLMs',
      description:
        'Massively scaled Transformer models exhibiting emergent capabilities.',
      category: 'Foundation',
      icon: 'Globe'
    },
    {
      title: 'RLHF',
      description: 'Aligning models with human intent through feedback.',
      category: 'Foundation',
      icon: 'CheckCircle'
    },
    {
      title: 'ICL',
      description: 'Few-shot and zero-shot learning without parameter updates.',
      category: 'Foundation',
      icon: 'BookOpen'
    },
    {
      title: 'Chain-of-Thought',
      description: 'Prompting techniques for step-by-step reasoning in LLMs.',
      category: 'Foundation',
      icon: 'ListOrdered'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // EFFICIENT ML - Scaling & Optimization Techniques
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Fine-tuning',
      description: 'Adapting pretrained models to downstream tasks.',
      category: 'Efficient ML',
      icon: 'RefreshCw'
    },
    {
      title: 'Distillation',
      description: 'Training smaller models to mimic larger teacher networks.',
      category: 'Efficient ML',
      icon: 'Filter'
    },
    {
      title: 'LoRA',
      description:
        'Low-rank adapters and efficient methods for adapting large models.',
      category: 'Efficient ML',
      icon: 'Minimize'
    },
    {
      title: 'Quantization',
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
      title: 'KV Cache',
      description: 'Techniques for efficient autoregressive generation.',
      category: 'Efficient ML',
      icon: 'HardDrive'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // RETRIEVAL & AGENTS - External Knowledge & Tool Use
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'RAG',
      description: 'Grounding LLM outputs with retrieved external knowledge.',
      category: 'Retrieval',
      icon: 'BookSearch'
    },
    {
      title: 'Vector DBs',
      description: 'Storing and retrieving embeddings for semantic search.',
      category: 'Retrieval',
      icon: 'Database'
    },
    {
      title: 'Tool Use',
      description: 'Enabling LLMs to interact with external tools and APIs.',
      category: 'Retrieval',
      icon: 'Wrench'
    },
    {
      title: 'AI Agents',
      description:
        'Autonomous agents and collaborative multi-agent architectures.',
      category: 'Retrieval',
      icon: 'Bot'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MODERN ARCHITECTURES - Beyond Standard Transformers
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'MoE',
      description: 'Conditional computation for efficient model scaling.',
      category: 'Architecture',
      icon: 'Boxes'
    },
    {
      title: 'SSMs',
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
      title: 'xLSTM',
      description:
        'Revisiting recurrent architectures with modern improvements.',
      category: 'Architecture',
      icon: 'RotateCcw'
    },
    {
      title: 'Hyena',
      description:
        'Long convolutions as an alternative to attention mechanisms.',
      category: 'Architecture',
      icon: 'Waves'
    }
  ]
};
