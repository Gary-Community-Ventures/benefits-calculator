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

});