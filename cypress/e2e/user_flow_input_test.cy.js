describe ('Userflow input test', () => {
  it('As a user, when I visit the MFB landing page I should see the step progression display Step 0 of 21', () => {
    cy.visit('http://localhost:3000')
      .get('p[class="step-progress-title"]')
      .should("contain", 'Step 0 of 21')
  });
});