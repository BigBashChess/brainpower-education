// Curated near-misses: exactly one derivative per question, never equivalent alternatives.
// Expressions are retained for independent mathematical QA; TeX is presentation only.
const choice=(value,latex,mistake='')=>({value,latex,mistake});
const question=(id,f,latex,tag,answer,...distractors)=>({id,f,latex,tag,choices:[{...answer,correct:true},...distractors]});

export const DERIVATIVE_BANK=[
  question('power-cubic','x^3','x^3','Power rule',
    choice('3*x^2','3x^2'),choice('3*x^3','3x^3','Reduce the power by one.'),choice('2*x^2','2x^2','Multiply by the original power, not the new power.'),choice('x^2','x^2','Keep the original power as a coefficient.')),
  question('power-quartic','5*x^4','5x^4','Power rule',
    choice('20*x^3','20x^3'),choice('20*x^4','20x^4','Reduce the power by one.'),choice('15*x^3','15x^3','Multiply 5 by the original power, 4.'),choice('5*x^3','5x^3','The power becomes a multiplier.')),
  question('polynomial-linear','4*x^2-3*x','4x^2-3x','Polynomial',
    choice('8*x-3','8x-3'),choice('8*x+3','8x+3','Keep the minus sign on the linear term.'),choice('8*x-3*x','8x-3x','A linear term differentiates to its coefficient.'),choice('4*x-3','4x-3','The quadratic power contributes a factor of 2.')),
  question('polynomial-sum','x^5+x','x^5+x','Polynomial',
    choice('5*x^4+1','5x^4+1'),choice('5*x^4','5x^4','The derivative of x is 1.'),choice('5*x^4+x','5x^4+x','Differentiate the linear term too.'),choice('4*x^4+1','4x^4+1','Use the original power as the multiplier.')),
  question('negative-power','x^-2','x^{-2}','Negative powers',
    choice('-2*x^-3','-2x^{-3}'),choice('2*x^-3','2x^{-3}','Keep the negative coefficient.'),choice('-2*x^-1','-2x^{-1}','Subtract 1 from −2 to get −3.'),choice('-2*x^-2','-2x^{-2}','Reduce the power by one.')),
  question('square-root','sqrt(x)','\\sqrt{x}','Fractional powers',
    choice('1/(2*sqrt(x))','\\frac{1}{2\\sqrt{x}}'),choice('1/sqrt(x)','\\frac{1}{\\sqrt{x}}','The power ½ becomes a coefficient.'),choice('sqrt(x)/2','\\frac{\\sqrt{x}}{2}','The new power is −½, not ½.'),choice('-1/(2*sqrt(x))','-\\frac{1}{2\\sqrt{x}}','The coefficient ½ stays positive.')),
  question('sin','sin(x)','\\sin x','Trigonometric',
    choice('cos(x)','\\cos x'),choice('-cos(x)','-\\cos x','Sine differentiates to positive cosine.'),choice('sin(x)','\\sin x','Sine changes to cosine.'),choice('cos(x)^2','\\cos^2 x','No extra power is introduced.')),
  question('cos','cos(x)','\\cos x','Trigonometric',
    choice('-sin(x)','-\\sin x'),choice('sin(x)','\\sin x','Cosine differentiates to negative sine.'),choice('-cos(x)','-\\cos x','Cosine changes to sine.'),choice('-sin(x)^2','-\\sin^2 x','No extra power is introduced.')),
  question('tan','tan(x)','\\tan x','Trigonometric',
    choice('sec(x)^2','\\sec^2 x'),choice('sec(x)','\\sec x','The secant is squared.'),choice('-sec(x)^2','-\\sec^2 x','The derivative of tangent is positive.'),choice('tan(x)^2','\\tan^2 x','Use sec²x, not tan²x.')),
  question('exp','exp(x)','e^x','Exponential',
    choice('exp(x)','e^x'),choice('x*exp(x)','xe^x','The inner derivative is 1, not x.'),choice('exp(x-1)','e^{x-1}','The power rule does not apply to eˣ.'),choice('exp(x)+1','e^x+1','No constant term is introduced.')),
  question('exp-chain','exp(2*x)','e^{2x}','Chain rule',
    choice('2*exp(2*x)','2e^{2x}'),choice('exp(2*x)','e^{2x}','Multiply by the inner derivative, 2.'),choice('2*exp(x)','2e^x','Keep the original exponent, 2x.'),choice('4*exp(2*x)','4e^{2x}','The inner derivative contributes one factor of 2.')),
  question('log','log(x)','\\ln x','Logarithmic',
    choice('1/x','\\frac{1}{x}'),choice('-1/x','-\\frac{1}{x}','The derivative of ln x is positive 1/x.'),choice('1/x^2','\\frac{1}{x^2}','The denominator is x, not x².'),choice('log(x)/x','\\frac{\\ln x}{x}','The logarithm does not remain in the numerator.')),
  question('log-chain','log(3*x+1)','\\ln(3x+1)','Chain rule',
    choice('3/(3*x+1)','\\frac{3}{3x+1}'),choice('1/(3*x+1)','\\frac{1}{3x+1}','Include the inner derivative, 3.'),choice('3/(3*x+1)^2','\\frac{3}{(3x+1)^2}','A logarithmic derivative does not square the denominator.'),choice('3/(3*x)','\\frac{3}{3x}','Keep the entire inner expression in the denominator.')),
  question('power-chain','(2*x+1)^3','(2x+1)^3','Chain rule',
    choice('6*(2*x+1)^2','6(2x+1)^2'),choice('3*(2*x+1)^2','3(2x+1)^2','Include the inner derivative, 2.'),choice('6*(2*x+1)^3','6(2x+1)^3','Reduce the outer power by one.'),choice('6*(2*x+1)','6(2x+1)','The new outer power is 2.')),
  question('sin-chain','sin(2*x)','\\sin(2x)','Chain rule',
    choice('2*cos(2*x)','2\\cos(2x)'),choice('cos(2*x)','\\cos(2x)','Include the inner derivative, 2.'),choice('-2*cos(2*x)','-2\\cos(2x)','Sine differentiates to positive cosine.'),choice('2*cos(x)','2\\cos x','Keep the original argument, 2x.')),
  question('cos-chain','cos(x^2)','\\cos(x^2)','Chain rule',
    choice('-2*x*sin(x^2)','-2x\\sin(x^2)'),choice('2*x*sin(x^2)','2x\\sin(x^2)','Cosine introduces a minus sign.'),choice('-sin(x^2)','-\\sin(x^2)','Include the inner derivative, 2x.'),choice('-2*x*cos(x^2)','-2x\\cos(x^2)','Cosine changes to sine.')),
  question('exp-quadratic','exp(x^2)','e^{x^2}','Chain rule',
    choice('2*x*exp(x^2)','2xe^{x^2}'),choice('2*exp(x^2)','2e^{x^2}','The inner derivative is 2x, not 2.'),choice('x^2*exp(x^2)','x^2e^{x^2}','Differentiate the exponent instead of copying it.'),choice('2*x*exp(2*x)','2xe^{2x}','Keep the original exponent, x².')),
  question('sin-product','x*sin(x)','x\\sin x','Product rule',
    choice('sin(x)+x*cos(x)','\\sin x+x\\cos x'),choice('sin(x)-x*cos(x)','\\sin x-x\\cos x','The product-rule terms are added.'),choice('x*sin(x)+cos(x)','x\\sin x+\\cos x','Differentiate one factor at a time.'),choice('sin(x)+cos(x)','\\sin x+\\cos x','Keep x when differentiating the sine factor.')),
  question('exp-product','x^2*exp(x)','x^2e^x','Product rule',
    choice('2*x*exp(x)+x^2*exp(x)','2xe^x+x^2e^x'),choice('2*x*exp(x)-x^2*exp(x)','2xe^x-x^2e^x','The product-rule terms are added.'),choice('2*x*exp(x)+x*exp(x)','2xe^x+xe^x','Keep x² in the second product-rule term.'),choice('2*x^2*exp(x)+x^2*exp(x)','2x^2e^x+x^2e^x','The derivative of x² is 2x.')),
  question('quotient','(x+1)/(x-1)','\\frac{x+1}{x-1}','Quotient rule',
    choice('-2/(x-1)^2','-\\frac{2}{(x-1)^2}'),choice('2/(x-1)^2','\\frac{2}{(x-1)^2}','The numerator is (x−1)−(x+1)=−2.'),choice('-2/(x-1)','-\\frac{2}{x-1}','Square the original denominator.'),choice('-2/(x+1)^2','-\\frac{2}{(x+1)^2}','Square x−1, the denominator of the original function.')),
  question('reciprocal','1/(x^2+1)','\\frac{1}{x^2+1}','Reciprocal',
    choice('-2*x/(x^2+1)^2','-\\frac{2x}{(x^2+1)^2}'),choice('2*x/(x^2+1)^2','\\frac{2x}{(x^2+1)^2}','The reciprocal power introduces a minus sign.'),choice('-2*x/(x^2+1)','-\\frac{2x}{x^2+1}','The denominator must be squared.'),choice('-2/(x^2+1)^2','-\\frac{2}{(x^2+1)^2}','The inner derivative is 2x.')),
  question('log-product','x*log(x)','x\\ln x','Product rule',
    choice('log(x)+1','\\ln x+1'),choice('log(x)-1','\\ln x-1','The two product-rule terms are added.'),choice('log(x)+x','\\ln x+x','The second term is x·(1/x)=1.'),choice('log(x)+1/x','\\ln x+\\frac{1}{x}','Keep the x multiplying the logarithmic derivative.')),
  question('sin-squared','sin(x)^2','\\sin^2 x','Chain rule',
    choice('2*sin(x)*cos(x)','2\\sin x\\cos x'),choice('sin(x)*cos(x)','\\sin x\\cos x','Include the outer power, 2.'),choice('-2*sin(x)*cos(x)','-2\\sin x\\cos x','Sine differentiates to positive cosine.'),choice('2*sin(x)^2*cos(x)','2\\sin^2 x\\cos x','Reduce the outer power by one.')),
  question('root-chain','sqrt(2*x+1)','\\sqrt{2x+1}','Chain rule',
    choice('1/sqrt(2*x+1)','\\frac{1}{\\sqrt{2x+1}}'),choice('1/(2*sqrt(2*x+1))','\\frac{1}{2\\sqrt{2x+1}}','The inner derivative, 2, cancels the outer ½.'),choice('2/sqrt(2*x+1)','\\frac{2}{\\sqrt{2x+1}}','Include the outer ½ as well as the inner 2.'),choice('-1/sqrt(2*x+1)','-\\frac{1}{\\sqrt{2x+1}}','Both chain-rule factors are positive.'))
];

export function shuffled(items){
  const out=[...items];
  for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}
  return out;
}
