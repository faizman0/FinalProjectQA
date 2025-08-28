class loginPage {
    // Getter untuk elemen-elemen
    usernameInput(username) {
        cy.get('input[name="username"]').type(username).should('be.visible').and('have.value', username);
    }

    passwordInput(password) {
        cy.get('input[name="password"]').type(password).should('have.value', password);
    }

    loginButton() {
        cy.get('button[type="submit"]').should('be.visible');
        cy.get('button[type="submit"]').click();
    }

    requiredMessage() {
        cy.get('.oxd-input-field-error-message').should('be.visible');
    }

    forgotPasswordLink() {
        cy.contains('Forgot your password?');
    }

    VerifyLoginSuccess(){
        cy.url().should('include', '/dashboard')
    }

    verifyLoginError(){
        cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text').should('contain', 'Invalid credentials');
    }

    // Metode untuk melakukan aksi
    fillUsername(username) {
        this.usernameInput.type(username);
    }

    fillPassword(password) {
        this.passwordInput.type(password);
    }

    // Metode yang menggabungkan aksi
    login(username, password) {
        this.fillUsername(username);
        this.fillPassword(password);
        this.clickLogin();
    }
}

export default new loginPage();