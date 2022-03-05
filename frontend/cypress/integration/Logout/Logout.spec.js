import { startMirage } from "../../mirage/devServer"

describe('App', () => {
    let server
    beforeEach(() => {
        server = startMirage()
        cy.login()
    })

    afterEach(() => {
        server.shutdown()
    })

    it('User can logout', () => { 
        cy.get('[role="button"]').click();
        cy.url().should('eq', 'http://localhost:3000/')
    })
})