import { startMirage } from "../../mirage/devServer"

describe('App', () => {
    let server
    beforeEach(() => {
        // server = startMirage()
        cy.login()
    })

    afterEach(() => {
        // server.shutdown()
    })

    it('Open Profile and verify all the fields', () => {
        cy.get('[href="/profile"]').should('exist').click()
        cy.get('[data-cy="name"]').should('exist')
        cy.get('[data-cy="city_name"]').should('exist')
        cy.get('[data-cy="phone"]').should('exist')
        cy.get('[data-cy="email"]').should('exist')
    })
})