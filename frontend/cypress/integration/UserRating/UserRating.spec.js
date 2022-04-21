describe("user journey", function () {
    let server
    it("User rating test", () => {
        cy.visit('/login')
        cy.get('#emailId').clear();
        cy.get('#emailId').type('cristiano@email.com');
        cy.get('#passwordId').clear();
        cy.get('#passwordId').type('123456789');
        cy.get('#user-login-button').click();
        cy.wait(4000)
        cy.get('[href="/profile"]').click();
        cy.wait(3500)
        cy.get('[href="/bookings"]').click();
        cy.wait(1500)
        cy.get('[data-cy="4/27/2022"] > strong').click();
        cy.wait(500)
        cy.get('[for="mui-8"]').click();
        cy.wait(2500)
        cy.get('[data-cy="closeButton"]').click();
        cy.wait(1500)
        cy.get('[role="button"]').click();

    })
})