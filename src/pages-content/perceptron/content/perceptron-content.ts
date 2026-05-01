export const headerContent = {
  title: 'The Perceptron',
  subtitle: 'The First Neural Model'
};

export const introductionContent = {
  title: 'Introduction',
  paragraphs: [
    'In 1958, Frank Rosenblatt at Cornell introduced the Perceptron—the first computational model of a biological neuron capable of learning from examples. It was not just a theory: Rosenblatt implemented it in hardware, the Mark I Perceptron, a physical machine with 400 photocells and motor-driven potentiometers as weights.',
    'The idea was elegant: a neuron fires when the total weighted input exceeds a threshold. If the output is wrong, nudge the weights slightly in the right direction. Repeat. Over time, the machine learns to classify correctly—without being programmed with explicit rules.',
    'Though limited to linearly separable problems, the Perceptron established the template for everything that followed: weights, bias, activation functions, the learning rule, forward pass, gradient-based updates. Every modern neural network—from a two-layer MLP to a 70B LLM—is built from this same primitive.'
  ]
};

export const anatomyContent = {
  title: 'Anatomy of a Perceptron',
  description:
    'A perceptron takes multiple numerical inputs, multiplies each by a learned weight, sums them all up (plus a bias term), then passes the result through an activation function to produce an output.',
  components: [
    {
      name: 'Inputs (x)',
      description:
        'Raw features from the data—pixel values, measurements, sensor readings. Each input xᵢ is a real number.'
    },
    {
      name: 'Weights (w)',
      description:
        'Learned parameters. Each input has its own weight wᵢ controlling how strongly that input influences the output. Positive weights excite; negative weights inhibit.'
    },
    {
      name: 'Bias (b)',
      description:
        'A constant offset that shifts the decision threshold. Without bias, the decision boundary must pass through the origin—a severe constraint. Bias breaks this symmetry.'
    },
    {
      name: 'Weighted Sum (z)',
      description:
        'z = w₁x₁ + w₂x₂ + … + wₙxₙ + b. This is the linear combination of inputs. If z > 0, the input is on one side of the decision boundary; if z < 0, the other side.'
    },
    {
      name: 'Activation Function',
      description:
        'The original perceptron uses a step function: output = 1 if z ≥ 0, else 0. Modern neurons use smooth alternatives (sigmoid, ReLU, GELU) that enable gradient-based learning.'
    },
    {
      name: 'Output (ŷ)',
      description:
        'Binary: 0 or 1 for the original perceptron. Represents the predicted class. If ŷ ≠ y (the true label), the weights are updated.'
    }
  ],
  formula: 'ŷ = step(w · x + b) = step(Σᵢ wᵢxᵢ + b)'
};

export const forwardPassContent = {
  title: 'Forward Pass',
  description:
    'The forward pass computes the output for a given input. Adjust the inputs and weights below to see how the weighted sum and final prediction change in real time.',
  defaultWeights: [0.6, -0.4],
  defaultBias: 0.1,
  defaultInputs: [0.8, 0.3],
  inputLabels: ['x₁', 'x₂'],
  weightLabels: ['w₁', 'w₂'],
  steps: [
    'Multiply each input by its weight: w₁x₁, w₂x₂, …',
    'Sum the products and add bias: z = Σ wᵢxᵢ + b',
    'Apply step activation: ŷ = 1 if z ≥ 0 else 0'
  ]
};

export const learningRuleContent = {
  title: 'The Learning Rule',
  description:
    'The Perceptron Learning Rule is a simple, guaranteed-convergent algorithm: if the output is wrong, nudge the weights toward the correct answer. Do this for every training example, repeatedly, until no mistakes remain.',
  rule: {
    title: 'Perceptron Update Rule',
    formula: 'wᵢ ← wᵢ + η · (y − ŷ) · xᵢ',
    biasFormula: 'b  ← b  + η · (y − ŷ)',
    explanation: [
      'If ŷ = y (correct): error = 0, no update.',
      'If y=1, ŷ=0 (missed positive): weights increased toward x. Next time this input pattern will score higher.',
      'If y=0, ŷ=1 (false positive): weights decreased away from x. Next time this pattern will score lower.'
    ]
  },
  learningRate: {
    name: 'Learning Rate η',
    description:
      'Controls step size. η=1 is standard for the binary perceptron. Smaller η makes smoother but slower updates; larger η risks oscillation.'
  },
  convergenceTheorem:
    'If the training data is linearly separable, the Perceptron Learning Rule is guaranteed to find a solution in a finite number of steps—the Perceptron Convergence Theorem (Novikoff, 1963).'
};

export const trainingDemoContent = {
  title: 'Training Demo',
  description:
    'Watch the perceptron learn to separate two classes. Click "Train Step" to run one weight update on the first misclassified point. The line is the decision boundary w₁x + w₂y + b = 0.',
  class0Points: [
    [0.2, 0.3],
    [0.35, 0.15],
    [0.1, 0.5],
    [0.25, 0.4],
    [0.15, 0.2]
  ],
  class1Points: [
    [0.7, 0.8],
    [0.8, 0.6],
    [0.6, 0.75],
    [0.75, 0.9],
    [0.85, 0.7]
  ]
};

export const limitationsContent = {
  title: 'Limitations: The XOR Problem',
  description:
    'The Perceptron can only learn linearly separable functions—problems where the two classes can be split by a straight line (in 2D) or hyperplane (in higher dimensions). This is both its power and its fundamental limit.',
  xorExplanation:
    'XOR (exclusive-or) is the simplest non-linearly separable problem. The four input-output pairs cannot be separated by any single line—making XOR impossible for a single perceptron.',
  xorTable: [
    { x1: 0, x2: 0, output: 0 },
    { x1: 0, x2: 1, output: 1 },
    { x1: 1, x2: 0, output: 1 },
    { x1: 1, x2: 1, output: 0 }
  ],
  minskyPapert:
    'In 1969, Marvin Minsky and Seymour Papert proved this limitation formally in their book "Perceptrons", triggering the first "AI winter" by showing single-layer networks could not solve XOR. The fix—stacking multiple layers—took another decade and the invention of backpropagation.',
  fix: 'Stack two or more perceptrons (a Multi-Layer Perceptron). Hidden layers learn intermediate representations that make non-linear problems linearly separable in a transformed space.'
};

export const legacyContent = {
  title: 'Legacy & Impact',
  description:
    'The Perceptron introduced concepts that remain foundational to every neural network built today:',
  contributions: [
    {
      title: 'Weights & Bias',
      description:
        'The weight-bias parameterization of every linear layer in modern deep learning—from a Dense layer to a Transformer attention projection—is exactly the perceptron formula.'
    },
    {
      title: 'The Learning Rule',
      description:
        'Perceptron updates are the conceptual ancestor of stochastic gradient descent. The error signal (y − ŷ) driving the update is the same intuition behind backpropagation.'
    },
    {
      title: 'Activation Functions',
      description:
        'The step function of the original perceptron evolved into sigmoid (differentiable step), then ReLU, GELU, SwiGLU—each a refinement for gradient-based training at scale.'
    },
    {
      title: 'Biological Inspiration',
      description:
        'The weighted-sum + threshold model of a neuron—fire if total input exceeds threshold—mirrors the integrate-and-fire model of biological neurons, grounding neural networks in neuroscience.'
    },
    {
      title: 'Convergence Theory',
      description:
        'The Perceptron Convergence Theorem was one of the first theoretical guarantees in machine learning—proof that a simple algorithm provably finds a solution if one exists.'
    }
  ]
};

export const summaryContent = {
  title: 'Summary',
  intro: 'The Perceptron in five steps:',
  steps: [
    {
      bold: 'Inputs & weights',
      text: 'Inputs & weights: each input feature xᵢ is multiplied by a learned weight wᵢ plus a bias b'
    },
    {
      bold: 'Weighted sum',
      text: 'Weighted sum: z = Σ wᵢxᵢ + b computes the linear score for the current input'
    },
    {
      bold: 'Activation',
      text: 'Activation: step function maps z to binary output ŷ = 1 if z ≥ 0 else 0'
    },
    {
      bold: 'Learning rule',
      text: 'Learning rule: if ŷ ≠ y, update weights by η(y−ŷ)xᵢ—move toward correct answer'
    },
    {
      bold: 'Limitation',
      text: 'Limitation: only linearly separable problems solvable; XOR requires stacked layers (MLPs)'
    }
  ],
  quote:
    'The embryo of an electronic computer that [the Navy] expects will be able to walk, talk, see, write, reproduce itself and be conscious of its existence. — New York Times on the Mark I Perceptron, 1958'
};

export const footerContent = {
  mainText: 'A visual guide to the Perceptron',
  citation:
    'Based on "The Perceptron: A Probabilistic Model for Information Storage" (Rosenblatt, 1958)',
  paperLink: 'https://psycnet.apa.org/record/1959-09865-001'
};
