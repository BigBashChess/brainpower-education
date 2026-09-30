// Brainpower Education V7 — deep lesson content layer.
// This file deliberately keeps depth content separate from lesson sequencing so
// future course expansion can add or revise teaching without rebuilding the UI.

export const topicDepth = {
  'methods-12:functions': {
    bigPicture: 'Functions are not just formulas: they are input-output rules with a domain, a range and a graph. Most difficult function questions become easier once you separate those three ideas.',
    why: 'A graph, a table and an algebraic rule are three representations of the same object. Restrictions such as a denominator being non-zero or a square-root radicand being non-negative are algebraic statements about which inputs are permitted.',
    keyIdeas: ['Always state the domain before discussing an inverse.', 'Transformations inside the function act horizontally; transformations outside act vertically.', 'A one-to-one restriction is about outputs being produced only once.', 'Composition means the output of one function becomes the input of another.'],
    mistakes: ['Treating $f(x)$ as $f\times x$.', 'Forgetting that inverse notation $f^{-1}$ does not mean reciprocal.', 'Applying horizontal translations with the wrong sign.'],
    examTips: ['Sketch a tiny reference graph when a transformation feels ambiguous.', 'For inverse functions, check the restricted domain and resulting range.', 'When asked for domain/range, use the exact variable and notation requested.'],
    connections: 'This topic feeds directly into inverse functions, calculus domain restrictions, probability density functions and rational-function analysis.'
  },
  'methods-12:algebra': {
    bigPicture: 'Algebra is the language that makes later calculus efficient. The goal is not merely to expand expressions, but to recognise structure: factors, roots, multiplicity and parameter constraints.',
    why: 'The factor and remainder theorems connect algebraic substitution with geometric information about x-intercepts. Multiplicity then explains whether a graph crosses or only touches an axis.',
    keyIdeas: ['$P(a)$ is the remainder on division by $x-a$.', 'A zero of $P$ corresponds to a linear factor.', 'Multiplicity changes local graph behaviour.', 'Degree and leading coefficient control end behaviour.'],
    mistakes: ['Confusing the factor $x-a$ with $x+a$.', 'Assuming every visible root is simple.', 'Expanding too early instead of exploiting factors.'],
    examTips: ['Substitute convenient values before coefficient comparison.', 'Keep exact factorised form if it exposes roots or multiplicity.', 'Use graph behaviour as a consistency check after algebra.'],
    connections: 'Polynomial structure reappears in rational functions, complex roots, calculus sign analysis and exact factorisation.'
  },
  'methods-12:exp-log': {
    bigPicture: 'Exponentials model multiplicative change; logarithms answer the inverse question: what exponent produced this value?',
    why: 'Logarithm laws are simply exponent laws read backwards. This is why products become sums, quotients become differences and powers become coefficients.',
    keyIdeas: ['Match bases before equating exponents when possible.', 'Logarithm arguments must be positive.', '$\log_a(a^x)=x$ and $a^{\log_a x}=x$.', 'Growth and decay are best interpreted using a multiplicative factor.'],
    mistakes: ['$\log(x+y)\neq\log x+\log y$.', 'Ignoring domain restrictions on logarithms.', 'Mixing percentage change with the growth multiplier.'],
    examTips: ['Write the domain condition before solving a logarithmic equation.', 'Use exact logarithmic forms unless a decimal is explicitly requested.', 'Interpret constants in context in growth/decay models.'],
    connections: 'Exponential and logarithmic functions later appear in differentiation, integration, differential equations and probability models.'
  },
  'methods-12:trig': {
    bigPicture: 'Trigonometry is easiest when you treat the unit circle as the source and identities/graphs as consequences rather than disconnected facts.',
    why: 'On the unit circle, cosine and sine are coordinates. Periodicity follows because rotating by a full revolution returns to the same point.',
    keyIdeas: ['Reference angles give magnitudes; quadrants give signs.', 'Amplitude is a vertical scale; period is controlled by the input coefficient.', 'Identities let you rewrite expressions without changing their value.', 'Always respect the stated solution interval.'],
    mistakes: ['Giving one angle when several lie in the interval.', 'Confusing degrees and radians.', 'Changing a trig expression using an invalid “cancellation”.'],
    examTips: ['Write the reference angle before listing solutions.', 'Use exact values for special angles.', 'For graph questions, mark midline, amplitude and period before sketching.'],
    connections: 'Trig becomes central in Specialist vectors, complex numbers, oscillation, calculus and mechanics.'
  },
  'methods-12:differentiation': {
    bigPicture: 'A derivative measures instantaneous rate of change. Rules such as product and chain rule are bookkeeping devices for how changes combine.',
    why: 'The chain rule appears whenever one varying quantity sits inside another. The product rule appears because both factors can change at once.',
    keyIdeas: ['Differentiate structure, not appearance.', 'Stationary points satisfy $f\'(x)=0$.', 'A derivative value is a gradient/rate, so units matter.', 'Sign of the derivative describes increasing/decreasing behaviour.'],
    mistakes: ['Forgetting the inner derivative in the chain rule.', 'Calling every stationary point a maximum/minimum.', 'Substituting into $f$ when the question asks for $f\'$.'],
    examTips: ['Name the rule you are using in multi-step working.', 'Keep an unsimplified derivative if it is easier to analyse.', 'Use a sign test or second derivative when classification is required.'],
    connections: 'Differentiation drives optimisation, kinematics, implicit relations and differential equations.'
  },
  'methods-12:integration': {
    bigPicture: 'Integration reverses differentiation and accumulates continuously changing quantities. Indefinite and definite integrals answer different questions.',
    why: 'An antiderivative is a family because differentiation loses constants. A definite integral subtracts endpoint values, so that constant cancels.',
    keyIdeas: ['Include $+C$ for indefinite integrals.', 'A definite integral is signed accumulation, not automatically geometric area.', 'Initial conditions determine the arbitrary constant.', 'Area below the axis contributes negatively to a signed integral.'],
    mistakes: ['Forgetting $+C$.', 'Calling a negative definite integral a negative “area”.', 'Using endpoint values in the wrong order.'],
    examTips: ['Decide whether the question wants signed integral, area or displacement.', 'Use exact endpoint values before decimal approximation.', 'Check by differentiating your antiderivative mentally.'],
    connections: 'Integration later develops into substitution, integration by parts, partial fractions and applications to motion.'
  },
  'methods-12:probability': {
    bigPicture: 'Probability is controlled counting. The main skill is identifying which outcomes are mutually exclusive, independent or conditional before applying formulas.',
    why: 'Addition corresponds to “or” when outcomes are disjoint; multiplication corresponds to sequential “and” probabilities. Conditional probability changes the sample space.',
    keyIdeas: ['Use complements when “at least one” is easier to count indirectly.', 'Tree diagrams encode multiplication along branches and addition across outcomes.', 'Independence means one event does not change the probability of the other.', 'Conditional probability restricts attention to a smaller sample space.'],
    mistakes: ['Adding probabilities for events that overlap without correction.', 'Assuming independence because events look unrelated.', 'Forgetting to normalise when conditioning.'],
    examTips: ['Write the event structure in words before calculating.', 'Use exact fractions whenever feasible.', 'Check your answer lies in $[0,1]$.'],
    connections: 'These foundations lead to binomial models, random variables, sampling distributions and inference.'
  },

  'methods-34:functions': {
    bigPicture: 'Methods 3/4 function questions are often really domain-and-structure questions disguised as algebra. You should be able to predict graph behaviour before using technology.',
    why: 'Inverse, composite and rational functions inherit restrictions from each component. Understanding those restrictions prevents invalid algebra later in calculus.',
    keyIdeas: ['Track domain through every composition.', 'Inverse functions swap domain and range.', 'Rational behaviour is controlled by denominator zeros and end behaviour.', 'A cancellation can produce a hole rather than an asymptote.'],
    mistakes: ['Cancelling a factor and then forgetting the excluded value.', 'Finding an algebraic inverse without checking one-to-one behaviour.', 'Ignoring the domain of the inner function in a composition.'],
    examTips: ['State excluded values explicitly.', 'Use asymptotes/intercepts before fine graph detail.', 'When a parameter appears, solve restrictions symbolically before substituting numbers.'],
    connections: 'This supports derivative-domain questions, transformations, optimisation and exact exam analysis.'
  },
  'methods-34:differentiation': {
    bigPicture: 'At 3/4 level, differentiation is less about remembering rules and more about selecting the correct structure quickly and accurately.',
    why: 'Every differentiation rule reflects how local change propagates through a product, quotient or composition. Recognising the outermost operation determines the first rule.',
    keyIdeas: ['Identify the outermost operation first.', 'For logarithms and exponentials, preserve exact forms.', 'Use quotient rule only when rewriting is not cleaner.', 'Simplify strategically after differentiating.'],
    mistakes: ['Dropping a chain-rule factor.', 'Differentiating numerator and denominator separately.', 'Replacing exact constants with decimals too early.'],
    examTips: ['Box the derivative before lengthy simplification.', 'Use factorised derivatives for sign analysis.', 'Check dimensions/signs against the original function.'],
    connections: 'These derivatives are tools for optimisation, rates, graph analysis and probability density questions.'
  },
  'methods-34:applications': {
    bigPicture: 'Applications of calculus translate a real or geometric condition into a function, then use derivatives to answer a contextual question.',
    why: 'Optimisation works because local extrema occur where the derivative is zero or at boundaries. Related rates work because quantities are linked by an equation and all vary with time.',
    keyIdeas: ['Define the quantity to optimise before differentiating.', 'Reduce to one variable whenever possible.', 'Check endpoints as well as stationary points.', 'State conclusions in the context and with units.'],
    mistakes: ['Finding a stationary point but never proving it is the required extremum.', 'Ignoring feasible-domain restrictions.', 'Giving a derivative value when the question asks for the original quantity.'],
    examTips: ['Write a one-line model before calculus.', 'Use exact values through the derivative stage.', 'Finish with a sentence interpreting the answer.'],
    connections: 'The same modelling habits are used in Specialist mechanics, differential equations and kinematics.'
  },
  'methods-34:integration': {
    bigPicture: 'Methods 3/4 integration is pattern recognition: reverse differentiation, exploit symmetry and distinguish signed accumulation from total geometric area.',
    why: 'The reverse-chain-rule pattern works because the derivative of an inner function is already present. Symmetry works because even/odd structure causes predictable cancellation or doubling.',
    keyIdeas: ['Look for an inner function and its derivative.', 'Use symmetry before expanding or integrating.', 'Split intervals when the integrand changes sign if area is required.', 'Keep exact values as long as possible.'],
    mistakes: ['Forgetting to change sign handling for area.', 'Applying a reverse-chain pattern when the derivative factor is missing.', 'Using odd-function cancellation on a non-symmetric interval.'],
    examTips: ['Annotate where the graph crosses the axis.', 'Check an antiderivative by differentiating.', 'Exploit even/odd symmetry before doing algebra.'],
    connections: 'Specialist extends these ideas to substitution, partial fractions and integration by parts.'
  },
  'methods-34:probability': {
    bigPicture: 'Methods 3/4 probability asks you to recognise the stochastic model before calculating. Binomial questions are about repeated identical Bernoulli trials.',
    why: 'The binomial coefficient counts arrangements; the powers of $p$ and $1-p$ give the probability of each arrangement.',
    keyIdeas: ['Check fixed $n$, two outcomes, constant $p$ and independence.', 'Use complements for “at least” events when shorter.', 'Separate model assumptions from arithmetic.', 'Interpret probabilities in context.'],
    mistakes: ['Using binomial when $p$ changes between trials.', 'Confusing $P(X=x)$ with $P(X\le x)$.', 'Rounding intermediate probabilities aggressively.'],
    examTips: ['Write the distribution notation first.', 'State the event symbolically before calculator work.', 'Retain sufficient precision until the final line.'],
    connections: 'Random variables generalise these ideas to expectation, variance and continuous distributions.'
  },
  'methods-34:random-variables': {
    bigPicture: 'A random variable converts uncertain outcomes into numbers so that a whole distribution can be described with expectation, variance and probability functions.',
    why: 'Expectation is a weighted mean; variance measures average squared spread around the mean. Linear transformations change centre and spread in predictable ways.',
    keyIdeas: ['$E(aX+b)=aE(X)+b$.', '$Var(aX+b)=a^2Var(X)$.', 'A density has total area 1.', 'Normal standardisation measures distance from the mean in standard deviations.'],
    mistakes: ['Adding $b$ to variance.', 'Using density height as probability at a single point.', 'Using the wrong sign in a z-score.'],
    examTips: ['Write distribution parameters before standardising.', 'Distinguish mean from variance/standard deviation.', 'Shade the probability region before calculator work.'],
    connections: 'Specialist statistics builds on this with sampling, confidence intervals and linear combinations.'
  },
  'methods-34:exam-prep': {
    bigPicture: 'Exam preparation is about method selection under pressure: recognise the structure, preserve exactness, and communicate just enough working to secure marks.',
    why: 'Most lost marks come from choosing an inefficient method, missing a restriction or failing to communicate an exact conclusion rather than from the core algebra itself.',
    keyIdeas: ['Scan for domain/parameter restrictions before calculation.', 'Preserve exact values until the final requested form.', 'Use technology to confirm, not replace, mathematical reasoning.', 'Allocate time in proportion to marks.'],
    mistakes: ['Starting a long calculation without identifying the target.', 'Giving calculator output with no reasoning where working is required.', 'Ignoring endpoints or special cases.'],
    examTips: ['Write a one-line plan for multi-part questions.', 'If stuck, state a useful equation and move on.', 'Return to parameter questions after easier marks are secured.'],
    connections: 'These habits apply across all Methods topics and formal Brainpower tests.'
  },

  'specialist-12:number-proof': {
    bigPicture: 'Proof is about making a conclusion unavoidable from stated assumptions. The skill is choosing a proof structure that matches the logical form of the claim.',
    why: 'Direct proof follows implications forward; contrapositive proves an equivalent reversed statement; contradiction assumes the negation and produces impossibility; induction chains truth from one integer to the next.',
    keyIdeas: ['State what is assumed and what must be shown.', 'A single counterexample destroys a universal claim.', 'The contrapositive of $P\Rightarrow Q$ is $\neg Q\Rightarrow\neg P$.', 'Induction requires base case, hypothesis and inductive step.'],
    mistakes: ['Using examples as if they prove a universal statement.', 'Assuming the result inside the proof.', 'Skipping the induction hypothesis.'],
    examTips: ['Name the proof method.', 'Use complete logical sentences around algebra.', 'For induction, clearly isolate the point where the hypothesis is used.'],
    connections: 'Proof habits sharpen reasoning throughout Specialist, especially complex numbers, vectors and calculus arguments.'
  },
  'specialist-12:algebra': {
    bigPicture: 'Specialist algebra emphasises decomposition and structure rather than brute-force manipulation.',
    why: 'Partial fractions reverses the process of combining rational expressions. Sequences and series encode repeated additive or multiplicative structure.',
    keyIdeas: ['Match decomposition form to denominator multiplicity.', 'Multiply through before solving coefficients.', 'Recognise arithmetic versus geometric structure.', 'Use sigma notation carefully with index bounds.'],
    mistakes: ['Missing repeated-factor terms in partial fractions.', 'Solving coefficients from too little information.', 'Confusing term formulas with sum formulas.'],
    examTips: ['Factor denominators completely before decomposition.', 'Use convenient substitutions first, then coefficient comparison.', 'Check decomposition by recombining if time permits.'],
    connections: 'Partial fractions returns in Specialist 3/4 integration.'
  },
  'specialist-12:functions': {
    bigPicture: 'Specialist function work focuses on how operations such as reciprocal, inverse, modulus and composition reshape graphs and domains.',
    why: 'Each operation has a geometric meaning: reciprocal sends large magnitudes toward zero, modulus reflects negative outputs, and inversion reflects a one-to-one graph in $y=x$.',
    keyIdeas: ['Zeros of $f$ become vertical asymptotes of $1/f$ unless cancelled structurally.', 'Modulus $|f(x)|$ reflects negative portions above the axis.', 'Inverse functions require one-to-one domains.', 'Composition inherits both inner and outer restrictions.'],
    mistakes: ['Reflecting horizontally when applying output modulus.', 'Forgetting points where reciprocal is undefined.', 'Assuming inverse and reciprocal are interchangeable.'],
    examTips: ['Start from intercepts, asymptotes and sign intervals.', 'Sketch transformations in stages.', 'Annotate excluded points clearly.'],
    connections: 'This is direct preparation for Specialist 3/4 rational, reciprocal and modulus graphs.'
  },
  'specialist-12:trig': {
    bigPicture: 'Specialist trigonometry combines geometry, identities and algebraic transformation. The goal is to move flexibly between forms.',
    why: 'Sine/cosine rules generalise right-triangle trigonometry; identities come from unit-circle geometry and algebraic relationships between sine and cosine.',
    keyIdeas: ['Use cosine rule when an included angle or three sides are known.', 'Use sine rule when opposite side-angle pairs are available.', 'Treat identities as algebra with domain awareness.', 'Linear combinations can be rewritten as a single sinusoid.'],
    mistakes: ['Applying sine rule to non-opposite pairs.', 'Forgetting ambiguous cases.', 'Squaring identities and introducing extraneous solutions.'],
    examTips: ['Sketch the triangle and label known values.', 'Keep exact trig values when possible.', 'Check angle solutions against geometry.'],
    connections: 'These techniques feed into vector angles, polar complex form and oscillatory models.'
  },
  'specialist-12:vectors': {
    bigPicture: 'Vectors encode magnitude and direction simultaneously. Component algebra lets geometry become calculation.',
    why: 'The dot product measures directional alignment; vector equations describe geometric displacement independent of coordinate axes.',
    keyIdeas: ['Magnitude comes from Pythagoras in components.', 'Dot product zero means perpendicular for non-zero vectors.', 'Unit vectors isolate direction.', 'Vector geometry often reduces to comparing components.'],
    mistakes: ['Confusing vector magnitude with the vector itself.', 'Dropping direction when giving a vector answer.', 'Using dot-product formulas with degrees/radians inconsistently.'],
    examTips: ['Draw a quick diagram before component work.', 'Keep exact radicals for magnitudes.', 'State whether the answer is a scalar or vector.'],
    connections: 'Specialist 3/4 extends this to projections, lines, planes and 3D geometry.'
  },
  'specialist-12:complex': {
    bigPicture: 'Complex numbers extend the real number line into a plane. Algebraic form is efficient for addition; polar form is efficient for multiplication, powers and roots.',
    why: 'The relation $i^2=-1$ makes previously impossible quadratic roots accessible. Modulus and argument turn a complex number into length and angle.',
    keyIdeas: ['Separate real and imaginary parts.', 'Conjugates eliminate imaginary denominators.', 'Modulus is distance from the origin.', 'Arguments are angles and need quadrant care.'],
    mistakes: ['Using $i^2=1$.', 'Choosing the wrong argument quadrant.', 'Forgetting all roots of a polynomial equation.'],
    examTips: ['Sketch the point in the Argand plane.', 'Use conjugates for exact division.', 'State arguments in the requested interval.'],
    connections: 'Polar form leads directly to de Moivre, roots of unity and complex loci in Specialist 3/4.'
  },
  'specialist-12:calculus': {
    bigPicture: 'Specialist 1/2 calculus builds fluency with differentiation and integration so that 3/4 can focus on deeper techniques and applications.',
    why: 'Product/chain rules describe how composite structures change; integration reverses those derivative patterns.',
    keyIdeas: ['Identify structure before selecting a derivative rule.', 'Check antiderivatives by differentiating.', 'Definite integrals represent signed accumulation.', 'Initial conditions determine constants.'],
    mistakes: ['Missing chain factors.', 'Forgetting $+C$.', 'Confusing area and signed integral.'],
    examTips: ['Keep intermediate expressions factorised.', 'Annotate turning points/sign changes.', 'Use exact endpoint values.'],
    connections: 'These skills are prerequisites for inverse trig derivatives, implicit differentiation and advanced integration.'
  },
  'specialist-12:kinematics': {
    bigPicture: 'Kinematics is calculus with physical meaning: position differentiates to velocity, velocity to acceleration, while integration reverses the chain.',
    why: 'Distance and displacement differ because direction matters. A turning time occurs when velocity changes sign, not merely when it equals zero.',
    keyIdeas: ['$v=x\'$, $a=v\'$.', 'Displacement is signed change in position.', 'Distance adds absolute displacements across turning intervals.', 'Initial conditions fix integration constants.'],
    mistakes: ['Equating distance with displacement.', 'Splitting at every zero of acceleration instead of velocity.', 'Ignoring the physical time domain.'],
    examTips: ['Create a sign chart for velocity before total-distance questions.', 'Carry units through every derivative/integral.', 'Check whether a zero velocity actually changes sign.'],
    connections: 'Specialist 3/4 mechanics adds force models and more advanced motion equations.'
  },

  'specialist-34:functions': {
    bigPicture: 'Specialist 3/4 function analysis is structural. You should be able to infer asymptotes, excluded points, stationary behaviour and transformations before plotting a detailed graph.',
    why: 'Rational, reciprocal and modulus operations preserve some features and radically alter others. Studying zeros, signs and asymptotic limits gives a reliable skeleton of the graph.',
    keyIdeas: ['Factor before declaring asymptotes.', 'A cancelled denominator factor creates a removable discontinuity, not a vertical asymptote.', 'For $1/g(x)$, zeros of $g$ become undefined points and large $|g|$ means values near zero.', 'Output modulus reflects negative branches above the x-axis.'],
    mistakes: ['Calling every denominator zero an asymptote.', 'Losing excluded points after algebraic cancellation.', 'Sketching by calculator shape without explaining features.'],
    examTips: ['Build the graph in this order: domain → intercepts → asymptotes → stationary points → sign/branches.', 'Label exact coordinates where possible.', 'Use derivatives only after structural features are identified.'],
    connections: 'These graphs reappear in integration domains, inverse trig restrictions and differential-equation modelling.'
  },
  'specialist-34:complex': {
    bigPicture: 'At 3/4 level, complex numbers should feel geometric. Polar multiplication, de Moivre and loci are all consequences of interpreting a complex number as a vector from the origin.',
    why: 'Multiplication adds arguments and multiplies moduli, so powers repeat a rotation-dilation. Roots reverse that operation and therefore appear equally spaced around a circle.',
    keyIdeas: ['$z=r(\cos\theta+i\sin\theta)$ encodes modulus and argument.', 'de Moivre: $z^n=r^n\operatorname{cis}(n\theta)$.', 'An $n$th-root equation has $n$ equally spaced arguments.', 'Locus equations translate modulus into distance and argument into direction.'],
    mistakes: ['Listing only one complex root.', 'Forgetting periodic angles before dividing by $n$.', 'Treating $|z-a|$ as an algebraic absolute value rather than distance.'],
    examTips: ['Sketch roots/loci on an Argand diagram.', 'Use exact angles and moduli.', 'Check every root by symmetry rather than recomputing from scratch.'],
    connections: 'Complex geometry reinforces vector thinking and trigonometric identities.'
  },
  'specialist-34:vectors': {
    bigPicture: 'Vectors turn 2D and 3D geometry into algebra. The central questions are direction, projection, intersection and perpendicular distance.',
    why: 'The dot product measures the component of one vector in another direction. Parametric/vector equations describe every point on a line through one point plus a scalar multiple of a direction.',
    keyIdeas: ['$\operatorname{proj}_{\mathbf b}\mathbf a=(\mathbf a\cdot\mathbf b/|\mathbf b|^2)\mathbf b$.', 'A line is $\mathbf r=\mathbf a+\lambda\mathbf d$.', 'Parallel directions are scalar multiples.', 'Perpendicularity is detected by zero dot product.'],
    mistakes: ['Using $|\mathbf b|$ instead of $|\mathbf b|^2$ in vector projection.', 'Treating a vector equation parameter as fixed.', 'Confusing the projection scalar with the projection vector.'],
    examTips: ['Identify point and direction separately before line algebra.', 'Use dot products to avoid unnecessary angle calculations.', 'Check geometric reasonableness after solving parameters.'],
    connections: 'Vector decomposition is fundamental in mechanics force models and 3D motion.'
  },
  'specialist-34:calculus': {
    bigPicture: 'Specialist calculus is method recognition. The hard part is seeing which derivative/integration structure is present before doing algebra.',
    why: 'Inverse trig derivatives come from implicit inverse relationships; implicit differentiation handles relations that cannot conveniently be solved for $y$; advanced integration reverses product, chain and rational differentiation patterns.',
    keyIdeas: ['Treat $y$ as a function of $x$ in implicit differentiation.', 'Know the exact domains attached to inverse trig functions.', 'Substitution reverses chain rule.', 'Integration by parts reverses product rule.', 'Partial fractions turns rational functions into standard integrals.'],
    mistakes: ['Dropping $dy/dx$ factors.', 'Choosing substitution without transforming the differential.', 'Forgetting logarithmic absolute values such as $\ln|x|$.'],
    examTips: ['Before integrating, name the likely technique.', 'Differentiate your final antiderivative mentally.', 'Keep domain restrictions visible through inverse-trig work.'],
    connections: 'These techniques underpin differential equations, mechanics and area/volume applications.'
  },
  'specialist-34:differential-equations': {
    bigPicture: 'A differential equation describes a rule for change rather than a formula for the quantity itself. Solving it reconstructs the family of functions consistent with that rule.',
    why: 'Separable equations work when all $y$-dependence can be moved to one side and $x$-dependence to the other, allowing both sides to be integrated.',
    keyIdeas: ['Separate variables before integrating.', 'Include a constant of integration.', 'Use initial conditions only after obtaining the general solution.', 'Equilibrium solutions may be lost if you divide by a factor that can be zero.'],
    mistakes: ['Dividing by $y$ and losing the equilibrium solution $y=0$.', 'Applying initial conditions too early.', 'Forgetting to verify a proposed solution.'],
    examTips: ['State equilibrium solutions separately.', 'Differentiate to verify when asked.', 'Interpret constants and long-term behaviour in context.'],
    connections: 'Differential equations model growth, decay, mixing, mechanics and population change.'
  },
  'specialist-34:statistics': {
    bigPicture: 'Specialist statistics extends probability into inference: use a sample to reason about an unknown population quantity while quantifying uncertainty.',
    why: 'Sampling distributions explain why sample statistics vary. Confidence intervals package that variation into a range of plausible population values.',
    keyIdeas: ['Expectation and variance obey different transformation rules.', 'Sample means become less variable as sample size grows.', 'A confidence interval is about the procedure, not a probability that a fixed parameter moves.', 'Hypothesis tests compare observed evidence with a null model.'],
    mistakes: ['Saying “there is a 95% probability the parameter is in this computed interval”.', 'Confusing population standard deviation with standard error.', 'Using one-tailed logic for a two-tailed claim.'],
    examTips: ['Define the parameter in context.', 'Write hypotheses symbolically and verbally.', 'Interpret p-values as evidence under the null, not the probability the null is true.'],
    connections: 'This builds directly on Methods random variables and normal distributions.'
  },
  'specialist-34:mechanics': {
    bigPicture: 'Mechanics combines vectors, calculus and modelling. The mathematics begins only after a clear force or motion model has been established.',
    why: 'Newton’s second law links resultant force to acceleration. Once acceleration is known, calculus links it to velocity and position.',
    keyIdeas: ['Choose a positive direction and keep it consistent.', 'Resolve forces before applying $\sum F=ma$.', 'Projectile horizontal and vertical motions share time but have different accelerations.', 'Variable acceleration may require differential relationships such as $a=v\,dv/dx$.'],
    mistakes: ['Mixing force magnitudes and signed components.', 'Using constant-acceleration formulas when acceleration varies.', 'Forgetting that gravity acts vertically only in ideal projectile models.'],
    examTips: ['Draw a force diagram before equations.', 'Write vector/component equations with units.', 'Check limiting/sign behaviour for physical plausibility.'],
    connections: 'Mechanics is where Specialist vectors, calculus and differential modelling converge.'
  }
};

// High-value lesson-specific deep dives. Other lessons inherit the full topic
// teaching pack plus their original lesson-specific explanation and worked method.
export const lessonDepth = {
  's34-rational-graphs': {
    focus: 'The graph is built from algebraic structure, not from plotting random points.',
    deepDive: 'Suppose $f(x)=P(x)/Q(x)$. First factor both polynomials. A factor of $Q$ that survives cancellation usually creates a vertical asymptote. A common factor that cancels instead creates a removable hole at the excluded input. Then compare degrees: if the denominator degree is larger, $f(x)\to0$ as $|x|\to\infty$; equal degrees give a horizontal asymptote equal to the ratio of leading coefficients. Only after this structural skeleton should you inspect turning points with calculus.',
    example: {problem:'Analyse $f(x)=\\dfrac{x^2-1}{x^2-x-2}$.', steps:['Factor: $x^2-1=(x-1)(x+1)$ and $x^2-x-2=(x-2)(x+1)$.','Cancel algebraically to obtain $(x-1)/(x-2)$, but keep $x=-1$ excluded.','Therefore $x=-1$ is a hole, while $x=2$ is a vertical asymptote.','Equal original degrees give horizontal asymptote $y=1$.'], answer:'Structural features: hole at $x=-1$, vertical asymptote $x=2$, horizontal asymptote $y=1$.'}
  },
  's34-v6-modulus-rational': {
    focus: 'Modulus is easiest when you first understand the sign of the unmodded function.',
    deepDive: 'For $y=|f(x)|$, the x-coordinates of intercepts and undefined points do not move. Portions where $f(x)\ge0$ remain unchanged; portions where $f(x)<0$ reflect in the x-axis. For rational functions, determine sign branch-by-branch using zeros and vertical asymptotes before reflecting anything.',
    example: {problem:'Sketch the transformation from $f(x)=(x-1)/(x+2)$ to $|f(x)|$.', steps:['Critical x-values are $x=1$ (zero) and $x=-2$ (undefined).','A sign chart shows $f(x)<0$ on $(-2,1)$ and positive elsewhere.','Keep the positive branches unchanged.','Reflect only the branch on $(-2,1)$ above the x-axis.'], answer:'The modulus graph has the same vertical asymptote $x=-2$ and zero $x=1$, with no negative y-values.'}
  },
  's34-v6-reciprocal-quadratics': {
    focus: 'Think of $1/g(x)$ as a transformation of the output values of $g$, not as a completely new graph.',
    deepDive: 'If $g(x)=0$, then $1/g(x)$ is undefined, so roots of the quadratic become vertical asymptotes. If $|g(x)|$ is large, the reciprocal is close to zero. If $g$ has a turning point away from zero, the reciprocal often has a corresponding turning point because $d(1/g)/dx=-g\'/g^2$, so stationary points occur where $g\'=0$ provided $g\ne0$.',
    example: {problem:'Describe $f(x)=1/(x^2-4)$.', steps:['Zeros of the denominator at $x=\pm2$ give vertical asymptotes.','As $|x|\to\infty$, $f(x)\to0$, giving horizontal asymptote $y=0$.','The function is even, so the graph is symmetric about the y-axis.','At $x=0$, $f(0)=-1/4$; this is the central branch turning point.'], answer:'Three branches, vertical asymptotes $x=\pm2$, horizontal asymptote $y=0$, central maximum $(0,-1/4)$.'}
  },
  's34-v6-inverse-trig-functions': {
    focus: 'Inverse trig functions are functions only because the original trig functions are restricted to one-to-one intervals.',
    deepDive: 'The symbol $\sin^{-1}x$ means the inverse of restricted sine, not $1/\sin x$. The principal-value ranges are part of the definition: $\arcsin x\in[-\pi/2,\pi/2]$, $\arccos x\in[0,\pi]$, and $\arctan x\in(-\pi/2,\pi/2)$. These ranges determine signs and exact values.',
    example: {problem:'Evaluate $\arccos(-1/2)$ exactly.', steps:['We need the principal angle in $[0,\pi]$.','$\cos(2\pi/3)=-1/2$.','$2\pi/3$ lies in the required principal range.'], answer:'$\arccos(-1/2)=2\pi/3$.'}
  },
  's34-complex-rotation': {
    focus: 'Complex multiplication is a geometric transformation: scale by the modulus, rotate by the argument.',
    deepDive: 'If the multiplier is $w=r\operatorname{cis}\theta$, then every point $z$ is sent to $wz$. Distances from the origin scale by $r$ and arguments increase by $\theta$. This interpretation is more powerful than expanding Cartesian products when the question is geometric.',
    example: {problem:'Describe multiplication by $-i$.', steps:['$-i=\operatorname{cis}(-\pi/2)$.','Its modulus is 1, so lengths are unchanged.','Its argument is $-\pi/2$, so every point rotates 90° clockwise about the origin.'], answer:'A rotation of $-\pi/2$ about the origin with no dilation.'}
  },
  's34-v6-polar-arithmetic': {
    focus: 'Choose Cartesian form for addition/subtraction and polar form for multiplication/division.',
    deepDive: 'In polar form, multiplication is almost effortless: multiply moduli and add arguments. Division divides moduli and subtracts arguments. However, addition does not have a simple polar rule; convert to Cartesian unless geometry makes the sum obvious.',
    example: {problem:'Let $z_1=2\operatorname{cis}(\pi/6)$ and $z_2=3\operatorname{cis}(-\pi/4)$. Find $z_1z_2$.', steps:['Multiply moduli: $2\cdot3=6$.','Add arguments: $\pi/6-\pi/4=-\pi/12$.'], answer:'$z_1z_2=6\operatorname{cis}(-\pi/12)$.'}
  },
  's34-v6-demoivre-roots': {
    focus: 'Powers multiply angles; roots divide angles but must include all periodic possibilities first.',
    deepDive: 'To solve $z^n=R\operatorname{cis}\phi$, write the target arguments as $\phi+2k\pi$ before dividing by $n$. Then $z=R^{1/n}\operatorname{cis}((\phi+2k\pi)/n)$ for $k=0,\ldots,n-1$. The roots are vertices of a regular $n$-gon centred at the origin.',
    example: {problem:'Solve $z^3=8$ in polar form.', steps:['Write $8=8\operatorname{cis}(2k\pi)$.','Cube-root modulus is 2.','Arguments are $2k\pi/3$ for $k=0,1,2$.'], answer:'$z=2\operatorname{cis}(0),\ 2\operatorname{cis}(2\pi/3),\ 2\operatorname{cis}(4\pi/3)$.'}
  },
  's34-v6-complex-loci': {
    focus: 'Translate complex notation into distance and angle language before doing algebra.',
    deepDive: 'Expressions such as $|z-a|$ are Euclidean distances from the point representing $z$ to the point $a$. Equality to a constant gives a circle; comparison of two distances gives a perpendicular bisector or region. Conditions on $\arg(z-a)$ describe rays from $a$.',
    example: {problem:'Interpret $|z-(2+i)|=3$.', steps:['The fixed point is $2+i$, corresponding to $(2,1)$.','$|z-(2+i)|$ is distance from $(x,y)$ to $(2,1)$.','A constant distance 3 defines a circle.'], answer:'Circle centred at $(2,1)$ with radius 3.'}
  },
  's34-dot-product': {
    focus: 'The dot product packages both magnitude and relative direction into one scalar.',
    deepDive: 'The identity $\mathbf a\cdot\mathbf b=|\mathbf a||\mathbf b|\cos\theta$ makes the dot product a bridge between component algebra and geometry. Positive means an acute angle, zero means perpendicular and negative means obtuse.',
    example: {problem:'For $\mathbf a=(1,2,-1)$ and $\mathbf b=(2,0,2)$, determine whether the angle is acute, right or obtuse.', steps:['Compute $\mathbf a\cdot\mathbf b=1(2)+2(0)+(-1)(2)=0$.','Both vectors are non-zero.'], answer:'The vectors are perpendicular, so the angle is $90^\circ$.'}
  },
  's34-v6-projections': {
    focus: 'Projection answers: how much of one vector lies in the direction of another?',
    deepDive: 'The scalar resolute of $\mathbf a$ in the direction of $\mathbf b$ is $(\mathbf a\cdot\mathbf b)/|\mathbf b|$. The vector projection multiplies that scalar by the unit vector $\mathbf b/|\mathbf b|$, giving $(\mathbf a\cdot\mathbf b/|\mathbf b|^2)\mathbf b$.',
    example: {problem:'Project $\mathbf a=(3,4)$ onto $\mathbf b=(1,0)$.', steps:['$\mathbf a\cdot\mathbf b=3$.','$|\mathbf b|^2=1$.','Multiply by $\mathbf b$: $3(1,0)$.'], answer:'$\operatorname{proj}_{\mathbf b}\mathbf a=(3,0)$.'}
  },
  's34-v6-vector-lines': {
    focus: 'A line is a starting point plus every scalar multiple of one direction vector.',
    deepDive: 'The equation $\mathbf r=\mathbf a+\lambda\mathbf d$ separates location from direction. To test whether a point lies on the line, solve all component equations for the same parameter. To intersect two lines, equate their position vectors and solve the resulting system.',
    example: {problem:'Does $(5,1)$ lie on $\mathbf r=(1,3)+\lambda(2,-1)$?', steps:['From x-components: $1+2\lambda=5$, so $\lambda=2$.','Check y: $3-2=1$.','The same parameter satisfies both components.'], answer:'Yes, at $\lambda=2$.'}
  },
  's34-v6-3d-geometry': {
    focus: 'In 3D, draw less and rely more on vector structure: directions, dot products and simultaneous equations.',
    deepDive: 'Many 3D problems reduce to finding parameters that enforce intersection or perpendicularity. A shortest connection between skew geometric objects is typically perpendicular to relevant direction vectors, so dot-product conditions are powerful.',
    example: {problem:'Find the angle between directions $(1,1,0)$ and $(1,0,1)$.', steps:['Dot product is $1$.','Each magnitude is $\sqrt2$.','$\cos\theta=1/(\sqrt2\sqrt2)=1/2$.'], answer:'$\theta=\pi/3$.'}
  },
  's34-implicit': {
    focus: 'Implicit differentiation is ordinary chain rule applied to a relation in which $y$ depends on $x$.',
    deepDive: 'When differentiating a term such as $y^3$, you are really differentiating $(y(x))^3$, so the chain rule gives $3y^2y\'$. After differentiating every term, collect all terms containing $y\'$ and solve algebraically.',
    example: {problem:'For $x^2+xy+y^2=7$, find $dy/dx$.', steps:['Differentiate: $2x+(xy)\'+2yy\'=0$.','Product rule gives $(xy)\'=y+xy\'$.','Collect: $(x+2y)y\'=-(2x+y)$.'], answer:'$\displaystyle y\'=-\frac{2x+y}{x+2y}$.'}
  },
  's34-v6-inverse-trig-derivatives': {
    focus: 'Inverse-trig derivative formulas come from differentiating the defining inverse relationship, not from memorisation alone.',
    deepDive: 'If $y=\arcsin x$, then $\sin y=x$. Implicit differentiation gives $\cos y\,y\'=1$. On the principal range, $\cos y=\sqrt{1-\sin^2y}=\sqrt{1-x^2}$, hence $y\'=1/\sqrt{1-x^2}$. Similar reasoning produces the other inverse-trig derivatives.',
    example: {problem:'Differentiate $y=\arctan(3x)$.', steps:['Use $d(\arctan u)/dx=u\'/(1+u^2)$.','Here $u=3x$, so $u\'=3$.'], answer:'$y\'=\dfrac{3}{1+9x^2}$.'}
  },
  's34-v6-implicit-advanced': {
    focus: 'Advanced implicit questions combine product/chain rules and often ask for a derivative at a point rather than a fully simplified formula.',
    deepDive: 'Differentiate carefully before substituting point coordinates. Substituting too early can hide product-rule or chain-rule structure. For second derivatives, differentiate the first derivative relation again, remembering that $y\'$ itself depends on $x$.',
    example: {problem:'For $x^2y+y^3=8$, derive a formula for $y\'$.', steps:['Differentiate $x^2y$ with product rule: $2xy+x^2y\'$.','Differentiate $y^3$: $3y^2y\'$.','Collect $y\'$ terms.'], answer:'$\displaystyle y\'=-\frac{2xy}{x^2+3y^2}$.'}
  },
  's34-substitution': {
    focus: 'A good substitution makes the integral simpler immediately and transforms every occurrence of $x$, including $dx$.',
    deepDive: 'Substitution is the reverse chain rule. The visual clue is a composite expression together with its derivative, perhaps off by a constant. After setting $u=g(x)$, rewrite the entire integral in $u$ before integrating; do not mix $u$ and $x$ in the same integral.',
    example: {problem:'Evaluate $\int 2x(x^2+5)^4\,dx$.', steps:['Let $u=x^2+5$, so $du=2x\,dx$.','The integral becomes $\int u^4\,du$.','Integrate: $u^5/5+C$.','Substitute back.'], answer:'$\displaystyle \frac{(x^2+5)^5}{5}+C$.'}
  },
  's34-v6-integration-parts': {
    focus: 'Integration by parts is the reverse product rule and is useful when differentiating one factor makes it simpler.',
    deepDive: 'From $(uv)\'=u\'v+uv\'$, rearrange and integrate to obtain $\int u\,dv=uv-\int v\,du$. The art is choosing $u$. Logarithmic/inverse-trig factors usually become simpler when differentiated; polynomial factors eventually vanish under repeated differentiation.',
    example: {problem:'Evaluate $\int x e^x\,dx$.', steps:['Choose $u=x$ and $dv=e^x dx$.','Then $du=dx$ and $v=e^x$.','Apply $uv-\int v\,du$.'], answer:'$xe^x-e^x+C=e^x(x-1)+C$.'}
  },
  's34-v6-integration-partial-fractions': {
    focus: 'Use partial fractions only after the rational integrand is proper and the denominator is fully factorised.',
    deepDive: 'Decompose the rational function into pieces whose antiderivatives are standard. Distinct linear factors get separate constants; repeated factors require a term for every power. After decomposition, integrals of $1/(x-a)$ produce logarithms with absolute values.',
    example: {problem:'Evaluate $\int \frac{1}{x^2-1}\,dx$.', steps:['Factor denominator: $(x-1)(x+1)$.','Decompose: $1/(x^2-1)=\frac12/(x-1)-\frac12/(x+1)$.','Integrate each logarithmic term.'], answer:'$\displaystyle \frac12\ln|x-1|-\frac12\ln|x+1|+C$.'}
  },
  's34-v6-definite-substitution': {
    focus: 'For definite substitution, either transform the bounds or substitute back before using the original bounds — never mix systems.',
    deepDive: 'When $u=g(x)$, the original endpoints $x=a,b$ correspond to new endpoints $u=g(a),g(b)$. Changing the bounds lets you complete the whole calculation in $u$, which is often cleaner and avoids back-substitution.',
    example: {problem:'Evaluate $\int_0^1 2x(x^2+1)^2\,dx$.', steps:['Let $u=x^2+1$, $du=2x\,dx$.','Bounds: $x=0\to u=1$, $x=1\to u=2$.','Evaluate $\int_1^2u^2du=[u^3/3]_1^2$.'], answer:'$7/3$.'}
  },
  's34-v6-separable-de': {
    focus: 'Separate variables only when the equation can be rearranged into a pure y-expression times $dy$ and a pure x-expression times $dx$.',
    deepDive: 'For $dy/dx=f(x)g(y)$, move $g(y)$ to the left as $dy/g(y)=f(x)dx$ and integrate both sides. Before dividing by $g(y)$, check whether $g(y)=0$ gives equilibrium solutions that would otherwise disappear.',
    example: {problem:'Solve $dy/dx=3xy$ for $y\ne0$.', steps:['Separate: $dy/y=3x\,dx$.','Integrate: $\ln|y|=3x^2/2+C$.','Exponentiate and absorb sign into the constant.'], answer:'$y=Ae^{3x^2/2}$, together with the equilibrium $y=0$.'}
  },
  's34-v6-growth-decay': {
    focus: 'When rate of change is proportional to the amount present, exponential behaviour is inevitable.',
    deepDive: 'The model $dP/dt=kP$ says each unit contributes the same fractional growth/decay rate. Separating gives $dP/P=kdt$, hence $P=Ae^{kt}$. The sign of $k$ determines growth or decay; an initial condition fixes $A$.',
    example: {problem:'A quantity obeys $dP/dt=-0.2P$ and $P(0)=50$. Find $P(t)$.', steps:['General solution is $P=Ae^{-0.2t}$.','Use $P(0)=A=50$.'], answer:'$P(t)=50e^{-0.2t}$.'}
  },
  's34-v6-direction-equilibria': {
    focus: 'A slope field is a picture of the differential equation before any solution is solved explicitly.',
    deepDive: 'For $dy/dx=F(x,y)$, each point receives a short line segment with slope $F(x,y)$. Equilibria occur where the slope is zero along a constant-$y$ line. Stability is inferred from whether nearby arrows point toward or away from the equilibrium.',
    example: {problem:'For $dy/dt=y(2-y)$, identify equilibria and their stability.', steps:['Equilibria solve $y(2-y)=0$: $y=0,2$.','For $0<y<2$, derivative is positive, so solutions rise.','For $y>2$, derivative is negative, so solutions fall.','For $y<0$, derivative is negative, moving away from 0.'], answer:'$y=0$ is unstable; $y=2$ is stable.'}
  },
  's34-v6-binomial-moments': {
    focus: 'Expectation and variance summarise a distribution; for binomial variables they follow directly from adding independent Bernoulli trials.',
    deepDive: 'If $X\sim Bin(n,p)$, think of $X$ as a sum of $n$ indicator variables. Expectations add, giving $np$. Independent variances add, giving $np(1-p)$. Standard deviation is the square root of variance.',
    example: {problem:'If $X\sim Bin(20,0.3)$, find $E(X)$ and $Var(X)$.', steps:['$E(X)=np=20(0.3)=6$.','$Var(X)=np(1-p)=20(0.3)(0.7)=4.2$.'], answer:'Mean $6$, variance $4.2$.'}
  },
  's34-v6-normal-transformations': {
    focus: 'Standardisation converts any normal variable into the same reference scale: number of standard deviations from the mean.',
    deepDive: 'For $X\sim N(\mu,\sigma^2)$, define $Z=(X-\mu)/\sigma$. Linear transformations preserve normality: if $Y=aX+b$, then $E(Y)=a\mu+b$ and $Var(Y)=a^2\sigma^2$.',
    example: {problem:'If $X\sim N(50,4^2)$, find the z-score for $X=58$.', steps:['Subtract the mean: $58-50=8$.','Divide by standard deviation 4.'], answer:'$z=2$.'}
  },
  's34-v6-sampling-confidence': {
    focus: 'Inference is about repeated-sampling behaviour, not certainty about one fixed population parameter.',
    deepDive: 'A sample statistic varies from sample to sample. Its sampling distribution quantifies that variation. A confidence interval is produced by a procedure that captures the true parameter at the stated long-run rate under the model assumptions.',
    example: {problem:'Interpret a 95% confidence interval for a population mean.', steps:['Do not assign 95% probability to the fixed parameter after the interval has been computed.','Interpret the method: across repeated samples, about 95% of intervals produced this way would contain the true mean.'], answer:'Use a long-run coverage interpretation tied to the interval-producing procedure.'}
  },
  's34-v6-newton-forces': {
    focus: 'Do not write $F=ma$ until you have chosen axes and resolved every force along them.',
    deepDive: 'Newton’s second law uses the resultant force, not an individual force. On inclined or connected systems, choose directions that reduce components. Weight is $mg$ vertically downward; normal reaction is perpendicular to a contact surface; tension acts along a string.',
    example: {problem:'A $2$ kg particle has a resultant horizontal force of $6$ N. Find acceleration.', steps:['Choose the force direction as positive.','Apply $\sum F=ma$: $6=2a$.'], answer:'$a=3\text{ m s}^{-2}$ in the force direction.'}
  },
  's34-v6-projectile-motion': {
    focus: 'Projectile motion is two simultaneous one-dimensional motions linked by the same time variable.',
    deepDive: 'Ignoring air resistance, horizontal acceleration is zero and vertical acceleration is $-g$. Resolve initial velocity into components, write separate $x(t)$ and $y(t)$ equations, then eliminate or solve for time depending on the target.',
    example: {problem:'A projectile is launched at speed $u$ and angle $\theta$. Write its velocity components at time $t$.', steps:['Horizontal velocity remains $u\cos\theta$.','Vertical velocity starts at $u\sin\theta$ and changes by $-gt$.'], answer:'$\mathbf v(t)=(u\cos\theta,\ u\sin\theta-gt)$.'}
  },
  's34-v6-variable-acceleration': {
    focus: 'When acceleration is not constant, choose the differential form that matches the variables provided.',
    deepDive: 'Use $a=dv/dt$ when acceleration is given in time, $v=dx/dt$ for position-time links, and $a=v\,dv/dx$ when acceleration is expressed as a function of position. This last identity follows from the chain rule: $dv/dt=(dv/dx)(dx/dt)$.',
    example: {problem:'If $a=2x$ and $v=3$ when $x=0$, obtain a relation between $v$ and $x$.', steps:['Use $a=v\,dv/dx$: $v\,dv/dx=2x$.','Separate: $v\,dv=2x\,dx$.','Integrate: $v^2/2=x^2+C$.','Use $v=3$ at $x=0$ to get $C=9/2$.'], answer:'$v^2=2x^2+9$.'}
  }
};

export function depthForLesson(lesson){
  const topic=topicDepth[`${lesson.course}:${lesson.topic}`] || {};
  const specific=lessonDepth[lesson.id] || {};
  return {...topic,...specific};
}
