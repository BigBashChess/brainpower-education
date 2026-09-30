// Brainpower Education V6 — course-linked practice expansion
export const v6Questions = [
  {
    "id": "m12-v6-fn-domain",
    "course": "methods-12",
    "topic": "functions",
    "topicLabel": "Functions & Relations",
    "difficulty": "Core",
    "type": "choice",
    "prompt": "Find the domain of $f(x)=\\sqrt{7-2x}$.",
    "solution": "Require $7-2x\\ge0$, so $x\\le7/2$.",
    "xp": 10,
    "answer": "$x\\le 7/2$",
    "choices": [
      "$x\\le 7/2$",
      "$x\\ge 7/2$",
      "$x<7$",
      "all real $x$"
    ]
  },
  {
    "id": "m12-v6-fn-range",
    "course": "methods-12",
    "topic": "functions",
    "topicLabel": "Functions & Relations",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "For $f(x)=(x-3)^2-5$, state the range.",
    "solution": "The minimum value is $-5$, so the range is $y\\ge-5$.",
    "xp": 12,
    "answers": [
      "y>=-5",
      "y\\ge-5",
      "$y\\ge-5$"
    ]
  },
  {
    "id": "m12-v6-fn-trans1",
    "course": "methods-12",
    "topic": "functions",
    "topicLabel": "Functions & Relations",
    "difficulty": "Core",
    "type": "text",
    "prompt": "The graph of $y=x^2$ is translated 4 units right and 3 units down. Give the new equation.",
    "solution": "Right by 4 gives $x\\mapsto x-4$; down by 3 subtracts 3.",
    "xp": 10,
    "answers": [
      "(x-4)^2-3",
      "y=(x-4)^2-3"
    ]
  },
  {
    "id": "m12-v6-fn-trans2",
    "course": "methods-12",
    "topic": "functions",
    "topicLabel": "Functions & Relations",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $g(x)=2f(x-1)+3$ and $f(2)=5$, find $g(3)$.",
    "solution": "$g(3)=2f(2)+3=13$.",
    "xp": 16,
    "answer": "13"
  },
  {
    "id": "m12-v6-fn-inv1",
    "course": "methods-12",
    "topic": "functions",
    "topicLabel": "Functions & Relations",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Find the inverse of $f(x)=3x-7$.",
    "solution": "Let $y=3x-7$, swap $x$ and $y$, then solve for $y$.",
    "xp": 12,
    "answers": [
      "(x+7)/3",
      "f^-1(x)=(x+7)/3",
      "(x+7) / 3"
    ]
  },
  {
    "id": "m12-v6-fn-comp1",
    "course": "methods-12",
    "topic": "functions",
    "topicLabel": "Functions & Relations",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "Let $f(x)=x^2+2$ and $g(x)=3x-1$. Find $(g\\circ f)(2)$.",
    "solution": "$f(2)=6$, then $g(6)=17$.",
    "xp": 16,
    "answer": "17"
  },
  {
    "id": "m12-v6-alg-rem",
    "course": "methods-12",
    "topic": "algebra",
    "topicLabel": "Algebra & Polynomials",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Find the remainder when $P(x)=2x^3-5x+4$ is divided by $x-2$.",
    "solution": "By the remainder theorem, the remainder is $P(2)=16-10+4=10$.",
    "xp": 12,
    "answer": "10"
  },
  {
    "id": "m12-v6-alg-factor",
    "course": "methods-12",
    "topic": "algebra",
    "topicLabel": "Algebra & Polynomials",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "For $P(x)=x^3+kx^2-4x-4$, $x+1$ is a factor. Find $k$.",
    "solution": "$P(-1)=-1+k+4-4=k-1=0$, hence $k=1$.",
    "xp": 16,
    "answer": "1"
  },
  {
    "id": "m12-v6-alg-cubic",
    "course": "methods-12",
    "topic": "algebra",
    "topicLabel": "Algebra & Polynomials",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "A monic cubic has roots $-2,1,4$. Find the constant term.",
    "solution": "The polynomial is $(x+2)(x-1)(x-4)$, so the constant term is $2(-1)(-4)=8$.",
    "xp": 12,
    "answer": "8"
  },
  {
    "id": "m12-v6-alg-mult",
    "course": "methods-12",
    "topic": "algebra",
    "topicLabel": "Algebra & Polynomials",
    "difficulty": "Advanced",
    "type": "choice",
    "prompt": "Which factor produces a repeated root at $x=3$?",
    "solution": "A repeated root corresponds to a repeated factor.",
    "xp": 16,
    "answer": "$(x-3)^2$",
    "choices": [
      "$x-3$",
      "$(x-3)^2$",
      "$x+3$",
      "$(x+3)^2$"
    ]
  },
  {
    "id": "m12-v6-exp-law",
    "course": "methods-12",
    "topic": "exp-log",
    "topicLabel": "Exponentials & Logarithms",
    "difficulty": "Core",
    "type": "text",
    "prompt": "Simplify $a^3a^{-5}$.",
    "solution": "Add the exponents: $3+(-5)=-2$.",
    "xp": 10,
    "answers": [
      "a^-2",
      "1/a^2",
      "$a^{-2}$",
      "$1/a^2$"
    ]
  },
  {
    "id": "m12-v6-exp-eqn",
    "course": "methods-12",
    "topic": "exp-log",
    "topicLabel": "Exponentials & Logarithms",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Solve $4^{x+1}=64$.",
    "solution": "$64=4^3$, so $x+1=3$ and $x=2$.",
    "xp": 12,
    "answer": "2"
  },
  {
    "id": "m12-v6-log-law",
    "course": "methods-12",
    "topic": "exp-log",
    "topicLabel": "Exponentials & Logarithms",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Expand $\\ln(3x^2)$ for $x>0$.",
    "solution": "Use product and power laws: $\\ln(3x^2)=\\ln3+2\\ln x$.",
    "xp": 12,
    "answers": [
      "ln(3)+2ln(x)",
      "ln3+2lnx",
      "$\\ln3+2\\ln x$"
    ]
  },
  {
    "id": "m12-v6-log-eqn",
    "course": "methods-12",
    "topic": "exp-log",
    "topicLabel": "Exponentials & Logarithms",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "Solve $\\ln x+\\ln 2=\\ln 10$.",
    "solution": "Combine to $\\ln(2x)=\\ln10$, hence $x=5$.",
    "xp": 16,
    "answer": "5"
  },
  {
    "id": "m12-v6-trig-exact",
    "course": "methods-12",
    "topic": "trig",
    "topicLabel": "Trigonometry",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "Find $\\cos(2\\pi/3)$.",
    "solution": "$2\\pi/3$ lies in quadrant II with reference angle $\\pi/3$, so cosine is $-1/2$.",
    "xp": 10,
    "answer": "-0.5",
    "tolerance": 1e-09
  },
  {
    "id": "m12-v6-trig-tan",
    "course": "methods-12",
    "topic": "trig",
    "topicLabel": "Trigonometry",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Find $\\tan(3\\pi/4)$.",
    "solution": "The reference angle is $\\pi/4$ and tangent is negative in quadrant II.",
    "xp": 12,
    "answer": "-1"
  },
  {
    "id": "m12-v6-trig-eqn1",
    "course": "methods-12",
    "topic": "trig",
    "topicLabel": "Trigonometry",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Solve $\\cos x=0$ for $0\\le x\\le2\\pi$.",
    "solution": "Cosine is zero at the vertical points of the unit circle.",
    "xp": 12,
    "answers": [
      "pi/2,3pi/2",
      "\\pi/2,3\\pi/2",
      "pi/2 and 3pi/2"
    ]
  },
  {
    "id": "m12-v6-trig-graph",
    "course": "methods-12",
    "topic": "trig",
    "topicLabel": "Trigonometry",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "The period of $y=\\sin(3x)$ is $2\\pi/k$. Find $k$.",
    "solution": "For $\\sin(bx)$ the period is $2\\pi/|b|$.",
    "xp": 16,
    "answer": "3"
  },
  {
    "id": "m12-v6-diff-prod",
    "course": "methods-12",
    "topic": "differentiation",
    "topicLabel": "Differentiation",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Differentiate $x^2(x+1)$.",
    "solution": "Using product rule: $2x(x+1)+x^2=3x^2+2x$.",
    "xp": 12,
    "answers": [
      "3x^2+2x",
      "2x(x+1)+x^2",
      "$3x^2+2x$"
    ]
  },
  {
    "id": "m12-v6-diff-chain",
    "course": "methods-12",
    "topic": "differentiation",
    "topicLabel": "Differentiation",
    "difficulty": "Advanced",
    "type": "text",
    "prompt": "Differentiate $(2x-1)^5$.",
    "solution": "Chain rule gives $5(2x-1)^4\\cdot2$.",
    "xp": 16,
    "answers": [
      "10(2x-1)^4",
      "$10(2x-1)^4$"
    ]
  },
  {
    "id": "m12-v6-diff-tangent",
    "course": "methods-12",
    "topic": "differentiation",
    "topicLabel": "Differentiation",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "For $f(x)=x^3-2x$, find the gradient at $x=2$.",
    "solution": "$f'(x)=3x^2-2$, so $f'(2)=10$.",
    "xp": 12,
    "answer": "10"
  },
  {
    "id": "m12-v6-diff-stat",
    "course": "methods-12",
    "topic": "differentiation",
    "topicLabel": "Differentiation",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "For $f(x)=x^2-6x+5$, find the x-coordinate of the stationary point.",
    "solution": "$f'(x)=2x-6=0$ gives $x=3$.",
    "xp": 16,
    "answer": "3"
  },
  {
    "id": "m12-v6-int-def",
    "course": "methods-12",
    "topic": "integration",
    "topicLabel": "Integration",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "Evaluate $\\int_0^2 3x^2\\,dx$.",
    "solution": "An antiderivative is $x^3$; evaluate $8-0=8$.",
    "xp": 10,
    "answer": "8"
  },
  {
    "id": "m12-v6-int-area",
    "course": "methods-12",
    "topic": "integration",
    "topicLabel": "Integration",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Find the area under $y=2x$ from $x=0$ to $x=3$.",
    "solution": "$\\int_0^3 2x\\,dx=[x^2]_0^3=9$.",
    "xp": 12,
    "answer": "9"
  },
  {
    "id": "m12-v6-prob-count",
    "course": "methods-12",
    "topic": "probability",
    "topicLabel": "Probability",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "How many 3-person committees can be chosen from 7 students?",
    "solution": "$\\binom73=35$.",
    "xp": 12,
    "answer": "35"
  },
  {
    "id": "m12-v6-prob-cond",
    "course": "methods-12",
    "topic": "probability",
    "topicLabel": "Probability",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $P(A\\cap B)=0.18$ and $P(B)=0.30$, find $P(A\\mid B)$.",
    "solution": "$P(A\\mid B)=0.18/0.30=0.6$.",
    "xp": 16,
    "answer": "0.6"
  },
  {
    "id": "m34-v6-fn-inverse",
    "course": "methods-34",
    "topic": "functions",
    "topicLabel": "Functions",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Find $f^{-1}(x)$ for $f(x)=2e^x-3$.",
    "solution": "Solve $x=2e^y-3$ for $y$: $e^y=(x+3)/2$.",
    "xp": 12,
    "answers": [
      "ln((x+3)/2)",
      "\\ln((x+3)/2)"
    ]
  },
  {
    "id": "m34-v6-fn-domain",
    "course": "methods-34",
    "topic": "functions",
    "topicLabel": "Functions",
    "difficulty": "Advanced",
    "type": "choice",
    "prompt": "The domain of $f(x)=\\ln(5-x)$ is…",
    "solution": "Require $5-x>0$.",
    "xp": 16,
    "answer": "$x<5$",
    "choices": [
      "$x<5$",
      "$x\\le5$",
      "$x>5$",
      "all real $x$"
    ]
  },
  {
    "id": "m34-v6-fn-comp",
    "course": "methods-34",
    "topic": "functions",
    "topicLabel": "Functions",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "If $f(x)=x^2+1$ and $g(x)=\\sqrt{x-1}$, find $(f\\circ g)(10)$.",
    "solution": "$g(10)=3$, then $f(3)=10$.",
    "xp": 12,
    "answer": "10"
  },
  {
    "id": "m34-v6-fn-rational",
    "course": "methods-34",
    "topic": "functions",
    "topicLabel": "Functions",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "For $f(x)=\\frac{3}{x-2}+5$, find the horizontal asymptote y-value.",
    "solution": "As $x\\to\\pm\\infty$, the reciprocal term tends to 0, so $y=5$.",
    "xp": 16,
    "answer": "5"
  },
  {
    "id": "m34-v6-diff-quot",
    "course": "methods-34",
    "topic": "differentiation",
    "topicLabel": "Differentiation",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Differentiate $\\frac{x^2+1}{x}$.",
    "solution": "Simplify first to $x+x^{-1}$, then differentiate to $1-x^{-2}$.",
    "xp": 12,
    "answers": [
      "1-1/x^2",
      "(x^2-1)/x^2",
      "$1-1/x^2$"
    ]
  },
  {
    "id": "m34-v6-diff-exp",
    "course": "methods-34",
    "topic": "differentiation",
    "topicLabel": "Differentiation",
    "difficulty": "Advanced",
    "type": "text",
    "prompt": "Differentiate $e^{3x^2}$.",
    "solution": "Chain rule gives $e^{3x^2}\\cdot6x$.",
    "xp": 16,
    "answers": [
      "6x e^(3x^2)",
      "6xe^(3x^2)",
      "$6xe^{3x^2}$"
    ]
  },
  {
    "id": "m34-v6-diff-log",
    "course": "methods-34",
    "topic": "differentiation",
    "topicLabel": "Differentiation",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Differentiate $\\ln(2x+5)$.",
    "solution": "Chain rule gives $2/(2x+5)$.",
    "xp": 12,
    "answers": [
      "2/(2x+5)",
      "$2/(2x+5)$"
    ]
  },
  {
    "id": "m34-v6-diff-trig",
    "course": "methods-34",
    "topic": "differentiation",
    "topicLabel": "Differentiation",
    "difficulty": "Advanced",
    "type": "text",
    "prompt": "Differentiate $\\sin(4x)$.",
    "solution": "Derivative of sine is cosine, multiplied by the inner derivative 4.",
    "xp": 16,
    "answers": [
      "4cos(4x)",
      "$4\\cos(4x)$"
    ]
  },
  {
    "id": "m34-v6-app-stat",
    "course": "methods-34",
    "topic": "applications",
    "topicLabel": "Applications of Calculus",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "For $f(x)=x^3-3x^2-9x$, find the smaller stationary x-value.",
    "solution": "$f'(x)=3(x-3)(x+1)$, so stationary x-values are $-1,3$.",
    "xp": 12,
    "answer": "-1"
  },
  {
    "id": "m34-v6-app-opt",
    "course": "methods-34",
    "topic": "applications",
    "topicLabel": "Applications of Calculus",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "A rectangle has perimeter 20. If its width is $x$, area is $A=x(10-x)$. Find the x-value that maximises area.",
    "solution": "$A=10x-x^2$ has vertex at $x=5$.",
    "xp": 16,
    "answer": "5"
  },
  {
    "id": "m34-v6-app-tangent",
    "course": "methods-34",
    "topic": "applications",
    "topicLabel": "Applications of Calculus",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Find the tangent line to $y=x^2$ at $x=2$.",
    "solution": "The point is $(2,4)$ and gradient is $2x=4$, so $y-4=4(x-2)$.",
    "xp": 12,
    "answers": [
      "y=4x-4",
      "$y=4x-4$"
    ]
  },
  {
    "id": "m34-v6-app-rate",
    "course": "methods-34",
    "topic": "applications",
    "topicLabel": "Applications of Calculus",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $s(t)=t^3-6t^2+9t$, find the velocity at $t=2$.",
    "solution": "$v(t)=3t^2-12t+9$, so $v(2)=-3$.",
    "xp": 16,
    "answer": "-3"
  },
  {
    "id": "m34-v6-int-def",
    "course": "methods-34",
    "topic": "integration",
    "topicLabel": "Integration",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Evaluate $\\int_1^3 (2x+1)\\,dx$.",
    "solution": "Antiderivative $x^2+x$ gives $(12)-(2)=10$.",
    "xp": 12,
    "answer": "10"
  },
  {
    "id": "m34-v6-int-reverse",
    "course": "methods-34",
    "topic": "integration",
    "topicLabel": "Integration",
    "difficulty": "Advanced",
    "type": "text",
    "prompt": "Evaluate $\\int 6x(x^2+1)^2\\,dx$.",
    "solution": "Let $u=x^2+1$, $du=2x\\,dx$; the integral becomes $3\\int u^2du=u^3+C$.",
    "xp": 16,
    "answers": [
      "(x^2+1)^3+C",
      "(x^2+1)^3 + C"
    ]
  },
  {
    "id": "m34-v6-int-area",
    "course": "methods-34",
    "topic": "integration",
    "topicLabel": "Integration",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Find the area between $y=x$ and the x-axis from $x=0$ to $x=4$.",
    "solution": "$\\int_0^4 xdx=8$.",
    "xp": 12,
    "answer": "8"
  },
  {
    "id": "m34-v6-int-sym",
    "course": "methods-34",
    "topic": "integration",
    "topicLabel": "Integration",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "Evaluate $\\int_{-2}^{2} x^3\\,dx$.",
    "solution": "$x^3$ is odd and the limits are symmetric, so the integral is 0.",
    "xp": 16,
    "answer": "0"
  },
  {
    "id": "m34-v6-prob-ind",
    "course": "methods-34",
    "topic": "probability",
    "topicLabel": "Probability",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "If $A$ and $B$ are independent with $P(A)=0.4$ and $P(B)=0.5$, find $P(A\\cap B)$.",
    "solution": "Independence gives $P(A\\cap B)=P(A)P(B)=0.2$.",
    "xp": 12,
    "answer": "0.2"
  },
  {
    "id": "m34-v6-prob-binom",
    "course": "methods-34",
    "topic": "probability",
    "topicLabel": "Probability",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $X\\sim Bin(5,0.2)$, find $P(X=0)$ to 4 d.p.",
    "solution": "$P(X=0)=0.8^5=0.32768$.",
    "xp": 16,
    "answer": "0.3277",
    "tolerance": 0.0001
  },
  {
    "id": "m34-v6-rv-mean",
    "course": "methods-34",
    "topic": "random-variables",
    "topicLabel": "Random Variables",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "A discrete random variable has $P(X=0)=0.2$, $P(X=1)=0.5$, $P(X=2)=0.3$. Find $E(X)$.",
    "solution": "$E(X)=0(0.2)+1(0.5)+2(0.3)=1.1$.",
    "xp": 12,
    "answer": "1.1"
  },
  {
    "id": "m34-v6-rv-var",
    "course": "methods-34",
    "topic": "random-variables",
    "topicLabel": "Random Variables",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $E(X)=3$ and $E(X^2)=11$, find $Var(X)$.",
    "solution": "$Var(X)=E(X^2)-[E(X)]^2=11-9=2$.",
    "xp": 16,
    "answer": "2"
  },
  {
    "id": "m34-v6-rv-pdf",
    "course": "methods-34",
    "topic": "random-variables",
    "topicLabel": "Random Variables",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "For $f(x)=kx$ on $0\\le x\\le2$, find $k$ so that $f$ is a probability density.",
    "solution": "$\\int_0^2 kx dx=2k=1$, so $k=1/2$.",
    "xp": 12,
    "answer": "0.5"
  },
  {
    "id": "m34-v6-rv-normal",
    "course": "methods-34",
    "topic": "random-variables",
    "topicLabel": "Random Variables",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "If $X\\sim N(50,10^2)$, find the z-score of $x=70$.",
    "solution": "$z=(70-50)/10=2$.",
    "xp": 12,
    "answer": "2"
  },
  {
    "id": "m34-v6-exam-mixed1",
    "course": "methods-34",
    "topic": "exam-prep",
    "topicLabel": "Exam Preparation",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "Let $f(x)=x^3-3x$. Find the local maximum y-value.",
    "solution": "$f'(x)=3(x^2-1)$; at $x=-1$, $f(-1)=2$ and this is the local maximum.",
    "xp": 16,
    "answer": "2"
  },
  {
    "id": "m34-v6-exam-mixed2",
    "course": "methods-34",
    "topic": "exam-prep",
    "topicLabel": "Exam Preparation",
    "difficulty": "Separator",
    "type": "numeric",
    "prompt": "If $X\\sim Bin(10,0.3)$, find $E(2X-1)$.",
    "solution": "$E(X)=3$, so $E(2X-1)=2(3)-1=5$.",
    "xp": 22,
    "answer": "5"
  },
  {
    "id": "s12-v6-proof-logic",
    "course": "specialist-12",
    "topic": "number-proof",
    "topicLabel": "Number & Proof",
    "difficulty": "Core",
    "type": "choice",
    "prompt": "The negation of “all real x satisfy P(x)” is…",
    "solution": "Negating a universal statement produces an existential counterexample.",
    "xp": 10,
    "answer": "there exists a real x for which P(x) is false",
    "choices": [
      "all real x fail P(x)",
      "there exists a real x for which P(x) is false",
      "P(x) is always true",
      "no real x exists"
    ]
  },
  {
    "id": "s12-v6-proof-even",
    "course": "specialist-12",
    "topic": "number-proof",
    "topicLabel": "Number & Proof",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "If $n$ is even, write $n$ in a form suitable for a direct proof.",
    "solution": "By definition, an even integer is twice another integer.",
    "xp": 12,
    "answers": [
      "n=2k",
      "$n=2k$",
      "2k"
    ]
  },
  {
    "id": "s12-v6-proof-direct",
    "course": "specialist-12",
    "topic": "number-proof",
    "topicLabel": "Number & Proof",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Show algebraically that the sum of two odd integers is even. Enter the simplified form of $(2a+1)+(2b+1)$.",
    "solution": "$(2a+1)+(2b+1)=2(a+b+1)$, twice an integer.",
    "xp": 12,
    "answers": [
      "2(a+b+1)",
      "2a+2b+2"
    ]
  },
  {
    "id": "s12-v6-proof-contr",
    "course": "specialist-12",
    "topic": "number-proof",
    "topicLabel": "Number & Proof",
    "difficulty": "Advanced",
    "type": "choice",
    "prompt": "A proof by contradiction begins by…",
    "solution": "Assume the claim is false and derive an impossibility.",
    "xp": 16,
    "answer": "assuming the negation of the desired conclusion",
    "choices": [
      "assuming the claim is true",
      "assuming the negation of the desired conclusion",
      "checking examples",
      "drawing a graph"
    ]
  },
  {
    "id": "s12-v6-induction1",
    "course": "specialist-12",
    "topic": "number-proof",
    "topicLabel": "Number & Proof",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "For the induction claim $1+2+\\cdots+n=n(n+1)/2$, what is the RHS when $n=1$?",
    "solution": "Substitute $n=1$: $1(2)/2=1$.",
    "xp": 12,
    "answer": "1"
  },
  {
    "id": "s12-v6-induction2",
    "course": "specialist-12",
    "topic": "number-proof",
    "topicLabel": "Number & Proof",
    "difficulty": "Advanced",
    "type": "text",
    "prompt": "In induction, if the statement is assumed true for $n=k$, the next case to prove is…",
    "solution": "The inductive step proves truth at $k+1$ from truth at $k$.",
    "xp": 16,
    "answers": [
      "n=k+1",
      "k+1",
      "$n=k+1$"
    ]
  },
  {
    "id": "s12-v6-pf-repeat",
    "course": "specialist-12",
    "topic": "algebra",
    "topicLabel": "Algebra & Partial Fractions",
    "difficulty": "Advanced",
    "type": "choice",
    "prompt": "For $\\frac{1}{(x-1)^2(x+2)}$, the correct decomposition form includes…",
    "solution": "Repeated linear factors require a term for every power up to the multiplicity.",
    "xp": 16,
    "answer": "$\\frac{A}{x-1}+\\frac{B}{(x-1)^2}+\\frac{C}{x+2}$",
    "choices": [
      "$A/(x-1)+B/(x+2)$",
      "$A/(x-1)^2+B/(x+2)$",
      "$\\frac{A}{x-1}+\\frac{B}{(x-1)^2}+\\frac{C}{x+2}$"
    ]
  },
  {
    "id": "s12-v6-modulus",
    "course": "specialist-12",
    "topic": "algebra",
    "topicLabel": "Algebra & Partial Fractions",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Solve $|2x-3|=5$ and enter the sum of the solutions.",
    "solution": "Solutions are $x=4$ and $x=-1$, whose sum is 3.",
    "xp": 12,
    "answer": "3"
  },
  {
    "id": "s12-v6-seq-arith",
    "course": "specialist-12",
    "topic": "algebra",
    "topicLabel": "Algebra & Partial Fractions",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "An arithmetic sequence has first term 5 and common difference 3. Find the 10th term.",
    "solution": "$a_{10}=5+9(3)=32$.",
    "xp": 10,
    "answer": "32"
  },
  {
    "id": "s12-v6-series-geom",
    "course": "specialist-12",
    "topic": "algebra",
    "topicLabel": "Algebra & Partial Fractions",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Find the sum of the first 5 terms of $3,6,12,\\dots$.",
    "solution": "$S_5=3(2^5-1)/(2-1)=93$.",
    "xp": 12,
    "answer": "93"
  },
  {
    "id": "s12-v6-fn-recip",
    "course": "specialist-12",
    "topic": "functions",
    "topicLabel": "Functions",
    "difficulty": "VCAA",
    "type": "choice",
    "prompt": "For $f(x)=1/(x^2-4)$, vertical asymptotes occur at…",
    "solution": "Denominator zeros occur at $x=2,-2$.",
    "xp": 12,
    "answer": "$x=\\pm2$",
    "choices": [
      "$x=0$",
      "$x=\\pm2$",
      "$y=0$",
      "$x=4$"
    ]
  },
  {
    "id": "s12-v6-fn-inverse",
    "course": "specialist-12",
    "topic": "functions",
    "topicLabel": "Functions",
    "difficulty": "Advanced",
    "type": "text",
    "prompt": "Find the inverse of $f(x)=\\frac{x-1}{x+2}$.",
    "solution": "Let $y=(x-1)/(x+2)$ and solve for $x$: $x=(1+2y)/(1-y)$.",
    "xp": 16,
    "answers": [
      "(1+2x)/(1-x)",
      "(2x+1)/(1-x)"
    ]
  },
  {
    "id": "s12-v6-trig-cosrule",
    "course": "specialist-12",
    "topic": "trig",
    "topicLabel": "Trigonometry",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Two sides of a triangle are 5 and 7 with included angle $60^\\circ$. Find the squared length of the third side.",
    "solution": "$c^2=25+49-70(1/2)=39$.",
    "xp": 12,
    "answer": "39"
  },
  {
    "id": "s12-v6-trig-area",
    "course": "specialist-12",
    "topic": "trig",
    "topicLabel": "Trigonometry",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Find the area of a triangle with sides 6 and 8 and included angle $30^\\circ$.",
    "solution": "$A=\\frac12(6)(8)\\sin30^\\circ=12$.",
    "xp": 12,
    "answer": "12"
  },
  {
    "id": "s12-v6-trig-id",
    "course": "specialist-12",
    "topic": "trig",
    "topicLabel": "Trigonometry",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Simplify $1-\\sin^2x$.",
    "solution": "From $\\sin^2x+\\cos^2x=1$, rearrange.",
    "xp": 12,
    "answers": [
      "cos^2(x)",
      "$\\cos^2x$",
      "cos(x)^2"
    ]
  },
  {
    "id": "s12-v6-trig-combine",
    "course": "specialist-12",
    "topic": "trig",
    "topicLabel": "Trigonometry",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "Write $3\\sin x+4\\cos x=R\\sin(x+\\alpha)$. Find $R$.",
    "solution": "$R=\\sqrt{3^2+4^2}=5$.",
    "xp": 16,
    "answer": "5"
  },
  {
    "id": "s12-v6-v-comp",
    "course": "specialist-12",
    "topic": "vectors",
    "topicLabel": "Vectors",
    "difficulty": "Core",
    "type": "text",
    "prompt": "Find $2(1,-3)+(4,5)$.",
    "solution": "$(2,-6)+(4,5)=(6,-1)$.",
    "xp": 10,
    "answers": [
      "(6,-1)",
      "6,-1"
    ]
  },
  {
    "id": "s12-v6-v-dot",
    "course": "specialist-12",
    "topic": "vectors",
    "topicLabel": "Vectors",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Find $(2,1)\\cdot(3,-4)$.",
    "solution": "$2(3)+1(-4)=2$.",
    "xp": 12,
    "answer": "2"
  },
  {
    "id": "s12-v6-v-angle",
    "course": "specialist-12",
    "topic": "vectors",
    "topicLabel": "Vectors",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $|a|=2$, $|b|=3$ and $a\\cdot b=3$, find $\\cos\\theta$.",
    "solution": "$\\cos\\theta=3/(2\\cdot3)=1/2$.",
    "xp": 16,
    "answer": "0.5"
  },
  {
    "id": "s12-v6-v-mid",
    "course": "specialist-12",
    "topic": "vectors",
    "topicLabel": "Vectors",
    "difficulty": "Core",
    "type": "text",
    "prompt": "Find the midpoint of points $(2,-1)$ and $(6,5)$.",
    "solution": "Average corresponding coordinates.",
    "xp": 10,
    "answers": [
      "(4,2)",
      "4,2"
    ]
  },
  {
    "id": "s12-v6-cx-mod",
    "course": "specialist-12",
    "topic": "complex",
    "topicLabel": "Complex Numbers",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "Find $|3+4i|$.",
    "solution": "$|3+4i|=\\sqrt{3^2+4^2}=5$.",
    "xp": 10,
    "answer": "5"
  },
  {
    "id": "s12-v6-cx-conj",
    "course": "specialist-12",
    "topic": "complex",
    "topicLabel": "Complex Numbers",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Find the conjugate of $2-5i$.",
    "solution": "Change the sign of the imaginary part.",
    "xp": 12,
    "answers": [
      "2+5i",
      "$2+5i$"
    ]
  },
  {
    "id": "s12-v6-cx-arg",
    "course": "specialist-12",
    "topic": "complex",
    "topicLabel": "Complex Numbers",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "For $z=1+i$, find its principal argument in radians using decimal form to 3 d.p.",
    "solution": "$\\arg(1+i)=\\pi/4\\approx0.785$.",
    "xp": 12,
    "answer": "0.785",
    "tolerance": 0.001
  },
  {
    "id": "s12-v6-cx-polar",
    "course": "specialist-12",
    "topic": "complex",
    "topicLabel": "Complex Numbers",
    "difficulty": "Advanced",
    "type": "choice",
    "prompt": "The modulus of $(2e^{i\\pi/3})(3e^{-i\\pi/6})$ is…",
    "solution": "Multiply moduli: $2\\cdot3=6$.",
    "xp": 16,
    "answer": "6",
    "choices": [
      "1",
      "5",
      "6",
      "12"
    ]
  },
  {
    "id": "s12-v6-cal-prod",
    "course": "specialist-12",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Differentiate $x^2e^x$.",
    "solution": "Product rule gives $2xe^x+x^2e^x$.",
    "xp": 12,
    "answers": [
      "2x e^x+x^2 e^x",
      "e^x(x^2+2x)",
      "$e^x(x^2+2x)$"
    ]
  },
  {
    "id": "s12-v6-cal-chain",
    "course": "specialist-12",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "Advanced",
    "type": "text",
    "prompt": "Differentiate $\\sin(x^2)$.",
    "solution": "Chain rule gives $\\cos(x^2)\\cdot2x$.",
    "xp": 16,
    "answers": [
      "2x cos(x^2)",
      "$2x\\cos(x^2)$"
    ]
  },
  {
    "id": "s12-v6-cal-int",
    "course": "specialist-12",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Evaluate $\\int (3x^2-4x)\\,dx$.",
    "solution": "Integrate term by term.",
    "xp": 12,
    "answers": [
      "x^3-2x^2+C",
      "$x^3-2x^2+C$"
    ]
  },
  {
    "id": "s12-v6-cal-def",
    "course": "specialist-12",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "Evaluate $\\int_0^1 (4x^3+2)\\,dx$.",
    "solution": "Antiderivative $x^4+2x$ gives 3.",
    "xp": 16,
    "answer": "3"
  },
  {
    "id": "s12-v6-kin-disp",
    "course": "specialist-12",
    "topic": "kinematics",
    "topicLabel": "Kinematics",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "A particle has velocity $v(t)=3t^2-6t$. Find its displacement from $t=0$ to $t=2$.",
    "solution": "$\\int_0^2(3t^2-6t)dt=[t^3-3t^2]_0^2=8-12=-4$.",
    "xp": 12,
    "answer": "-4"
  },
  {
    "id": "s12-v6-kin-turn",
    "course": "specialist-12",
    "topic": "kinematics",
    "topicLabel": "Kinematics",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "For $v(t)=t^2-5t+6$, find the later positive time at which the particle is at rest.",
    "solution": "$v=(t-2)(t-3)$, so rest times are 2 and 3.",
    "xp": 16,
    "answer": "3"
  },
  {
    "id": "s12-v6-check1",
    "course": "specialist-12",
    "topic": "number-proof",
    "topicLabel": "Kinematics",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $n=2k+1$ is odd, find the remainder of $n^2$ upon division by 4.",
    "solution": "$n^2=4k^2+4k+1=4k(k+1)+1$.",
    "xp": 16,
    "answer": "1"
  },
  {
    "id": "s12-v6-check2",
    "course": "specialist-12",
    "topic": "algebra",
    "topicLabel": "Algebra & Partial Fractions",
    "difficulty": "Separator",
    "type": "numeric",
    "prompt": "If $|x-2|+|x+2|=8$, find the sum of all real solutions.",
    "solution": "For $|x|>2$, the solutions are $x=4,-4$, whose sum is 0.",
    "xp": 22,
    "answer": "0"
  },
  {
    "id": "s34-v6-fn-mod",
    "course": "specialist-34",
    "topic": "functions",
    "topicLabel": "Functions & Graphs",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Solve $|2x-1|=7$ and enter the product of the solutions.",
    "solution": "Solutions are $4$ and $-3$; product $-12$.",
    "xp": 12,
    "answer": "-12"
  },
  {
    "id": "s34-v6-fn-rat",
    "course": "specialist-34",
    "topic": "functions",
    "topicLabel": "Functions & Graphs",
    "difficulty": "Advanced",
    "type": "choice",
    "prompt": "For $f(x)=\\frac{x+1}{x^2-4}$, the vertical asymptotes are…",
    "solution": "The denominator factors as $(x-2)(x+2)$ and neither factor cancels.",
    "xp": 16,
    "answer": "$x=\\pm2$",
    "choices": [
      "$x=-1$",
      "$x=2$ only",
      "$x=\\pm2$",
      "$y=0$"
    ]
  },
  {
    "id": "s34-v6-fn-recipquad",
    "course": "specialist-34",
    "topic": "functions",
    "topicLabel": "Functions & Graphs",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "For $f(x)=1/(x^2-6x+8)$, how many vertical asymptotes are there?",
    "solution": "Denominator $(x-2)(x-4)$ gives two non-cancelled zeros.",
    "xp": 16,
    "answer": "2"
  },
  {
    "id": "s34-v6-fn-stat",
    "course": "specialist-34",
    "topic": "functions",
    "topicLabel": "Functions & Graphs",
    "difficulty": "Separator",
    "type": "numeric",
    "prompt": "For $f(x)=1/(x^2+1)$, find the x-coordinate of its stationary point.",
    "solution": "$f'(x)=-2x/(x^2+1)^2=0$ only at $x=0$.",
    "xp": 22,
    "answer": "0"
  },
  {
    "id": "s34-v6-fn-invtrig",
    "course": "specialist-34",
    "topic": "functions",
    "topicLabel": "Functions & Graphs",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Evaluate $\\arcsin(1/2)$ on its principal range.",
    "solution": "$\\arcsin(1/2)=\\pi/6$.",
    "xp": 12,
    "answer": "pi/6"
  },
  {
    "id": "s34-v6-fn-compose",
    "course": "specialist-34",
    "topic": "functions",
    "topicLabel": "Functions & Graphs",
    "difficulty": "Advanced",
    "type": "choice",
    "prompt": "The range of $y=\\arccos x$ is…",
    "solution": "Arccos is defined using the principal branch $0\\le y\\le\\pi$.",
    "xp": 16,
    "answer": "$[0,\\pi]$",
    "choices": [
      "$[-\\pi/2,\\pi/2]$",
      "$[0,\\pi]$",
      "all real numbers",
      "$[0,2\\pi]$"
    ]
  },
  {
    "id": "s34-v6-cx-polar",
    "course": "specialist-34",
    "topic": "complex",
    "topicLabel": "Complex Numbers",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "If $z=2e^{i\\pi/3}$, find $|z^3|$.",
    "solution": "$|z^3|=|z|^3=2^3=8$.",
    "xp": 12,
    "answer": "8"
  },
  {
    "id": "s34-v6-cx-arg",
    "course": "specialist-34",
    "topic": "complex",
    "topicLabel": "Complex Numbers",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $z_1$ has argument $\\pi/4$ and $z_2$ has argument $\\pi/6$, find the argument of $z_1z_2$ in units of $\\pi$ (enter as a decimal).",
    "solution": "Arguments add: $\\pi/4+\\pi/6=5\\pi/12$, so coefficient $5/12$.",
    "xp": 16,
    "answer": "0.4166666667",
    "tolerance": 1e-06
  },
  {
    "id": "s34-v6-cx-demoivre",
    "course": "specialist-34",
    "topic": "complex",
    "topicLabel": "Complex Numbers",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Use de Moivre to write $(\\cos\\theta+i\\sin\\theta)^4$ in trig form.",
    "solution": "de Moivre: $(\\cos\\theta+i\\sin\\theta)^n=\\cos n\\theta+i\\sin n\\theta$.",
    "xp": 12,
    "answers": [
      "cos(4theta)+i sin(4theta)",
      "$\\cos4\\theta+i\\sin4\\theta$"
    ]
  },
  {
    "id": "s34-v6-cx-roots",
    "course": "specialist-34",
    "topic": "complex",
    "topicLabel": "Complex Numbers",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "How many distinct complex solutions does $z^5=1$ have?",
    "solution": "The fifth roots of unity are five equally spaced points on the unit circle.",
    "xp": 16,
    "answer": "5"
  },
  {
    "id": "s34-v6-cx-locus1",
    "course": "specialist-34",
    "topic": "complex",
    "topicLabel": "Complex Numbers",
    "difficulty": "VCAA",
    "type": "choice",
    "prompt": "The locus $|z-2|=3$ is…",
    "solution": "Distance from z to the point 2 is fixed at 3.",
    "xp": 12,
    "answer": "a circle centred at 2 with radius 3",
    "choices": [
      "a line",
      "a circle centred at 2 with radius 3",
      "a circle centred at 3 with radius 2",
      "a ray"
    ]
  },
  {
    "id": "s34-v6-cx-locus2",
    "course": "specialist-34",
    "topic": "complex",
    "topicLabel": "Complex Numbers",
    "difficulty": "Advanced",
    "type": "choice",
    "prompt": "The locus $|z-1|=|z+1|$ is…",
    "solution": "Points equidistant from 1 and -1 lie on the perpendicular bisector, $x=0$.",
    "xp": 16,
    "answer": "the imaginary axis",
    "choices": [
      "the real axis",
      "the imaginary axis",
      "the unit circle",
      "x=1"
    ]
  },
  {
    "id": "s34-v6-v-proj",
    "course": "specialist-34",
    "topic": "vectors",
    "topicLabel": "Vectors",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "If $a=(3,4)$ and $b=(1,0)$, find the scalar projection of $a$ on $b$.",
    "solution": "$a\\cdot b/|b|=3$.",
    "xp": 12,
    "answer": "3"
  },
  {
    "id": "s34-v6-v-angle",
    "course": "specialist-34",
    "topic": "vectors",
    "topicLabel": "Vectors",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $a=(1,1,0)$ and $b=(1,-1,0)$, find $a\\cdot b$.",
    "solution": "Dot product $1-1=0$, so the vectors are perpendicular.",
    "xp": 16,
    "answer": "0"
  },
  {
    "id": "s34-v6-v-line",
    "course": "specialist-34",
    "topic": "vectors",
    "topicLabel": "Vectors",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Give a vector equation of the line through $(1,2,3)$ parallel to $(2,-1,4)$.",
    "solution": "A line is point plus scalar multiple of a direction vector.",
    "xp": 12,
    "answers": [
      "r=(1,2,3)+t(2,-1,4)",
      "(1,2,3)+t(2,-1,4)"
    ]
  },
  {
    "id": "s34-v6-v-intersect",
    "course": "specialist-34",
    "topic": "vectors",
    "topicLabel": "Vectors",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "For $r=(0,0)+t(1,2)$, what is y when x=3?",
    "solution": "x=t, so t=3 and y=2t=6.",
    "xp": 16,
    "answer": "6"
  },
  {
    "id": "s34-v6-v-3d",
    "course": "specialist-34",
    "topic": "vectors",
    "topicLabel": "Vectors",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Find the magnitude of $(2,-1,2)$.",
    "solution": "$\\sqrt{4+1+4}=3$.",
    "xp": 12,
    "answer": "3"
  },
  {
    "id": "s34-v6-v-geom",
    "course": "specialist-34",
    "topic": "vectors",
    "topicLabel": "Vectors",
    "difficulty": "Separator",
    "type": "numeric",
    "prompt": "Points A(0,0,0), B(2,0,0), C(0,3,0). Find the area of triangle ABC.",
    "solution": "It is a right triangle with perpendicular side lengths 2 and 3: area $=3$.",
    "xp": 22,
    "answer": "3"
  },
  {
    "id": "s34-v6-cal-invtrig",
    "course": "specialist-34",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Differentiate $\\arctan x$.",
    "solution": "Standard inverse-trig derivative.",
    "xp": 12,
    "answers": [
      "1/(1+x^2)",
      "$1/(1+x^2)$"
    ]
  },
  {
    "id": "s34-v6-cal-invchain",
    "course": "specialist-34",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "Advanced",
    "type": "text",
    "prompt": "Differentiate $\\arcsin(2x)$.",
    "solution": "Chain rule: $2/\\sqrt{1-(2x)^2}$.",
    "xp": 16,
    "answers": [
      "2/sqrt(1-4x^2)",
      "$2/\\sqrt{1-4x^2}$"
    ]
  },
  {
    "id": "s34-v6-cal-implicit2",
    "course": "specialist-34",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "Advanced",
    "type": "text",
    "prompt": "For $x^2+xy+y^2=7$, find $dy/dx$.",
    "solution": "Differentiate: $2x+x y'+y+2yy'=0$, then collect $y'$.",
    "xp": 16,
    "answers": [
      "-(2x+y)/(x+2y)",
      "$-(2x+y)/(x+2y)$"
    ]
  },
  {
    "id": "s34-v6-cal-implicit-point",
    "course": "specialist-34",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "Separator",
    "type": "numeric",
    "prompt": "For $x^2+xy+y^2=7$, find $dy/dx$ at $(1,2)$.",
    "solution": "Using $-(2x+y)/(x+2y)$ gives $-4/5=-0.8$.",
    "xp": 22,
    "answer": "-0.8",
    "tolerance": 1e-09
  },
  {
    "id": "s34-v6-cal-parts",
    "course": "specialist-34",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Evaluate $\\int xe^x\\,dx$.",
    "solution": "Integration by parts with $u=x$, $dv=e^x dx$.",
    "xp": 12,
    "answers": [
      "xe^x-e^x+C",
      "e^x(x-1)+C",
      "$xe^x-e^x+C$"
    ]
  },
  {
    "id": "s34-v6-cal-parts2",
    "course": "specialist-34",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "Advanced",
    "type": "text",
    "prompt": "Evaluate $\\int x\\cos x\\,dx$.",
    "solution": "Parts: $u=x$, $dv=\\cos xdx$ gives $x\\sin x-\\int\\sin xdx=x\\sin x+\\cos x+C$.",
    "xp": 16,
    "answers": [
      "x sin(x)+cos(x)+C",
      "$x\\sin x+\\cos x+C$"
    ]
  },
  {
    "id": "s34-v6-cal-pfint",
    "course": "specialist-34",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "Advanced",
    "type": "text",
    "prompt": "Decompose $\\frac{1}{x(x+1)}$.",
    "solution": "$1=A(x+1)+Bx$ gives $A=1,B=-1$.",
    "xp": 16,
    "answers": [
      "1/x-1/(x+1)",
      "$1/x-1/(x+1)$"
    ]
  },
  {
    "id": "s34-v6-cal-pfint2",
    "course": "specialist-34",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "Separator",
    "type": "text",
    "prompt": "Evaluate $\\int \\frac{1}{x(x+1)}dx$.",
    "solution": "Integrate the partial fractions term-by-term.",
    "xp": 22,
    "answers": [
      "ln|x|-ln|x+1|+C",
      "ln(abs(x))-ln(abs(x+1))+C",
      "$\\ln|x|-\\ln|x+1|+C$"
    ]
  },
  {
    "id": "s34-v6-cal-subdef",
    "course": "specialist-34",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "Evaluate $\\int_0^1 2x(x^2+1)^2dx$.",
    "solution": "Let $u=x^2+1$: $\\int_1^2u^2du=[u^3/3]_1^2=7/3$.",
    "xp": 16,
    "answer": "2.3333333333",
    "tolerance": 1e-06
  },
  {
    "id": "s34-v6-cal-area",
    "course": "specialist-34",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "Separator",
    "type": "numeric",
    "prompt": "Find $\\int_{-1}^{1}(1-x^2)dx$.",
    "solution": "$[x-x^3/3]_{-1}^{1}=4/3$.",
    "xp": 22,
    "answer": "1.3333333333",
    "tolerance": 1e-06
  },
  {
    "id": "s34-v6-de-sep",
    "course": "specialist-34",
    "topic": "differential-equations",
    "topicLabel": "Differential Equations",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Solve $dy/dx=3x^2$ given $y(0)=2$.",
    "solution": "Integrate: $y=x^3+C$, then $C=2$.",
    "xp": 12,
    "answers": [
      "y=x^3+2",
      "x^3+2"
    ]
  },
  {
    "id": "s34-v6-de-sep2",
    "course": "specialist-34",
    "topic": "differential-equations",
    "topicLabel": "Differential Equations",
    "difficulty": "Advanced",
    "type": "text",
    "prompt": "Solve $dy/dx=xy$ in implicit separated form.",
    "solution": "Separate $dy/y=x dx$, then integrate.",
    "xp": 16,
    "answers": [
      "ln|y|=x^2/2+C",
      "ln(abs(y))=x^2/2+C",
      "$\\ln|y|=x^2/2+C$"
    ]
  },
  {
    "id": "s34-v6-de-exp",
    "course": "specialist-34",
    "topic": "differential-equations",
    "topicLabel": "Differential Equations",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "For $dy/dt=0.2y$ with $y(0)=50$, find $y(0)$ (consistency check).",
    "solution": "The initial condition directly specifies $y(0)=50$.",
    "xp": 12,
    "answer": "50"
  },
  {
    "id": "s34-v6-de-half",
    "course": "specialist-34",
    "topic": "differential-equations",
    "topicLabel": "Differential Equations",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "For $y=100e^{-0.1t}$, find the exact time when $y=50$ in terms of ln 2 as a coefficient (enter coefficient only).",
    "solution": "$e^{-0.1t}=1/2$ gives $t=10\\ln2$.",
    "xp": 16,
    "answer": "10"
  },
  {
    "id": "s34-v6-de-field",
    "course": "specialist-34",
    "topic": "differential-equations",
    "topicLabel": "Differential Equations",
    "difficulty": "VCAA",
    "type": "choice",
    "prompt": "For $dy/dx=y$, slopes on the line $y=0$ are…",
    "solution": "The derivative equals y, so at y=0 the slope is 0.",
    "xp": 12,
    "answer": "0",
    "choices": [
      "0",
      "1",
      "x",
      "undefined"
    ]
  },
  {
    "id": "s34-v6-de-eq",
    "course": "specialist-34",
    "topic": "differential-equations",
    "topicLabel": "Differential Equations",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "For $dy/dt=y(1-y/10)$, find the positive equilibrium value.",
    "solution": "Equilibria satisfy $y(1-y/10)=0$, giving 0 and 10.",
    "xp": 16,
    "answer": "10"
  },
  {
    "id": "s34-v6-stat-bin",
    "course": "specialist-34",
    "topic": "statistics",
    "topicLabel": "Probability & Statistics",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "If $X\\sim Bin(20,0.4)$, find $E(X)$.",
    "solution": "$E(X)=np=20(0.4)=8$.",
    "xp": 12,
    "answer": "8"
  },
  {
    "id": "s34-v6-stat-var",
    "course": "specialist-34",
    "topic": "statistics",
    "topicLabel": "Probability & Statistics",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $X\\sim Bin(20,0.4)$, find $Var(X)$.",
    "solution": "$Var(X)=np(1-p)=20(0.4)(0.6)=4.8$.",
    "xp": 16,
    "answer": "4.8"
  },
  {
    "id": "s34-v6-stat-normal",
    "course": "specialist-34",
    "topic": "statistics",
    "topicLabel": "Probability & Statistics",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "For $X\\sim N(100,15^2)$, find the z-score of 130.",
    "solution": "$z=(130-100)/15=2$.",
    "xp": 12,
    "answer": "2"
  },
  {
    "id": "s34-v6-stat-transform",
    "course": "specialist-34",
    "topic": "statistics",
    "topicLabel": "Probability & Statistics",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $E(X)=4$ and $Var(X)=9$, find $Var(3X-2)$.",
    "solution": "$Var(aX+b)=a^2Var(X)=9(9)=81$.",
    "xp": 16,
    "answer": "81"
  },
  {
    "id": "s34-v6-stat-ci",
    "course": "specialist-34",
    "topic": "statistics",
    "topicLabel": "Probability & Statistics",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "A sample proportion is 0.60 with standard error 0.05. Using a rough 95% interval $\\hat p\\pm2SE$, find the lower endpoint.",
    "solution": "Lower endpoint $0.60-0.10=0.50$.",
    "xp": 16,
    "answer": "0.5"
  },
  {
    "id": "s34-v6-stat-se",
    "course": "specialist-34",
    "topic": "statistics",
    "topicLabel": "Probability & Statistics",
    "difficulty": "Separator",
    "type": "numeric",
    "prompt": "If $p=0.5$ and $n=100$, compute $\\sqrt{p(1-p)/n}$.",
    "solution": "$\\sqrt{0.25/100}=0.05$.",
    "xp": 22,
    "answer": "0.05"
  },
  {
    "id": "s34-v6-mech-force",
    "course": "specialist-34",
    "topic": "mechanics",
    "topicLabel": "Mechanics",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "A 4 kg particle has resultant force 18 N. Find its acceleration.",
    "solution": "$a=F/m=18/4=4.5$.",
    "xp": 10,
    "answer": "4.5"
  },
  {
    "id": "s34-v6-mech-fric",
    "course": "specialist-34",
    "topic": "mechanics",
    "topicLabel": "Mechanics",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "A 10 N horizontal force acts right and 4 N friction acts left on a 2 kg mass. Find acceleration.",
    "solution": "Resultant force is 6 N, so $a=6/2=3$.",
    "xp": 12,
    "answer": "3"
  },
  {
    "id": "s34-v6-mech-proj",
    "course": "specialist-34",
    "topic": "mechanics",
    "topicLabel": "Mechanics",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "A projectile is launched at 20 m/s at $30^\\circ$. Find its initial horizontal speed.",
    "solution": "Horizontal component $20\\cos30^\\circ=10\\sqrt3\\approx17.32$.",
    "xp": 12,
    "answer": "17.320508",
    "tolerance": 1e-05
  },
  {
    "id": "s34-v6-mech-vy",
    "course": "specialist-34",
    "topic": "mechanics",
    "topicLabel": "Mechanics",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "With $g=10$, a projectile is launched vertically upward at 30 m/s. Find time to reach maximum height.",
    "solution": "$v=30-10t=0$ gives $t=3$.",
    "xp": 16,
    "answer": "3"
  },
  {
    "id": "s34-v6-mech-motion",
    "course": "specialist-34",
    "topic": "mechanics",
    "topicLabel": "Mechanics",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $a(t)=6t$ and $v(0)=2$, find $v(2)$.",
    "solution": "Integrate: $v=3t^2+2$, so $v(2)=14$.",
    "xp": 16,
    "answer": "14"
  },
  {
    "id": "s34-v6-mech-distance",
    "course": "specialist-34",
    "topic": "mechanics",
    "topicLabel": "Mechanics",
    "difficulty": "Separator",
    "type": "numeric",
    "prompt": "A particle has $v(t)=t-2$ for $0\\le t\\le4$. Find total distance travelled.",
    "solution": "It moves 2 units backward then 2 forward: total 4.",
    "xp": 22,
    "answer": "4"
  },
  {
    "id": "m12-v6b-exp-growth",
    "course": "methods-12",
    "topic": "exp-log",
    "topicLabel": "Exponentials & Logarithms",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "A quantity follows $A=200(1.05)^t$. Find $A$ when $t=2$.",
    "solution": "$A=200(1.05)^2=220.5$.",
    "xp": 12,
    "answer": "220.5"
  },
  {
    "id": "m12-v6b-exp-half",
    "course": "methods-12",
    "topic": "exp-log",
    "topicLabel": "Exponentials & Logarithms",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "For $A=80(1/2)^t$, find the time when $A=20$.",
    "solution": "$(1/2)^t=1/4=(1/2)^2$, so $t=2$.",
    "xp": 16,
    "answer": "2"
  },
  {
    "id": "m12-v6b-trig-id",
    "course": "methods-12",
    "topic": "trig",
    "topicLabel": "Trigonometry",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Simplify $\\sin^2x+\\cos^2x$.",
    "solution": "This is the fundamental Pythagorean identity.",
    "xp": 12,
    "answers": [
      "1",
      "$1$"
    ]
  },
  {
    "id": "m12-v6b-trig-double",
    "course": "methods-12",
    "topic": "trig",
    "topicLabel": "Trigonometry",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $\\sin x=3/5$ and $\\cos x=4/5$, find $\\sin 2x$.",
    "solution": "$\\sin2x=2\\sin x\\cos x=24/25=0.96$.",
    "xp": 16,
    "answer": "0.96"
  },
  {
    "id": "m12-v6b-int-indef",
    "course": "methods-12",
    "topic": "integration",
    "topicLabel": "Integration",
    "difficulty": "Core",
    "type": "text",
    "prompt": "Find $\\int (4x^3-2x)dx$.",
    "solution": "Integrate term-by-term.",
    "xp": 10,
    "answers": [
      "x^4-x^2+C",
      "$x^4-x^2+C$"
    ]
  },
  {
    "id": "m12-v6b-int-c",
    "course": "methods-12",
    "topic": "integration",
    "topicLabel": "Integration",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "If $F'(x)=2x$ and $F(1)=5$, find $F(0)$.",
    "solution": "$F=x^2+C$; $5=1+C$ gives $C=4$, so $F(0)=4$.",
    "xp": 12,
    "answer": "4"
  },
  {
    "id": "m12-v6b-prob-tree",
    "course": "methods-12",
    "topic": "probability",
    "topicLabel": "Probability",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "A fair coin is tossed twice. Find the probability of exactly one head.",
    "solution": "HT and TH are the two favourable outcomes out of four.",
    "xp": 12,
    "answer": "0.5"
  },
  {
    "id": "m12-v6b-prob-comp",
    "course": "methods-12",
    "topic": "probability",
    "topicLabel": "Probability",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $P(A)=0.72$, find $P(A^c)$.",
    "solution": "$P(A^c)=1-P(A)=0.28$.",
    "xp": 16,
    "answer": "0.28"
  },
  {
    "id": "m12-v6b-check1",
    "course": "methods-12",
    "topic": "functions",
    "topicLabel": "Functions & Relations",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $f(x)=2x-1$ and $g(x)=x^2$, find $(g\\circ f)(3)$.",
    "solution": "$f(3)=5$, then $g(5)=25$.",
    "xp": 16,
    "answer": "25"
  },
  {
    "id": "m12-v6b-check2",
    "course": "methods-12",
    "topic": "integration",
    "topicLabel": "Integration",
    "difficulty": "Separator",
    "type": "numeric",
    "prompt": "Evaluate $\\int_0^2 (x+1)dx$.",
    "solution": "$[x^2/2+x]_0^2=2+2=4$.",
    "xp": 22,
    "answer": "4"
  },
  {
    "id": "m34-v6b-rv-trans",
    "course": "methods-34",
    "topic": "random-variables",
    "topicLabel": "Random Variables",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "If $E(X)=4$ and $Y=3X+2$, find $E(Y)$.",
    "solution": "$E(Y)=3E(X)+2=14$.",
    "xp": 12,
    "answer": "14"
  },
  {
    "id": "m34-v6b-rv-vartrans",
    "course": "methods-34",
    "topic": "random-variables",
    "topicLabel": "Random Variables",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $Var(X)=5$ and $Y=2X-7$, find $Var(Y)$.",
    "solution": "$Var(Y)=2^2Var(X)=20$.",
    "xp": 16,
    "answer": "20"
  },
  {
    "id": "m34-v6b-exam-param",
    "course": "methods-34",
    "topic": "exam-prep",
    "topicLabel": "Exam Preparation",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "For $f(x)=x^2+kx+4$, the discriminant is zero when $k>0$. Find $k$.",
    "solution": "Tangency/repeated root requires $k^2-16=0$; with $k>0$, $k=4$.",
    "xp": 16,
    "answer": "4"
  },
  {
    "id": "m34-v6b-exam-exact",
    "course": "methods-34",
    "topic": "exam-prep",
    "topicLabel": "Exam Preparation",
    "difficulty": "Separator",
    "type": "numeric",
    "prompt": "Evaluate $\\int_0^1 6x(1+x^2)^2dx$.",
    "solution": "Let $u=1+x^2$, $du=2xdx$: $3\\int_1^2u^2du=[u^3]_1^2=7$.",
    "xp": 22,
    "answer": "7"
  },
  {
    "id": "m34-v6b-check1",
    "course": "methods-34",
    "topic": "differentiation",
    "topicLabel": "Differentiation",
    "difficulty": "Advanced",
    "type": "text",
    "prompt": "Differentiate $x e^{2x}$.",
    "solution": "Product rule gives $e^{2x}+2xe^{2x}$.",
    "xp": 16,
    "answers": [
      "e^(2x)(1+2x)",
      "e^(2x)+2x e^(2x)",
      "$e^{2x}(1+2x)$"
    ]
  },
  {
    "id": "m34-v6b-check2",
    "course": "methods-34",
    "topic": "probability",
    "topicLabel": "Probability",
    "difficulty": "Separator",
    "type": "numeric",
    "prompt": "If $X\\sim Bin(8,0.25)$, find $E(X)$.",
    "solution": "$E(X)=np=2$.",
    "xp": 22,
    "answer": "2"
  },
  {
    "id": "s12-v6b-fn-comp",
    "course": "specialist-12",
    "topic": "functions",
    "topicLabel": "Functions",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "If $f(x)=1/(x-1)$ and $g(x)=x+2$, find $(f\\circ g)(2)$.",
    "solution": "$g(2)=4$, so $f(4)=1/3$.",
    "xp": 12,
    "answer": "0.3333333333",
    "tolerance": 1e-06
  },
  {
    "id": "s12-v6b-fn-mod",
    "course": "specialist-12",
    "topic": "functions",
    "topicLabel": "Functions",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "Find the minimum value of $|x-4|+2$.",
    "solution": "$|x-4|\\ge0$, with equality at x=4.",
    "xp": 16,
    "answer": "2"
  },
  {
    "id": "s12-v6b-kin-acc",
    "course": "specialist-12",
    "topic": "kinematics",
    "topicLabel": "Kinematics",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "If $a(t)=4t-2$ and $v(0)=3$, find $v(2)$.",
    "solution": "$v=2t^2-2t+3$, so $v(2)=8-4+3=7$.",
    "xp": 12,
    "answer": "7"
  },
  {
    "id": "s12-v6b-kin-pos",
    "course": "specialist-12",
    "topic": "kinematics",
    "topicLabel": "Kinematics",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $v(t)=2t+1$ and $x(0)=5$, find $x(3)$.",
    "solution": "$x=t^2+t+5$, so $x(3)=17$.",
    "xp": 16,
    "answer": "17"
  }
];
