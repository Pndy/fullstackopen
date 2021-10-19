describe('Blog app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('main page has login form', function() {
    cy.contains('Log into application')
    cy.get('#usernameInput')
    cy.get('#passwordInput')
    cy.contains('Login')
  })
})