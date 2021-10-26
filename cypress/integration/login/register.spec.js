const uuid = require('uuid')

/// <reference types="cypress" />

context('Register', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
    cy.get('#set-session-register').should('be.visible').click()

    cy.wait(2000)
  })

  it('redirect to /class/list after register using valid email & password', () => {
    cy.intercept('/api/user/register').as('register')

    cy.location('pathname').should('include', 'login')

    cy.get('#name-register').should('be.visible').type("Test")
    cy.get('#email-register').should('be.visible').type(`test__${uuid.v4()}@email.com`)
    cy.get('#password-register').should('be.visible').type("test")
    cy.get('#submit-register').should('be.visible').click()

    cy.wait('@register')

    cy.location('pathname').should('include', 'class/list')
  })

  it('show danger notification after register using registered email', () => {
    cy.intercept('/api/user/register').as('register')

    cy.location('pathname').should('include', 'login')

    cy.get('#name-register').should('be.visible').type("Registered User")
    cy.get('#email-register').should('be.visible').type("admin@email.com")
    cy.get('#password-register').should('be.visible').type("INVALIDPASSWORDEITHER")
    cy.get('#submit-register').should('be.visible').click()

    cy.wait('@register')

    cy.get('#floating-notification').should('have.class', 'bg-red-400 border-red-600')
  })
})
