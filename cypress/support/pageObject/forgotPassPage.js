class forgotPassPage {
    visit(){
        cy.visit('web/index.php/auth/requestPasswordResetCode')
    }
    
    clickForgotPass(){
        cy.contains('Forgot your password?').click();
    }

    verify_forgotpage(){
        cy.url().should('include', '/requestPasswordResetCode')
    }

    usernameInput(username) {
        cy.get('input[name="username"]').type(username).should('be.visible').and('have.value', username);
    }

    btn_resetPass(){
        cy.get('button[type="submit"]').should('be.visible');
        cy.get('button[type="submit"]').click();
    }

    VerifyResetPassSuccess(){
        cy.url().should('include', '/sendPasswordReset')
        cy.get('.orangehrm-card-container').should('contain', 'Reset Password link sent successfully')
    }

    verifyEmptyInput(){
        cy.get('.oxd-input-field-error-message').should('contain', 'Required');
    }  

}
export default new forgotPassPage();