import loginPage from "../support/pageObject/loginPage";
import loginData from "../fixtures/loginData.json";
import { log } from "console";

describe('Login-OrangeHRM', () => {

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    it('TC_001 - Login dengan username dan password benar', () => {
        cy.intercept('GET', '**/dashboard/index').as('loginRequest');

        loginPage.usernameInput(loginData.validUser);
        loginPage.passwordInput(loginData.validPass);
        loginPage.loginButton();

        loginPage.VerifyLoginSuccess();
        cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    });

    it('TC_002 - Login dengan username tidak terdaftar', () => {
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('loginRequest');

        loginPage.usernameInput(loginData.invalidUser);
        loginPage.passwordInput(loginData.validPass);
        loginPage.loginButton();

        loginPage.verifyLoginError();
        cy.wait('@loginRequest').its('response.statusCode').should('eq', 304);
    });
    
    it('TC_003 - Login dengan password salah', () => {
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('loginRequest');

        loginPage.usernameInput(loginData.validUser);
        loginPage.passwordInput(loginData.invalidPass);
        loginPage.loginButton();

        loginPage.verifyLoginError();
        cy.wait('@loginRequest').its('response.statusCode').should('eq', 304);
    });

    it('TC_004 - Login dengan username dan password kosong', () => {
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('loginRequest');

        loginPage.loginButton();

        loginPage.requiredMessage();
    });

    it('TC_005 - Login dengan tombol enter', () => {
        cy.intercept('GET', '**/dashboard/index').as('loginRequest');
        loginPage.usernameInput(loginData.validUser);
        loginPage.passwordInput(loginData.validPass);
        cy.get('input[name="password"]').type('{enter}');

        loginPage.VerifyLoginSuccess();
        cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    });

    // it('TC_006 - Menggunakan fitur lupa password', () => {
    //     loginPage.forgotPasswordLink.click();

    //     cy.url().should('include', '/requestPasswordReset');
    // });
});