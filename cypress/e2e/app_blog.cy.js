describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  describe('Login', function() {
    it('fails with wrong credentials', function() {
      cy.get('#username-login').type('mluukkai')
      cy.get('#password-login').type('password')
      cy.get('#submit-login').click()
      cy.contains('invalid username or password')
    })

    it('succeds with correct credentials', function() {
      cy.get('#username-login').type('mluukkai')
      cy.get('#password-login').type('salainen')
      cy.get('#submit-login').click()
      cy.contains('blogs')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.get('#username-login').type('mluukkai')
      cy.get('#password-login').type('salainen')
      cy.get('#submit-login').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#input-titleBlog').type('New Blog')
      cy.get('#input-authorBlog').type('author Blog')
      cy.get('#input-urlBlog').type('url Blog')
      cy.contains('save').click()
    })


    describe('when blog exist', function() {
      it('user can view delete button', function() {
        cy.get('#input-titleBlog').type('New Blog')
        cy.get('#input-authorBlog').type('author Blog')
        cy.get('#input-urlBlog').type('url Blog')
        cy.contains('save').click()
        cy.contains('view more').click()
        cy.get('#like-button').click()
        cy.contains('Remove blog')
      })
      it('user can like blog', function() {
        cy.contains('new blog').click()
        cy.get('#input-titleBlog').type('New Blog')
        cy.get('#input-authorBlog').type('author Blog')
        cy.get('#input-urlBlog').type('url Blog')
        cy.contains('save').click()
        cy.contains('view more').click()
        cy.get('#like-button').click()
      })
    })
  })
})