/// <reference types="cypress" />

context('Register', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl') + '/login')
    cy.get('#set-session-register').should('be.visible').click()

    cy.wait(2000)
  })

  it('redirect to /class/list after register using valid email & password', () => {
    cy.intercept('/api/user/register').as('register')

    cy.location('pathname').should('include', 'login')

    cy.get('#name-register').should('be.visible').type("TEST")
    cy.get('#email-register').should('be.visible').type("test@email.com")
    cy.get('#password-register').should('be.visible').type("WILLBEDELETEDAFTERTEST")
    cy.get('#submit-register').should('be.visible').click()

    cy.wait('@register')
    cy.wait(8000)

    cy.location('pathname').should('include', 'class/list')
  })

  it('show danger notification after register using registered email', () => {
    cy.intercept('/api/user/register').as('register')

    cy.location('pathname').should('include', 'login')

    cy.get('#name-register').should('be.visible').type("TEST")
    cy.get('#email-register').should('be.visible').type("test@email.com")
    cy.get('#password-register').should('be.visible').type("WILLBEDELETEDAFTERTEST")
    cy.get('#submit-register').should('be.visible').click()

    cy.wait('@register')

    cy.get('#floating-notification').should('have.class', 'bg-red-400 border-red-600')
  })
})
