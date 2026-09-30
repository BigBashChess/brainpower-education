import {v6Questions} from './questions-v6.js';
export const baseQuestions = [
  {
    "id": "m12-fn-1",
    "course": "methods-12",
    "topic": "functions",
    "topicLabel": "Functions & Relations",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "If $f(x)=2x^2-3x+1$, find $f(2)$.",
    "solution": "$f(2)=2(2)^2-3(2)+1=3$.",
    "xp": 10,
    "answer": "3"
  },
  {
    "id": "m12-fn-2",
    "course": "methods-12",
    "topic": "functions",
    "topicLabel": "Functions & Relations",
    "difficulty": "VCAA",
    "type": "choice",
    "prompt": "Which restriction makes $f(x)=x^2$ one-to-one?",
    "solution": "Restricting to $x\\ge0$ leaves one monotonic branch.",
    "xp": 12,
    "answer": "$x\\ge 0$",
    "choices": [
      "$x\\ge 0$",
      "$x\\ne0$",
      "$x>-2$",
      "No restriction is needed"
    ]
  },
  {
    "id": "m12-fn-3",
    "course": "methods-12",
    "topic": "functions",
    "topicLabel": "Functions & Relations",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "If $g(x)=3x-5$, find $g^{-1}(7)$.",
    "solution": "$g(4)=7$, so $g^{-1}(7)=4$.",
    "xp": 10,
    "answer": "4"
  },
  {
    "id": "m12-fn-4",
    "course": "methods-12",
    "topic": "functions",
    "topicLabel": "Functions & Relations",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Let $f(x)=x^2+1$ and $g(x)=2x-3$. Find $(f\\circ g)(2)$.",
    "solution": "$g(2)=1$ and $f(1)=2$.",
    "xp": 12,
    "answer": "2"
  },
  {
    "id": "m12-fn-5",
    "course": "methods-12",
    "topic": "functions",
    "topicLabel": "Functions & Relations",
    "difficulty": "Advanced",
    "type": "choice",
    "prompt": "The domain of $f(x)=\\sqrt{5-2x}$ is…",
    "solution": "Require $5-2x\\ge0$, giving $x\\le5/2$.",
    "xp": 14,
    "answer": "$x\\le 5/2$",
    "choices": [
      "$x\\ge5/2$",
      "$x\\le5/2$",
      "$x<5$",
      "all real $x$"
    ]
  },
  {
    "id": "m12-alg-1",
    "course": "methods-12",
    "topic": "algebra",
    "topicLabel": "Algebra & Polynomials",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "If $P(x)=x^3-4x^2+x+6$, find $P(2)$.",
    "solution": "$P(2)=0$, so $x-2$ is a factor.",
    "xp": 10,
    "answer": "0"
  },
  {
    "id": "m12-alg-2",
    "course": "methods-12",
    "topic": "algebra",
    "topicLabel": "Algebra & Polynomials",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "Solve $3x-7=11$.",
    "solution": "$3x=18$, so $x=6$.",
    "xp": 10,
    "answer": "6"
  },
  {
    "id": "m12-alg-3",
    "course": "methods-12",
    "topic": "algebra",
    "topicLabel": "Algebra & Polynomials",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Factorise $x^2-5x+6$.",
    "solution": "$x^2-5x+6=(x-2)(x-3)$.",
    "xp": 12,
    "answers": [
      "(x-2)(x-3)",
      "(x-3)(x-2)"
    ]
  },
  {
    "id": "m12-alg-4",
    "course": "methods-12",
    "topic": "algebra",
    "topicLabel": "Algebra & Polynomials",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "The polynomial $x^3-6x^2+11x-6$ has roots 1, 2 and 3. Find the sum of the squares of the roots.",
    "solution": "$1^2+2^2+3^2=14$.",
    "xp": 14,
    "answer": "14"
  },
  {
    "id": "m12-exp-1",
    "course": "methods-12",
    "topic": "exp-log",
    "topicLabel": "Exponentials & Logarithms",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "Solve $2^x=32$.",
    "solution": "$32=2^5$.",
    "xp": 10,
    "answer": "5"
  },
  {
    "id": "m12-exp-2",
    "course": "methods-12",
    "topic": "exp-log",
    "topicLabel": "Exponentials & Logarithms",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Solve $\\log_3 x=4$.",
    "solution": "$x=3^4=81$.",
    "xp": 12,
    "answer": "81"
  },
  {
    "id": "m12-exp-3",
    "course": "methods-12",
    "topic": "exp-log",
    "topicLabel": "Exponentials & Logarithms",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $e^{2x}=7$, find $x$ to three decimal places.",
    "solution": "$x=\\frac12\\ln 7\\approx0.973$.",
    "xp": 14,
    "answer": "0.973",
    "tolerance": 0.001
  },
  {
    "id": "m12-exp-4",
    "course": "methods-12",
    "topic": "exp-log",
    "topicLabel": "Exponentials & Logarithms",
    "difficulty": "VCAA",
    "type": "choice",
    "prompt": "Which identity is correct?",
    "solution": "The logarithm of a product is the sum of logarithms.",
    "xp": 12,
    "answer": "$\\log(ab)=\\log a+\\log b$",
    "choices": [
      "$\\log(a+b)=\\log a+\\log b$",
      "$\\log(ab)=\\log a+\\log b$",
      "$\\log(a/b)=\\log a\\log b$",
      "$\\log(a^2)=2+\\log a$"
    ]
  },
  {
    "id": "m12-trig-1",
    "course": "methods-12",
    "topic": "trig",
    "topicLabel": "Trigonometry",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "Find $\\sin(\\pi/6)$.",
    "solution": "$\\sin(\\pi/6)=1/2$.",
    "xp": 10,
    "answer": "0.5",
    "tolerance": 1e-09
  },
  {
    "id": "m12-trig-2",
    "course": "methods-12",
    "topic": "trig",
    "topicLabel": "Trigonometry",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "Find $\\cos(\\pi)$.",
    "solution": "$\\cos\\pi=-1$.",
    "xp": 10,
    "answer": "-1"
  },
  {
    "id": "m12-trig-3",
    "course": "methods-12",
    "topic": "trig",
    "topicLabel": "Trigonometry",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Solve $\\sin x=1$ for $0\\le x\\le2\\pi$. Enter the value of $x$ in radians using pi notation.",
    "solution": "$x=\\pi/2$.",
    "xp": 12,
    "answers": [
      "pi/2",
      "\\pi/2"
    ]
  },
  {
    "id": "m12-trig-4",
    "course": "methods-12",
    "topic": "trig",
    "topicLabel": "Trigonometry",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "A right triangle has opposite side 7 and adjacent side 24. Find $\\tan\\theta$. Enter a decimal.",
    "solution": "$\\tan\\theta=7/24\\approx0.2917$.",
    "xp": 14,
    "answer": "0.2916666667",
    "tolerance": 0.001
  },
  {
    "id": "m12-diff-1",
    "course": "methods-12",
    "topic": "differentiation",
    "topicLabel": "Differentiation",
    "difficulty": "Core",
    "type": "text",
    "prompt": "Differentiate $f(x)=3x^4-5x^2+7$.",
    "solution": "$f'(x)=12x^3-10x$.",
    "xp": 10,
    "answers": [
      "12x^3-10x",
      "12x^3 - 10x"
    ]
  },
  {
    "id": "m12-diff-2",
    "course": "methods-12",
    "topic": "differentiation",
    "topicLabel": "Differentiation",
    "difficulty": "Core",
    "type": "text",
    "prompt": "Differentiate $y=7x^5$.",
    "solution": "$dy/dx=35x^4$.",
    "xp": 10,
    "answers": [
      "35x^4"
    ]
  },
  {
    "id": "m12-diff-3",
    "course": "methods-12",
    "topic": "differentiation",
    "topicLabel": "Differentiation",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "For $f(x)=x^3-3x^2+2$, find $f'(2)$.",
    "solution": "$f'(x)=3x^2-6x$, so $f'(2)=0$.",
    "xp": 12,
    "answer": "0"
  },
  {
    "id": "m12-diff-4",
    "course": "methods-12",
    "topic": "differentiation",
    "topicLabel": "Differentiation",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "The tangent to $y=x^2+2x$ at $x=3$ has gradient…",
    "solution": "$dy/dx=2x+2$, hence the gradient is 8.",
    "xp": 14,
    "answer": "8"
  },
  {
    "id": "m12-int-1",
    "course": "methods-12",
    "topic": "integration",
    "topicLabel": "Integration",
    "difficulty": "Core",
    "type": "text",
    "prompt": "Find an antiderivative of $6x^2$. Ignore $+C$.",
    "solution": "$2x^3$.",
    "xp": 10,
    "answers": [
      "2x^3"
    ]
  },
  {
    "id": "m12-int-2",
    "course": "methods-12",
    "topic": "integration",
    "topicLabel": "Integration",
    "difficulty": "Core",
    "type": "text",
    "prompt": "Evaluate $\\int 4x^3\\,dx$. Ignore $+C$.",
    "solution": "$x^4+C$.",
    "xp": 10,
    "answers": [
      "x^4"
    ]
  },
  {
    "id": "m12-int-3",
    "course": "methods-12",
    "topic": "integration",
    "topicLabel": "Integration",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Evaluate $\\int_0^2 x\\,dx$.",
    "solution": "$[x^2/2]_0^2=2$.",
    "xp": 12,
    "answer": "2"
  },
  {
    "id": "m12-int-4",
    "course": "methods-12",
    "topic": "integration",
    "topicLabel": "Integration",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "The area under $y=3x^2$ from $x=0$ to $x=2$ is…",
    "solution": "$\\int_0^2 3x^2dx=[x^3]_0^2=8$.",
    "xp": 14,
    "answer": "8"
  },
  {
    "id": "m12-prob-1",
    "course": "methods-12",
    "topic": "probability",
    "topicLabel": "Probability",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "A fair die is rolled twice. Find the probability of getting exactly one 6. Enter a decimal.",
    "solution": "$2(1/6)(5/6)=5/18\\approx0.278$.",
    "xp": 14,
    "answer": "0.2777777778",
    "tolerance": 0.001
  },
  {
    "id": "m12-prob-2",
    "course": "methods-12",
    "topic": "probability",
    "topicLabel": "Probability",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "A card is chosen from 10 cards, 4 of which are red. Find $P(\\text{red})$. Enter a decimal.",
    "solution": "$4/10=0.4$.",
    "xp": 10,
    "answer": "0.4"
  },
  {
    "id": "m12-prob-3",
    "course": "methods-12",
    "topic": "probability",
    "topicLabel": "Probability",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "If $P(A)=0.6$, $P(B)=0.5$ and $P(A\\cap B)=0.3$, find $P(A\\cup B)$.",
    "solution": "$0.6+0.5-0.3=0.8$.",
    "xp": 12,
    "answer": "0.8"
  },
  {
    "id": "m12-prob-4",
    "course": "methods-12",
    "topic": "probability",
    "topicLabel": "Probability",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "Two independent events have probabilities 0.7 and 0.4. Find the probability both occur.",
    "solution": "$0.7\\times0.4=0.28$.",
    "xp": 14,
    "answer": "0.28"
  },
  {
    "id": "m34-fn-1",
    "course": "methods-34",
    "topic": "functions",
    "topicLabel": "Functions",
    "difficulty": "VCAA",
    "type": "choice",
    "prompt": "For $f(x)=\\frac{1}{x-2}+3$, which is the horizontal asymptote?",
    "solution": "The reciprocal term approaches 0, leaving $y=3$.",
    "xp": 12,
    "answer": "$y=3$",
    "choices": [
      "$x=2$",
      "$y=2$",
      "$y=3$",
      "$x=3$"
    ]
  },
  {
    "id": "m34-fn-2",
    "course": "methods-34",
    "topic": "functions",
    "topicLabel": "Functions",
    "difficulty": "Core",
    "type": "choice",
    "prompt": "For $f(x)=e^x$, the range is…",
    "solution": "$e^x$ is always positive.",
    "xp": 10,
    "answer": "$y>0$",
    "choices": [
      "all real $y$",
      "$y>0$",
      "$y\\ge0$",
      "$y<0$"
    ]
  },
  {
    "id": "m34-fn-3",
    "course": "methods-34",
    "topic": "functions",
    "topicLabel": "Functions",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "For $f(x)=\\frac{x+1}{x-2}$, find the horizontal asymptote $y=k$. Enter $k$.",
    "solution": "Equal degrees give asymptote equal to ratio of leading coefficients, 1.",
    "xp": 14,
    "answer": "1"
  },
  {
    "id": "m34-fn-4",
    "course": "methods-34",
    "topic": "functions",
    "topicLabel": "Functions",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "If $f(x)=\\ln x$, find $f(e^3)$.",
    "solution": "$\\ln(e^3)=3$.",
    "xp": 12,
    "answer": "3"
  },
  {
    "id": "m34-diff-1",
    "course": "methods-34",
    "topic": "differentiation",
    "topicLabel": "Differentiation",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Differentiate $y=(2x+1)^5$.",
    "solution": "$y'=10(2x+1)^4$.",
    "xp": 12,
    "answers": [
      "10(2x+1)^4",
      "10*(2x+1)^4"
    ]
  },
  {
    "id": "m34-diff-2",
    "course": "methods-34",
    "topic": "differentiation",
    "topicLabel": "Differentiation",
    "difficulty": "Core",
    "type": "text",
    "prompt": "Differentiate $e^{3x}$.",
    "solution": "$3e^{3x}$.",
    "xp": 10,
    "answers": [
      "3e^(3x)",
      "3e^3x",
      "3*e^(3x)"
    ]
  },
  {
    "id": "m34-diff-3",
    "course": "methods-34",
    "topic": "differentiation",
    "topicLabel": "Differentiation",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Differentiate $\\ln(5x)$.",
    "solution": "$1/x$.",
    "xp": 12,
    "answers": [
      "1/x"
    ]
  },
  {
    "id": "m34-diff-4",
    "course": "methods-34",
    "topic": "differentiation",
    "topicLabel": "Differentiation",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Differentiate $\\sin(2x)$.",
    "solution": "$2\\cos(2x)$.",
    "xp": 12,
    "answers": [
      "2cos(2x)",
      "2*cos(2x)"
    ]
  },
  {
    "id": "m34-diff-5",
    "course": "methods-34",
    "topic": "differentiation",
    "topicLabel": "Differentiation",
    "difficulty": "Advanced",
    "type": "text",
    "prompt": "Differentiate $x^2e^x$.",
    "solution": "Product rule gives $e^x(x^2+2x)$.",
    "xp": 14,
    "answers": [
      "e^x(x^2+2x)",
      "(x^2+2x)e^x",
      "e^x*(x^2+2x)"
    ]
  },
  {
    "id": "m34-app-1",
    "course": "methods-34",
    "topic": "applications",
    "topicLabel": "Applications of Calculus",
    "difficulty": "Advanced",
    "type": "choice",
    "prompt": "If $f'(x)>0$ and $f''(x)<0$ on an interval, the graph is…",
    "solution": "Positive first derivative means increasing; negative second derivative means concave down.",
    "xp": 14,
    "answer": "Increasing and concave down",
    "choices": [
      "Increasing and concave down",
      "Increasing and concave up",
      "Decreasing and concave down",
      "Decreasing and concave up"
    ]
  },
  {
    "id": "m34-app-2",
    "course": "methods-34",
    "topic": "applications",
    "topicLabel": "Applications of Calculus",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "For $f(x)=x^3-3x$, find the positive stationary point x-coordinate.",
    "solution": "$f'(x)=3x^2-3=0$, so $x=\\pm1$; positive gives 1.",
    "xp": 12,
    "answer": "1"
  },
  {
    "id": "m34-app-3",
    "course": "methods-34",
    "topic": "applications",
    "topicLabel": "Applications of Calculus",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "A rectangle has perimeter 20. If width is $x$, area is $A=x(10-x)$. Find the maximizing $x$.",
    "solution": "$A'=10-2x=0$ gives $x=5$.",
    "xp": 14,
    "answer": "5"
  },
  {
    "id": "m34-app-4",
    "course": "methods-34",
    "topic": "applications",
    "topicLabel": "Applications of Calculus",
    "difficulty": "VCAA",
    "type": "choice",
    "prompt": "At a local maximum of a differentiable function, which is necessarily true?",
    "solution": "At an interior local maximum of a differentiable function, the tangent is horizontal.",
    "xp": 12,
    "answer": "$f'(x)=0$",
    "choices": [
      "$f(x)=0$",
      "$f'(x)=0$",
      "$f''(x)=0$",
      "$f'(x)>0$"
    ]
  },
  {
    "id": "m34-int-1",
    "course": "methods-34",
    "topic": "integration",
    "topicLabel": "Integration",
    "difficulty": "Core",
    "type": "text",
    "prompt": "Evaluate $\\int (6x^2-4x)\\,dx$. Ignore $+C$.",
    "solution": "$2x^3-2x^2+C$.",
    "xp": 10,
    "answers": [
      "2x^3-2x^2"
    ]
  },
  {
    "id": "m34-int-2",
    "course": "methods-34",
    "topic": "integration",
    "topicLabel": "Integration",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Evaluate $\\int_1^3 2x\\,dx$.",
    "solution": "$[x^2]_1^3=9-1=8$.",
    "xp": 12,
    "answer": "8"
  },
  {
    "id": "m34-int-3",
    "course": "methods-34",
    "topic": "integration",
    "topicLabel": "Integration",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Evaluate $\\int e^x\\,dx$. Ignore $+C$.",
    "solution": "$e^x+C$.",
    "xp": 12,
    "answers": [
      "e^x"
    ]
  },
  {
    "id": "m34-int-4",
    "course": "methods-34",
    "topic": "integration",
    "topicLabel": "Integration",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Evaluate $\\int \\cos x\\,dx$. Ignore $+C$.",
    "solution": "$\\sin x+C$.",
    "xp": 12,
    "answers": [
      "sin(x)",
      "sinx",
      "\\sin x"
    ]
  },
  {
    "id": "m34-int-5",
    "course": "methods-34",
    "topic": "integration",
    "topicLabel": "Integration",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $\\int_0^4 f(x)dx=7$ and $\\int_0^2 f(x)dx=3$, find $\\int_2^4 f(x)dx$.",
    "solution": "Subtract adjacent interval integrals: $7-3=4$.",
    "xp": 14,
    "answer": "4"
  },
  {
    "id": "m34-prob-1",
    "course": "methods-34",
    "topic": "probability",
    "topicLabel": "Probability",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "If $X\\sim Bin(5,0.2)$, find $P(X=0)$ to 4 decimal places.",
    "solution": "$0.8^5=0.32768\\approx0.3277$.",
    "xp": 14,
    "answer": "0.3277",
    "tolerance": 0.0001
  },
  {
    "id": "m34-prob-2",
    "course": "methods-34",
    "topic": "probability",
    "topicLabel": "Probability",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "If $X\\sim Bin(10,0.3)$, find $E(X)$.",
    "solution": "$E(X)=np=10(0.3)=3$.",
    "xp": 10,
    "answer": "3"
  },
  {
    "id": "m34-prob-3",
    "course": "methods-34",
    "topic": "probability",
    "topicLabel": "Probability",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "If $X\\sim Bin(8,0.5)$, find $P(X=8)$. Enter a decimal.",
    "solution": "$0.5^8=1/256$.",
    "xp": 12,
    "answer": "0.00390625",
    "tolerance": 1e-08
  },
  {
    "id": "m34-prob-4",
    "course": "methods-34",
    "topic": "probability",
    "topicLabel": "Probability",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "For a binomial random variable with $n=20$, $p=0.4$, find the variance.",
    "solution": "$np(1-p)=20(0.4)(0.6)=4.8$.",
    "xp": 14,
    "answer": "4.8"
  },
  {
    "id": "m34-rv-1",
    "course": "methods-34",
    "topic": "random-variables",
    "topicLabel": "Random Variables",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "A discrete random variable has $P(X=0)=0.2$, $P(X=1)=0.5$, $P(X=2)=0.3$. Find $E(X)$.",
    "solution": "$0(0.2)+1(0.5)+2(0.3)=1.1$.",
    "xp": 10,
    "answer": "1.1"
  },
  {
    "id": "m34-rv-2",
    "course": "methods-34",
    "topic": "random-variables",
    "topicLabel": "Random Variables",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "If $E(X)=4$ and $Y=3X+2$, find $E(Y)$.",
    "solution": "$E(3X+2)=3E(X)+2=14$.",
    "xp": 12,
    "answer": "14"
  },
  {
    "id": "m34-rv-3",
    "course": "methods-34",
    "topic": "random-variables",
    "topicLabel": "Random Variables",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $Var(X)=5$ and $Y=2X-7$, find $Var(Y)$.",
    "solution": "$Var(aX+b)=a^2Var(X)=4(5)=20$.",
    "xp": 14,
    "answer": "20"
  },
  {
    "id": "m34-exam-1",
    "course": "methods-34",
    "topic": "exam-prep",
    "topicLabel": "Exam Preparation",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "A 40-mark paper requires 75% for your target. How many marks are required?",
    "solution": "$0.75\\times40=30$.",
    "xp": 10,
    "answer": "30"
  },
  {
    "id": "m34-exam-2",
    "course": "methods-34",
    "topic": "exam-prep",
    "topicLabel": "Exam Preparation",
    "difficulty": "Separator",
    "type": "numeric",
    "prompt": "If $x+1/x=4$, find $x^2+1/x^2$.",
    "solution": "Square: $x^2+2+x^{-2}=16$, giving 14.",
    "xp": 25,
    "answer": "14"
  },
  {
    "id": "s12-pf-1",
    "course": "specialist-12",
    "topic": "algebra",
    "topicLabel": "Algebra & Partial Fractions",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Decompose $\\frac{5x+1}{(x+1)(x+2)}$ into partial fractions.",
    "solution": "$-4/(x+1)+9/(x+2)$.",
    "xp": 14,
    "answers": [
      "-4/(x+1)+9/(x+2)",
      "9/(x+2)-4/(x+1)"
    ]
  },
  {
    "id": "s12-pf-2",
    "course": "specialist-12",
    "topic": "algebra",
    "topicLabel": "Algebra & Partial Fractions",
    "difficulty": "Core",
    "type": "text",
    "prompt": "Decompose $\\frac{3}{x(x+1)}$.",
    "solution": "$3/x-3/(x+1)$.",
    "xp": 10,
    "answers": [
      "3/x-3/(x+1)",
      "-3/(x+1)+3/x"
    ]
  },
  {
    "id": "s12-pf-3",
    "course": "specialist-12",
    "topic": "algebra",
    "topicLabel": "Algebra & Partial Fractions",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "Find $A$ if $\\frac{2x+5}{(x+1)(x+3)}=\\frac{A}{x+1}+\\frac{B}{x+3}$.",
    "solution": "Substitute $x=-1$: $3=2A$, so $A=3/2$.",
    "xp": 14,
    "answer": "1.5",
    "tolerance": 1e-09
  },
  {
    "id": "s12-fn-1",
    "course": "specialist-12",
    "topic": "functions",
    "topicLabel": "Functions",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "For $f(x)=|x-3|$, find $f(-1)$.",
    "solution": "$|-1-3|=4$.",
    "xp": 12,
    "answer": "4"
  },
  {
    "id": "s12-fn-2",
    "course": "specialist-12",
    "topic": "functions",
    "topicLabel": "Functions",
    "difficulty": "Advanced",
    "type": "choice",
    "prompt": "Which transformation takes $y=|x|$ to $y=2|x+1|-3$?",
    "solution": "Read transformations from the standard form.",
    "xp": 14,
    "answer": "Left 1, vertical stretch 2, down 3",
    "choices": [
      "Right 1, stretch 2, down 3",
      "Left 1, vertical stretch 2, down 3",
      "Left 3, stretch 1, down 2",
      "Right 1, compression 2, up 3"
    ]
  },
  {
    "id": "s12-trig-1",
    "course": "specialist-12",
    "topic": "trig",
    "topicLabel": "Trigonometry",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "Find $\\cos(2\\pi/3)$.",
    "solution": "$\\cos(120^\\circ)=-1/2$.",
    "xp": 10,
    "answer": "-0.5",
    "tolerance": 1e-09
  },
  {
    "id": "s12-trig-2",
    "course": "specialist-12",
    "topic": "trig",
    "topicLabel": "Trigonometry",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Using $a=5$, $b=7$, included angle $60^\\circ$, find $c^2$ by the cosine rule.",
    "solution": "$c^2=25+49-70(1/2)=39$.",
    "xp": 12,
    "answer": "39"
  },
  {
    "id": "s12-trig-3",
    "course": "specialist-12",
    "topic": "trig",
    "topicLabel": "Trigonometry",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "A circle has radius 6 and central angle $\\pi/3$. Find arc length.",
    "solution": "$s=r\\theta=6\\pi/3=2\\pi$.",
    "xp": 14,
    "answer": "6.283185307",
    "tolerance": 0.001
  },
  {
    "id": "s12-v-1",
    "course": "specialist-12",
    "topic": "vectors",
    "topicLabel": "Vectors",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "If $\\mathbf a=(3,4)$, find $|\\mathbf a|$.",
    "solution": "$|\\mathbf a|=5$.",
    "xp": 10,
    "answer": "5"
  },
  {
    "id": "s12-v-2",
    "course": "specialist-12",
    "topic": "vectors",
    "topicLabel": "Vectors",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Find $(2,-1)\\cdot(3,4)$.",
    "solution": "$2(3)+(-1)(4)=2$.",
    "xp": 12,
    "answer": "2"
  },
  {
    "id": "s12-v-3",
    "course": "specialist-12",
    "topic": "vectors",
    "topicLabel": "Vectors",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Find the vector from $A(1,2)$ to $B(5,-1)$.",
    "solution": "$\\overrightarrow{AB}=(4,-3)$.",
    "xp": 12,
    "answers": [
      "(4,-3)",
      "<4,-3>"
    ]
  },
  {
    "id": "s12-v-4",
    "course": "specialist-12",
    "topic": "vectors",
    "topicLabel": "Vectors",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "Two perpendicular vectors have magnitudes 6 and 8. Find the magnitude of their sum.",
    "solution": "Use Pythagoras: $\\sqrt{36+64}=10$.",
    "xp": 14,
    "answer": "10"
  },
  {
    "id": "s12-cx-1",
    "course": "specialist-12",
    "topic": "complex",
    "topicLabel": "Complex Numbers",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Simplify $(2+3i)(1-i)$.",
    "solution": "$5+i$.",
    "xp": 12,
    "answers": [
      "5+i",
      "5 + i"
    ]
  },
  {
    "id": "s12-cx-2",
    "course": "specialist-12",
    "topic": "complex",
    "topicLabel": "Complex Numbers",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "Find $|3+4i|$.",
    "solution": "$\\sqrt{3^2+4^2}=5$.",
    "xp": 10,
    "answer": "5"
  },
  {
    "id": "s12-cx-3",
    "course": "specialist-12",
    "topic": "complex",
    "topicLabel": "Complex Numbers",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Simplify $i^{14}$.",
    "solution": "$i^{14}=i^2=-1$.",
    "xp": 12,
    "answers": [
      "-1"
    ]
  },
  {
    "id": "s12-cx-4",
    "course": "specialist-12",
    "topic": "complex",
    "topicLabel": "Complex Numbers",
    "difficulty": "Advanced",
    "type": "text",
    "prompt": "Write the conjugate of $-2+5i$.",
    "solution": "$-2-5i$.",
    "xp": 14,
    "answers": [
      "-2-5i",
      "-2 - 5i"
    ]
  },
  {
    "id": "s12-cal-1",
    "course": "specialist-12",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "Core",
    "type": "text",
    "prompt": "Differentiate $x^5-2x^3$.",
    "solution": "$5x^4-6x^2$.",
    "xp": 10,
    "answers": [
      "5x^4-6x^2"
    ]
  },
  {
    "id": "s12-cal-2",
    "course": "specialist-12",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Evaluate $\\int (3x^2+2)dx$. Ignore $+C$.",
    "solution": "$x^3+2x$.",
    "xp": 12,
    "answers": [
      "x^3+2x"
    ]
  },
  {
    "id": "s12-cal-3",
    "course": "specialist-12",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "For $f(x)=x^4-4x^2$, find $f''(1)$.",
    "solution": "$f\\'\\'(x)=12x^2-8$, so $f\\'\\'(1)=4$.",
    "xp": 14,
    "answer": "4"
  },
  {
    "id": "s12-kin-1",
    "course": "specialist-12",
    "topic": "kinematics",
    "topicLabel": "Kinematics",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "A particle has $v(t)=3t^2-18t+24$. At what smallest positive time is it at rest?",
    "solution": "$3(t-2)(t-4)=0$.",
    "xp": 15,
    "answer": "2"
  },
  {
    "id": "s12-kin-2",
    "course": "specialist-12",
    "topic": "kinematics",
    "topicLabel": "Kinematics",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "For $v(t)=3t^2-18t+24$, find $a(1)$.",
    "solution": "$a(t)=6t-18$.",
    "xp": 12,
    "answer": "-12"
  },
  {
    "id": "s12-kin-3",
    "course": "specialist-12",
    "topic": "kinematics",
    "topicLabel": "Kinematics",
    "difficulty": "Core",
    "type": "text",
    "prompt": "If $x(t)=2t^3-5t$, find $v(t)$.",
    "solution": "$v(t)=6t^2-5$.",
    "xp": 10,
    "answers": [
      "6t^2-5"
    ]
  },
  {
    "id": "s12-kin-4",
    "course": "specialist-12",
    "topic": "kinematics",
    "topicLabel": "Kinematics",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "A particle has constant velocity $-3$ m/s for 4 s. Find its displacement.",
    "solution": "$\\Delta x=vt=-12$ m.",
    "xp": 14,
    "answer": "-12"
  },
  {
    "id": "s34-fn-1",
    "course": "specialist-34",
    "topic": "functions",
    "topicLabel": "Functions & Graphs",
    "difficulty": "Advanced",
    "type": "choice",
    "prompt": "For $f(x)=\\frac{1}{x^2-1}$, which $x$-values give vertical asymptotes?",
    "solution": "Set denominator to zero: $x^2-1=0$.",
    "xp": 14,
    "answer": "$x=\\pm1$",
    "choices": [
      "$x=0$",
      "$x=1$ only",
      "$x=-1$ only",
      "$x=\\pm1$"
    ]
  },
  {
    "id": "s34-fn-2",
    "course": "specialist-34",
    "topic": "functions",
    "topicLabel": "Functions & Graphs",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "For $f(x)=\\frac{x^2+1}{x^2-4}$, how many vertical asymptotes are there?",
    "solution": "They occur at $x=\\pm2$.",
    "xp": 12,
    "answer": "2"
  },
  {
    "id": "s34-fn-3",
    "course": "specialist-34",
    "topic": "functions",
    "topicLabel": "Functions & Graphs",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "For $f(x)=1/(x-3)^2$, find the horizontal asymptote $y=k$. Enter $k$.",
    "solution": "The reciprocal-square term tends to zero.",
    "xp": 14,
    "answer": "0"
  },
  {
    "id": "s34-cx-1",
    "course": "specialist-34",
    "topic": "complex",
    "topicLabel": "Complex Numbers",
    "difficulty": "VCAA",
    "type": "choice",
    "prompt": "Multiplication by $i$ corresponds geometrically to…",
    "solution": "Multiplication by $i=e^{i\\pi/2}$ rotates by $\\pi/2$.",
    "xp": 12,
    "answer": "A $90^\\circ$ anticlockwise rotation",
    "choices": [
      "A reflection in the real axis",
      "A $90^\\circ$ anticlockwise rotation",
      "A $90^\\circ$ clockwise rotation",
      "A dilation by factor 2"
    ]
  },
  {
    "id": "s34-cx-2",
    "course": "specialist-34",
    "topic": "complex",
    "topicLabel": "Complex Numbers",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "Find the modulus of $5-12i$.",
    "solution": "$\\sqrt{25+144}=13$.",
    "xp": 10,
    "answer": "13"
  },
  {
    "id": "s34-cx-3",
    "course": "specialist-34",
    "topic": "complex",
    "topicLabel": "Complex Numbers",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Simplify $(1+i)^2$.",
    "solution": "$2i$.",
    "xp": 12,
    "answers": [
      "2i"
    ]
  },
  {
    "id": "s34-cx-4",
    "course": "specialist-34",
    "topic": "complex",
    "topicLabel": "Complex Numbers",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $z=2e^{i\\pi/3}$, find $|z|$.",
    "solution": "The modulus is the radial factor 2.",
    "xp": 14,
    "answer": "2"
  },
  {
    "id": "s34-v-1",
    "course": "specialist-34",
    "topic": "vectors",
    "topicLabel": "Vectors",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "Find $\\mathbf a\\cdot\\mathbf b$ for $\\mathbf a=(1,2,3)$ and $\\mathbf b=(4,-1,2)$.",
    "solution": "$4-2+6=8$.",
    "xp": 14,
    "answer": "8"
  },
  {
    "id": "s34-v-2",
    "course": "specialist-34",
    "topic": "vectors",
    "topicLabel": "Vectors",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "If $\\mathbf a=(2,0,-1)$, find $|\\mathbf a|^2$.",
    "solution": "$|a|^2=4+0+1=5$.",
    "xp": 12,
    "answer": "5"
  },
  {
    "id": "s34-v-3",
    "course": "specialist-34",
    "topic": "vectors",
    "topicLabel": "Vectors",
    "difficulty": "Advanced",
    "type": "choice",
    "prompt": "If $\\mathbf a\\cdot\\mathbf b=0$ and both vectors are non-zero, then they are…",
    "solution": "Zero dot product means perpendicular.",
    "xp": 14,
    "answer": "perpendicular",
    "choices": [
      "parallel",
      "perpendicular",
      "equal",
      "opposite"
    ]
  },
  {
    "id": "s34-v-4",
    "course": "specialist-34",
    "topic": "vectors",
    "topicLabel": "Vectors",
    "difficulty": "Separator",
    "type": "numeric",
    "prompt": "Vectors $a=(1,2,2)$ and $b=(2,-1,0)$ have dot product…",
    "solution": "$2-2+0=0$.",
    "xp": 20,
    "answer": "0"
  },
  {
    "id": "s34-cal-1",
    "course": "specialist-34",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Differentiate implicitly: $x^2+y^2=25$. Give $dy/dx$.",
    "solution": "$dy/dx=-x/y$.",
    "xp": 14,
    "answers": [
      "-x/y",
      "-(x/y)"
    ]
  },
  {
    "id": "s34-cal-2",
    "course": "specialist-34",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "Advanced",
    "type": "text",
    "prompt": "Evaluate $\\int 2x(x^2+3)^4\\,dx$. Ignore $+C$.",
    "solution": "$(x^2+3)^5/5$.",
    "xp": 16,
    "answers": [
      "(x^2+3)^5/5",
      "1/5*(x^2+3)^5"
    ]
  },
  {
    "id": "s34-cal-3",
    "course": "specialist-34",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "VCAA",
    "type": "text",
    "prompt": "Differentiate $\\arcsin x$.",
    "solution": "$1/\\sqrt{1-x^2}$.",
    "xp": 14,
    "answers": [
      "1/sqrt(1-x^2)",
      "1/(sqrt(1-x^2))"
    ]
  },
  {
    "id": "s34-cal-4",
    "course": "specialist-34",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "Advanced",
    "type": "text",
    "prompt": "Evaluate $\\int \\frac{1}{x}dx$. Ignore $+C$.",
    "solution": "$\\ln|x|$.",
    "xp": 16,
    "answers": [
      "ln(abs(x))",
      "ln|x|",
      "ln(|x|)"
    ]
  },
  {
    "id": "s34-cal-5",
    "course": "specialist-34",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "Evaluate $\\int_0^1 3x^2 dx$.",
    "solution": "$[x^3]_0^1=1$.",
    "xp": 14,
    "answer": "1"
  },
  {
    "id": "s34-sep-1",
    "course": "specialist-34",
    "topic": "calculus",
    "topicLabel": "Calculus",
    "difficulty": "Separator",
    "type": "numeric",
    "prompt": "If $x+\\frac1x=3$, find $x^4+\\frac1{x^4}$.",
    "solution": "First $x^2+x^{-2}=7$, then square again: $49-2=47$.",
    "xp": 25,
    "answer": "47"
  },
  {
    "id": "s34-de-1",
    "course": "specialist-34",
    "topic": "differential-equations",
    "topicLabel": "Differential Equations",
    "difficulty": "Core",
    "type": "choice",
    "prompt": "Which function satisfies $dy/dx=3y$?",
    "solution": "Exponential growth with rate 3 has general solution $Ce^{3x}$.",
    "xp": 10,
    "answer": "$y=Ce^{3x}$",
    "choices": [
      "$y=Cx^3$",
      "$y=Ce^{3x}$",
      "$y=3e^x$",
      "$y=C+3x$"
    ]
  },
  {
    "id": "s34-de-2",
    "course": "specialist-34",
    "topic": "differential-equations",
    "topicLabel": "Differential Equations",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "If $dy/dx=2x$ and $y(0)=5$, find $y(2)$.",
    "solution": "Integrate: $y=x^2+C$, with $C=5$, so $y(2)=9$.",
    "xp": 12,
    "answer": "9"
  },
  {
    "id": "s34-de-3",
    "course": "specialist-34",
    "topic": "differential-equations",
    "topicLabel": "Differential Equations",
    "difficulty": "Advanced",
    "type": "text",
    "prompt": "Solve $dy/dx=y$ with $y(0)=2$.",
    "solution": "$y=2e^x$.",
    "xp": 14,
    "answers": [
      "2e^x",
      "2*e^x"
    ]
  },
  {
    "id": "s34-stat-1",
    "course": "specialist-34",
    "topic": "statistics",
    "topicLabel": "Probability & Statistics",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "A distribution has mean 10 and standard deviation 3. Find the variance.",
    "solution": "Variance is standard deviation squared.",
    "xp": 10,
    "answer": "9"
  },
  {
    "id": "s34-stat-2",
    "course": "specialist-34",
    "topic": "statistics",
    "topicLabel": "Probability & Statistics",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "If $Z=(X-50)/10$ and $X=70$, find $Z$.",
    "solution": "$Z=(70-50)/10=2$.",
    "xp": 12,
    "answer": "2"
  },
  {
    "id": "s34-stat-3",
    "course": "specialist-34",
    "topic": "statistics",
    "topicLabel": "Probability & Statistics",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "A normal distribution has $\\mu=20$, $\\sigma=4$. What x-value corresponds to $z=-1.5$?",
    "solution": "$x=20+(-1.5)(4)=14$.",
    "xp": 14,
    "answer": "14"
  },
  {
    "id": "s34-stat-4",
    "course": "specialist-34",
    "topic": "statistics",
    "topicLabel": "Probability & Statistics",
    "difficulty": "VCAA",
    "type": "choice",
    "prompt": "Increasing sample size generally makes the standard error of a sample mean…",
    "solution": "Standard error is proportional to $1/\\sqrt n$.",
    "xp": 12,
    "answer": "smaller",
    "choices": [
      "larger",
      "smaller",
      "unchanged",
      "exactly zero"
    ]
  },
  {
    "id": "s34-mech-1",
    "course": "specialist-34",
    "topic": "mechanics",
    "topicLabel": "Mechanics",
    "difficulty": "Core",
    "type": "numeric",
    "prompt": "A 5 kg particle has acceleration 3 m/s². Find the resultant force in N.",
    "solution": "$F=ma=15$ N.",
    "xp": 10,
    "answer": "15"
  },
  {
    "id": "s34-mech-2",
    "course": "specialist-34",
    "topic": "mechanics",
    "topicLabel": "Mechanics",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "A force of 20 N acts on a 4 kg mass. Find acceleration.",
    "solution": "$a=F/m=5$ m/s².",
    "xp": 12,
    "answer": "5"
  },
  {
    "id": "s34-mech-3",
    "course": "specialist-34",
    "topic": "mechanics",
    "topicLabel": "Mechanics",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "A particle moves in a circle of radius 2 m at speed 6 m/s. Find centripetal acceleration.",
    "solution": "$a=v^2/r=36/2=18$.",
    "xp": 14,
    "answer": "18"
  },
  {
    "id": "s34-mech-4",
    "course": "specialist-34",
    "topic": "mechanics",
    "topicLabel": "Mechanics",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "A 2 kg particle moving at 5 m/s has kinetic energy…",
    "solution": "$K=\\frac12mv^2=25$ J.",
    "xp": 14,
    "answer": "25"
  },
  {
    "id": "daily-1",
    "course": "methods-12",
    "topic": "algebra",
    "topicLabel": "Algebra",
    "difficulty": "Separator",
    "type": "numeric",
    "prompt": "If $x+\\frac1x=3$, find $x^2+\\frac1{x^2}$.",
    "solution": "$9-2=7$.",
    "xp": 25,
    "answer": "7",
    "daily": true
  },
  {
    "id": "daily-2",
    "course": "specialist-12",
    "topic": "vectors",
    "topicLabel": "Vectors",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "Two perpendicular vectors have lengths 5 and 12. Find the magnitude of their sum.",
    "solution": "Pythagoras gives 13.",
    "xp": 25,
    "answer": "13",
    "daily": true
  },
  {
    "id": "daily-3",
    "course": "methods-34",
    "topic": "integration",
    "topicLabel": "Integration",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "If $\\int_0^2 f(x)dx=5$ and $\\int_2^4 f(x)dx=-1$, find $\\int_0^4 f(x)dx$.",
    "solution": "Add adjacent integrals.",
    "xp": 25,
    "answer": "4",
    "daily": true
  },
  {
    "id": "daily-4",
    "course": "specialist-34",
    "topic": "complex",
    "topicLabel": "Complex Numbers",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "Find the modulus of $3-4i$.",
    "solution": "$\\sqrt{3^2+4^2}=5$.",
    "xp": 25,
    "answer": "5",
    "daily": true
  },
  {
    "id": "daily-5",
    "course": "methods-12",
    "topic": "trig",
    "topicLabel": "Trigonometry",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "Find $\\sin(\\pi/6)+\\cos(\\pi/3)$.",
    "solution": "Both are 1/2.",
    "xp": 25,
    "answer": "1",
    "daily": true
  },
  {
    "id": "daily-6",
    "course": "specialist-12",
    "topic": "complex",
    "topicLabel": "Complex Numbers",
    "difficulty": "Advanced",
    "type": "text",
    "prompt": "Simplify $i^{23}$.",
    "solution": "$23\\equiv3\\pmod4$, so $i^{23}=-i$.",
    "xp": 25,
    "answers": [
      "-i"
    ],
    "daily": true
  },
  {
    "id": "daily-7",
    "course": "methods-34",
    "topic": "differentiation",
    "topicLabel": "Differentiation",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $f(x)=x^3-6x$, find $f'(\\sqrt2)$.",
    "solution": "$3(2)-6=0$.",
    "xp": 25,
    "answer": "0",
    "daily": true
  },
  {
    "id": "daily-8",
    "course": "specialist-34",
    "topic": "vectors",
    "topicLabel": "Vectors",
    "difficulty": "Separator",
    "type": "numeric",
    "prompt": "If $|a|=3$, $|b|=4$ and $a\\cdot b=0$, find $|a+b|$.",
    "solution": "Perpendicular vectors give a 3-4-5 triangle.",
    "xp": 25,
    "answer": "5",
    "daily": true
  },
  {
    "id": "daily-9",
    "course": "methods-34",
    "topic": "probability",
    "topicLabel": "Probability",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "For $X\\sim Bin(4,0.5)$, find $P(X=2)$.",
    "solution": "$\\binom42(0.5)^4=6/16=0.375$.",
    "xp": 25,
    "answer": "0.375",
    "daily": true
  },
  {
    "id": "daily-10",
    "course": "specialist-34",
    "topic": "mechanics",
    "topicLabel": "Mechanics",
    "difficulty": "VCAA",
    "type": "numeric",
    "prompt": "A 3 kg mass accelerates at 4 m/s². Find the resultant force.",
    "solution": "$F=ma=12$ N.",
    "xp": 25,
    "answer": "12",
    "daily": true
  },
  {
    "id": "daily-11",
    "course": "methods-12",
    "topic": "exp-log",
    "topicLabel": "Exponentials & Logarithms",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "Solve $3^{x}=27$.",
    "solution": "$27=3^3$.",
    "xp": 25,
    "answer": "3",
    "daily": true
  },
  {
    "id": "daily-12",
    "course": "specialist-12",
    "topic": "trig",
    "topicLabel": "Trigonometry",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "Find the exact value of $2\\cos(\\pi/3)$.",
    "solution": "$2(1/2)=1$.",
    "xp": 25,
    "answer": "1",
    "daily": true
  },
  {
    "id": "daily-13",
    "course": "methods-34",
    "topic": "random-variables",
    "topicLabel": "Random Variables",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $E(X)=2$ and $Y=5X-1$, find $E(Y)$.",
    "solution": "$5(2)-1=9$.",
    "xp": 25,
    "answer": "9",
    "daily": true
  },
  {
    "id": "daily-14",
    "course": "specialist-34",
    "topic": "differential-equations",
    "topicLabel": "Differential Equations",
    "difficulty": "Advanced",
    "type": "numeric",
    "prompt": "If $dy/dx=4x$ and $y(0)=1$, find $y(1)$.",
    "solution": "$y=2x^2+1$.",
    "xp": 25,
    "answer": "3",
    "daily": true
  }
];

import {adminQuestions} from './admin-content.js';
export const questions = [...baseQuestions,...v6Questions,...adminQuestions];
export const questionById = id => questions.find(q => q.id === id);
export const dailyQuestions = questions.filter(q => q.daily);
export const practiceQuestions = questions.filter(q => !q.daily);
