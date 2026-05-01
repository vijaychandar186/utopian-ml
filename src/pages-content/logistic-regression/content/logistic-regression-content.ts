export const headerContent = {
  title: 'Logistic Regression',
  subtitle: 'Probabilistic Classification'
};

export const introductionContent = {
  title: 'Introduction',
  paragraphs: [
    'Despite the name, logistic regression is a classification algorithm. It predicts the probability that an input belongs to a class—a number between 0 and 1—rather than a continuous value. The "regression" refers to the underlying linear model; the magic is in how it is converted to a probability.',
    'The key insight: take the linear output z = wᵀx + b and squash it through the sigmoid function σ(z) = 1/(1+e⁻ᶻ). This maps any real number to (0,1), making the output interpretable as a probability. Predict class 1 if the probability exceeds 0.5, class 0 otherwise.',
    'Logistic regression is the simplest neural network with a meaningful output: one neuron, sigmoid activation, trained with cross-entropy loss. Understanding it deeply means understanding the output layer of every binary classifier—from spam filters to medical diagnosis models.'
  ]
};

export const sigmoidContent = {
  title: 'The Sigmoid Function',
  description:
    'The sigmoid function σ(z) = 1/(1+e⁻ᶻ) is the core of logistic regression. It maps any real number to a probability between 0 and 1, with a smooth S-shaped curve centered at σ(0) = 0.5.',
  formula: 'σ(z) = 1 / (1 + e⁻ᶻ)',
  properties: [
    {
      z: '-∞',
      output: '→ 0',
      meaning: 'Extreme negative score → confident class 0'
    },
    { z: '0', output: '= 0.5', meaning: 'No signal → maximum uncertainty' },
    {
      z: '+∞',
      output: '→ 1',
      meaning: 'Extreme positive score → confident class 1'
    }
  ],
  derivative: "σ'(z) = σ(z) · (1 − σ(z))   ← elegant self-referential form",
  whySigmoid: [
    'Outputs are always valid probabilities (0 to 1)',
    'Smooth and differentiable everywhere—gradient descent works perfectly',
    "Derivative σ'(z) = σ(z)(1−σ(z)) is simple and cheap to compute",
    'Natural probabilistic interpretation: σ(z) = P(y=1 | x)'
  ]
};

export const modelContent = {
  title: 'The Model',
  description:
    'Logistic regression computes a linear score z, then applies sigmoid to get a probability. The decision boundary is the set of points where z = 0—where the model is maximally uncertain.',
  steps: [
    { label: 'Linear score', formula: 'z = w₁x₁ + w₂x₂ + … + b = wᵀx + b' },
    { label: 'Probability', formula: 'p = σ(z) = 1 / (1 + e⁻ᶻ)' },
    { label: 'Prediction', formula: 'ŷ = 1 if p ≥ 0.5 else 0' }
  ],
  decisionBoundary:
    'The decision boundary is where p = 0.5, which means z = 0, which means wᵀx + b = 0. This is always a straight line (2D), plane (3D), or hyperplane (nD)—logistic regression is a linear classifier.',
  defaultWeights: [1.5, -1.2],
  defaultBias: -0.2
};

export const lossContent = {
  title: 'Loss Function: Binary Cross-Entropy',
  description:
    'We cannot use MSE for classification. If y=1 and we predict p=0.01, MSE gives (1−0.01)²≈1—a mild penalty. Cross-entropy gives −log(0.01)≈4.6—a severe one. Cross-entropy is derived from maximum likelihood: find w that makes the training labels most probable.',
  formula: 'L = −(1/n) Σᵢ [ yᵢ log(pᵢ) + (1−yᵢ) log(1−pᵢ) ]',
  intuition: [
    {
      case: 'y=1, p→1',
      loss: '−log(1) = 0',
      note: 'Correct and confident — no penalty'
    },
    {
      case: 'y=1, p=0.5',
      loss: '−log(0.5) ≈ 0.69',
      note: 'Correct but uncertain — mild penalty'
    },
    {
      case: 'y=1, p→0',
      loss: '−log(0) → ∞',
      note: 'Wrong and confident — infinite penalty'
    }
  ],
  gradients: [
    {
      label: '∂L/∂w',
      formula: '(1/n) Σᵢ (pᵢ − yᵢ) · xᵢ',
      note: 'Same form as linear regression!'
    },
    {
      label: '∂L/∂b',
      formula: '(1/n) Σᵢ (pᵢ − yᵢ)',
      note: 'Error signal is p − y'
    }
  ],
  vsMSE:
    "MSE with sigmoid causes vanishing gradients: when σ(z) saturates near 0 or 1, σ'(z) ≈ 0, so gradients vanish and learning stalls. Cross-entropy's gradient (p−y) does not vanish at saturation—it is strong when the model is wrong."
};

export const trainingDemoContent = {
  title: 'Training Demo',
  description:
    'Watch logistic regression learn a 2D decision boundary. Each step runs gradient descent on binary cross-entropy loss. The dashed line is the current decision boundary (p = 0.5).',
  class0Points: [
    [0.15, 0.7],
    [0.2, 0.85],
    [0.1, 0.6],
    [0.25, 0.75],
    [0.3, 0.9],
    [0.05, 0.8]
  ] as [number, number][],
  class1Points: [
    [0.75, 0.2],
    [0.8, 0.35],
    [0.7, 0.15],
    [0.85, 0.3],
    [0.9, 0.1],
    [0.65, 0.25]
  ] as [number, number][]
};

export const connectionContent = {
  title: 'Connection to Neural Networks',
  description:
    'Logistic regression is the simplest possible neural network: one layer, one neuron, sigmoid activation. Every concept generalizes directly.',
  connections: [
    {
      title: 'Output layer',
      description:
        'The output layer of any binary classifier is logistic regression: linear combination of hidden features, sigmoid activation, cross-entropy loss. The hidden layers just learn better features.'
    },
    {
      title: 'Softmax = multi-class logistic regression',
      description:
        'Extend sigmoid to K classes: softmax(zₖ) = e^zₖ / Σⱼ e^zⱼ. This is logistic regression generalized to multiple classes—the output layer of every image classifier.'
    },
    {
      title: 'Logits',
      description:
        'The pre-sigmoid score z = wᵀx + b is called a "logit"—short for log-odds. Modern frameworks return logits from the model and apply sigmoid/softmax in the loss function for numerical stability.'
    },
    {
      title: 'Linear separability',
      description:
        'Like the perceptron, logistic regression can only learn linear boundaries. The difference: it outputs calibrated probabilities rather than hard 0/1 labels, and it never stops training on correctly-classified points.'
    }
  ]
};

export const summaryContent = {
  title: 'Summary',
  intro: 'Logistic regression in five steps:',
  steps: [
    {
      bold: 'Linear score',
      text: 'Linear score: z = wᵀx + b — same as linear regression'
    },
    {
      bold: 'Sigmoid',
      text: 'Sigmoid: p = σ(z) = 1/(1+e⁻ᶻ) — squash z to a probability in (0,1)'
    },
    {
      bold: 'Predict',
      text: 'Predict: ŷ = 1 if p ≥ 0.5 — threshold at maximum uncertainty'
    },
    {
      bold: 'Cross-entropy loss',
      text: 'Cross-entropy loss: L = −Σ[y log p + (1−y)log(1−p)] — severe penalty for confident wrong predictions'
    },
    {
      bold: 'Neural network link',
      text: "Neural network link: logistic regression is one sigmoid neuron — the foundation of every classifier's output layer"
    }
  ],
  quote:
    'Logistic regression is a linear classifier wearing a probabilistic disguise. It cannot learn a curve, but it can tell you how sure it is about the line it draws.'
};

export const footerContent = {
  mainText: 'A visual guide to Logistic Regression',
  citation:
    'Sigmoid logistic function: Verhulst (1838) · Applied to classification: Cox (1958)',
  paperLink: 'https://en.wikipedia.org/wiki/Logistic_regression'
};

export const probabilisticDerivationContent = {
  title: 'Probabilistic Derivation: MLE → BCE',
  description:
    'Binary cross-entropy is not an arbitrary loss — it is the exact negative log-likelihood under a Bernoulli distribution. Minimizing BCE = maximizing the probability of the training labels.',
  bernoulliModel: {
    formula: 'P(y | x, w, b) = p^y · (1 − p)^(1−y)',
    description:
      'Each label y ∈ {0,1} is Bernoulli-distributed. When y=1, probability is p. When y=0, it is 1−p. This single formula handles both cases.'
  },
  derivation: [
    {
      step: 'Likelihood (n samples)',
      formula: 'L(w,b) = Πᵢ pᵢ^yᵢ · (1−pᵢ)^(1−yᵢ)'
    },
    {
      step: 'Log-likelihood',
      formula: 'log L = Σᵢ [ yᵢ log pᵢ + (1−yᵢ) log(1−pᵢ) ]'
    },
    {
      step: 'Maximize log L',
      formula: '⟺  Minimize  −(1/n) Σᵢ [ yᵢ log pᵢ + (1−yᵢ) log(1−pᵢ) ]  =  BCE'
    }
  ],
  vsLinear: [
    {
      aspect: 'Noise model',
      linear: 'Gaussian: y = ŷ + ε, ε ~ 𝒩(0,σ²)',
      logistic: 'Bernoulli: y ~ Bernoulli(σ(z))'
    },
    {
      aspect: 'MLE loss',
      linear: 'MSE = (1/n)Σ(y−ŷ)²',
      logistic: 'BCE = −(1/n)Σ[y log p + (1−y)log(1−p)]'
    },
    {
      aspect: 'Output range',
      linear: '(−∞, +∞) — continuous',
      logistic: '(0, 1) — probability'
    },
    {
      aspect: 'Gradient',
      linear: '∂L/∂w = (2/n)Σ(ŷ−y)x',
      logistic: '∂L/∂w = (1/n)Σ(p−y)x  ← identical form!'
    }
  ],
  insight:
    'The gradient of BCE with respect to w is (p−y)x — the prediction error times the input. This is structurally identical to the MSE gradient for linear regression. The sigmoid and the cross-entropy are designed together so that the derivative simplifies elegantly.'
};

export const logOddsContent = {
  title: 'Log-Odds & the Logit',
  description:
    'The sigmoid function has a natural inverse: the logit, or log-odds function. Understanding this reveals why logistic regression is called "regression" and what the weights really measure.',
  odds: {
    formula: 'odds = p / (1 − p)',
    description: 'If p = 0.75, odds = 3. "3 to 1 in favour." Odds ∈ (0, ∞).'
  },
  logOdds: {
    formula: 'logit(p) = log(p / (1−p)) = z = wᵀx + b',
    description:
      'Take the log of the odds. This is called the logit. It equals the linear score z — unbounded, linear in x. The sigmoid is the inverse of the logit.'
  },
  interpretation: [
    {
      name: 'Weight wⱼ',
      meaning:
        'A unit increase in xⱼ adds wⱼ to the log-odds, or multiplies the odds by e^wⱼ.'
    },
    {
      name: 'Positive w',
      meaning:
        'Increasing xⱼ makes class 1 more likely. e^w > 1 → odds increase.'
    },
    {
      name: 'Negative w',
      meaning:
        'Increasing xⱼ makes class 0 more likely. e^w < 1 → odds decrease.'
    },
    {
      name: 'Bias b',
      meaning:
        'The baseline log-odds when all features are zero — shifts the decision boundary.'
    }
  ],
  oddsTable: [
    { p: '0.01', odds: '0.01', logOdds: '-4.60' },
    { p: '0.25', odds: '0.33', logOdds: '-1.10' },
    { p: '0.50', odds: '1.00', logOdds: '0.00' },
    { p: '0.75', odds: '3.00', logOdds: '1.10' },
    { p: '0.99', odds: '99.0', logOdds: '4.60' }
  ],
  whyLinear:
    'Logistic regression models the log-odds as a linear function of x. This is the simplest possible model for a bounded probability output — linear in a transformed space. The transformation (sigmoid / logit) is the link function in Generalized Linear Models (GLMs).'
};

export const logisticRegularizationContent = {
  title: 'Regularization',
  description:
    'Logistic regression overfits when features are many or data is sparse. Regularization adds a penalty on large weights, equivalent to MAP estimation under a prior. In scikit-learn the parameter is C = 1/λ — smaller C = stronger regularization.',
  variants: [
    {
      name: 'L2 (default)',
      badge: 'Ridge',
      formula: 'L = BCE + λ · Σⱼ wⱼ²',
      effect:
        'Shrinks all weights. Never sets to zero. Handles correlated features gracefully.',
      prior: 'MAP with Gaussian prior 𝒩(0, 1/λ) — same as ridge regression.',
      chartColor: 1
    },
    {
      name: 'L1',
      badge: 'Lasso',
      formula: 'L = BCE + λ · Σⱼ |wⱼ|',
      effect:
        'Drives irrelevant weights to exactly zero → automatic feature selection.',
      prior: 'MAP with Laplace prior exp(−λ|w|).',
      chartColor: 2
    },
    {
      name: 'Elastic Net',
      badge: 'L1+L2',
      formula: 'L = BCE + λ₁ Σ|wⱼ| + λ₂ Σwⱼ²',
      effect: 'Sparse like L1, stable with correlated features like L2.',
      prior: 'Product of Laplace and Gaussian priors.',
      chartColor: 3
    }
  ],
  sklearn:
    'In scikit-learn: LogisticRegression(C=1.0). C = 1/λ, so C=0.01 is strong regularization, C=100 is weak. Default penalty is L2.',
  biasVariance:
    'Logistic regression on high-dimensional data (many features) almost always needs regularization. Without it, when classes are linearly separable, weights diverge to ±∞ — the model becomes infinitely confident, and calibration breaks.'
};

export const multiclassContent = {
  title: 'Multiclass: Softmax',
  description:
    'Binary logistic regression generalizes naturally to K classes via softmax. Instead of one sigmoid neuron, use K linear scores z₁…z_K and normalize them into a probability distribution.',
  softmax: {
    formula: 'P(y = k | x) = e^zₖ / Σⱼ e^zⱼ   where zₖ = wₖᵀx + bₖ',
    description:
      'Each class k has its own weight vector wₖ. The exponential ensures positivity; dividing by the sum ensures the outputs sum to 1.'
  },
  properties: [
    {
      name: 'Binary case',
      description:
        'With K=2, softmax reduces exactly to sigmoid. One of the two outputs is redundant.'
    },
    {
      name: 'Temperature',
      description:
        'Dividing z by temperature T > 1 flattens the distribution; T < 1 sharpens it. Used in LLM sampling.'
    },
    {
      name: 'Log-softmax',
      description:
        'log(softmax(z)) = z − log(Σe^zⱼ). Numerically stable and used in cross-entropy loss.'
    },
    {
      name: 'Output layer',
      description:
        'Every image classifier, language model, and sequence tagger ends with softmax (or log-softmax). Logistic regression IS the output layer.'
    }
  ],
  loss: {
    formula:
      'L = −(1/n) Σᵢ log P(y = yᵢ | xᵢ)  =  −(1/n) Σᵢ [ z_{yᵢ} − log Σⱼ e^zⱼ ]',
    description:
      'Categorical cross-entropy — minimize negative log-probability of the correct class. Gradient: ∂L/∂zₖ = P(y=k|x) − 1[k=yᵢ]. Prediction minus one-hot target — same elegant form as binary case.'
  }
};
