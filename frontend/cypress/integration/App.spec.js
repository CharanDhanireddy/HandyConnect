
describe('App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('Verify vendor login', () => {
        cy.get('a[href="/vendorlogin"]').click()
        cy.get('input[id="emailId"]').should('exist')
        cy.get('input[id="passwordId"]').should('exist')
        cy.get('button[id="vendor-login-button"]').should('exist')
    })

    it('Verify user login', () => {
        cy.get('a[href="/login"]').click()
        cy.get('input[id="emailId"]').should('exist')
        cy.get('input[id="passwordId"]').should('exist')
        cy.get('button[id="user-login-button"]').should('exist')
    })

})