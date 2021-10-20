const { _ } = Cypress

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

    describe('blog manipulation', function () {
      beforeEach(function () {
        const blog = {
          title: 'New Blogpost',
          author: 'Jaska Jokunen',
          url: 'http://localhost/blog/1'
        }
        cy.addBlog(blog)
      })

      it('should be able to like posts', function() {
        cy.contains('New Blogpost').find('button').click()
        cy.contains('http://localhost/blog/1')

        cy.contains('New Blogpost').contains('likes:').as('likes')
        cy.get('@likes').contains('0')

        cy.get('@likes').parent().find('button').contains('like').click()
        cy.get('@likes').contains('1')
      })

      it('user who created the blog can also delete it', function() {
        cy.contains('New Blogpost').find('button').click()

        cy.contains('Delete').click()
        cy.on('window:confirm', (text) => {
          expect(text).to.equal('Remove New Blogpost by Jaska Jokunen?')
        })
        cy.on('window:confirm', () => true)
        cy.wait(1000)
        cy.contains('New Blogpot').should('not.exist')
      })

      it('user who didnt create cannot delete blogpost', function() {
        const newUser = {
          username: 'user2',
          password: 'passwords',
          name: 'Joku Muu'
        }
        cy.contains('New Blogpost')
        cy.request('POST', 'http://localhost:3003/api/users', newUser)
        cy.login({ username: 'user2', password: 'passwords' })

        cy.contains('Joku Muu')
        cy.contains('New Blogpost').find('button').click()

        cy.contains('Delete').should('not.exist')
      })

      it('blogs should be in order of likes', function() {
        const blog2 = {
          title: 'Middle Blogpost',
          author: 'Jaska Jokunen',
          url: 'http://localhost/blog/1'
        }
        const blog3 = {
          title: 'Not good Blogpost',
          author: 'Jaska Jokunen',
          url: 'http://localhost/blog/1'
        }
        cy.addBlog(blog3)
        cy.addBlog(blog2)

        cy.contains('New Blogpost').find('button').click()
        cy.contains('Middle Blogpost').find('button').click()
        cy.contains('Not good Blogpost').find('button').click()

        cy.contains('New Blogpost').find('button').contains('like').as('likesNew')
        cy.contains('Middle Blogpost').find('button').contains('like').as('likesMiddle')
        cy.contains('Not good Blogpost').find('button').contains('like').as('likesBad')

        cy.get('@likesBad').click().parent().find('#likes').contains('likes: 1')
        cy.get('@likesMiddle').click().parent().find('#likes').contains('likes: 1')
        cy.get('@likesMiddle').click().parent().find('#likes').contains('likes: 2')
        cy.get('@likesNew').click().parent().find('#likes').contains('likes: 1')
        cy.get('@likesNew').click().parent().find('#likes').contains('likes: 2')
        cy.get('@likesNew').click().parent().find('#likes').contains('likes: 3')
        cy.get('@likesNew').click().parent().find('#likes').contains('likes: 4')

        cy.get('#blogposts')
          .within(() => {
            cy.get('.blogentry').should('have.length', 3)

            cy.get('.blogentry > #likes')
              // only take innerHtml from html element
              .then((likesHtml) => {return _.map(likesHtml, 'innerHTML')})
              // split the text and convert last part to number
              .then((likestext) => {return _.map(likestext, (i) => { return Number(i.split(' ')[1]) })})
              .then((likes) => {
                //console.log(likes)

                const sorted = likes
                likes.sort().reverse()
                expect(likes).to.deep.equal(sorted)
              })
          })
      })
    })
  })
})