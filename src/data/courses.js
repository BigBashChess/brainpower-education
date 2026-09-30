export const courses = [
  {
    id:'methods-12', short:'Methods 1/2', title:'Mathematical Methods Units 1 & 2',
    desc:'Build the functions, algebra, calculus and probability foundations that Methods 3/4 relies on.',
    accent:'methods',
    topics:[
      {id:'functions',title:'Functions & Relations',icon:'ƒ'},
      {id:'algebra',title:'Algebra & Polynomials',icon:'x²'},
      {id:'exp-log',title:'Exponentials & Logarithms',icon:'eˣ'},
      {id:'trig',title:'Trigonometry',icon:'θ'},
      {id:'differentiation',title:'Differentiation',icon:"f′"},
      {id:'integration',title:'Integration',icon:'∫'},
      {id:'probability',title:'Probability',icon:'P'}
    ]
  },
  {
    id:'methods-34', short:'Methods 3/4', title:'Mathematical Methods Units 3 & 4',
    desc:'VCAA-focused functions, calculus and probability with demanding application and exam preparation.',
    accent:'methods',
    topics:[
      {id:'functions',title:'Functions',icon:'ƒ'},
      {id:'differentiation',title:'Differentiation',icon:"f′"},
      {id:'applications',title:'Applications of Calculus',icon:'↗'},
      {id:'integration',title:'Integration',icon:'∫'},
      {id:'probability',title:'Probability',icon:'P'},
      {id:'random-variables',title:'Random Variables',icon:'X'},
      {id:'exam-prep',title:'Exam Preparation',icon:'✓'}
    ]
  },
  {
    id:'specialist-12', short:'Specialist 1/2', title:'Specialist Mathematics Units 1 & 2',
    desc:'Advanced algebra, trigonometry, vectors, complex numbers, calculus and kinematics.',
    accent:'specialist',
    topics:[
      {id:'algebra',title:'Algebra & Partial Fractions',icon:'Σ'},
      {id:'functions',title:'Functions',icon:'ƒ'},
      {id:'trig',title:'Trigonometry',icon:'θ'},
      {id:'vectors',title:'Vectors',icon:'→'},
      {id:'complex',title:'Complex Numbers',icon:'i'},
      {id:'calculus',title:'Calculus',icon:'∫'},
      {id:'kinematics',title:'Kinematics',icon:'v'}
    ]
  },
  {
    id:'specialist-34', short:'Specialist 3/4', title:'Specialist Mathematics Units 3 & 4',
    desc:'High-level VCE mathematics with rigorous VCAA-style and Separator practice.',
    accent:'specialist',
    topics:[
      {id:'functions',title:'Functions & Graphs',icon:'ƒ'},
      {id:'complex',title:'Complex Numbers',icon:'i'},
      {id:'vectors',title:'Vectors',icon:'→'},
      {id:'calculus',title:'Calculus',icon:'∫'},
      {id:'differential-equations',title:'Differential Equations',icon:'dy'},
      {id:'statistics',title:'Probability & Statistics',icon:'μ'},
      {id:'mechanics',title:'Mechanics',icon:'F'}
    ]
  }
];

export const courseById = id => courses.find(c => c.id === id);
