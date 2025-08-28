import forgotPassPage from "../support/pageObject/forgotPassPage";
import loginData from "../fixtures/loginData.json";

describe('Forgot Password-OrangeHRM', () => {

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    it('TC_001 - Input Username Valid', () => {
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset').as('loginRequest');

        forgotPassPage.clickForgotPass()
        forgotPassPage.usernameInput(loginData.validUser);
        forgotPassPage.btn_resetPass()
        forgotPassPage.VerifyResetPassSuccess()

        cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    });

    it('TC_002 - Input Username Invalid', () => {
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset').as('loginRequest');

        forgotPassPage.clickForgotPass()
        forgotPassPage.usernameInput(loginData.invalidUser);
        forgotPassPage.btn_resetPass();
        forgotPassPage.VerifyResetPassSuccess();

        cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);

    });

    it('TC_003 - Username Kosong', () => {
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset').as('loginRequest');

        forgotPassPage.clickForgotPass();
        forgotPassPage.btn_resetPass();
        forgotPassPage.verifyEmptyInput();

    });

});