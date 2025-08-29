class directoryPage {
    
    inputSearch(nameEmployee) {
        cy.get('input[placeholder="Type for hints..."]').type(nameEmployee);
    }
    // Metode untuk klik nama yang muncul di autocomplete
    clickAutocompleteOption(nameEmployee) {
        cy.get('.oxd-autocomplete-option').contains(nameEmployee).click();
    }

    // Getter untuk tombol "Search"
    get searchButton() {
        return cy.get('button[type="submit"]').click();
    }

    // Getter untuk teks hasil pencarian
    get searchResultsHeader() {
        return cy.get('.orangehrm-horizontal-padding > .oxd-text');
    }

    pesanInvalid(){
        cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('contain.text', 'Invalid');
    }

    dropdownjob(){
        cy.get('.oxd-select-wrapper').eq(0).click();
    }
    
    dropdownLocation(){
        cy.get('.oxd-select-wrapper').eq(1).click();
    }

    verifdropdown(){
        cy.get('.oxd-select-option')
      .should('be.visible')
      .and('have.length.greaterThan', 1);
    }

    verifjobtitle(){
        cy.get('.oxd-select-option')
      .contains('Chief Financial Officer')
      .should('exist')
      .click();
    }
    
    verifLocation(){
        cy.get('.oxd-select-option')
      .contains('New York Sales Office')
      .should('exist')
      .click();
    }

    resetButton(){
        cy.get('button[type="reset"]').click();
    }

    verifikasi_reset(){
            // Verifikasi input Employee Name kosong
    cy.get('input[placeholder="Type for hints..."]')
      .should('have.value', '');

    // Verifikasi Job Title kosong (text-nya kembali ke "Select")
    cy.get('.oxd-select-text-input').eq(0)
      .should('have.text', '-- Select --');

    // verifikasi location kosong (textnya kembali ke select)
    cy.get('.oxd-select-text-input').eq(1)
        .should('have.text', '-- Select --')

    // Verifikasi hasil pencarian: semua record ditampilkan kembali
    cy.get('.orangehrm-directory-card')
      .should('have.length.greaterThan', 1); // karena semua data muncul lagi
    }
}

export default new directoryPage();