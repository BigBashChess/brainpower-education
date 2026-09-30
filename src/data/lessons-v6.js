// Brainpower Education V6 — expanded mastery-course lessons
export const v6Lessons = [
  {
    "id": "m12-v6-domain-range",
    "course": "methods-12",
    "topic": "functions",
    "title": "Domain and range",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Read restrictions directly from formulas and transformed graphs.",
    "explanation": "Domain describes permitted inputs; range describes possible outputs. Square roots require a non-negative radicand and denominators cannot be zero.",
    "formula": "$\\sqrt{g(x)}$ requires $g(x)\\ge0$.",
    "worked": [
      "Identify any algebraic restrictions first.",
      "Use the graph or transformation to determine output bounds.",
      "Write the result with inequalities or interval notation."
    ],
    "questions": [
      "m12-v6-fn-domain",
      "m12-v6-fn-range"
    ],
    "objectives": [
      "Find domains from algebraic rules",
      "Find ranges from transformations"
    ],
    "prerequisites": [
      "Function notation"
    ],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m12-v6-transformations",
    "course": "methods-12",
    "topic": "functions",
    "title": "Graph transformations",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Translate, reflect and dilate graphs without re-plotting from scratch.",
    "explanation": "Transformations act either on the input or output of a function. Horizontal transformations appear inside the argument and vertical transformations outside.",
    "formula": "$g(x)=a f(b(x-h))+k$.",
    "worked": [
      "Identify the base graph.",
      "Apply horizontal changes from the inside outward.",
      "Apply vertical dilation/reflection and shift."
    ],
    "questions": [
      "m12-v6-fn-trans1",
      "m12-v6-fn-trans2"
    ],
    "objectives": [
      "Translate functions",
      "Interpret composite transformations"
    ],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m12-v6-inverse-composite",
    "course": "methods-12",
    "topic": "functions",
    "title": "Inverse and composite functions",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Move confidently between composition and inversion.",
    "explanation": "Composition feeds one function into another. An inverse reverses a one-to-one function.",
    "formula": "$f^{-1}(f(x))=x$ on the appropriate domain.",
    "worked": [
      "For composition, evaluate the inner function first.",
      "For an inverse, write $y=f(x)$ and swap $x,y$.",
      "Check domain restrictions before claiming an inverse."
    ],
    "questions": [
      "m12-v6-fn-inv1",
      "m12-v6-fn-comp1"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m12-v6-remainder-factor",
    "course": "methods-12",
    "topic": "algebra",
    "title": "Remainder and factor theorems",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Use substitution to extract polynomial information quickly.",
    "explanation": "Dividing a polynomial by $x-a$ leaves remainder $P(a)$. In particular, $x-a$ is a factor exactly when $P(a)=0$.",
    "formula": "$P(a)=0\\iff (x-a)\\text{ is a factor}$.",
    "worked": [
      "Substitute the divisor root into the polynomial.",
      "Set the result equal to the required remainder.",
      "Solve any unknown parameter."
    ],
    "questions": [
      "m12-v6-alg-rem",
      "m12-v6-alg-factor"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m12-v6-polynomial-structure",
    "course": "methods-12",
    "topic": "algebra",
    "title": "Polynomial roots and multiplicity",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Connect factors, roots, intercept behaviour and polynomial shape.",
    "explanation": "A root of multiplicity two touches the axis; odd multiplicity roots cross it. The leading term controls end behaviour.",
    "formula": "$P(x)=a\\prod (x-r_i)^{m_i}$.",
    "worked": [
      "Write the factor associated with each root.",
      "Use multiplicity to predict crossing/touching.",
      "Use degree and leading coefficient for end behaviour."
    ],
    "questions": [
      "m12-v6-alg-cubic",
      "m12-v6-alg-mult"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m12-v6-index-laws",
    "course": "methods-12",
    "topic": "exp-log",
    "title": "Index laws and exponential equations",
    "minutes": 12,
    "difficulty": "Core",
    "xp": 60,
    "summary": "Use exponent laws fluently before introducing logarithms.",
    "explanation": "Common-base exponential equations can be solved by equating exponents after simplifying with index laws.",
    "formula": "$a^m a^n=a^{m+n},\\quad (a^m)^n=a^{mn}$.",
    "worked": [
      "Simplify powers with the same base.",
      "Rewrite each side using a common base.",
      "Equate exponents."
    ],
    "questions": [
      "m12-v6-exp-law",
      "m12-v6-exp-eqn"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m12-v6-log-laws",
    "course": "methods-12",
    "topic": "exp-log",
    "title": "Logarithm laws",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Condense and expand logarithmic expressions, then solve equations.",
    "explanation": "Logarithms turn multiplication into addition and powers into coefficients.",
    "formula": "$\\log_a(xy)=\\log_a x+\\log_a y$.",
    "worked": [
      "Apply product/quotient/power laws.",
      "Condense to one logarithm where useful.",
      "Use one-to-one behaviour of logarithms to solve."
    ],
    "questions": [
      "m12-v6-log-law",
      "m12-v6-log-eqn"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m12-v6-unit-circle",
    "course": "methods-12",
    "topic": "trig",
    "title": "Unit-circle exact values",
    "minutes": 12,
    "difficulty": "Core",
    "xp": 60,
    "summary": "Use reference angles and quadrant signs to generate exact trig values.",
    "explanation": "The unit circle gives $\\cos\\theta$ as the x-coordinate and $\\sin\\theta$ as the y-coordinate.",
    "formula": "$x=\\cos\\theta,\\quad y=\\sin\\theta$.",
    "worked": [
      "Reduce to a familiar reference angle.",
      "Determine the sign from the quadrant.",
      "Use exact special-angle values."
    ],
    "questions": [
      "m12-v6-trig-exact",
      "m12-v6-trig-tan"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m12-v6-trig-graphs-equations",
    "course": "methods-12",
    "topic": "trig",
    "title": "Trig graphs and equations",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Read amplitude/period and solve basic trigonometric equations over intervals.",
    "explanation": "The coefficient inside a trig function changes period; a multiplier outside changes amplitude.",
    "formula": "$y=a\\sin(bx)+d$ has amplitude $|a|$ and period $2\\pi/|b|$.",
    "worked": [
      "Identify the transformed graph parameters.",
      "Solve using reference angles.",
      "List every solution in the stated interval."
    ],
    "questions": [
      "m12-v6-trig-eqn1",
      "m12-v6-trig-graph"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m12-v6-product-chain",
    "course": "methods-12",
    "topic": "differentiation",
    "title": "Product and chain rules",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Move beyond single-term differentiation to products and compositions.",
    "explanation": "Product rule differentiates a product; chain rule differentiates a composition by multiplying outer and inner derivatives.",
    "formula": "$(uv)'=u'v+uv',\\quad (f(g(x)))'=f'(g(x))g'(x)$.",
    "worked": [
      "Identify whether the expression is a product, composite, or both.",
      "Differentiate the outer structure first.",
      "Simplify only after the derivative is correct."
    ],
    "questions": [
      "m12-v6-diff-prod",
      "m12-v6-diff-chain"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m12-v6-derivative-applications",
    "course": "methods-12",
    "topic": "differentiation",
    "title": "Tangents and stationary points",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Interpret derivatives geometrically rather than treating them as algebra only.",
    "explanation": "The derivative at a point is the tangent gradient. Stationary points occur when the derivative is zero.",
    "formula": "$f'(a)=m_{tangent},\\quad f'(x)=0$ at stationary points.",
    "worked": [
      "Differentiate the function.",
      "Substitute the requested x-value for a tangent gradient.",
      "Solve $f'(x)=0$ for stationary points."
    ],
    "questions": [
      "m12-v6-diff-tangent",
      "m12-v6-diff-stat"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m12-v6-definite-integrals",
    "course": "methods-12",
    "topic": "integration",
    "title": "Definite integrals and area",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Use antiderivatives to accumulate signed area over an interval.",
    "explanation": "The Fundamental Theorem links definite integrals to antiderivatives.",
    "formula": "$\\int_a^b f(x)\\,dx=F(b)-F(a)$.",
    "worked": [
      "Find an antiderivative.",
      "Evaluate at the upper and lower limits.",
      "Interpret sign when the graph lies below the axis."
    ],
    "questions": [
      "m12-v6-int-def",
      "m12-v6-int-area"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m12-v6-counting-conditional",
    "course": "methods-12",
    "topic": "probability",
    "title": "Counting and conditional probability",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Combine systematic counting with conditional probability notation.",
    "explanation": "Combinations count unordered selections. Conditional probability restricts the sample space to the conditioning event.",
    "formula": "$\\binom nr=\\frac{n!}{r!(n-r)!},\\quad P(A|B)=\\frac{P(A\\cap B)}{P(B)}$.",
    "worked": [
      "Decide whether order matters.",
      "Count or calculate the relevant intersection.",
      "Divide by the probability of the conditioning event."
    ],
    "questions": [
      "m12-v6-prob-count",
      "m12-v6-prob-cond"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m34-v6-inverses-domains",
    "course": "methods-34",
    "topic": "functions",
    "title": "Inverses, domains and restrictions",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Treat domain restrictions as part of the function, not an afterthought.",
    "explanation": "Inverse functions swap the roles of input and output; logarithmic and rational functions impose natural restrictions.",
    "formula": "$f^{-1}(f(x))=x$ only on the permitted domain.",
    "worked": [
      "State the original domain.",
      "Solve algebraically for the inverse.",
      "Translate original range into inverse domain."
    ],
    "questions": [
      "m34-v6-fn-inverse",
      "m34-v6-fn-domain"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m34-v6-composition-rational",
    "course": "methods-34",
    "topic": "functions",
    "title": "Composition and rational behaviour",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Combine functions while tracking restrictions and asymptotes.",
    "explanation": "Composite domains must satisfy both the inner domain and the outer function requirements. Rational functions often reveal asymptotes by inspection.",
    "formula": "$f(g(x))$ requires $x$ in the domain of $g$ and $g(x)$ in the domain of $f$.",
    "worked": [
      "Evaluate the inner function first.",
      "Carry restrictions through the composition.",
      "Read vertical/horizontal asymptotes from transformed reciprocal form."
    ],
    "questions": [
      "m34-v6-fn-comp",
      "m34-v6-fn-rational"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m34-v6-quotient-exp",
    "course": "methods-34",
    "topic": "differentiation",
    "title": "Quotients and exponential derivatives",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Choose between simplification, quotient rule and chain rule strategically.",
    "explanation": "Derivatives of exponential functions preserve the exponential factor and multiply by the inner derivative.",
    "formula": "$\\frac d{dx}e^{g(x)}=g'(x)e^{g(x)}$.",
    "worked": [
      "Simplify rational expressions if that makes differentiation easier.",
      "Apply quotient rule only when useful.",
      "Use chain rule for composite exponentials."
    ],
    "questions": [
      "m34-v6-diff-quot",
      "m34-v6-diff-exp"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m34-v6-log-trig-derivatives",
    "course": "methods-34",
    "topic": "differentiation",
    "title": "Logarithmic and trigonometric derivatives",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Differentiate the major transcendental functions efficiently.",
    "explanation": "The same chain-rule structure appears in logarithmic and trigonometric derivatives.",
    "formula": "$\\frac d{dx}\\ln g(x)=\\frac{g'(x)}{g(x)},\\quad (\\sin g(x))'=g'(x)\\cos g(x)$.",
    "worked": [
      "Identify the inner function.",
      "Differentiate the outer function.",
      "Multiply by the inner derivative."
    ],
    "questions": [
      "m34-v6-diff-log",
      "m34-v6-diff-trig"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m34-v6-stationary-optimisation",
    "course": "methods-34",
    "topic": "applications",
    "title": "Stationary points and optimisation",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Use derivatives to turn contextual maxima/minima into equations.",
    "explanation": "Optimisation requires a model, a feasible domain and a stationary-point check.",
    "formula": "$f'(x)=0$ gives candidates; endpoints may also matter.",
    "worked": [
      "Construct a one-variable objective function.",
      "Differentiate and solve for critical points.",
      "Check the critical point lies in the physical domain."
    ],
    "questions": [
      "m34-v6-app-stat",
      "m34-v6-app-opt"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m34-v6-tangents-motion",
    "course": "methods-34",
    "topic": "applications",
    "title": "Tangents and rates of change",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Interpret the derivative in geometric and motion contexts.",
    "explanation": "The derivative can represent slope, velocity, marginal change or instantaneous rate depending on context.",
    "formula": "$v(t)=s'(t)$.",
    "worked": [
      "Differentiate the relevant quantity.",
      "Substitute the requested point/time.",
      "Attach the correct interpretation and units."
    ],
    "questions": [
      "m34-v6-app-tangent",
      "m34-v6-app-rate"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m34-v6-definite-reverse-chain",
    "course": "methods-34",
    "topic": "integration",
    "title": "Definite integrals and reverse chain rule",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Recognise antiderivatives that reverse a chain-rule derivative.",
    "explanation": "When an integrand contains a composite power and its inner derivative, substitution or pattern recognition collapses the integral.",
    "formula": "$\\int f'(x)[f(x)]^n dx=\\frac{[f(x)]^{n+1}}{n+1}+C$.",
    "worked": [
      "Look for an inner expression.",
      "Check whether its derivative is present up to a constant.",
      "Integrate the outer power and substitute back."
    ],
    "questions": [
      "m34-v6-int-def",
      "m34-v6-int-reverse"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m34-v6-area-symmetry",
    "course": "methods-34",
    "topic": "integration",
    "title": "Area and symmetry",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Use geometry and symmetry to simplify definite integrals.",
    "explanation": "Odd functions integrate to zero over symmetric intervals; even functions double the half-interval integral.",
    "formula": "$\\int_{-a}^{a}f(x)dx=0$ for odd $f$.",
    "worked": [
      "Check whether the graph crosses the axis when finding area.",
      "Identify odd/even symmetry before integrating.",
      "Use absolute value of signed pieces for total area."
    ],
    "questions": [
      "m34-v6-int-area",
      "m34-v6-int-sym"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m34-v6-independence-binomial",
    "course": "methods-34",
    "topic": "probability",
    "title": "Independence and binomial models",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Recognise Bernoulli trials and use independence correctly.",
    "explanation": "A binomial model requires a fixed number of independent trials with constant success probability.",
    "formula": "$P(X=k)=\\binom nkp^k(1-p)^{n-k}$.",
    "worked": [
      "Check the binomial conditions.",
      "Identify n, p and the required k.",
      "Use complements when they are shorter."
    ],
    "questions": [
      "m34-v6-prob-ind",
      "m34-v6-prob-binom"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m34-v6-expectation-variance",
    "course": "methods-34",
    "topic": "random-variables",
    "title": "Expectation and variance",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Summarise a random variable with centre and spread.",
    "explanation": "Expectation is a weighted mean. Variance can be computed efficiently from $E(X^2)-[E(X)]^2$.",
    "formula": "$E(X)=\\sum xP(X=x),\\quad Var(X)=E(X^2)-[E(X)]^2$.",
    "worked": [
      "Construct the weighted sum for the mean.",
      "Compute the second moment separately.",
      "Subtract the square of the mean."
    ],
    "questions": [
      "m34-v6-rv-mean",
      "m34-v6-rv-var"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m34-v6-continuous-normal",
    "course": "methods-34",
    "topic": "random-variables",
    "title": "Continuous distributions and normal standardisation",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Move between density functions, probabilities and z-scores.",
    "explanation": "A probability density integrates to 1. Normal values standardise by subtracting the mean and dividing by the standard deviation.",
    "formula": "$z=\\frac{x-\\mu}{\\sigma}$.",
    "worked": [
      "Normalise a density by setting its total integral to 1.",
      "Convert raw values to z-scores.",
      "Interpret probabilities as areas."
    ],
    "questions": [
      "m34-v6-rv-pdf",
      "m34-v6-rv-normal"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m34-v6-mixed-checkpoint",
    "course": "methods-34",
    "topic": "exam-prep",
    "title": "Mixed methods checkpoint",
    "minutes": 20,
    "difficulty": "Separator",
    "xp": 100,
    "summary": "Switch methods without being told which chapter the question belongs to.",
    "explanation": "Exam questions often disguise familiar ideas. The key skill is recognising structure before calculating.",
    "formula": "Identify structure → choose method → execute → check.",
    "worked": [
      "Classify the mathematical structure.",
      "Choose the shortest valid method.",
      "Check reasonableness and exactness requirements."
    ],
    "questions": [
      "m34-v6-exam-mixed1",
      "m34-v6-exam-mixed2"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Checkpoint",
    "masteryTarget": 90
  },
  {
    "id": "s12-v6-proof-language",
    "course": "specialist-12",
    "topic": "number-proof",
    "title": "Logic and proof language",
    "minutes": 12,
    "difficulty": "Core",
    "xp": 60,
    "summary": "Translate mathematical statements into forms that can actually be proved.",
    "explanation": "Proof starts with precise quantifiers and definitions. Negating statements correctly is essential for contradiction and counterexamples.",
    "formula": "$n\\text{ even}\\iff n=2k$ for some integer $k$.",
    "worked": [
      "Identify universal and existential claims.",
      "Rewrite definitions algebraically.",
      "Negate the statement carefully when needed."
    ],
    "questions": [
      "s12-v6-proof-logic",
      "s12-v6-proof-even"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s12-v6-direct-contradiction",
    "course": "specialist-12",
    "topic": "number-proof",
    "title": "Direct proof and contradiction",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Choose a proof structure that matches the claim.",
    "explanation": "Direct proofs build from definitions; contradiction assumes the negation and derives an impossibility.",
    "formula": "Assume hypotheses → derive conclusion; or assume negation → contradiction.",
    "worked": [
      "Identify the claim type.",
      "Choose direct or contradiction deliberately.",
      "Make every algebraic step follow from an integer/property definition."
    ],
    "questions": [
      "s12-v6-proof-direct",
      "s12-v6-proof-contr"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s12-v6-induction",
    "course": "specialist-12",
    "topic": "number-proof",
    "title": "Mathematical induction",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Prove infinitely many integer cases using a base case and inductive step.",
    "explanation": "Induction establishes a starting case, assumes the statement at an arbitrary integer $k$, then proves it for $k+1$.",
    "formula": "Base case + inductive hypothesis + inductive step.",
    "worked": [
      "Verify the base case explicitly.",
      "State the inductive hypothesis.",
      "Transform the $k+1$ case using the hypothesis."
    ],
    "questions": [
      "s12-v6-induction1",
      "s12-v6-induction2"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s12-v6-repeated-pf-modulus",
    "course": "specialist-12",
    "topic": "algebra",
    "title": "Repeated partial fractions and modulus equations",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Handle repeated denominator factors and split modulus equations into cases.",
    "explanation": "Repeated linear factors need one partial fraction term for each power. Modulus equations encode two linear cases.",
    "formula": "$|u|=a\\Rightarrow u=\\pm a$ for $a\\ge0$.",
    "worked": [
      "Write the full partial-fraction template first.",
      "For modulus, form the positive and negative cases.",
      "Reject impossible cases if the right side is negative."
    ],
    "questions": [
      "s12-v6-pf-repeat",
      "s12-v6-modulus"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s12-v6-sequences-series",
    "course": "specialist-12",
    "topic": "algebra",
    "title": "Sequences and series",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Move between term formulas and finite sums for arithmetic and geometric patterns.",
    "explanation": "Arithmetic sequences have constant difference; geometric sequences have constant ratio.",
    "formula": "$a_n=a_1+(n-1)d,\\quad S_n=a_1\\frac{r^n-1}{r-1}$.",
    "worked": [
      "Identify whether the pattern is arithmetic or geometric.",
      "Use the nth-term formula or finite-sum formula.",
      "Check signs and indexing carefully."
    ],
    "questions": [
      "s12-v6-seq-arith",
      "s12-v6-series-geom"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s12-v6-reciprocal-inverse",
    "course": "specialist-12",
    "topic": "functions",
    "title": "Reciprocal and inverse functions",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Analyse reciprocal functions and invert rational functions algebraically.",
    "explanation": "Reciprocals inherit zeros of the denominator as exclusions/asymptotes. Rational inverses require careful rearrangement.",
    "formula": "$f(x)=1/g(x)$ is undefined where $g(x)=0$.",
    "worked": [
      "Factor the denominator first.",
      "Record exclusions before simplifying.",
      "For inverses, swap x and y then isolate y."
    ],
    "questions": [
      "s12-v6-fn-recip",
      "s12-v6-fn-inverse"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s12-v6-nonright-triangles",
    "course": "specialist-12",
    "topic": "trig",
    "title": "Non-right triangle geometry",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Use sine rule, cosine rule and area formulas strategically.",
    "explanation": "The cosine rule generalises Pythagoras; the sine rule links sides to opposite angles.",
    "formula": "$c^2=a^2+b^2-2ab\\cos C,\\quad A=\\frac12ab\\sin C$.",
    "worked": [
      "Mark opposite side-angle pairs.",
      "Choose the formula that matches known data.",
      "Maintain exact values until the final step."
    ],
    "questions": [
      "s12-v6-trig-cosrule",
      "s12-v6-trig-area"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s12-v6-trig-identities-combination",
    "course": "specialist-12",
    "topic": "trig",
    "title": "Identities and linear combinations",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Use identities and amplitude-phase form to simplify trig expressions.",
    "explanation": "Expressions $a\\sin x+b\\cos x$ can be written as one shifted sine or cosine with amplitude $\\sqrt{a^2+b^2}$.",
    "formula": "$R=\\sqrt{a^2+b^2}$.",
    "worked": [
      "Use Pythagorean identities first.",
      "Match coefficients after expanding $R\\sin(x+\\alpha)$.",
      "Determine the correct quadrant for the phase angle."
    ],
    "questions": [
      "s12-v6-trig-id",
      "s12-v6-trig-combine"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s12-v6-vector-algebra",
    "course": "specialist-12",
    "topic": "vectors",
    "title": "Vector algebra and dot product",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Combine vectors component-wise and use the dot product to measure alignment.",
    "explanation": "Vector addition is component-wise. The dot product gives a scalar and detects perpendicularity.",
    "formula": "$\\mathbf a\\cdot\\mathbf b=|a||b|\\cos\\theta$.",
    "worked": [
      "Add/scalar-multiply components directly.",
      "Compute the dot product as a sum of products.",
      "Use zero dot product to test perpendicularity."
    ],
    "questions": [
      "s12-v6-v-comp",
      "s12-v6-v-dot"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s12-v6-vector-geometry",
    "course": "specialist-12",
    "topic": "vectors",
    "title": "Vector geometry",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Use vector operations to solve geometric problems with lengths, angles and points.",
    "explanation": "Coordinate geometry and vector geometry are the same structure written in different notation.",
    "formula": "$\\mathbf{AB}=B-A$.",
    "worked": [
      "Convert points into displacement vectors.",
      "Use magnitude/dot product for length and angle.",
      "Use affine combinations for midpoints and division points."
    ],
    "questions": [
      "s12-v6-v-angle",
      "s12-v6-v-mid"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s12-v6-complex-cartesian",
    "course": "specialist-12",
    "topic": "complex",
    "title": "Cartesian complex arithmetic",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Work fluently with real/imaginary parts, modulus and conjugates.",
    "explanation": "A complex number $z=a+bi$ has modulus $\\sqrt{a^2+b^2}$ and conjugate $a-bi$.",
    "formula": "$z\\bar z=|z|^2$.",
    "worked": [
      "Separate real and imaginary parts.",
      "Use the conjugate to rationalise denominators.",
      "Use Pythagoras for modulus."
    ],
    "questions": [
      "s12-v6-cx-mod",
      "s12-v6-cx-conj"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s12-v6-complex-polar",
    "course": "specialist-12",
    "topic": "complex",
    "title": "Modulus-argument form",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Represent complex numbers geometrically with modulus and argument.",
    "explanation": "Polar form separates size and angle, making multiplication and division particularly simple.",
    "formula": "$z=r(\\cos\\theta+i\\sin\\theta)=re^{i\\theta}$.",
    "worked": [
      "Find modulus from coordinates.",
      "Determine argument from quadrant and reference angle.",
      "Multiply moduli and add arguments."
    ],
    "questions": [
      "s12-v6-cx-arg",
      "s12-v6-cx-polar"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s12-v6-calculus-rules",
    "course": "specialist-12",
    "topic": "calculus",
    "title": "Product and chain differentiation",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Combine derivative rules in unfamiliar forms.",
    "explanation": "The important skill is identifying the outer structure before differentiating.",
    "formula": "$(uv)'=u'v+uv'$.",
    "worked": [
      "Mark the product/composite structure.",
      "Differentiate one layer at a time.",
      "Factor the answer if it exposes structure."
    ],
    "questions": [
      "s12-v6-cal-prod",
      "s12-v6-cal-chain"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s12-v6-calculus-integration",
    "course": "specialist-12",
    "topic": "calculus",
    "title": "Antiderivatives and definite integrals",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Reverse differentiation and interpret definite integrals as accumulation.",
    "explanation": "Integration is an inverse process up to a constant; definite integrals remove the arbitrary constant by subtraction.",
    "formula": "$\\int x^n dx=\\frac{x^{n+1}}{n+1}+C$.",
    "worked": [
      "Integrate term-by-term.",
      "Use exact arithmetic at bounds.",
      "Distinguish signed integral from total area."
    ],
    "questions": [
      "s12-v6-cal-int",
      "s12-v6-cal-def"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s12-v6-displacement-distance",
    "course": "specialist-12",
    "topic": "kinematics",
    "title": "Displacement, distance and turning times",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Separate signed displacement from total distance by tracking velocity sign.",
    "explanation": "Displacement integrates velocity directly. Total distance splits the interval at every velocity zero and adds absolute displacements.",
    "formula": "$\\text{displacement}=\\int v(t)dt$.",
    "worked": [
      "Solve $v(t)=0$ first.",
      "Build a sign chart for velocity.",
      "Integrate each interval and take absolute values for distance."
    ],
    "questions": [
      "s12-v6-kin-disp",
      "s12-v6-kin-turn"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s12-v6-mixed-checkpoint",
    "course": "specialist-12",
    "topic": "number-proof",
    "title": "Specialist 1/2 mixed checkpoint",
    "minutes": 20,
    "difficulty": "Separator",
    "xp": 100,
    "summary": "Mix proof and algebra without chapter labels.",
    "explanation": "Checkpoint questions are designed to test method recognition as well as execution.",
    "formula": "Recognise → choose → justify → check.",
    "worked": [
      "Identify the mathematical structure before calculating.",
      "Use exact reasoning and clear justification.",
      "Do not assume the method from the order of the course."
    ],
    "questions": [
      "s12-v6-check1",
      "s12-v6-check2"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Checkpoint",
    "masteryTarget": 90
  },
  {
    "id": "s34-v6-modulus-rational",
    "course": "specialist-34",
    "topic": "functions",
    "title": "Modulus and rational structure",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Analyse piecewise modulus behaviour and rational asymptotes systematically.",
    "explanation": "Modulus functions become piecewise rules. Rational graphs require factorisation before deciding holes/asymptotes.",
    "formula": "$|g(x)|=\\begin{cases}g(x)&g(x)\\ge0\\\\-g(x)&g(x)<0\\end{cases}$.",
    "worked": [
      "Find sign-change points for modulus expressions.",
      "Factor numerator and denominator completely.",
      "Check cancellations before naming asymptotes."
    ],
    "questions": [
      "s34-v6-fn-mod",
      "s34-v6-fn-rat"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-reciprocal-quadratics",
    "course": "specialist-34",
    "topic": "functions",
    "title": "Reciprocal quadratics",
    "minutes": 12,
    "difficulty": "Separator",
    "xp": 60,
    "summary": "Read asymptotes and stationary behaviour of reciprocals of quadratics.",
    "explanation": "For $f=1/g$, the derivative is $-g'/g^2$, so stationary points occur where $g'=0$ provided $g\\ne0$.",
    "formula": "$\\left(\\frac1g\\right)'=-\\frac{g'}{g^2}$.",
    "worked": [
      "Factor or complete the square in the quadratic denominator.",
      "Locate excluded points/asymptotes.",
      "Differentiate using reciprocal/chain structure."
    ],
    "questions": [
      "s34-v6-fn-recipquad",
      "s34-v6-fn-stat"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-inverse-trig-functions",
    "course": "specialist-34",
    "topic": "functions",
    "title": "Inverse trigonometric functions",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Use principal branches to make inverse trig functions single-valued.",
    "explanation": "Inverse trig functions require restricted domains/ranges. Their graphs reflect the restricted original function in $y=x$.",
    "formula": "$\\sin^{-1}x\\in[-\\pi/2,\\pi/2]$, $\\cos^{-1}x\\in[0,\\pi]$.",
    "worked": [
      "Recall the principal range.",
      "Use exact unit-circle values.",
      "Check that the returned angle lies in the correct branch."
    ],
    "questions": [
      "s34-v6-fn-invtrig",
      "s34-v6-fn-compose"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-polar-arithmetic",
    "course": "specialist-34",
    "topic": "complex",
    "title": "Polar arithmetic",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Use modulus-argument form to turn multiplication and powers into arithmetic on size and angle.",
    "explanation": "Multiplication multiplies moduli and adds arguments; division divides moduli and subtracts arguments.",
    "formula": "$r_1e^{i\\theta_1}r_2e^{i\\theta_2}=r_1r_2e^{i(\\theta_1+\\theta_2)}$.",
    "worked": [
      "Convert to polar form when products/powers appear.",
      "Work with moduli and arguments separately.",
      "Return to Cartesian form only if required."
    ],
    "questions": [
      "s34-v6-cx-polar",
      "s34-v6-cx-arg"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-demoivre-roots",
    "course": "specialist-34",
    "topic": "complex",
    "title": "de Moivre and roots",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Generate powers and all nth roots geometrically.",
    "explanation": "The nth roots of a non-zero complex number have equal modulus and arguments separated by $2\\pi/n$.",
    "formula": "$z_k=r^{1/n}e^{i(\\theta+2k\\pi)/n}$.",
    "worked": [
      "Write the target in polar form.",
      "Take the nth root of the modulus.",
      "Generate all n argument values."
    ],
    "questions": [
      "s34-v6-cx-demoivre",
      "s34-v6-cx-roots"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-complex-loci",
    "course": "specialist-34",
    "topic": "complex",
    "title": "Complex loci",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Translate modulus equations into geometric distance conditions.",
    "explanation": "Expressions $|z-a|$ represent distance from point $a$ in the Argand plane.",
    "formula": "$|z-a|=r$ is a circle centred at $a$ with radius $r$.",
    "worked": [
      "Identify each fixed complex point.",
      "Translate modulus to geometric distance.",
      "Use perpendicular bisectors or circles where appropriate."
    ],
    "questions": [
      "s34-v6-cx-locus1",
      "s34-v6-cx-locus2"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-projections",
    "course": "specialist-34",
    "topic": "vectors",
    "title": "Projections and angles",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Resolve vectors into parallel and perpendicular components.",
    "explanation": "The scalar projection measures signed length along another vector; vector projection multiplies by the unit direction.",
    "formula": "$\\operatorname{proj}_{b}a=\\frac{a\\cdot b}{|b|^2}b$.",
    "worked": [
      "Compute the dot product first.",
      "Divide by the required magnitude factor.",
      "Interpret zero projection as perpendicularity."
    ],
    "questions": [
      "s34-v6-v-proj",
      "s34-v6-v-angle"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-vector-lines",
    "course": "specialist-34",
    "topic": "vectors",
    "title": "Vector equations of lines",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Represent lines parametrically and solve intersections by equating components.",
    "explanation": "A line through point $a$ with direction $d$ has vector equation $r=a+td$.",
    "formula": "$\\mathbf r=\\mathbf a+t\\mathbf d$.",
    "worked": [
      "Identify a point and direction vector.",
      "Write component equations.",
      "Solve a shared parameter or simultaneous parameters at intersections."
    ],
    "questions": [
      "s34-v6-v-line",
      "s34-v6-v-intersect"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-3d-geometry",
    "course": "specialist-34",
    "topic": "vectors",
    "title": "Three-dimensional vector geometry",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Use vector methods for distances, angles and geometric relations in 3D.",
    "explanation": "The same component rules extend to three dimensions; geometry is controlled by magnitude and dot product.",
    "formula": "$|(a,b,c)|=\\sqrt{a^2+b^2+c^2}$.",
    "worked": [
      "Form displacement vectors from points.",
      "Use magnitude for distance.",
      "Use dot products for angle/perpendicularity."
    ],
    "questions": [
      "s34-v6-v-3d",
      "s34-v6-v-geom"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-inverse-trig-derivatives",
    "course": "specialist-34",
    "topic": "calculus",
    "title": "Inverse-trigonometric derivatives",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Differentiate inverse trig functions directly and through compositions.",
    "explanation": "Inverse trig derivatives arise from implicit differentiation of the restricted trig functions.",
    "formula": "$\\frac d{dx}\\arcsin x=\\frac1{\\sqrt{1-x^2}},\\quad \\frac d{dx}\\arctan x=\\frac1{1+x^2}$.",
    "worked": [
      "Identify the inverse trig outer function.",
      "Apply its standard derivative.",
      "Multiply by the inner derivative."
    ],
    "questions": [
      "s34-v6-cal-invtrig",
      "s34-v6-cal-invchain"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-implicit-advanced",
    "course": "specialist-34",
    "topic": "calculus",
    "title": "Advanced implicit differentiation",
    "minutes": 12,
    "difficulty": "Separator",
    "xp": 60,
    "summary": "Differentiate relations containing mixed x-y terms and evaluate gradients at points.",
    "explanation": "Product rule is needed for terms such as $xy$, and every derivative of $y$ carries $dy/dx$.",
    "formula": "$\\frac d{dx}(xy)=y+x\\frac{dy}{dx}$.",
    "worked": [
      "Differentiate every term with respect to x.",
      "Use product rule on mixed terms.",
      "Collect all $dy/dx$ terms before solving."
    ],
    "questions": [
      "s34-v6-cal-implicit2",
      "s34-v6-cal-implicit-point"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-integration-parts",
    "course": "specialist-34",
    "topic": "calculus",
    "title": "Integration by parts",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Reverse the product rule to integrate products strategically.",
    "explanation": "Choose one factor to differentiate and the other to integrate. Polynomial × exponential/trig is the standard pattern.",
    "formula": "$\\int u\\,dv=uv-\\int v\\,du$.",
    "worked": [
      "Choose u to simplify when differentiated.",
      "Integrate dv exactly.",
      "Apply the formula and simplify."
    ],
    "questions": [
      "s34-v6-cal-parts",
      "s34-v6-cal-parts2"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-integration-partial-fractions",
    "course": "specialist-34",
    "topic": "calculus",
    "title": "Integration by partial fractions",
    "minutes": 12,
    "difficulty": "Separator",
    "xp": 60,
    "summary": "Turn rational functions into logarithmic antiderivatives.",
    "explanation": "Proper rational functions with factorisable denominators can be decomposed before integration.",
    "formula": "$\\int\\frac1{x-a}dx=\\ln|x-a|+C$.",
    "worked": [
      "Check the rational function is proper.",
      "Decompose using partial fractions.",
      "Integrate each simple term."
    ],
    "questions": [
      "s34-v6-cal-pfint",
      "s34-v6-cal-pfint2"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-definite-substitution",
    "course": "specialist-34",
    "topic": "calculus",
    "title": "Definite substitution",
    "minutes": 12,
    "difficulty": "Separator",
    "xp": 60,
    "summary": "Transform both the integrand and bounds to evaluate definite integrals efficiently.",
    "explanation": "For definite substitution, convert the bounds into the new variable and do not substitute back.",
    "formula": "$u=g(x): x=a,b\\mapsto u=g(a),g(b)$.",
    "worked": [
      "Choose the inner expression.",
      "Convert both limits immediately.",
      "Integrate fully in the new variable."
    ],
    "questions": [
      "s34-v6-cal-subdef",
      "s34-v6-cal-area"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-separable-de",
    "course": "specialist-34",
    "topic": "differential-equations",
    "title": "Separable differential equations",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Separate x and y before integrating, then apply initial conditions.",
    "explanation": "A first-order equation is separable when it can be rearranged into a function of y times dy equal to a function of x times dx.",
    "formula": "$\\frac{dy}{g(y)}=f(x)dx$.",
    "worked": [
      "Move all y terms beside dy.",
      "Move all x terms beside dx.",
      "Integrate and use the initial condition."
    ],
    "questions": [
      "s34-v6-de-sep",
      "s34-v6-de-sep2"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-growth-decay",
    "course": "specialist-34",
    "topic": "differential-equations",
    "title": "Exponential growth and decay",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Recognise the differential equation $y'=ky$ and connect k to growth/decay rates.",
    "explanation": "When rate is proportional to amount, solutions are exponential.",
    "formula": "$y=y_0e^{kt}$.",
    "worked": [
      "Identify k and the initial amount.",
      "Apply the initial condition.",
      "Use logarithms to solve for time."
    ],
    "questions": [
      "s34-v6-de-exp",
      "s34-v6-de-half"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-direction-equilibria",
    "course": "specialist-34",
    "topic": "differential-equations",
    "title": "Direction fields and equilibria",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Read qualitative behaviour from a differential equation before solving it.",
    "explanation": "Equilibria occur where the derivative is zero. The sign of the derivative determines whether nearby solutions increase or decrease.",
    "formula": "$f(y)=0$ identifies equilibrium solutions for $y'=f(y)$.",
    "worked": [
      "Set the RHS equal to zero.",
      "Test the sign between equilibria.",
      "Use the sign to predict solution direction."
    ],
    "questions": [
      "s34-v6-de-field",
      "s34-v6-de-eq"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-binomial-moments",
    "course": "specialist-34",
    "topic": "statistics",
    "title": "Binomial expectation and variance",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Use distribution parameters to read centre and spread immediately.",
    "explanation": "For binomial random variables, mean and variance follow directly from n and p.",
    "formula": "$E(X)=np,\\quad Var(X)=np(1-p)$.",
    "worked": [
      "Identify n and p.",
      "Use exact formulas before calculator work.",
      "Interpret standard deviation as $\\sqrt{np(1-p)}$."
    ],
    "questions": [
      "s34-v6-stat-bin",
      "s34-v6-stat-var"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-normal-transformations",
    "course": "specialist-34",
    "topic": "statistics",
    "title": "Normal standardisation and transformations",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Standardise normal values and transform random-variable moments correctly.",
    "explanation": "Linear transformations shift and scale means, while variance scales by the square of the multiplier.",
    "formula": "$E(aX+b)=aE(X)+b,\\quad Var(aX+b)=a^2Var(X)$.",
    "worked": [
      "Standardise with z-scores.",
      "Transform means linearly.",
      "Square scale factors for variance."
    ],
    "questions": [
      "s34-v6-stat-normal",
      "s34-v6-stat-transform"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-sampling-confidence",
    "course": "specialist-34",
    "topic": "statistics",
    "title": "Sampling and confidence ideas",
    "minutes": 12,
    "difficulty": "Separator",
    "xp": 60,
    "summary": "Connect sample proportions, standard error and interval width.",
    "explanation": "Larger samples reduce sampling variability because standard error scales like $1/\\sqrt n$.",
    "formula": "$SE(\\hat p)=\\sqrt{p(1-p)/n}$.",
    "worked": [
      "Identify the relevant sampling statistic.",
      "Compute or estimate the standard error.",
      "Interpret interval width in context."
    ],
    "questions": [
      "s34-v6-stat-ci",
      "s34-v6-stat-se"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-newton-forces",
    "course": "specialist-34",
    "topic": "mechanics",
    "title": "Newton’s laws and force models",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Translate force diagrams into vector equations of motion.",
    "explanation": "Newton’s second law relates resultant force to acceleration.",
    "formula": "$\\sum\\mathbf F=m\\mathbf a$.",
    "worked": [
      "Draw or mentally isolate all forces.",
      "Choose a positive direction.",
      "Resolve forces and apply F=ma."
    ],
    "questions": [
      "s34-v6-mech-force",
      "s34-v6-mech-fric"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-projectile-motion",
    "course": "specialist-34",
    "topic": "mechanics",
    "title": "Projectile motion",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Separate horizontal and vertical motion while sharing the same time variable.",
    "explanation": "Ignoring air resistance, horizontal acceleration is zero and vertical acceleration is constant $-g$.",
    "formula": "$x=u_x t,\\quad y=u_y t-\\frac12gt^2$.",
    "worked": [
      "Resolve initial velocity into components.",
      "Treat horizontal and vertical motion separately.",
      "Use the same time in both equations."
    ],
    "questions": [
      "s34-v6-mech-proj",
      "s34-v6-mech-vy"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-variable-acceleration",
    "course": "specialist-34",
    "topic": "mechanics",
    "title": "Variable acceleration and motion",
    "minutes": 12,
    "difficulty": "Separator",
    "xp": 60,
    "summary": "Integrate acceleration and velocity while respecting direction changes.",
    "explanation": "When acceleration varies, use calculus: integrate a to v and v to displacement, applying initial conditions each time.",
    "formula": "$a=v',\\quad v=x'$.",
    "worked": [
      "Integrate acceleration and use initial velocity.",
      "Solve v=0 for direction changes.",
      "Split intervals for total distance."
    ],
    "questions": [
      "s34-v6-mech-motion",
      "s34-v6-mech-distance"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s34-v6-check-functions",
    "course": "specialist-34",
    "topic": "functions",
    "title": "Functions & Graphs checkpoint",
    "minutes": 18,
    "difficulty": "Separator",
    "xp": 90,
    "summary": "A short mastery gate using harder questions from the topic.",
    "explanation": "Checkpoint mode removes the training wheels: identify the method yourself and justify each step.",
    "formula": "Target: at least 90% mastery before treating the topic as secure.",
    "worked": [
      "Attempt without notes.",
      "If you miss a question, return to the relevant lesson before reattempting.",
      "Record exact working, not just final answers."
    ],
    "questions": [
      "s34-v6-fn-rat",
      "s34-v6-fn-stat"
    ],
    "objectives": [
      "Demonstrate independent method selection",
      "Identify any remaining weak subskills"
    ],
    "prerequisites": [],
    "notes": [],
    "kind": "Checkpoint",
    "masteryTarget": 90
  },
  {
    "id": "s34-v6-check-complex",
    "course": "specialist-34",
    "topic": "complex",
    "title": "Complex Numbers checkpoint",
    "minutes": 18,
    "difficulty": "Separator",
    "xp": 90,
    "summary": "A short mastery gate using harder questions from the topic.",
    "explanation": "Checkpoint mode removes the training wheels: identify the method yourself and justify each step.",
    "formula": "Target: at least 90% mastery before treating the topic as secure.",
    "worked": [
      "Attempt without notes.",
      "If you miss a question, return to the relevant lesson before reattempting.",
      "Record exact working, not just final answers."
    ],
    "questions": [
      "s34-v6-cx-roots",
      "s34-v6-cx-locus2"
    ],
    "objectives": [
      "Demonstrate independent method selection",
      "Identify any remaining weak subskills"
    ],
    "prerequisites": [],
    "notes": [],
    "kind": "Checkpoint",
    "masteryTarget": 90
  },
  {
    "id": "s34-v6-check-vectors",
    "course": "specialist-34",
    "topic": "vectors",
    "title": "Vectors checkpoint",
    "minutes": 18,
    "difficulty": "Separator",
    "xp": 90,
    "summary": "A short mastery gate using harder questions from the topic.",
    "explanation": "Checkpoint mode removes the training wheels: identify the method yourself and justify each step.",
    "formula": "Target: at least 90% mastery before treating the topic as secure.",
    "worked": [
      "Attempt without notes.",
      "If you miss a question, return to the relevant lesson before reattempting.",
      "Record exact working, not just final answers."
    ],
    "questions": [
      "s34-v6-v-proj",
      "s34-v6-v-geom"
    ],
    "objectives": [
      "Demonstrate independent method selection",
      "Identify any remaining weak subskills"
    ],
    "prerequisites": [],
    "notes": [],
    "kind": "Checkpoint",
    "masteryTarget": 90
  },
  {
    "id": "s34-v6-check-calculus",
    "course": "specialist-34",
    "topic": "calculus",
    "title": "Calculus checkpoint",
    "minutes": 18,
    "difficulty": "Separator",
    "xp": 90,
    "summary": "A short mastery gate using harder questions from the topic.",
    "explanation": "Checkpoint mode removes the training wheels: identify the method yourself and justify each step.",
    "formula": "Target: at least 90% mastery before treating the topic as secure.",
    "worked": [
      "Attempt without notes.",
      "If you miss a question, return to the relevant lesson before reattempting.",
      "Record exact working, not just final answers."
    ],
    "questions": [
      "s34-v6-cal-implicit-point",
      "s34-v6-cal-pfint2"
    ],
    "objectives": [
      "Demonstrate independent method selection",
      "Identify any remaining weak subskills"
    ],
    "prerequisites": [],
    "notes": [],
    "kind": "Checkpoint",
    "masteryTarget": 90
  },
  {
    "id": "s34-v6-check-differential-equations",
    "course": "specialist-34",
    "topic": "differential-equations",
    "title": "Differential Equations checkpoint",
    "minutes": 18,
    "difficulty": "Separator",
    "xp": 90,
    "summary": "A short mastery gate using harder questions from the topic.",
    "explanation": "Checkpoint mode removes the training wheels: identify the method yourself and justify each step.",
    "formula": "Target: at least 90% mastery before treating the topic as secure.",
    "worked": [
      "Attempt without notes.",
      "If you miss a question, return to the relevant lesson before reattempting.",
      "Record exact working, not just final answers."
    ],
    "questions": [
      "s34-v6-de-sep2",
      "s34-v6-de-eq"
    ],
    "objectives": [
      "Demonstrate independent method selection",
      "Identify any remaining weak subskills"
    ],
    "prerequisites": [],
    "notes": [],
    "kind": "Checkpoint",
    "masteryTarget": 90
  },
  {
    "id": "s34-v6-check-statistics",
    "course": "specialist-34",
    "topic": "statistics",
    "title": "Probability & Statistics checkpoint",
    "minutes": 18,
    "difficulty": "Separator",
    "xp": 90,
    "summary": "A short mastery gate using harder questions from the topic.",
    "explanation": "Checkpoint mode removes the training wheels: identify the method yourself and justify each step.",
    "formula": "Target: at least 90% mastery before treating the topic as secure.",
    "worked": [
      "Attempt without notes.",
      "If you miss a question, return to the relevant lesson before reattempting.",
      "Record exact working, not just final answers."
    ],
    "questions": [
      "s34-v6-stat-transform",
      "s34-v6-stat-se"
    ],
    "objectives": [
      "Demonstrate independent method selection",
      "Identify any remaining weak subskills"
    ],
    "prerequisites": [],
    "notes": [],
    "kind": "Checkpoint",
    "masteryTarget": 90
  },
  {
    "id": "s34-v6-check-mechanics",
    "course": "specialist-34",
    "topic": "mechanics",
    "title": "Mechanics checkpoint",
    "minutes": 18,
    "difficulty": "Separator",
    "xp": 90,
    "summary": "A short mastery gate using harder questions from the topic.",
    "explanation": "Checkpoint mode removes the training wheels: identify the method yourself and justify each step.",
    "formula": "Target: at least 90% mastery before treating the topic as secure.",
    "worked": [
      "Attempt without notes.",
      "If you miss a question, return to the relevant lesson before reattempting.",
      "Record exact working, not just final answers."
    ],
    "questions": [
      "s34-v6-mech-vy",
      "s34-v6-mech-distance"
    ],
    "objectives": [
      "Demonstrate independent method selection",
      "Identify any remaining weak subskills"
    ],
    "prerequisites": [],
    "notes": [],
    "kind": "Checkpoint",
    "masteryTarget": 90
  },
  {
    "id": "m12-v6-growth-models",
    "course": "methods-12",
    "topic": "exp-log",
    "title": "Exponential growth and decay models",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Translate exponential rules into growth, decay and half-life contexts.",
    "explanation": "A constant multiplicative change per equal time interval creates an exponential model.",
    "formula": "$A=A_0b^t$ or $A=A_0e^{kt}$.",
    "worked": [
      "Identify the initial value.",
      "Convert the percentage change into a multiplier.",
      "Solve for time using powers or logarithms."
    ],
    "questions": [
      "m12-v6b-exp-growth",
      "m12-v6b-exp-half"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m12-v6-trig-identities",
    "course": "methods-12",
    "topic": "trig",
    "title": "Core trigonometric identities",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Use identities to simplify expressions and connect angles.",
    "explanation": "Identities hold for every value in their domain and can transform a difficult expression into a familiar one.",
    "formula": "$\\sin^2x+\\cos^2x=1,\\quad \\sin2x=2\\sin x\\cos x$.",
    "worked": [
      "Look for a standard identity.",
      "Substitute exact known values.",
      "Keep exact fractions unless a decimal is requested."
    ],
    "questions": [
      "m12-v6b-trig-id",
      "m12-v6b-trig-double"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m12-v6-antiderivatives-constants",
    "course": "methods-12",
    "topic": "integration",
    "title": "Antiderivatives and initial conditions",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Recover functions from derivatives and determine constants using a known value.",
    "explanation": "Indefinite integration produces a family of functions differing by a constant.",
    "formula": "$F'(x)=f(x)\\Rightarrow F(x)=\\int f(x)dx+C$.",
    "worked": [
      "Integrate first.",
      "Use the supplied point to solve for C.",
      "Substitute back only after C is known."
    ],
    "questions": [
      "m12-v6b-int-indef",
      "m12-v6b-int-c"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m12-v6-probability-structures",
    "course": "methods-12",
    "topic": "probability",
    "title": "Tree diagrams and complements",
    "minutes": 12,
    "difficulty": "VCAA",
    "xp": 60,
    "summary": "Organise multi-stage events and use complements when they simplify the calculation.",
    "explanation": "Tree diagrams multiply along branches and add across mutually exclusive paths.",
    "formula": "$P(A^c)=1-P(A)$.",
    "worked": [
      "Draw or imagine the stages.",
      "Multiply along each complete path.",
      "Add favourable paths or use a complement."
    ],
    "questions": [
      "m12-v6b-prob-tree",
      "m12-v6b-prob-comp"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m12-v6-mixed-checkpoint",
    "course": "methods-12",
    "topic": "probability",
    "title": "Methods 1/2 mixed checkpoint",
    "minutes": 18,
    "difficulty": "Separator",
    "xp": 90,
    "summary": "A compact mastery gate across functions, algebra, calculus and probability.",
    "explanation": "The checkpoint deliberately mixes topics so you must recognise the method rather than follow chapter cues.",
    "formula": "Recognise → solve → check.",
    "worked": [
      "Work without notes.",
      "Show enough working to diagnose errors.",
      "Return to any weak topic before continuing."
    ],
    "questions": [
      "m12-v6b-check1",
      "m12-v6b-check2"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Checkpoint",
    "masteryTarget": 90
  },
  {
    "id": "m34-v6-linear-transformations-rv",
    "course": "methods-34",
    "topic": "random-variables",
    "title": "Linear transformations of random variables",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Transform means and variances without reconstructing the distribution.",
    "explanation": "Adding a constant shifts the mean but does not change variance; scaling multiplies variance by the square of the scale factor.",
    "formula": "$E(aX+b)=aE(X)+b,\\quad Var(aX+b)=a^2Var(X)$.",
    "worked": [
      "Transform the mean linearly.",
      "Ignore additive constants when transforming variance.",
      "Square multiplicative scale factors for variance."
    ],
    "questions": [
      "m34-v6b-rv-trans",
      "m34-v6b-rv-vartrans"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m34-v6-parameter-exam-skills",
    "course": "methods-34",
    "topic": "exam-prep",
    "title": "Parameter and exact-value exam skills",
    "minutes": 16,
    "difficulty": "Separator",
    "xp": 85,
    "summary": "Handle parameter conditions and exact calculus under tech-free pressure.",
    "explanation": "Hard exam questions often convert a geometric condition into an algebraic one, or hide a standard calculus pattern inside unfamiliar notation.",
    "formula": "Translate condition → equation → exact solution.",
    "worked": [
      "Identify what the condition means mathematically.",
      "Keep exact values throughout.",
      "Use structure before expanding blindly."
    ],
    "questions": [
      "m34-v6b-exam-param",
      "m34-v6b-exam-exact"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "m34-v6-final-checkpoint",
    "course": "methods-34",
    "topic": "exam-prep",
    "title": "Methods 3/4 final checkpoint",
    "minutes": 20,
    "difficulty": "Separator",
    "xp": 100,
    "summary": "A second mixed gate focused on method selection and exact execution.",
    "explanation": "Treat this as a mini Examination 1 set: no chapter labels and no hints.",
    "formula": "Target: 90%+ before treating the mixed course as secure.",
    "worked": [
      "Attempt tech-free.",
      "Show exact working.",
      "Review any missed skill immediately."
    ],
    "questions": [
      "m34-v6b-check1",
      "m34-v6b-check2"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Checkpoint",
    "masteryTarget": 90
  },
  {
    "id": "s12-v6-function-composition-modulus",
    "course": "specialist-12",
    "topic": "functions",
    "title": "Composition and modulus graphs",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Combine function composition with piecewise/modulus structure.",
    "explanation": "Composition changes inputs in stages; modulus folds negative outputs above the axis or creates distance-from-point graphs.",
    "formula": "$|x-a|$ has minimum 0 at $x=a$.",
    "worked": [
      "Evaluate the inner function first.",
      "Track domain exclusions through composition.",
      "Use geometric meaning of modulus for extrema."
    ],
    "questions": [
      "s12-v6b-fn-comp",
      "s12-v6b-fn-mod"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  },
  {
    "id": "s12-v6-acceleration-initial-conditions",
    "course": "specialist-12",
    "topic": "kinematics",
    "title": "Acceleration and initial conditions",
    "minutes": 12,
    "difficulty": "Advanced",
    "xp": 60,
    "summary": "Integrate motion data and recover constants from initial values.",
    "explanation": "Each integration introduces a constant that must be fixed from a velocity or position condition.",
    "formula": "$a=v',\\quad v=x'$.",
    "worked": [
      "Integrate acceleration to get velocity.",
      "Use initial velocity to find the first constant.",
      "Integrate again and use initial position if required."
    ],
    "questions": [
      "s12-v6b-kin-acc",
      "s12-v6b-kin-pos"
    ],
    "objectives": [],
    "prerequisites": [],
    "notes": [],
    "kind": "Lesson",
    "masteryTarget": 100
  }
];
