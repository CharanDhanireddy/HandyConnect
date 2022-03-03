// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "@testing-library/cypress/add-commands"
import axios from "axios";

Cypress.Commands.add('login', () => {
    // cy.request({
    //     method: 'POST',
    //     url: 'http://localhost:5000/user/login',
    //     body: {
    //         email: "u1@gmail.com",
    //         password: "123456789"
    //     }
    // })
    //     .then((resp) => {
    //         window.localStorage.setItem(
    //             'token', JSON.stringify(resp?.data?.user?.id));
    //     })
    // let userData = {
    //     email: "u1@gmail.com",
    //     password: "123456789"
    // }
    // axios.post("http://localhost:5000/user/login", userData)
    //     .then((res) => {
    //         window.localStorage.setItem(
    //             'token', JSON.stringify(res?.data?.user?.id));
    //     })

    cy.visit('login')
    cy.get('#emailId').type('u2@gmail.com');
    cy.get('#passwordId').type('123456789');
    cy.get('#user-login-button').click();
})