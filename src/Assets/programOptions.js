const programs = {
  lifeline: {
    programSnapshot: 'Discount on your phone or internet service',
    programName: 'Lifeline',
    programDescription: 'A monthly discount up to $9.25 on phone or internet service for eligible households.',
    learnMoreLink: 'https://www.lifelinesupport.org/',
    applyButtonLink: 'https://nv.fcc.gov/lifeline?id=nv_flow&sp=ZmFsc2U%3D&ln=RW5nbGlzaA%3D%3D',
    dollarValue: '$9.25/month',
    estimatedDeliveryTime: 'X weeks',
    legalStatusRequired: false,
  },
  wic: {
    programSnapshot: 'Healthy food for families',
    programName: 'Special Supplemental Nutrition Program for Women, Infants, and Children (WIC)',
    programDescription:
      'Free healthy food, counseling about healthy eating, breastfeeding support, and referrals for women, infants, and children under five.',
    learnMoreLink: 'http://www.coloradowic.gov/homepage',
    applyButtonLink: 'http://www.coloradowic.gov/eligibility/apply',
    dollarValue: '$11/month',
    estimatedDeliveryTime: 'X weeks',
    legalStatusRequired: false,
  },
  snap: {
    programSnapshot: 'Money to buy food',
    programName: 'Supplemental Nutrition Assistance Program (SNAP)',
    programDescription: 'SNAP benefits can help you feed your family with fresh and healthy groceries.',
    learnMoreLink: 'https://cdhs.colorado.gov/snap',
    applyButtonLink: 'https://peak--coloradopeak.force.com/peak/s/peak-landing-page?language=en_US',
    dollarValue: '$250/month per household member',
    estimatedDeliveryTime: 'X weeks',
    legalStatusRequired: true,
  },
  tanf: {
    programSnapshot: 'Cash assistance and work support',
    programName: 'Temporary Assistance for Needy Families (TANF/Colorado Works)',
    programDescription: 'TANF provides cash assistance and work support through the Workforce Development Program.',
    learnMoreLink: 'https://cdhs.colorado.gov/colorado-works',
    applyButtonLink: 'https://peak--coloradopeak.force.com/peak/s/peak-landing-page?language=en_US',
    dollarValue: '$400/month', //may change based on #of caretakers and children
    estimatedDeliveryTime: 'X weeks',
    legalStatusRequired: true,
  },
  eitc: {
    programSnapshot: 'Tax savings for working individuals and families',
    programName: 'Earned Income Tax Credit (EITC)',
    programDescription:
      'Tax credit worth up to $6,728 for low- to moderate-income workers and families, especially those with children.',
    learnMoreLink: 'https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit-eitc',
    applyButtonLink: 'https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free',
    dollarValue: '$2,135/year',
    estimatedDeliveryTime: 'X weeks',
    legalStatusRequired: true,
  },
  extendedCoEITC: {
    programSnapshot: 'Tax savings for working individuals and families with ITIN Filers',
    programName: 'Expanded Colorado Earned Income Tax Credit (COEITC) ',
    programDescription: 'Colorado Earned Income Tax Credit for ITIN Filers',
    learnMoreLink: 'https://tax.colorado.gov/COEITC',
    applyButtonLink: 'https://tax.colorado.gov/COEITC',
    dollarValue: '$X/year',
    estimatedDeliveryTime: 'X weeks',
    legalStatusRequired: false,
  },
  childAndDependentCareCredit: {
    programSnapshot: 'Tax credit if you paid for child care or dependent care',
    programName: 'Child and Dependent Care Tax Credit',
    programDescription:
      'Tax credit for people who paid someone to care for their dependents so they could work or look for work.',
    learnMoreLink: 'https://www.irs.gov/taxtopics/tc602',
    applyButtonLink: 'https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free',
    dollarValue: '$2,000/year per qualifying child',
    estimatedDeliveryTime: 'X weeks',
    legalStatusRequired: false,
  },
  coERAP: {
    programSnapshot: 'Rental assistance for tenants going through financial hardship as a result of COVID-19 ',
    programName: 'Colorado Emergency Rental Assistance Program (ERAP) ',
    programDescription:
      'The Colorado Emergency Rental Assistance Program (ERAP) can help cover rent as far back as April 2020.',
    learnMoreLink: 'https://cdola.colorado.gov/rental-assistance-program',
    applyButtonLink: 'https://cdola.colorado.gov/rental-assistance-information-and-applications-by-county-or-city',
    dollarValue: '$X/year',
    estimatedDeliveryTime: 'X weeks',
    legalStatusRequired: false,
  },
  acp: {
    programSnapshot: 'Monthly discount on internet service', //this might be the same as Lifeline
    programName: 'Affordable Connectivity Program (ACP)',
    programDescription:
      'Get a monthly discount up to $30 on internet service and up to $100 off for a laptop, tablet, or computer.',
    learnMoreLink: 'https://www.affordableconnectivity.gov/',
    applyButtonLink: 'https://nv.fcc.gov/lifeline/?id=nv_flow&ebbp=true',
    dollarValue: '$X/month',
    estimatedDeliveryTime: 'X weeks',
    legalStatusRequired: false,
  },
  leap: {
    programSnapshot: 'Money for heat and utility expenses',
    programName: 'Colorado Low-income Energy Assistance Program (LEAP)',
    programDescription:
      'Helps eligible hard-working Colorado families, seniors and individuals pay a portion of their winter home heating costs.',
    learnMoreLink: 'https://cdhs.colorado.gov/leap',
    applyButtonLink: 'https://peak--coloradopeak.force.com/peak/s/peak-landing-page?language=en_US',
    dollarValue: '$X/year',
    estimatedDeliveryTime: 'X weeks',
    legalStatusRequired: true,
  },
};

export default programs;
