import stepDirectory from "../../src/Assets/stepDirectory";

describe ('English user flow input test', () => {
  it('When I visit the MFB landing page I should see the step progression display Step 0 of 21', () => {
    cy.visit('http://localhost:3000')
      .get('p[class="step-progress-title"]')
      .should("contain", 'Step 0 of 21');
  });

  it('When I visit the MFB landing page and click on the Continue button, it should navigate me to' +
    ' Step 1 of the screener and display that progression in the url and progress counter', () => {
    cy.visit('http://localhost:3000')
      .get('button').should("contain", 'Continue').click()
      .url()
      .should("contain", 'http://localhost:3000/step-1')
      .get('p[class="step-progress-title"]')
      .should("contain", 'Step 1 of 21');

  });

  it('When I click on the Prev button in the Disclaimer' +
    ' it should navigate me to back to Step 0 and that regression should be displayed in the url and progress counter', () => {
    cy.visit('http://localhost:3000/step-1')
      .get('button').should('have.class', 'prev-button').first().click()
      .url()
      .should("contain", 'http://localhost:3000/step-0')
      .get('p[class="step-progress-title"]')
      .should("contain", 'Step 0 of 21');
  });

  it('Happy path: When I click on the Disclaimer checkbox in step-1, and click on Continue' +
    ' it should navigate me to Step 2 of the screener and display that progression in the url and progress counter', () => {
    cy.visit('http://localhost:3000/step-1')
      .get('input[type="checkbox"]').click()
      .get('button').eq(1).click()
      .url()
      .should("contain", 'http://localhost:3000/step-2')
      .get('p[class="step-progress-title"]')
      .should("contain", 'Step 2 of 21');
  });

  it('Sad path: When I just click on Continue button on the Disclaimer' +
    ' I should see an error message', () => {
      cy.visit('http://localhost:3000/step-1')
      .get('button').eq(1).click()
      .get('p').should("contain", 'Please check the box below to continue.');
  });

  it('Age question happy path: When I enter my age and click on Continue I should be navigated to the next step', () => {
    //url and step counter test runs first
      cy.visit(`http://localhost:3000/step-${stepDirectory.age}`)
      .url()
      .should("contain", `http://localhost:3000/step-${stepDirectory.age}`)
      .get('p[class="step-progress-title"]')
      .should("contain", `Step ${stepDirectory.age} of ${Object.keys(stepDirectory).length + 2}`)

      .get('input[id=":r0:"]')
      .type('31')
      .get('button').eq(1).click()
      .url()
      .should("contain", `http://localhost:3000/step-${Number(stepDirectory.age) + 1}`)
      .get('p[class="step-progress-title"]')
      .should("contain", `Step ${stepDirectory.age + 1} of ${Object.keys(stepDirectory).length + 2}`)
  });

  it('Age question sad path 1: If I just click on the Continue button I should see an error', () => {
    cy.visit(`http://localhost:3000/step-${stepDirectory.age}`)
      .get('button').eq(1).click()
      .get('p').should("contain", 'Please enter a valid age (13-130)');
  });

  it('Age question sad path 2: If I try to enter anything other than a number and click Continue I should see an error and the input should be empty', () => {
    cy.visit(`http://localhost:3000/step-${stepDirectory.age}`)
      .get('input[id=":r0:"]')
      .type('not valid input')
      .get('button').eq(1).click()
      .get('p').should("contain", 'Please enter a valid age (13-130)')
      .get('input[id=":r0:"]').should("contain", '');
  });

  it('Zipcode question happy path: When I enter my zipcode, select a county and click on Continue I should be navigated to the next step', () => {
    //url and step counter test runs first
      cy.visit(`http://localhost:3000/step-${stepDirectory.zipcode}`)
      .url()
      .should("contain", `http://localhost:3000/step-${stepDirectory.zipcode}`)
      .get('p[class="step-progress-title"]')
      .should("contain", `Step ${stepDirectory.zipcode} of ${Object.keys(stepDirectory).length + 2}`)

      .get('input[id=":r0:"]')
      .type('80211')
      .get('div[id="county-source-select"]')
      .click()
      .get('li').eq(1).click()
      .get('button').eq(1).click()
      .url()
      .should("contain", `http://localhost:3000/step-${Number(stepDirectory.zipcode) + 1}`)
      .get('p[class="step-progress-title"]')
      .should("contain", `Step ${stepDirectory.zipcode + 1} of ${Object.keys(stepDirectory).length + 2}`)
  });

  it("Zipcode question sad path 1: When I enter my zipcode, don't select a county and click on Continue I should be on the same page", () => {
      cy.visit(`http://localhost:3000/step-${stepDirectory.zipcode}`)
      .get('input[id=":r0:"]')
      .type('80211')
      .get('button').eq(1).click()
      .url()
      .should("contain", `http://localhost:3000/step-${stepDirectory.zipcode}`)
      .get('p[class="step-progress-title"]')
      .should("contain", `Step ${stepDirectory.zipcode} of ${Object.keys(stepDirectory).length + 2}`)
  });

  it("Zipcode question sad path 2: When I just click on Continue I should be on the same page and see an error message", () => {
      cy.visit(`http://localhost:3000/step-${stepDirectory.zipcode}`)
      .get('button').eq(1).click()
      .url()
      .should("contain", `http://localhost:3000/step-${stepDirectory.zipcode}`)
      .get('p[class="step-progress-title"]')
      .should("contain", `Step ${stepDirectory.zipcode} of ${Object.keys(stepDirectory).length + 2}`)
      .get('p').should("contain", 'Please enter a valid CO zip code')
  });

  it('Income question happy path 1: When I click `Yes`, fill out all three income fields for both of my income sources and click on Continue I should be navigated to the next step', () => {
    //url and step counter test runs first
      cy.visit(`http://localhost:3000/step-${stepDirectory.hasIncome}`)
      .url()
      .should("contain", `http://localhost:3000/step-${stepDirectory.hasIncome}`)
      .get('p[class="step-progress-title"]')
      .should("contain", `Step ${stepDirectory.hasIncome} of ${Object.keys(stepDirectory).length + 2}`)

      .get('input[type="radio"]').should("have.value", 'true').first().click()
      .get('div[aria-labelledby="income-type-label"]').click().get('li').eq(1).click()
      .get('div[aria-labelledby="income-frequency-label income-frequency"]').click().get('li').eq(2).click()
      .get('input[type="text"]').type('1000')

      .get('button').should("contain", 'Add another income').first().click()
      .get('div[aria-labelledby="income-type-label"]').click().get('li').eq(2).click()
      .get('div[aria-labelledby="income-frequency-label income-frequency"]').eq(1).click().get('li').eq(2).click()
      .get('input[type="text"]').eq(1).type('50')
      .get('button').should("contain", 'Continue').eq(3).click()
      .url()
      .should("contain", `http://localhost:3000/step-${Number(stepDirectory.hasIncome) + 1}`)
      .get('p[class="step-progress-title"]')
      .should("contain", `Step ${stepDirectory.hasIncome + 1} of ${Object.keys(stepDirectory).length + 2}`)
  });

  it('Income question happy path 2: Removing an added income source', () => {
      cy.visit(`http://localhost:3000/step-${stepDirectory.hasIncome}`)
      .get('input[type="radio"]').should("have.value", 'true').first().click()
      .get('div[aria-labelledby="income-type-label"]').click().get('li').eq(1).click()
      .get('div[aria-labelledby="income-frequency-label income-frequency"]').click().get('li').eq(2).click()
      .get('input[type="text"]').type('1000')

      .get('button').should("contain", 'Add another income').first().click()
      .get('div[aria-labelledby="income-type-label"]').click().get('li').eq(2).click()
      .get('div[aria-labelledby="income-frequency-label income-frequency"]').eq(1).click().get('li').eq(2).click()
      .get('input[type="text"]').eq(1).type('50')
      .get('button').should("contain", 'x').first().click()
      .get('p[class="question-label"]').contains('If you receive another type of income, select it below.').should('not.exist')
  });

  it('Income question sad path 1: If I clicked \'Yes\', did not enter any of the income fields and pressed \'Continue\' I should see an error message', () => {
      cy.visit(`http://localhost:3000/step-${stepDirectory.hasIncome}`)
      .get('input[type="radio"]').should("have.value", 'true').first().click()
      .get('button').should("contain", 'Continue').eq(2).click()
      .url()
      .should("contain", `http://localhost:3000/step-${stepDirectory.hasIncome}`)
      .get('p[class="step-progress-title"]')
      .should("contain", `Step ${stepDirectory.hasIncome} of ${Object.keys(stepDirectory).length + 2}`)
      .get('div[role="alert"]').should("contain", 'Please select and enter a response for all three fields')

  });

  it('Income question sad path 2: If I clicked \'Yes\', only selected my INCOME TYPE and pressed \'Continue\' I should see an error message', () => {
      cy.visit(`http://localhost:3000/step-${stepDirectory.hasIncome}`)
      .get('input[type="radio"]').should("have.value", 'true').first().click()
      .get('div[aria-labelledby="income-type-label"]').click().get('li').eq(1).click()
      .get('button').should("contain", 'Continue').eq(2).click()
      .url()
      .should("contain", `http://localhost:3000/step-${stepDirectory.hasIncome}`)
      .get('p[class="step-progress-title"]')
      .should("contain", `Step ${stepDirectory.hasIncome} of ${Object.keys(stepDirectory).length + 2}`)
      .get('div[role="alert"]').should("contain", 'Please select and enter a response for all three fields');
  });

  it('Income question sad path 3: If I clicked \'Yes\', only selected the FREQUENCY and pressed \'Continue\' I should see an error message', () => {
      cy.visit(`http://localhost:3000/step-${stepDirectory.hasIncome}`)
      .get('input[type="radio"]').should("have.value", 'true').first().click()
      .get('div[aria-labelledby="income-frequency-label income-frequency"]').click().get('li').eq(2).click()
      .get('button').should("contain", 'Continue').eq(2).click()
      .url()
      .should("contain", `http://localhost:3000/step-${stepDirectory.hasIncome}`)
      .get('p[class="step-progress-title"]')
      .should("contain", `Step ${stepDirectory.hasIncome} of ${Object.keys(stepDirectory).length + 2}`)
      .get('div[role="alert"]').should("contain", 'Please select and enter a response for all three fields');
  });

  it('Income question sad path 4: If I clicked \'Yes\', only selected the AMOUNT and pressed \'Continue\' I should see an error message', () => {
      cy.visit(`http://localhost:3000/step-${stepDirectory.hasIncome}`)
      .get('input[type="radio"]').should("have.value", 'true').first().click()
      .get('input[type="text"]').type('1000')
      .get('button').should("contain", 'Continue').eq(2).click()
      .url()
      .should("contain", `http://localhost:3000/step-${stepDirectory.hasIncome}`)
      .get('p[class="step-progress-title"]')
      .should("contain", `Step ${stepDirectory.hasIncome} of ${Object.keys(stepDirectory).length + 2}`)
      .get('div[role="alert"]').should("contain", 'Please select and enter a response for all three fields');
  });
});