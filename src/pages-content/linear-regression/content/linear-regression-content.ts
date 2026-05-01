export const headerContent = {
  title: 'Linear Regression',
  subtitle: 'Learning by Fitting Lines'
};

export const introductionContent = {
  title: 'Introduction',
  paragraphs: [
    'Linear regression is the oldest and most fundamental supervised learning algorithm. Gauss and Legendre independently developed the method of least squares around 1805 to fit planetary orbits—the same algorithm used today to train neural network output layers, price houses, and forecast demand.',
    'The task is simple: given pairs of inputs and outputs, find the straight line (or hyperplane) that best explains the relationship. "Best" means minimizing the total squared error between predictions and true values—a choice that is mathematically convenient, statistically principled, and surprisingly powerful.',
    'Despite its simplicity, linear regression introduces every concept needed for deep learning: a parameterized model, a loss function, gradient descent, overfitting, and the bias-variance tradeoff. It is not a stepping stone to be discarded—linear layers are the most common operation in every modern neural network.'
  ]
};

export const modelContent = {
  title: 'The Model',
  description:
    'A linear regression model predicts a continuous output ŷ as a weighted sum of inputs plus a bias term. With one input this is a line; with multiple inputs it is a hyperplane.',
  singleFeature: {
    formula: 'ŷ = wx + b',
    terms: [
      { name: 'x', description: 'Input feature (e.g. house size in m²)' },
      {
        name: 'w',
        description: 'Weight (slope) — how much ŷ changes per unit of x'
      },
      {
        name: 'b',
        description: 'Bias (intercept) — the baseline prediction when x = 0'
      },
      {
        name: 'ŷ',
        description: 'Predicted output (e.g. predicted house price)'
      }
    ]
  },
  multipleFeatures: {
    formula: 'ŷ = w₁x₁ + w₂x₂ + … + wₙxₙ + b = wᵀx + b',
    description:
      'With n features, each has its own weight. In matrix form: ŷ = Xw + b where X is the design matrix. This is exactly the linear layer in every neural network.'
  },
  defaultWeight: 1.5,
  defaultBias: 0.5
};

export const lossContent = {
  title: 'Loss Function: Mean Squared Error',
  description:
    'We need a way to measure how wrong our predictions are. Mean Squared Error (MSE) is the standard choice: average the squared difference between each prediction ŷᵢ and the true value yᵢ.',
  formula: 'MSE = (1/n) Σᵢ (yᵢ − ŷᵢ)²',
  whySquared: [
    {
      title: 'Penalizes large errors more',
      description:
        'A prediction 10 units off contributes 100 to MSE; one 1 unit off contributes 1. This makes the model especially sensitive to large mistakes—often desirable.'
    },
    {
      title: 'Differentiable everywhere',
      description:
        'Squared error has a smooth gradient at every point, making gradient descent easy to apply. Absolute error |yᵢ − ŷᵢ| is not differentiable at zero.'
    },
    {
      title: 'Closed-form solution exists',
      description:
        'MSE leads to the Normal Equations w* = (XᵀX)⁻¹Xᵀy—an exact analytical solution. No iterative optimization needed for small datasets.'
    }
  ],
  alternativeLosses: [
    {
      name: 'MAE',
      formula: '(1/n)Σ|yᵢ−ŷᵢ|',
      note: 'Robust to outliers, not differentiable at 0'
    },
    {
      name: 'Huber',
      formula: 'smooth blend of MSE + MAE',
      note: 'Best of both: differentiable, outlier-robust'
    },
    {
      name: 'R²',
      formula: '1 − SS_res/SS_tot',
      note: 'Proportion of variance explained; interpretable'
    }
  ]
};

export const gradientDescentContent = {
  title: 'Gradient Descent',
  description:
    'We minimize MSE by gradient descent: compute the slope of the loss with respect to each parameter, then take a small step downhill. Repeat until convergence.',
  gradients: [
    {
      label: '∂L/∂w',
      formula: '-(2/n) Σᵢ (yᵢ − ŷᵢ) · xᵢ',
      meaning: 'How MSE changes as we nudge w'
    },
    {
      label: '∂L/∂b',
      formula: '-(2/n) Σᵢ (yᵢ − ŷᵢ)',
      meaning: 'How MSE changes as we nudge b'
    }
  ],
  updates: ['w ← w − η · ∂L/∂w', 'b ← b − η · ∂L/∂b'],
  intuition:
    'If ŷ > y (predicting too high) the gradient is positive, so we subtract it—w decreases. If ŷ < y (too low) the gradient is negative, so subtracting it increases w. The model self-corrects.',
  learningRate:
    'η (learning rate) controls step size. Too large: overshoot and diverge. Too small: converge slowly. Typical range: 0.001–0.1 for normalized data.',
  normalEquation:
    'For small datasets, skip gradient descent entirely: w* = (XᵀX)⁻¹Xᵀy gives the exact optimal weights in one matrix operation. Impractical for large n or many features due to O(n³) matrix inversion.'
};

export const trainingDemoContent = {
  title: 'Training Demo',
  description:
    'Adjust the slope (w) and intercept (b) manually, or click "Train" to watch gradient descent minimize MSE and fit the line to the data.',
  points: [
    [0.1, 0.25],
    [0.2, 0.45],
    [0.3, 0.55],
    [0.4, 0.7],
    [0.5, 0.82],
    [0.6, 0.95],
    [0.7, 1.05],
    [0.8, 1.28],
    [0.15, 0.35],
    [0.55, 0.9],
    [0.65, 1.0],
    [0.45, 0.75]
  ] as [number, number][]
};

export const featuresContent = {
  title: 'Multiple Features',
  description:
    'Real datasets have many input features. Linear regression scales naturally: each feature xⱼ gets its own weight wⱼ. The decision surface becomes a hyperplane in n-dimensional space.',
  examples: [
    {
      task: 'House price prediction',
      features: [
        'size (m²)',
        'bedrooms',
        'distance to city (km)',
        'age (years)'
      ],
      formula: 'price = w₁·size + w₂·bedrooms + w₃·distance + w₄·age + b'
    },
    {
      task: 'Stock return prediction',
      features: ['P/E ratio', 'volume', 'momentum', 'volatility'],
      formula: 'return = w₁·PE + w₂·vol + w₃·mom + w₄·vix + b'
    }
  ],
  matrixForm: 'ŷ = Xw + b   where X ∈ ℝⁿˣᵈ, w ∈ ℝᵈ, b ∈ ℝ',
  connectionToNN:
    'A linear layer nn.Linear(in, out) in PyTorch is exactly this: Y = XWᵀ + b. Every MLP, Transformer, and CNN uses linear regression as its core computation—just stacked and interleaved with nonlinearities.'
};

export const summaryContent = {
  title: 'Summary',
  intro: 'Linear regression in five steps:',
  steps: [
    {
      bold: 'Model',
      text: 'Model: ŷ = wᵀx + b — a weighted sum of inputs plus bias'
    },
    {
      bold: 'Loss',
      text: 'Loss: MSE = (1/n)Σ(yᵢ−ŷᵢ)² — penalize squared prediction errors'
    },
    {
      bold: 'Gradients',
      text: 'Gradients: differentiate MSE with respect to w and b'
    },
    {
      bold: 'Update',
      text: 'Update: w ← w − η·∂L/∂w each step, moving downhill on the loss surface'
    },
    {
      bold: 'Foundation',
      text: 'Foundation: every linear layer in deep learning is linear regression—just composed with nonlinearities'
    }
  ],
  quote:
    'It is remarkable that a discipline as mathematical as statistics should have at its core an algorithm that can be understood and implemented in a few lines of code, and that the same algorithm should form the backbone of models with hundreds of billions of parameters.'
};

export const footerContent = {
  mainText: 'A visual guide to Linear Regression',
  citation: 'Least squares: Legendre (1805), Gauss (1809)',
  paperLink: 'https://en.wikipedia.org/wiki/Ordinary_least_squares'
};

export const probabilisticContent = {
  title: 'Probabilistic Interpretation',
  description:
    'Why MSE? Because if each observation is corrupted by Gaussian noise, minimizing MSE is exactly Maximum Likelihood Estimation. MSE is not arbitrary — it is the principled loss under the most natural noise assumption.',
  noiseModel: {
    formula: 'y = wx + b + ε,    ε ~ 𝒩(0, σ²)',
    description:
      'Each observed y equals the true signal wx + b plus Gaussian noise ε with variance σ². This is the standard assumption: measurement errors are many small independent effects summing to a bell curve.'
  },
  likelihood: {
    formula: 'P(y | x, w, b) = 𝒩(wx+b, σ²) = (1/√(2πσ²)) · exp(−(y−ŷ)² / 2σ²)',
    description:
      'The probability of observing y given x is a Gaussian centered at ŷ = wx + b. Points near the line have high likelihood; outliers have exponentially lower likelihood.'
  },
  mle: {
    title: 'MLE = Minimize MSE',
    derivation: [
      {
        step: 'Log-likelihood',
        formula: 'log L(w, b) = −(n/2) log(2πσ²) − (1/2σ²) · Σᵢ (yᵢ − ŷᵢ)²'
      },
      {
        step: 'Maximize log L',
        formula:
          '⟺  Minimize  Σᵢ (yᵢ − ŷᵢ)²   (drop constants not involving w, b)'
      },
      {
        step: 'Divide by n',
        formula: '=  MSE = (1/n) Σᵢ (yᵢ − ŷᵢ)²   ← same minimum, just scaled'
      }
    ],
    conclusion:
      'MSE is the principled maximum-likelihood choice under Gaussian noise — the maximum-entropy distribution for continuous errors with known variance. Other noise assumptions give other losses: Laplace noise → MAE (L1), Poisson → log-loss.'
  },
  gaussianReasons: [
    {
      name: 'Central Limit Theorem',
      description:
        'Many small independent errors sum to a Gaussian regardless of their individual distributions. Real measurement noise often arises exactly this way.'
    },
    {
      name: 'Maximum entropy',
      description:
        'Among all distributions with fixed mean and variance, the Gaussian has the highest entropy — encoding the least extra information, making it the default "uninformative" choice.'
    },
    {
      name: 'Closed-form solution',
      description:
        'Gaussian likelihood leads to MSE → the Normal Equations w* = (XᵀX)⁻¹Xᵀy. Exact, no iteration. Other noise models produce harder optimization problems.'
    }
  ]
};

export const betaPriorContent = {
  title: 'Beta Distribution & Conjugate Priors',
  description:
    'The Gaussian prior we used for MAP works for unbounded weights. But what if the parameter is a probability — bounded in [0, 1]? The Beta distribution is the natural prior for probability parameters, and it has a powerful property: the posterior after observing data is also a Beta distribution.',
  betaDef: {
    formula: 'Beta(w; α, β) = w^(α−1) · (1−w)^(β−1) / B(α, β),    w ∈ [0, 1]',
    description:
      'α and β are shape parameters. Intuitively: α − 1 is the count of prior "successes" and β − 1 the count of prior "failures." Uniform prior = Beta(1,1). Alpha > beta → skewed toward 1. Equal α=β → symmetric around 0.5.'
  },
  stats: [
    {
      name: 'Mean',
      formula: 'α / (α + β)',
      description: 'Expected value of w under the prior'
    },
    {
      name: 'Mode (MAP)',
      formula: '(α − 1) / (α + β − 2)',
      description: 'Most probable value — only defined when α, β > 1'
    },
    {
      name: 'Variance',
      formula: 'αβ / [(α+β)²(α+β+1)]',
      description: 'Decreases as α+β grows — more data → tighter belief'
    }
  ],
  conjugate: {
    title: 'Conjugate Update',
    formula:
      'Prior: Beta(α, β)  +  Data: k successes in n trials  →  Posterior: Beta(α + k, β + n − k)',
    explanation:
      'The prior encodes pseudo-counts. Observing k heads and n−k tails simply adds to those counts. The posterior is the same family as the prior — this is what conjugacy means.'
  },
  mapEstimate: {
    formula: 'w_MAP = (α + k − 1) / (α + β + n − 2)',
    comparison: [
      { name: 'MLE', formula: 'k / n', note: 'Ignores prior — pure data' },
      {
        name: 'MAP',
        formula: '(α+k−1) / (α+β+n−2)',
        note: 'Balances data and prior counts'
      },
      {
        name: 'Mean',
        formula: '(α+k) / (α+β+n)',
        note: 'Full Bayesian posterior mean'
      }
    ]
  },
  mlConnections: [
    {
      name: 'Logistic regression',
      description:
        'Output p = σ(wx+b) ∈ [0,1]. Beta(α,β) prior on p → MAP adds (α−1) pseudo-positives and (β−1) pseudo-negatives. Equivalent to label smoothing.'
    },
    {
      name: 'Naïve Bayes',
      description:
        'P(word | class) estimated from counts. Beta(1+ε, 1+ε) prior → add-ε (Laplace) smoothing. Prevents zero-probability for unseen words.'
    },
    {
      name: 'Dirichlet (multiclass)',
      description:
        'Beta generalizes to Dir(α₁,…,αK) for K-class probabilities. MAP under Dirichlet prior = softmax with pseudo-count regularization — foundation of topic models and language model smoothing.'
    }
  ],
  insight:
    'When you add label smoothing in a classifier or add-one smoothing in a language model, you are doing MAP estimation under a Beta (or Dirichlet) prior. The "magic constant" you add is just α − 1 — the prior pseudo-count.'
};

export const mapContent = {
  title: 'Maximum A Posteriori (MAP)',
  description:
    'MLE treats w as a fixed unknown and maximizes the likelihood of the data. MAP goes Bayesian: treat w as a random variable with a prior belief P(w), then find the w that maximizes the posterior P(w | data) — the probability of w given what we observed.',
  bayes: {
    formula: 'P(w | X, y) ∝ P(y | X, w) · P(w)',
    parts: [
      {
        name: 'P(w | X, y)',
        label: 'Posterior',
        description:
          'What we believe about w after seeing data. This is what MAP maximizes.'
      },
      {
        name: 'P(y | X, w)',
        label: 'Likelihood',
        description:
          'How probable is the data given w? This is what MLE maximizes.'
      },
      {
        name: 'P(w)',
        label: 'Prior',
        description:
          'Our belief about w before seeing any data — encodes regularization.'
      }
    ]
  },
  derivation: [
    {
      step: 'Log-posterior',
      formula: 'log P(w | X, y)  ∝  log P(y | X, w)  +  log P(w)'
    },
    {
      step: 'Gaussian prior',
      formula: 'P(w) = 𝒩(0, 1/λ)  →  log P(w) = −λ · Σⱼ wⱼ²  + const'
    },
    {
      step: 'MAP objective',
      formula:
        'Maximize  −MSE  −  λ · ‖w‖²   ⟺   Minimize  MSE + λ · ‖w‖²   = Ridge!'
    },
    {
      step: 'Laplace prior',
      formula:
        'P(w) ∝ exp(−λ|w|)  →  MAP objective  =  MSE + λ · ‖w‖₁   = Lasso!'
    }
  ],
  comparison: [
    {
      aspect: 'Optimizes',
      mle: 'P(y | X, w) — likelihood only',
      map: 'P(y | X, w) · P(w) — likelihood × prior'
    },
    {
      aspect: 'Regularization',
      mle: 'None (flat / improper prior)',
      map: 'L2 (Gaussian prior), L1 (Laplace prior)'
    },
    {
      aspect: 'Small data',
      mle: 'Overfits — parameters chase noise',
      map: 'Prior pulls weights toward zero — stabler'
    },
    {
      aspect: 'Large data',
      mle: 'Likelihood dominates, prior irrelevant',
      map: 'Likelihood dominates, converges to MLE'
    },
    {
      aspect: 'Requires prior',
      mle: 'No',
      map: 'Yes — choosing λ is choosing prior strength'
    }
  ],
  insight:
    'Ridge and Lasso are not ad-hoc tricks. They are the natural estimators when you believe weights should be small (Gaussian prior) or sparse (Laplace prior). λ is not a hyperparameter — it is the prior precision. Cross-validating λ is equivalent to learning the prior from data.'
};

export const regularizationContent = {
  title: 'Regularization',
  description:
    'With many features, linear models overfit — they memorize noise in the training set. Regularization adds a penalty term for large weights, trading a small increase in training error for much lower variance on new data.',
  variants: [
    {
      name: 'Ridge (L2)',
      badge: 'L2',
      formula: 'L_Ridge = MSE + λ · Σⱼ wⱼ²',
      solution: 'w* = (XᵀX + λI)⁻¹ Xᵀy',
      effect:
        'Shrinks all weights proportionally toward zero. Never sets them to exactly zero — keeps all features.',
      prior:
        'MAP estimate with Gaussian prior p(w) = 𝒩(0, 1/λ) on each weight.',
      chartColor: 1
    },
    {
      name: 'Lasso (L1)',
      badge: 'L1',
      formula: 'L_Lasso = MSE + λ · Σⱼ |wⱼ|',
      solution: 'No closed form — solved via coordinate descent',
      effect:
        'Drives many weights to exactly zero → automatic feature selection. Produces sparse models.',
      prior:
        'MAP estimate with Laplace prior p(w) ∝ exp(−λ|w|) on each weight.',
      chartColor: 2
    },
    {
      name: 'Elastic Net',
      badge: 'L1+L2',
      formula: 'L_EN = MSE + λ₁ Σ|wⱼ| + λ₂ Σwⱼ²',
      solution: 'Combines L1 sparsity with L2 stability',
      effect:
        'Sparse solutions when needed, stable when features are correlated. Standard in modern practice.',
      prior: 'Product of Laplace and Gaussian priors.',
      chartColor: 3
    }
  ],
  lambda: {
    zero: 'λ = 0: vanilla MSE — may overfit when features outnumber examples',
    large:
      'λ → ∞: all weights → 0, model predicts mean ȳ for every input (maximum underfitting)',
    tuning:
      'Choose λ via cross-validation over a log-spaced grid, e.g. [10⁻⁴, 10⁻³, …, 10²].'
  },
  biasVariance:
    'Regularization increases bias (model is slightly wrong even on training data) but dramatically reduces variance (predictions are more stable across different training sets). The optimal λ balances this tradeoff for your specific dataset size and noise level.'
};

export const assumptionsContent = {
  title: 'Assumptions of Linear Regression',
  description:
    'OLS linear regression has provably optimal properties (BLUE — Best Linear Unbiased Estimator, Gauss-Markov theorem) only when certain assumptions hold. Violating them does not always break predictions, but it invalidates standard errors, confidence intervals, and p-values.',
  assumptions: [
    {
      name: 'Linearity',
      formula: 'E[y | x] = wᵀx + b',
      description:
        'The true relationship between x and y is linear. If violated, predictions are systematically wrong. Fix: add polynomial features, log transforms, or use a nonlinear model.',
      severity: 'High',
      chartColor: 1
    },
    {
      name: 'Independence of errors',
      formula: 'Cov(εᵢ, εⱼ) = 0  for i ≠ j',
      description:
        'Residuals are uncorrelated with each other. Violated in time series (autocorrelation) or clustered data. Fix: time series models, clustered standard errors.',
      severity: 'High',
      chartColor: 2
    },
    {
      name: 'Homoscedasticity',
      formula: 'Var(εᵢ) = σ²  (constant)',
      description:
        'Variance of errors is the same for all values of x. If the spread of residuals grows with x (heteroscedasticity), OLS is inefficient. Fix: log-transform y, weighted least squares.',
      severity: 'Medium',
      chartColor: 3
    },
    {
      name: 'No multicollinearity',
      formula: 'rank(X) = d  (full column rank)',
      description:
        'Features are not perfectly (or nearly) correlated. High correlation → XᵀX is nearly singular → weights are numerically unstable. Fix: Ridge regression, drop redundant features, PCA.',
      severity: 'Medium',
      chartColor: 4
    },
    {
      name: 'Normality of errors',
      formula: 'ε ~ 𝒩(0, σ²)',
      description:
        'Required for exact confidence intervals and hypothesis tests on small samples. Not needed for point prediction. By CLT, this holds approximately for large n.',
      severity: 'Low (prediction)',
      chartColor: 5
    }
  ],
  diagnostics: [
    {
      plot: 'Residuals vs Fitted',
      detects: 'Nonlinearity, heteroscedasticity'
    },
    { plot: 'Q-Q plot of residuals', detects: 'Non-normality of errors' },
    { plot: 'Scale-Location plot', detects: 'Heteroscedasticity' },
    {
      plot: 'Residuals vs Leverage',
      detects: "Influential outliers (Cook's distance)"
    }
  ],
  gaussMarkov:
    'Under assumptions 1–4, OLS is the Best Linear Unbiased Estimator (BLUE): it has the minimum variance among all linear unbiased estimators. This is the Gauss-Markov theorem — the mathematical justification for using OLS.'
};

export const evaluationContent = {
  title: 'Evaluation Metrics',
  description:
    'MSE measures training fit. But a model that memorizes training data perfectly (MSE = 0) is useless on new data. We need metrics that measure generalization — how well the model performs on unseen examples.',
  metrics: [
    {
      name: 'MSE',
      formula: '(1/n)Σ(yᵢ−ŷᵢ)²',
      unit: 'y²',
      note: 'Penalizes large errors heavily. Used for training.'
    },
    {
      name: 'RMSE',
      formula: '√[(1/n)Σ(yᵢ−ŷᵢ)²]',
      unit: 'y',
      note: 'Same units as y. Interpretable. Most common reporting metric.'
    },
    {
      name: 'MAE',
      formula: '(1/n)Σ|yᵢ−ŷᵢ|',
      unit: 'y',
      note: 'Robust to outliers. Median-like. Use when outliers are common.'
    },
    {
      name: 'R²',
      formula: '1 − SS_res/SS_tot',
      unit: 'none',
      note: 'Proportion of variance explained. R²=1 perfect, R²=0 predicts mean.'
    },
    {
      name: 'Adj R²',
      formula: '1 − (1−R²)(n−1)/(n−p−1)',
      unit: 'none',
      note: 'Penalizes adding useless features. Use for model selection.'
    }
  ],
  trainTest: {
    description:
      'Split data into train (fit parameters), validation (tune λ, polynomial degree), test (final evaluation). Never touch test set until the very end.',
    splits: [
      { name: 'Training set', pct: '60–80%', use: 'Fit w and b' },
      {
        name: 'Validation set',
        pct: '10–20%',
        use: 'Choose λ, features, model class'
      },
      {
        name: 'Test set',
        pct: '10–20%',
        use: 'Final unbiased evaluation — use once'
      }
    ]
  },
  overfitSigns: [
    'Training RMSE much lower than validation RMSE',
    'R² near 1 on training, near 0 on test',
    'Weights with huge magnitudes (regularization needed)',
    'Model fits noise: adding irrelevant features reduces training MSE'
  ]
};

export const featureEngineeringContent = {
  title: 'Feature Engineering & Preprocessing',
  description:
    'Raw features rarely arrive in the right form. Feature engineering transforms inputs so the linear model can fit them — capturing nonlinearities, fixing scale issues, and encoding categories.',
  techniques: [
    {
      name: 'Feature scaling',
      why: 'Gradient descent converges much faster when features have similar scale. Without scaling, one large-magnitude feature dominates gradient updates.',
      methods: [
        {
          name: 'Standardization (z-score)',
          formula: 'x̃ = (x − μ) / σ',
          note: 'Mean 0, std 1. Default choice.'
        },
        {
          name: 'Min-Max normalization',
          formula: 'x̃ = (x − xₘᵢₙ) / (xₘₐₓ − xₘᵢₙ)',
          note: 'Maps to [0,1]. Sensitive to outliers.'
        },
        {
          name: 'Robust scaling',
          formula: 'x̃ = (x − median) / IQR',
          note: 'Use when outliers are present.'
        }
      ],
      chartColor: 1
    },
    {
      name: 'Polynomial features',
      why: 'Linear regression is linear in the features, not in the raw input. Add x², x³ as new features to model curves. The model stays linear in weights.',
      methods: [
        {
          name: 'Degree-2 polynomial',
          formula: '[x, x²]',
          note: 'Captures U-shapes, parabolas'
        },
        {
          name: 'Degree-3 polynomial',
          formula: '[x, x², x³]',
          note: 'Inflection points, S-curves'
        },
        {
          name: 'Interaction terms',
          formula: '[x₁, x₂, x₁x₂]',
          note: 'Feature A modifies effect of B'
        }
      ],
      chartColor: 2
    },
    {
      name: 'Log / power transforms',
      why: 'Skewed features (income, price, population) work poorly with linear models. Log-transforming compresses the range and often makes relationships more linear.',
      methods: [
        {
          name: 'Log transform',
          formula: 'x̃ = log(x + 1)',
          note: 'For right-skewed, always positive features'
        },
        {
          name: 'Square root',
          formula: 'x̃ = √x',
          note: 'Milder compression than log'
        },
        {
          name: 'Box-Cox',
          formula: 'x̃ = (xλ−1)/λ',
          note: 'Data-driven power transform'
        }
      ],
      chartColor: 3
    },
    {
      name: 'Categorical encoding',
      why: 'Linear models cannot use categories directly (e.g. "city", "color"). One-hot encoding converts each category to a binary feature.',
      methods: [
        {
          name: 'One-hot encoding',
          formula: '"red" → [1,0,0], "green" → [0,1,0]',
          note: 'Drop one category to avoid multicollinearity (dummy variable trap)'
        },
        {
          name: 'Ordinal encoding',
          formula: '"low"→1, "med"→2, "high"→3',
          note: 'Only when categories have natural order'
        },
        {
          name: 'Target encoding',
          formula: 'Replace category with mean(y) per category',
          note: 'Risk of overfitting; use with CV'
        }
      ],
      chartColor: 4
    }
  ],
  scalingNote:
    'After fitting on training data, apply the SAME transformation (same μ, σ from training) to validation and test sets. Never fit the scaler on test data — data leakage.'
};

export const interpretationContent = {
  title: 'Interpreting Coefficients',
  description:
    "One of linear regression's biggest advantages over black-box models: every weight has a direct, interpretable meaning. This is the foundation of causal analysis in economics, medicine, and policy.",
  partialEffect: {
    formula: '∂ŷ / ∂xⱼ = wⱼ',
    explanation:
      '"Holding all other features constant, a one-unit increase in xⱼ changes the predicted output by wⱼ units." This is the partial derivative interpretation — the key to causal reading of coefficients.'
  },
  examples: [
    {
      model: 'price = 0.15·size + 8·bedrooms − 0.12·age + 5.2',
      interpretations: [
        'size (m²): +1 m² → +$150 predicted price, holding bedrooms and age fixed',
        'bedrooms: +1 bedroom → +$8,000, holding size and age fixed',
        'age (years): +1 year older → −$120, holding size and bedrooms fixed',
        'intercept: predicted price for size=0, bedrooms=0, age=0 — often not meaningful'
      ]
    }
  ],
  standardized: {
    title: 'Standardized Coefficients (for comparison)',
    description:
      'After standardizing features (z-score), coefficients are in units of standard deviations. A coefficient of 0.5 means: one σ increase in x → 0.5σ change in ŷ. This allows comparing effect sizes across features with different scales.',
    formula: 'β̃ⱼ = wⱼ · (σxⱼ / σy)'
  },
  multicollinearity: {
    title: 'Multicollinearity Breaks Interpretation',
    description:
      'If x₁ and x₂ are highly correlated, the model can achieve low MSE with any combination of w₁ and w₂ that sums to a certain value — the individual weights become unstable and uninterpretable. Ridge regression stabilizes them (at the cost of some bias). Variance Inflation Factor (VIF) measures severity: VIF > 10 signals a problem.'
  }
};

export const generalizationContent = {
  title: 'Generalization & Cross-Validation',
  description:
    'A model that memorizes training data has low training error but high test error. Generalization is the goal: learn patterns that transfer to new data.',
  biasVarianceDecomp: {
    formula: 'E[(y−ŷ)²] = Bias² + Variance + Irreducible noise',
    terms: [
      {
        name: 'Bias²',
        description:
          'Error from wrong assumptions (underfitting). High when model is too simple — predicts the mean, ignores signal.'
      },
      {
        name: 'Variance',
        description:
          'Error from sensitivity to training data (overfitting). High when model is too complex — fits noise, not pattern.'
      },
      {
        name: 'Irreducible noise',
        description:
          'Variance of ε — the noise in the data generating process. Cannot be reduced by any model.'
      }
    ]
  },
  learningCurve: {
    description:
      'Plot train and validation RMSE as a function of training set size. High bias: both curves are high and converge early. High variance: large gap between train (low) and val (high) curves.',
    signs: [
      {
        condition: 'Both errors high',
        diagnosis: 'Underfitting (high bias)',
        fix: 'Add features, polynomial terms, reduce regularization'
      },
      {
        condition: 'Large train/val gap',
        diagnosis: 'Overfitting (high variance)',
        fix: 'More data, regularization, fewer features'
      },
      {
        condition: 'Both errors low & close',
        diagnosis: 'Good fit',
        fix: 'Ship it'
      }
    ]
  },
  crossValidation: {
    description:
      'k-fold CV: split data into k folds; train on k−1, validate on 1; rotate; average scores. More reliable than a single train/val split — uses all data for validation.',
    procedure: [
      'Split data into k equal folds (typically k=5 or k=10)',
      'For each fold i: train on all folds except i, evaluate on fold i',
      'Report mean and std of the k validation scores',
      'Use CV score to choose λ, polynomial degree, feature set'
    ]
  }
};

export const robustnessContent = {
  title: 'Outliers & Robustness',
  description:
    'MSE squares the residuals — a single outlier with a large error can dominate the entire loss and pull the fitted line toward it. Understanding when this matters and how to handle it is essential for real data.',
  influence: [
    {
      name: 'Leverage',
      formula: 'hᵢᵢ = xᵢᵀ(XᵀX)⁻¹xᵢ',
      description:
        "A point's leverage measures how far its x-value is from the bulk of the data. High leverage points can have outsized influence on the fitted line, regardless of their y-value."
    },
    {
      name: 'Residual',
      formula: 'eᵢ = yᵢ − ŷᵢ',
      description:
        'How far the observed y is from the prediction. A high-residual point with low leverage is less dangerous — it pulls on the intercept but not the slope.'
    },
    {
      name: "Cook's Distance",
      formula: 'Dᵢ = (eᵢ² / (p·MSE)) · (hᵢᵢ / (1−hᵢᵢ)²)',
      description:
        'Combines leverage and residual. Measures how much all predictions change if point i is removed. Dᵢ > 1 (or > 4/n) signals an influential point worth investigating.'
    }
  ],
  alternatives: [
    {
      name: 'MAE (L1 loss)',
      formula: 'L = (1/n)Σ|yᵢ−ŷᵢ|',
      property:
        'Minimized by the conditional median (not mean). Outliers have bounded influence — they can only contribute |residual|, not residual².',
      when: 'Target has long tails or natural outliers (prices, counts, salaries)'
    },
    {
      name: 'Huber loss',
      formula: 'L = MSE if |e|≤δ, else MAE-like',
      property:
        'Quadratic for small residuals (sensitive to fine gradients), linear for large residuals (robust to outliers). Best of both.',
      when: 'Default robust choice — use when outliers are possible but you still want smooth optimization'
    },
    {
      name: 'Quantile regression',
      formula: 'Minimize ρτ(yᵢ−ŷᵢ)  where ρτ is the pinball loss',
      property:
        'Models the τ-th quantile of y|x instead of the mean. Gives prediction intervals directly.',
      when: 'Need uncertainty estimates or the distribution of y|x is asymmetric'
    }
  ]
};
