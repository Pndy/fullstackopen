describe('Blog app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'user',
      password: 'password',
      name: 'Matti Meikäläinen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('main page has login form', function() {
    cy.contains('Log into application')
    cy.get('#usernameInput')
    cy.get('#passwordInput')
    cy.get('#submitLogin')
  })

  describe('login', function() {
    it('login succeeds with right credentials', function() {
      cy.contains('Log into application')
      cy.get('#usernameInput').type('user')
      cy.get('#passwordInput').type('password')
      cy.get('#submitLogin').click()

      cy.contains('Matti Meikäläinen')
      cy.get('.info')
        .should('contain', 'logged in')
        .and('have.css', 'color', 'rgb(135, 206, 250)')
    })


    it('login fails with wrong credentials', function() {
      cy.contains('Log into application')
      cy.get('#usernameInput').type('user2')
      cy.get('#passwordInput').type('salasana')
      cy.get('#submitLogin').click()

      cy.get('.error')
        .should('contain', 'incorrect login details')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'user', password: 'password' })
    })

    it('blog can be added', function () {
      cy.contains('add new blog').click()

      cy.get('#titleInput').type('New Blogpost')
      cy.get('#authorInput').type('Jaska Jokunen')
      cy.get('#urlInput').type('http://localhost/blog/1')

      cy.get('#blogformSubmit').click()

      cy.contains('add new blog')
      cy.contains('New Blogpost')
      cy.contains('Jaska Jokunen')
    })
  })
})