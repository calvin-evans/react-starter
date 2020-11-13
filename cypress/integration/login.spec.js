/* global cy */

describe('Logging in', () => {
  it('Logs in on click', () => {
    cy.visit('http://localhost:3000')

    cy.get('button')
      .click()

    cy.contains('LOGGED IN')
  })
})
