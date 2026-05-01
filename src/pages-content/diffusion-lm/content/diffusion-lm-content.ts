export const headerContent = {
  title: 'Diffusion Language Models',
  subtitle: 'Large Language Diffusion with mAsking'
};

export const introductionContent = {
  title: 'Introduction',
  paragraphs: [
    'For nearly a decade, autoregressive (AR) Transformers—GPT, LLaMA, Claude, Gemini—have dominated language modeling by predicting one token at a time, left to right. This sequential approach is powerful but carries fundamental limitations: early mistakes propagate forward and cannot be corrected, generation is inherently serial, and controlling output structure requires complex workarounds.',
    'Diffusion Language Models (DLMs) offer a completely different paradigm. Instead of predicting tokens one by one, they generate entire sequences holistically by iteratively refining a fully masked, noisy input. The model learns to denoise: at each step it predicts all masked positions simultaneously, using full bidirectional context—seeing both left and right of every gap.',
    'LLaDA (Large Language Diffusion with mAsking), introduced in 2025, demonstrated this paradigm at 8B scale, trained entirely from scratch, rivaling LLaMA3 8B across standard benchmarks. This was the first time a non-autoregressive model matched frontier AR LLMs at this scale—opening a new chapter in how we think about language generation.'
  ]
};

export const bigPictureContent = {
  title: 'AR vs. Diffusion: Two Paradigms',
  description:
    'The fundamental difference between autoregressive and diffusion models is how they generate text. AR models build sequences left to right, one token at a time. Diffusion models start from fully masked text and iteratively unmask all positions together—generation is holistic, not sequential.',
  ar: {
    title: 'Autoregressive (AR)',
    description:
      'Predicts each token conditioned on all previous tokens. Sequential by design—position N cannot be generated until N-1 is done. Early mistakes are permanently locked in.',
    pros: [
      'Simple, mature training objective',
      'Fast with KV cache',
      'Strong few-shot prompting'
    ],
    cons: [
      'Error propagation—early mistakes stick',
      'Left-context only, no bidirectionality',
      'Infilling requires special workarounds',
      'Strictly serial generation'
    ]
  },
  diffusion: {
    title: 'Diffusion (DLM)',
    description:
      'Starts from fully masked text and iteratively unmasks all positions in parallel. Full bidirectional context at every step. Early predictions can be revised in later steps.',
    pros: [
      'Full bidirectional context per step',
      'Natural infilling and constrained generation',
      'Error correction via remasking',
      'Holistic view of entire sequence'
    ],
    cons: [
      'Multiple forward passes needed',
      'No KV cache equivalent yet',
      'Currently ~10-50x slower than AR',
      'Less mature ecosystem'
    ]
  }
};

export const forwardProcessContent = {
  title: 'The Forward Process: Adding Noise',
  description:
    'The forward process defines how clean text is gradually corrupted into noise. For masked diffusion, "noise" means randomly replacing tokens with a special [MASK] token. At t=0 the text is completely clean. At t=1 every token is masked—pure noise with no signal remaining.',
  maskingRule:
    'Each token is independently masked with probability t. Once a token becomes [MASK], it stays [MASK] for all subsequent timesteps—this is called an absorbing state. This clean property means the marginal distribution at any timestep t has a closed form: no need to simulate the full chain.',
  formula: 'P(xₜ = [MASK] | x₀) = t       P(xₜ = x₀ | x₀) = 1 − t',
  intuition:
    'Think of it like progressive redaction. At t=0.25, about 1 in 4 words are blacked out. At t=0.75, 3 in 4 are gone. At t=1.0, the entire document is redacted—complete information destruction.',
  exampleSentence: ['Diffusion', 'models', 'denoise', 'text', 'holistically'],
  whyAbsorbing:
    'The absorbing-state design is mathematically elegant: sampling xₜ given x₀ requires only a single Bernoulli draw per token. This makes training efficient—no need to simulate forward steps sequentially.'
};

export const reverseProcessContent = {
  title: 'The Reverse Process: Denoising',
  description:
    'The reverse process learns to undo corruption. A bidirectional Transformer takes a partially masked sequence and predicts the original token at every masked position—all simultaneously in one forward pass.',
  keyPoints: [
    {
      title: 'Bidirectional Context',
      description:
        'The denoiser sees the entire sequence—left and right of every [MASK]. Contrast this with AR models that see only left context. Richer context leads to more accurate predictions at each step.'
    },
    {
      title: 'Parallel Prediction',
      description:
        'All masked positions are predicted in a single forward pass. The model produces a probability distribution over the vocabulary for every [MASK] token simultaneously.'
    },
    {
      title: 'Confidence-Based Unmasking',
      description:
        'Of all masked positions predicted in one step, only the highest-confidence ones are actually unmasked. Lower-confidence positions stay as [MASK] for the next step when more context is available.'
    },
    {
      title: 'Remasking for Error Correction',
      description:
        'Some already-unmasked tokens can be re-masked in subsequent steps. This lets the model revise early decisions as surrounding context fills in—impossible in autoregressive generation.'
    }
  ],
  formula:
    'p_θ(x₀ | xₜ) = BidirectionalTransformer(xₜ) → distribution over vocab at each [MASK]'
};

export const trainingContent = {
  title: 'Training',
  description:
    'DLMs are trained with a masked cross-entropy objective: predict the original token at every masked position. Training alternates between two phases—pretraining on raw text and supervised fine-tuning (SFT) on instruction-response pairs.',
  phases: [
    {
      title: 'Pretraining',
      badge: 'Phase 1',
      description:
        "Sample noise level t uniformly from [0,1]. Randomly mask each token with probability t. Train the model to predict all masked tokens from the partially masked context. This is similar to BERT's masked language modeling—but with a continuous noise schedule that spans the full range from almost-clean to completely-masked."
    },
    {
      title: 'Supervised Fine-Tuning (SFT)',
      badge: 'Phase 2',
      description:
        'Only response tokens are subject to masking. Prompt/instruction tokens are always visible and never masked. This teaches the model to generate coherent responses conditioned on fixed instructions—the diffusion analog of instruction-tuning in AR models.'
    }
  ],
  lossFormula: 'L = −𝔼_t 𝔼_{x₀} 𝔼_{xₜ|x₀} [ Σᵢ∈masked log p_θ(x₀ⁱ | xₜ) ]',
  lossNote:
    'The loss averages over all noise levels t, all data samples x₀, and all masking patterns xₜ|x₀. This is a much richer training signal than AR next-token prediction, which only ever trains one step at one noise level (t=0).',
  trainingLoop: [
    'Sample sequence from training data',
    'Sample noise level t ~ Uniform[0,1]',
    'Mask each token with probability t',
    'Forward pass: predict all masked tokens',
    'Compute masked cross-entropy loss',
    'Backpropagate and update weights'
  ]
};

export const samplingContent = {
  title: 'Sampling: Iterative Denoising',
  description:
    'Generation starts from a fully masked sequence and runs T denoising steps from t=1 down to t=0. At each step, the model predicts all masked positions, then selectively unmasks the highest-confidence tokens. More steps produces higher quality at the cost of compute.',
  defaultSteps: [
    {
      t: 1.0,
      label: 'Start — pure noise',
      tokens: ['[M]', '[M]', '[M]', '[M]', '[M]', '[M]']
    },
    {
      t: 0.8,
      label: 'Step 1',
      tokens: ['[M]', 'models', '[M]', '[M]', '[M]', '[M]']
    },
    {
      t: 0.6,
      label: 'Step 2',
      tokens: ['Diffusion', 'models', '[M]', 'text', '[M]', '[M]']
    },
    {
      t: 0.4,
      label: 'Step 3',
      tokens: ['Diffusion', 'models', 'denoise', 'text', '[M]', 'steps']
    },
    {
      t: 0.2,
      label: 'Step 4',
      tokens: ['Diffusion', 'models', 'denoise', 'text', 'in', 'steps']
    },
    {
      t: 0.0,
      label: 'Final output',
      tokens: ['Diffusion', 'models', 'denoise', 'text', 'in', 'steps']
    }
  ],
  strategies: [
    {
      name: 'Confidence-Based Unmasking',
      description:
        'At each step, unmask only the tokens where the model assigns highest probability. Uncertain positions stay masked for more context.'
    },
    {
      name: 'Remasking',
      description:
        'Re-mask some already-predicted tokens with low confidence. Allows the model to revise earlier decisions as surrounding context fills in.'
    },
    {
      name: 'Fixed-Rate Schedule',
      description:
        'Unmask exactly 1/T of remaining masks per step. Simple and effective for a fixed number of steps T.'
    }
  ],
  tradeoffNote:
    'T is a quality-speed tradeoff. T=1 is a single forward pass (fastest, lowest quality). T=50 is iterative (slower, higher quality). Typical production use: T=10–50 steps.'
};

export const keyInnovationsContent = {
  title: 'Key Innovations',
  description:
    'DLMs unlock properties that are structurally impossible or deeply awkward in autoregressive models:',
  innovations: [
    {
      title: 'Full Bidirectional Context',
      description:
        'Every token prediction uses left and right context. AR models are limited by design to left-only context—a fundamental constraint that hurts tasks like infilling, editing, and any task where future context informs past predictions.'
    },
    {
      title: 'Native Infilling',
      description:
        'Filling in [MASK] tokens given surrounding context is the exact training objective of DLMs—not a special case. Code completion, document editing, and constrained slot-filling are natural first-class tasks.'
    },
    {
      title: 'Error Correction',
      description:
        'Remasking lets the model revisit and revise earlier predictions as context fills in. In AR generation, every token is permanent once produced. In DLMs, nothing is locked until the final step.'
    },
    {
      title: 'Principled Controllability',
      description:
        'Fix some tokens, mask others—the model generates the gaps conditioned on the fixed context. Length, structure, vocabulary constraints, and partial templates can all be encoded as fixed token sets.'
    },
    {
      title: 'Comparable Scaling',
      description:
        'LLaDA 8B matches LLaMA3 8B on standard benchmarks when trained on the same volume of data. The diffusion paradigm scales with compute and data similarly to AR models—a crucial result for the field.'
    }
  ]
};

export const applicationsContent = {
  title: 'Applications',
  description:
    'DLMs naturally excel where bidirectional reasoning, structural constraints, or iterative refinement matter:',
  categories: [
    {
      title: 'Text Infilling & Editing',
      items: [
        'Fill in masked spans given surrounding context',
        'Document editing with fixed anchor sentences',
        'Sentence completion with right-side constraints',
        'Grammar correction preserving overall structure'
      ]
    },
    {
      title: 'Structured Generation',
      items: [
        'Code generation respecting type signatures and APIs',
        'Table generation with fixed column/row headers',
        'Controlled length, format, and style',
        'Logical form generation with hard constraints'
      ]
    },
    {
      title: 'Research Frontiers',
      items: [
        'Diffusion-of-Thought: chain-of-thought via diffusion steps',
        'Multi-modal generation fusing text and image (Transfusion)',
        'Scientific sequence design: proteins, molecules, genomes',
        'Gemini Diffusion: frontier diffusion LM from Google (2025)'
      ]
    }
  ]
};

export const summaryContent = {
  title: 'Summary',
  intro:
    'Diffusion Language Models rethink text generation from first principles:',
  steps: [
    {
      bold: 'Forward process',
      text: 'Forward process corrupts clean text by masking tokens with probability t—at t=1 every token is masked, at t=0 none are'
    },
    {
      bold: 'Reverse process',
      text: 'Reverse process predicts all masked tokens simultaneously using full bidirectional context in each forward pass'
    },
    {
      bold: 'Training',
      text: 'Training minimizes masked cross-entropy across all noise levels—a richer signal than AR next-token prediction at a single noise level'
    },
    {
      bold: 'Sampling',
      text: 'Sampling iteratively unmasks from t=1 to t=0 over T steps, unmasking high-confidence tokens first and optionally re-masking uncertain ones'
    },
    {
      bold: 'Bidirectionality',
      text: 'Bidirectionality enables natural infilling, structural constraints, and richer per-step predictions impossible in left-to-right AR models'
    },
    {
      bold: 'Scale parity',
      text: 'Scale parity: LLaDA 8B matches LLaMA3 8B—proving diffusion-based LLMs are a viable alternative paradigm at production scale'
    }
  ],
  quote:
    'The intelligence of LLMs—scalability, instruction-following, in-context learning—stems not from the autoregressive mechanism per se, but from the core principle of generative modeling: approximating the true language distribution through maximum likelihood estimation.'
};

export const footerContent = {
  mainText: 'A visual guide to Diffusion Language Models',
  citation: 'Based on "Large Language Diffusion Models" (Nie et al., 2025)',
  paperLink: 'https://arxiv.org/abs/2502.09992'
};
