it('loads examples', () => {
  cy.visit('https://example.cypress.io')
  cy.contains('Kitchen Sink')
})