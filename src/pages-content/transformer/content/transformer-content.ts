export const introductionContent = {
  title: 'Introduction',
  paragraphs: [
    'The Transformer architecture, introduced in the landmark paper "Attention is All You Need" (Vaswani et al., 2017), fundamentally transformed how we approach sequence modeling in machine learning. Before Transformers, models like RNNs (Recurrent Neural Networks) and LSTMs processed sequences one element at a time, which was slow and made it difficult to capture long-range dependencies.',
    'The key insight of the Transformer is that we can process entire sequences in parallel using a mechanism called self-attention. This allows every word in a sentence to directly attend to every other word, capturing relationships regardless of their distance. This parallelization also means Transformers can be trained much faster on modern hardware like GPUs and TPUs.',
    'Today, Transformers power the most advanced AI systems: GPT, Claude, Gemini, LLaMA for text generation; BERT for understanding; Vision Transformers (ViT) for images; and even models for audio, protein folding, and game playing. Understanding this architecture is essential for anyone working in modern AI.'
  ]
};

export const bigPictureContent = {
  title: 'The Big Picture',
  description:
    'At its core, a Transformer is an encoder-decoder architecture. Think of it like a translation machine: the encoder reads and understands the input (like a sentence in Spanish), and the decoder generates the output (the translation in English). The encoder creates a rich representation of the input that captures its meaning, which the decoder then uses to produce the output one token at a time.',
  defaultInput: 'Hola',
  defaultOutput: 'Hello',
  encoder: {
    title: 'Encoder',
    description:
      'The encoder processes the entire input sequence at once, building contextual representations for each token. Through multiple layers of self-attention and feed-forward networks, each word becomes aware of all other words in the sequence. The output is a set of vectors that capture both the meaning of each word and its relationships with other words.'
  },
  decoder: {
    title: 'Decoder',
    description:
      'The decoder generates the output sequence one token at a time. It uses masked self-attention (can only look at previous outputs), cross-attention to the encoder output (to focus on relevant input parts), and feed-forward networks. At each step, it predicts the most likely next token based on what it has generated so far and the encoded input.'
  },
  defaultNumLayers: 6,
  layersNote:
    'The original Transformer uses 6 identical layers stacked for both encoder and decoder. Modern models like GPT-3 use 96 layers!'
};

export const encoderLayerContent = {
  title: 'Inside an Encoder Layer',
  description:
    'Each encoder layer is composed of two main sub-layers, each followed by residual connections and layer normalization:',
  selfAttention: {
    title: 'Multi-Head Self-Attention',
    description:
      'This is where the magic happens. Self-attention allows each word to "look at" all other words in the sequence and gather relevant information. For example, when processing the word "it" in "The cat sat on the mat because it was tired", self-attention helps the model connect "it" to "cat". Multiple attention heads allow the model to focus on different types of relationships simultaneously.'
  },
  feedForward: {
    title: 'Position-wise Feed-Forward Network',
    description:
      "After attention, each token passes through an identical feed-forward neural network independently. This network consists of two linear transformations with a ReLU activation in between. It first expands the dimensionality (e.g., from 512 to 2048), applies non-linearity, then projects back down. This allows the model to apply complex transformations to each token's representation."
  },
  residuals: {
    title: 'Residual Connections & Layer Normalization',
    description:
      'Each sub-layer has a residual connection (adding the input to the output) followed by layer normalization. Residual connections help gradients flow through deep networks and prevent the vanishing gradient problem. Layer normalization stabilizes training by normalizing activations across features.'
  },
  dataFlow: [
    'Input Embeddings',
    'Multi-Head Self-Attention',
    'Add & Normalize',
    'Feed-Forward Network',
    'Add & Normalize',
    'Output'
  ]
};

export const selfAttentionContent = {
  title: 'Self-Attention Mechanism',
  description:
    'Self-attention is the core innovation that makes Transformers so powerful. It allows the model to weigh the importance of different words when encoding each word. Unlike RNNs that process sequentially, self-attention directly connects every position, making it easy to learn long-range dependencies.',
  exampleSentence:
    "The animal didn't cross the street because it was too tired",
  exampleQuestion:
    'What does "it" refer to? A human instantly knows it refers to "animal" (because animals get tired, streets don\'t). Self-attention enables the model to learn this same connection by allowing "it" to attend strongly to "animal".',
  intuition:
    "Think of attention like a web search: the Query is what you're searching for, the Keys are the titles of all web pages, and the Values are the page contents. You find relevant Keys using your Query, then retrieve their Values.",
  steps: [
    {
      title: 'Step 1: Create Query, Key, Value Vectors',
      description:
        'For each input token, we create three vectors by multiplying the embedding by learned weight matrices (W_Q, W_K, W_V). These matrices are learned during training.',
      badges: [
        'Query (Q): "What information am I looking for?"',
        'Key (K): "What information do I contain?"',
        'Value (V): "What information do I contribute?"'
      ],
      detail:
        'If embeddings are 512-dimensional, Q/K/V are typically 64-dimensional (512 ÷ 8 heads = 64)'
    },
    {
      title: 'Step 2: Calculate Attention Scores',
      description:
        'Compute the dot product of the Query with all Keys. This gives a score indicating how much each word should attend to every other word. Higher scores mean more relevance.',
      detail:
        'Score(Q_i, K_j) = Q_i · K_j gives the raw attention from position i to position j'
    },
    {
      title: 'Step 3: Scale the Scores',
      description:
        'Divide scores by √d_k (square root of key dimension, typically √64 = 8). This prevents the dot products from becoming too large, which would push softmax into regions with tiny gradients.',
      detail:
        'Without scaling, large dot products cause softmax to produce near-one-hot outputs, making gradients too small'
    },
    {
      title: 'Step 4: Apply Softmax',
      description:
        'Convert scores to probabilities using softmax. This normalizes so all attention weights for each query sum to 1. The word itself usually gets highest attention, but relevant context words also get significant weight.',
      detail:
        'Softmax(z_i) = exp(z_i) / Σexp(z_j) ensures all weights are positive and sum to 1'
    },
    {
      title: 'Step 5: Compute Weighted Sum of Values',
      description:
        'Multiply each Value vector by its attention weight and sum them up. This produces the output for each position—a blend of information from all positions, weighted by relevance.',
      detail:
        'Output_i = Σ(attention_ij × V_j) for all j positions in the sequence'
    }
  ],
  formula: 'Attention(Q, K, V) = softmax(QK^T / √d_k) × V',
  matrixForm:
    'In practice, we pack all queries, keys, and values into matrices Q, K, V and compute attention in one matrix operation for efficiency.',
  defaultDimension: 64
};

export const multiHeadAttentionContent = {
  title: 'Multi-Head Attention',
  description:
    'Rather than performing a single attention function, the Transformer uses multiple attention "heads" working in parallel. Each head can learn to focus on different types of relationships—one might track syntactic structure, another semantic meaning, another coreference.',
  whyMultipleHeads: [
    'Different heads can attend to different positions (one head on nearby words, another on distant ones)',
    'Heads can specialize in different relationship types (syntactic vs. semantic)',
    'Ensemble effect: multiple perspectives create more robust representations',
    'Each head operates on a lower dimension (64 vs 512), making computation efficient'
  ],
  process: [
    'Project input to Q, K, V for each head using different weight matrices',
    'Run scaled dot-product attention in parallel across all heads',
    'Concatenate all head outputs into one large vector',
    'Apply a final linear projection (W_O) to get the multi-head output'
  ],
  formula: 'MultiHead(Q,K,V) = Concat(head_1, ..., head_h) × W_O',
  headFormula: 'where head_i = Attention(Q × W_Q^i, K × W_K^i, V × W_V^i)',
  example:
    'When encoding "it" in "The animal didn\'t cross the street because it was too tired", one head strongly attends to "animal" while another attends to "tired". The combined representation captures both that "it" refers to the animal AND that the animal is tired.',
  defaultNumHeads: 8
};

export const positionalEncodingContent = {
  title: 'Positional Encoding',
  problem: {
    title: 'The Problem: No Inherent Order',
    description:
      'Self-attention processes all positions in parallel with no built-in notion of sequence order. Without positional information, "Dog bites man" and "Man bites dog" would produce identical representations! The model would have no way to distinguish word order.'
  },
  solution:
    'Solution: Add positional encoding vectors to the input embeddings. These vectors encode the position of each token using a clever pattern of sine and cosine functions at different frequencies.',
  formulas: [
    'PE(pos, 2i) = sin(pos / 10000^(2i/d_model))',
    'PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))'
  ],
  intuition:
    'Each dimension of the positional encoding corresponds to a sinusoid of different frequency. This creates a unique "fingerprint" for each position. Lower dimensions have longer wavelengths (vary slowly across positions), while higher dimensions have shorter wavelengths (vary quickly).',
  whySinusoidal: [
    'Each position gets a unique encoding that the model can learn to interpret',
    'The model can learn relative positions: PE(pos+k) can be expressed as a linear function of PE(pos)',
    'Generalizes to sequence lengths not seen during training',
    'Values are bounded between -1 and 1, preventing numerical issues'
  ],
  visualization:
    'If you visualize the positional encodings as a heatmap with positions as rows and dimensions as columns, you see wave patterns. The left half uses sine, the right half uses cosine, creating a unique pattern for each row.',
  modernAlternatives:
    'Modern models often use learned positional embeddings (trained like word embeddings) or relative positional encodings like RoPE (Rotary Position Embeddings) used in LLaMA.',
  defaultDimension: 512,
  defaultMaxPosition: 100
};

export const decoderContent = {
  title: 'The Decoder',
  description:
    'The decoder generates output tokens one at a time, using information from both the encoded input and previously generated tokens. It has a similar structure to the encoder but with crucial differences:',
  differences: [
    {
      title: 'Masked Self-Attention',
      description:
        'The decoder can only attend to previous positions in the output sequence. Future tokens are "masked out" by setting their attention scores to -∞ before softmax. This prevents the model from "cheating" by looking at future tokens during training, and matches the autoregressive nature of generation.'
    },
    {
      title: 'Cross-Attention (Encoder-Decoder Attention)',
      description:
        'Between the self-attention and feed-forward layers, the decoder has a cross-attention layer. Queries come from the decoder, but Keys and Values come from the encoder output. This allows the decoder to focus on relevant parts of the input when generating each output token.'
    },
    {
      title: 'Autoregressive Generation',
      description:
        'During inference, the decoder generates one token at a time. Each new token is appended to the output and fed back as input for generating the next token. This continues until a special end-of-sequence token is produced or a maximum length is reached.'
    }
  ],
  generationExample: {
    title: 'Generation Process (Translating "Je suis étudiant")',
    defaultSteps: [
      { input: '<start>', output: 'I' },
      { input: '<start> I', output: 'am' },
      { input: '<start> I am', output: 'a' },
      { input: '<start> I am a', output: 'student' },
      { input: '<start> I am a student', output: '<end>' }
    ],
    note: 'At each step, the decoder attends to the encoded French input and its own previous outputs to predict the next English word.'
  }
};

export const outputLayerContent = {
  title: 'Final Output Layer',
  description:
    'The decoder stack produces a vector of floating-point numbers for each position. To convert this into a word prediction, we need two final steps:',
  linear: {
    title: 'Linear Projection Layer',
    description:
      'A simple fully-connected layer that projects the decoder output (e.g., 512 dimensions) to a much larger vector matching the vocabulary size (e.g., 50,000+ dimensions). Each element becomes a "logit" score for one word in the vocabulary.'
  },
  softmax: {
    title: 'Softmax Layer',
    description:
      'Converts the raw logit scores into a probability distribution. After softmax, all values are positive and sum to 1.0. The word with the highest probability is typically selected as the output, though sampling strategies can introduce controlled randomness.'
  },
  temperature: {
    title: 'Temperature Sampling',
    description:
      'Temperature controls the randomness of predictions by scaling logits before softmax. Lower temperature (< 1) makes the model more confident and deterministic. Higher temperature (> 1) makes the distribution more uniform, increasing creativity/randomness.'
  },
  samplingStrategies: [
    {
      name: 'Greedy',
      description:
        'Always pick the highest probability token. Fast but can be repetitive.'
    },
    {
      name: 'Top-k',
      description:
        'Sample from only the k most likely tokens. Filters out unlikely options.'
    },
    {
      name: 'Top-p (Nucleus)',
      description:
        'Sample from the smallest set of tokens whose cumulative probability exceeds p. Adaptive filtering.'
    },
    {
      name: 'Beam Search',
      description:
        'Track multiple candidate sequences simultaneously, keeping the best overall. Used for translation.'
    }
  ],
  defaultVocabSize: 50257,
  examplePredictions: [
    { word: 'the', logit: 5.2 },
    { word: 'a', logit: 4.8 },
    { word: 'an', logit: 3.1 },
    { word: 'my', logit: 2.5 },
    { word: 'this', logit: 2.1 }
  ]
};

export const trainingContent = {
  title: 'Training',
  description:
    'Training a Transformer involves feeding it massive amounts of text data and optimizing it to predict the next token (or masked tokens for BERT-style models). Here are the key concepts:',
  concepts: [
    {
      title: 'Teacher Forcing',
      description:
        "During training, we provide the correct previous tokens as input (rather than the model's own predictions). This speeds up training significantly. Even if the model predicts wrong at position 3, we still give it the correct token when predicting position 4."
    },
    {
      title: 'Cross-Entropy Loss',
      description:
        'We want the model to assign high probability to the correct next token. Cross-entropy loss is -log(P(correct token)). If the model is confident and correct (P ≈ 1), loss is near 0. If wrong or uncertain (P ≈ 0), loss is very high. We sum this over all positions.'
    },
    {
      title: 'Backpropagation',
      description:
        'We compute gradients of the loss with respect to all model parameters (attention weights, feed-forward weights, embeddings). These gradients tell us how to adjust each parameter to reduce the loss.'
    },
    {
      title: 'Optimizer (Adam)',
      description:
        "Adam optimizer combines momentum (using past gradients) with adaptive learning rates (different rates for different parameters). It's the standard choice for Transformers, often with warmup (start with low learning rate, increase, then decay)."
    }
  ],
  trainingLoop: [
    'Sample a batch of sequences from the training data',
    'Forward pass: compute predictions for all positions',
    'Calculate cross-entropy loss against target tokens',
    'Backward pass: compute gradients via backpropagation',
    'Update weights using optimizer (e.g., Adam with warmup)'
  ],
  scalingLaws:
    'Research shows Transformer performance scales predictably with model size, dataset size, and compute. This led to the trend of training ever-larger models like GPT-4 and Claude.',
  defaultLearningRate: 0.2,
  defaultBatchSize: 32,
  defaultEpochs: 15
};

export const keyInnovationsContent = {
  title: 'Key Innovations',
  description:
    'The Transformer introduced several innovations that revolutionized deep learning:',
  innovations: [
    {
      title: 'Parallelization',
      description:
        'Unlike RNNs that process tokens sequentially (each step depends on the previous), Transformers process all tokens in parallel during training. This enables massive speedups on GPUs/TPUs, making it practical to train on billions of tokens.'
    },
    {
      title: 'Self-Attention Mechanism',
      description:
        'Direct connections between any two positions in a sequence, regardless of distance. No information bottleneck like in RNNs where everything must pass through a fixed-size hidden state. The path length between any two positions is O(1) instead of O(n).'
    },
    {
      title: 'Scalability',
      description:
        'The architecture scales remarkably well. The same basic design works from millions to hundreds of billions of parameters. Larger models consistently perform better, following predictable scaling laws discovered by researchers.'
    },
    {
      title: 'Transfer Learning',
      description:
        'Pre-trained Transformer models capture general language knowledge that transfers to specific tasks. Fine-tuning a pre-trained model on a small dataset often outperforms training from scratch on a large dataset. This revolutionized NLP applications.'
    },
    {
      title: 'Versatility',
      description:
        'The same architecture applies to text, images, audio, video, proteins, and more. Vision Transformers treat image patches as "tokens". This unification simplifies research and enables multimodal models.'
    }
  ]
};

export const summaryContent = {
  title: 'Summary',
  intro:
    'The Transformer architecture combines elegant components into a powerful whole:',
  steps: [
    {
      text: 'Tokenization breaks text into subword units that the model can process',
      bold: 'Tokenization'
    },
    {
      text: 'Embeddings convert tokens into dense vectors that capture semantic meaning',
      bold: 'Embeddings'
    },
    {
      text: 'Positional encodings add information about token order using sinusoidal patterns',
      bold: 'Positional encodings'
    },
    {
      text: 'Self-attention allows every token to gather information from all other tokens',
      bold: 'Self-attention'
    },
    {
      text: 'Multi-head attention runs multiple attention operations in parallel for diverse perspectives',
      bold: 'Multi-head attention'
    },
    {
      text: 'Feed-forward networks apply position-wise transformations to each token',
      bold: 'Feed-forward networks'
    },
    {
      text: 'Residual connections and layer normalization enable stable training of deep networks',
      bold: 'Residual connections'
    },
    {
      text: 'The decoder uses masked attention and cross-attention to generate outputs autoregressively',
      bold: 'Decoder'
    }
  ],
  quote:
    "The Transformer's power comes not from any single component, but from how they work together. Self-attention provides the ability to model any relationship. Multi-head attention provides multiple perspectives. Stacking layers builds hierarchical representations. And parallelization makes it all computationally feasible."
};

export const applicationsContent = {
  title: 'Applications',
  description:
    'Transformers have become the foundation of modern AI, powering applications across diverse domains:',
  categories: [
    {
      title: 'Natural Language',
      items: [
        'Text Generation: GPT-4, Claude, LLaMA, Gemini',
        'Language Understanding: BERT, RoBERTa, DeBERTa',
        'Translation: Google Translate, DeepL',
        'Summarization & Question Answering'
      ]
    },
    {
      title: 'Computer Vision',
      items: [
        'Vision Transformer (ViT) for image classification',
        'DETR for object detection',
        'Segment Anything (SAM) for segmentation',
        'DALL-E, Stable Diffusion for image generation'
      ]
    },
    {
      title: 'Multimodal & Beyond',
      items: [
        'GPT-4V, Gemini for combined text+image understanding',
        'Whisper for speech recognition',
        'AlphaFold 2 for protein structure prediction',
        'Decision Transformer for reinforcement learning'
      ]
    }
  ]
};

export const attentionDemoContent = {
  title: 'Attention Mechanism',
  description:
    'Explore how attention distributes focus across words. Click on a word to see which other words it attends to most strongly. You can also adjust the raw attention scores to see how softmax normalizes them into probabilities.',
  defaultSentence: ['the', 'cat', 'sat', 'on', 'mat'],
  defaultPatterns: {
    the: [0.8, 0.1, 0.05, 0.03, 0.02],
    cat: [0.3, 0.5, 0.1, 0.05, 0.05],
    sat: [0.15, 0.35, 0.35, 0.1, 0.05],
    on: [0.05, 0.1, 0.25, 0.4, 0.2],
    mat: [0.05, 0.05, 0.1, 0.3, 0.5]
  } as Record<string, number[]>
};

export const footerContent = {
  mainText: 'A visual guide to the Transformer architecture',
  citation: 'Based on "Attention is All You Need" (Vaswani et al., 2017)',
  paperLink: 'https://arxiv.org/abs/1706.03762'
};

export const headerContent = {
  title: 'Transformer Architecture',
  subtitle: 'Attention is All You Need'
};
