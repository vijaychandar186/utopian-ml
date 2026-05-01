export const guideListContent = {
  sectionTitle: 'Available Guides',
  guides: [
    // ── Foundations (chronological) ──────────────────────────────────────
    {
      title: 'Linear Regression',
      description:
        'The oldest supervised learning algorithm (Legendre & Gauss, 1805). Learn the model ŷ = wx + b, MSE loss, gradient descent, and the connection to every linear layer in modern neural networks—through interactive demos.',
      href: '/linear-regression',
      category: 'Foundations',
      status: 'Available',
      features: [
        'Interactive slope + intercept controls',
        'Live gradient descent training',
        'Loss curve visualization'
      ]
    },
    {
      title: 'Logistic Regression',
      description:
        'Probabilistic binary classification using the sigmoid function. Understand why cross-entropy beats MSE for classification, how the decision boundary works, and how logistic regression is literally a one-neuron neural network.',
      href: '/logistic-regression',
      category: 'Foundations',
      status: 'Available',
      features: [
        'Interactive sigmoid explorer',
        'Live 2D decision boundary training',
        'Cross-entropy vs MSE explainer'
      ]
    },
    {
      title: 'Perceptron',
      description:
        'The first neural model (Rosenblatt, 1958). Understand weights, bias, the step activation, and the perceptron learning rule through interactive demos—including a live training visualizer and the XOR impossibility proof.',
      href: '/perceptron',
      category: 'Foundations',
      status: 'Available',
      features: [
        'Interactive forward pass with sliders',
        'Live 2D training visualizer',
        'XOR limitation demo'
      ]
    },
    // ── Architecture (chronological) ─────────────────────────────────────
    {
      title: 'Transformer',
      description:
        'A comprehensive visual walkthrough of the Transformer architecture from "Attention Is All You Need". Understand self-attention, multi-head attention, positional encoding, and the encoder-decoder structure through interactive diagrams.',
      href: '/transformer',
      category: 'Architecture',
      status: 'Available',
      features: [
        'Interactive attention visualization',
        'Step-by-step token flow',
        'Multi-head attention breakdown'
      ]
    },
    {
      title: 'Diffusion Language Models',
      description:
        'A visual walkthrough of masked diffusion for language generation—the paradigm behind LLaDA. Understand forward masking, bidirectional denoising, training objectives, and iterative sampling through interactive demos.',
      href: '/diffusion-lm',
      category: 'Architecture',
      status: 'Available',
      features: [
        'AR vs. diffusion interactive comparison',
        'Forward process noise slider',
        'Step-by-step sampling demo'
      ]
    }
  ]
};
