export const createDevFormData = (searchParams) => {
  return {
    isTest: true,
    externalID: searchParams.get('externalid') ? searchParams.get('externalid') : null,
    agreeToTermsOfService: false,
    age: '33',
    zipcode: '80204',
    county: '',
    startTime: new Date().toJSON(),
    student: false,
    studentFulltime: false,
    pregnant: true,
    unemployed: false,
    unemployedWorkedInLast18Mos: true,
    blindOrVisuallyImpaired: false,
    disabled: false,
    veteran: false,
    hasIncome: true,
    incomeStreams: [{
      incomeStreamName: 'wages', 
      incomeAmount: '29000',
      incomeFrequency: 'yearly'
    }],
    hasExpenses: true,
    expenses: [{
      expenseSourceName: 'rent',
      expenseAmount: '500',
      expenseFrequency: 'monthly'
    }],
    householdSize: '2',
    householdData: [{
      age: '3',
      relationshipToHH: `child`,
      student: false,
      studentFulltime: false,
      pregnant: false,
      unemployed: false,
      unemployedWorkedInLast18Mos: false,
      blindOrVisuallyImpaired: false,
      disabled: false,
      veteran: false,
      noneOfTheseApply: true,
      hasIncome: false,
      incomeStreams: [],
      hasExpenses: false,
      expenses: []
    }],
    householdAssets: '1000',
    relationship: 'headOfHousehold',
    lastTaxFilingYear: '2021',
    benefits: {
      tanf: true,
      wic: true,
      snap: false,
      lifeline: false,
      acp: false,
      eitc: false,
      coeitc: false,
      nslp: false,
      ctc: false,
      rtdlive: false,
      cccap: false,
      mydenver: false,
      leap: false
    },
    healthInsurance: {
      employer: false,
      private: false, 
      medicaid: false,
      chp: false,
      none: false
    },
    referralSource: 'gary',
    otherSource: '',
    signUpInfo: {
      email: 'testabc@gmail.com',
      phone: '',
      firstName: 'Test',
      lastName: 'Test',
      sendOffers: true,
      sendUpdates: false,
      commConsent: true
    },
    urlSearchParams: null,
    isBIAUser: null
  };
};
