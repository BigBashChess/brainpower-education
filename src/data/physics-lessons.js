const L=(id,topic,title,summary,explanation,formula='',worked=[])=>({id,course:'physics-12',topic,title,minutes:12,difficulty:'VCAA',xp:50,summary,explanation,formula,worked:worked.length?worked:['Identify the physical model.','Connect evidence or known quantities to the model.','State the conclusion with units and physical meaning.'],questions:[]});
const A=(topic,prefix,rows)=>rows.map((r,i)=>L(`${prefix}-${String(i+1).padStart(2,'0')}`,topic,...r));

const lightHeat=A('u1aos1','p12-u1a1',[
['Waves and electromagnetic radiation','Distinguish electromagnetic from mechanical waves.','Electromagnetic waves are transverse and can propagate through a vacuum; mechanical waves require a medium.'],
['Amplitude, wavelength, period and frequency','Read and calculate the defining quantities of a wave.','Amplitude measures maximum displacement, wavelength is one spatial cycle, period is time per cycle and frequency is cycles per second.','$T=1/f$'],
['The wave equation','Connect wave speed, frequency and wavelength.','Wave speed is determined by the medium while frequency is determined by the source, so wavelength changes when speed changes.','$v=f\\lambda=\\lambda/T$'],
['The electromagnetic spectrum','Compare radio through gamma radiation.','All electromagnetic radiation travels at c in vacuum but regions differ in wavelength, frequency, photon energy, uses and interactions with matter.','$c=3.00\\times10^8\\text{ m s}^{-1}$'],
['Reflection of light','Model specular reflection using rays.','At a reflecting surface the angle of incidence equals the angle of reflection, with angles measured from the normal.','$i=r$'],
['Refraction and refractive index','Explain bending when light changes speed.','Refraction occurs because light travels at different speeds in different media. Refractive index compares c with the speed in the material.','$n=c/v$'],
['Snell’s law','Calculate refraction angles at boundaries.','Snell’s law relates refractive indices and angles measured from the normal.','$n_1\\sin i=n_2\\sin r$'],
['Total internal reflection','Determine when light remains trapped in a medium.','Total internal reflection occurs from higher to lower refractive index when incidence exceeds the critical angle.','$\\sin i_c=n_2/n_1$'],
['Temperature and the kinetic model','Explain temperature microscopically.','Temperature is linked to the average translational kinetic energy of particles; it is not the same quantity as internal energy.'],
['Celsius and Kelvin scales','Convert temperature scales correctly.','Kelvin is an absolute thermodynamic scale. Temperature differences have the same numerical size in kelvin and degrees Celsius.','$T(K)=T(^\\circ C)+273$'],
['Conduction, convection and radiation','Compare the three major thermal transfer mechanisms.','Conduction transfers energy through microscopic interactions, convection through bulk fluid motion, and radiation through electromagnetic waves.'],
['Evaporative cooling','Explain cooling using particle energy distributions.','Higher-energy particles are more likely to escape during evaporation, lowering the average kinetic energy of particles left behind.'],
['Specific heat capacity','Calculate energy for temperature change.','Specific heat capacity is the energy required per kilogram per degree of temperature change.','$Q=mc\\Delta T$'],
['Latent heat and changes of state','Calculate energy transferred during phase changes.','During an ideal phase change energy changes intermolecular potential energy while temperature remains constant.','$Q=mL$'],
['Thermal radiation and matter','Connect emission and absorption to temperature and surfaces.','Matter emits and absorbs electromagnetic radiation; temperature and surface properties influence the rate and spectrum of thermal radiation.'],
['Climate, greenhouse effect and energy balance','Apply light and heat physics to climate systems.','Climate models use incoming solar radiation, reflection, absorption, infrared emission and greenhouse-gas absorption to analyse Earth’s energy balance.']
]);

const nuclear=A('u1aos2','p12-u1a2',[
['Nuclear structure and notation','Read proton number, neutron number and nucleon number.','A nucleus contains protons and neutrons. Isotopes share proton number but differ in neutron number.','${}^{A}_{Z}X$'],
['Isotopes and nuclear stability','Connect neutron-proton balance with stability.','Different isotopes can be stable or unstable; unstable nuclei undergo spontaneous radioactive decay toward more stable configurations.'],
['Alpha radiation','Model alpha decay and its properties.','Alpha radiation consists of helium nuclei, is strongly ionising and relatively weakly penetrating.'],
['Beta-minus radiation','Model beta-minus decay.','In beta-minus decay a neutron transforms into a proton while an electron and antineutrino are emitted.'],
['Beta-plus radiation','Model beta-plus decay.','In beta-plus decay a proton transforms into a neutron while a positron and neutrino are emitted.'],
['Gamma radiation','Explain gamma emission.','Gamma radiation is high-frequency electromagnetic radiation emitted when an excited nucleus loses energy; it changes neither A nor Z.'],
['Nuclear equations','Balance nuclear transformations.','Nuclear equations conserve total nucleon number and charge number, allowing unknown products to be identified.'],
['Ionisation and penetration','Compare radiation interactions with matter.','Radiation types differ in ionising ability, penetration and shielding, which determines their hazards and applications.'],
['Activity and random decay','Interpret radioactive activity statistically.','Individual decay is random, but large samples show predictable exponential behaviour. Activity measures decays per second.','$A=\\Delta N/\\Delta t$'],
['Half-life','Calculate remaining nuclei or activity.','Half-life is the time for the number of undecayed nuclei, and therefore activity, to halve.','$N=N_0(1/2)^{t/t_{1/2}}$'],
['Radiation dose and biological effects','Relate exposure to risk.','Ionising radiation can damage biological tissue; risk depends on energy deposited, radiation type, exposure and tissue sensitivity.'],
['Radiation detection','Explain how radiation is measured.','Detectors such as Geiger counters convert ionising interactions into measurable electrical signals; background radiation must be considered.'],
['Mass-energy equivalence and binding energy','Connect nuclear mass changes with energy.','A mass defect corresponds to nuclear binding energy through mass-energy equivalence.','$E=mc^2$'],
['Nuclear fission','Explain energy release in heavy-nucleus splitting.','Fission splits a heavy nucleus into smaller nuclei and neutrons, releasing energy because products are more tightly bound.'],
['Chain reactions and reactors','Explain controlled and uncontrolled fission chains.','Neutrons from one fission can trigger further fissions; reactor design controls this multiplication while transferring released energy.'],
['Fusion and nuclear energy evaluation','Compare fusion, fission and nuclear energy choices.','Fusion combines light nuclei and can release large energy. Evaluating nuclear energy requires physics evidence alongside waste, safety, resources and societal considerations.']
]);

const electricity=A('u1aos3','p12-u1a3',[
['Charge and electric current','Define charge flow and conventional current.','Current is the rate of flow of electric charge. Conventional current direction is defined as positive-charge flow.','$I=Q/t$'],
['Potential difference and energy','Interpret voltage as energy transferred per charge.','Potential difference measures the energy transformed per coulomb of charge moving between two points.','$V=E/Q$'],
['Electrical power','Calculate rate of electrical energy transfer.','Power is energy transferred per unit time; in a circuit it is the product of potential difference and current.','$P=E/t=VI$'],
['Kilowatt-hours and electrical energy','Use household energy units.','A kilowatt-hour is a unit of energy, not power, and represents one kilowatt transferred for one hour.','$E=Pt$'],
['Ammeters, voltmeters and multimeters','Choose and connect measuring instruments correctly.','Ammeters measure current in series while voltmeters measure potential difference across components in parallel.'],
['Resistance and Ohm’s law','Model opposition to current.','Resistance is the ratio of potential difference to current. Ohmic components have constant resistance under appropriate conditions.','$R=V/I$'],
['Current-voltage characteristics','Interpret I–V graphs for components.','The shape of an I–V graph reveals whether resistance is constant and how a component responds as operating conditions change.'],
['Resistors in series','Analyse current, voltage and equivalent resistance in series.','Series components carry the same current and their voltage drops add. Equivalent resistance is the sum of individual resistances.','$R_{eq}=R_1+R_2+...$'],
['Resistors in parallel','Analyse current division and equivalent resistance.','Parallel branches share the same potential difference while branch currents add at junctions.','$1/R_{eq}=1/R_1+1/R_2+...$'],
['Mixed series-parallel circuits','Reduce and analyse multi-stage circuits.','Complex resistor networks can be simplified in stages while preserving series and parallel relationships.'],
['Voltage dividers','Analyse how series resistors divide supply voltage.','A voltage divider produces an output that depends on the resistance ratio when loading effects are neglected.','$V_{out}=V_{in}R_2/(R_1+R_2)$'],
['Power in series and parallel circuits','Compare energy transfer in circuit arrangements.','Power depends on both current and potential difference, so changing circuit arrangement changes component and total power.','$P=VI$'],
['Diodes and LEDs','Explain directional electronic components.','Diodes conduct strongly in one direction after suitable forward bias; LEDs transform electrical energy into light.'],
['Thermistors, LDRs and potentiometers','Use variable-resistance components as sensors and controls.','Thermistors respond to temperature, LDRs to light intensity and potentiometers provide adjustable resistance or voltage division.'],
['Household circuits','Model household electricity using circuit principles.','Household appliances are connected mainly in parallel so each receives the supply voltage and operates independently.'],
['Electrical safety','Explain fuses, circuit breakers, earthing and safe power use.','Safety systems reduce risks from excessive current, insulation failure and dangerous potential differences by interrupting or redirecting current.']
]);

const motion=A('u2aos1','p12-u2a1',[
['Scalars, vectors and reference directions','Distinguish scalar and vector descriptions of motion.','Distance and speed are scalars; displacement, velocity, acceleration, force and momentum require magnitude and direction.'],
['Position, displacement, distance, speed and velocity','Use motion quantities precisely.','Displacement is change in position, distance is path length, velocity is displacement rate and speed is distance rate.','$v_{av}=\\Delta x/\\Delta t$'],
['Acceleration','Interpret changing velocity.','Acceleration is the rate of change of velocity and can result from changing speed, direction or both.','$a_{av}=\\Delta v/\\Delta t$'],
['Motion graphs','Extract physical information from x–t and v–t graphs.','Gradients encode velocity or acceleration while area under a velocity-time graph gives displacement.'],
['Constant-acceleration equations','Model one-dimensional uniformly accelerated motion.','Constant acceleration permits a linked set of equations connecting initial velocity, final velocity, displacement and time.','$v=u+at,\\ s=ut+\\tfrac12at^2,\\ v^2=u^2+2as$'],
['Free fall','Apply constant acceleration near Earth.','Ignoring air resistance, freely falling objects near Earth share approximately constant downward acceleration independent of mass.','$g\\approx9.8\\text{ m s}^{-2}$'],
['Forces and free-body diagrams','Represent interactions acting on one object.','A free-body diagram contains only forces acting on the chosen body and is the foundation for a correct net-force equation.'],
['Newton’s laws','Connect force, inertia and acceleration.','Newton’s laws describe inertia, the relationship between net force and acceleration, and interaction force pairs.','$\\Sigma F=ma$'],
['Common forces','Analyse weight, normal force, tension, friction and drag.','Different interactions produce characteristic forces; weight near Earth is the gravitational force on a mass.','$F_g=mg$'],
['Work and kinetic energy','Connect force through displacement with changes in motion energy.','Work by a constant force depends on the component of force along displacement and transfers energy.','$W=Fs\\cos\\theta,\\quad E_k=\\tfrac12mv^2$'],
['Gravitational and elastic potential energy','Track stored mechanical energy.','Near Earth gravitational potential energy depends on height; an ideal spring stores elastic energy when deformed.','$E_g=mgh,\\quad E_s=\\tfrac12kx^2$'],
['Conservation of mechanical energy','Solve motion through energy transfers.','When dissipative transfers are negligible, total mechanical energy remains constant even as kinetic and potential stores change.'],
['Momentum','Describe motion using mass and velocity.','Momentum is a vector equal to mass times velocity and is useful for analysing interactions.','$p=mv$'],
['Impulse and momentum change','Connect force acting over time with momentum.','The impulse delivered by net force equals the change in momentum.','$F_{net}\\Delta t=\\Delta p=m\\Delta v$'],
['Momentum conservation','Analyse one-dimensional collisions and interactions.','For an isolated system total momentum before an interaction equals total momentum after it.','$\\Sigma p_{before}=\\Sigma p_{after}$'],
['Torque, equilibrium and motion applications','Analyse stationary structures and apply motion physics to real contexts.','Equilibrium requires zero net force and zero net torque. Motion concepts can then be integrated in case studies such as vehicle safety, sport, devices or structures.','$\\tau=r_\\perp F,\\quad \\Sigma F=0,\\quad \\Sigma\\tau=0$']
]);

export const physicsLessons=[...lightHeat,...nuclear,...electricity,...motion];
