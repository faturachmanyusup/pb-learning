/// <reference types="cypress" />

context('Login', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl') + '/login')
  })

  it('change session to register and back', () => {
    cy.location('pathname').should('include', 'login')

    cy.get('#login-form').should('be.visible')
    cy.get('#set-session-register').should('be.visible').click()

    cy.wait(2000)

    cy.get('#register-form').should('be.visible')
    cy.get('#set-session-login').should('be.visible').click()

    cy.wait(2000)

    cy.get('#login-form').should('be.visible')
  })

  it('redirect to /class/list after login using valid email & password', () => {
    cy.intercept('/api/auth/*').as('login')

    cy.location('pathname').should('include', 'login')

    cy.get('#email-login').should('be.visible').type("test@email.com")
    cy.get('#password-login').should('be.visible').type("WILLBEDELETEDAFTERTEST")
    cy.get('#submit-login').should('be.visible').click()

    cy.wait('@login')

    cy.location('pathname').should('include', 'class/list')
  })

  it('show danger notification after login using invalid email & password', () => {
    cy.intercept('/api/auth/*').as('login')

    cy.location('pathname').should('include', 'login')

    cy.get('#email-login').should('be.visible').type("invalid@email.com")
    cy.get('#password-login').should('be.visible').type("invalid")
    cy.get('#submit-login').should('be.visible').click()

    cy.wait('@login')

    cy.get('#floating-notification').should('have.class', 'bg-red-400 border-red-600')
  })
})
