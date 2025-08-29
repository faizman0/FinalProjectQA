import loginPage from "../support/pageObject/loginPage";
import directoryPage from "../support/pageObject/directoryPage";
import loginData from "../fixtures/loginData.json";
import directoryData from "../fixtures/directoryData.json";

describe('OrangeHRM Automation - Directory Feature', () => {

    beforeEach(() => {
        // Aksi: Mengunjungi halaman login sebelum setiap tes
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Login menggunakan data dari fixture
        loginPage.usernameInput(loginData.validUser);
        loginPage.passwordInput(loginData.validPass);
        loginPage.loginButton();

        // Navigasi ke menu Directory
        cy.contains('Directory').should('be.visible').click();
    });

    it('TC_001 - Pencarian dengan employee name', () => {
        cy.intercept('GET', '**/web/index.php/api/v2/directory/employees').as('searchEmployee');

        directoryPage.inputSearch(directoryData.validName);
        directoryPage.clickAutocompleteOption(directoryData.validName);
        directoryPage.searchButton.click();

        directoryPage.searchResultsHeader.should('contain', '(1) Record Found');
    });

    it('TC_002 - menampilkan error "Invalid" jika input nama tidak dipilih dari auto complete', () => {
        cy.intercept('GET', '**/web/index.php/api/v2/directory/employees').as('searchEmployee');

        directoryPage.inputSearch(directoryData.invalidName);
        directoryPage.searchButton.click();

        directoryPage.pesanInvalid();
        
    });
    
    it('TC_003 - pencarian dengan job title', () => {
        cy.intercept('GET', '**/web/index.php/directory/viewDirectory').as('searchEmployee');

        directoryPage.dropdownjob();
        directoryPage.verifdropdown();
        directoryPage.verifjobtitle();
        directoryPage.searchButton;
    });
    
    it('TC_004 - pencarian dengan Location', () => {
        cy.intercept('GET', '**/web/index.php/directory/viewDirectory').as('searchEmployee');

        directoryPage.dropdownLocation();
        directoryPage.verifdropdown();
        directoryPage.verifLocation();
        directoryPage.searchButton;
    });
    
    it('TC_005 - fitur reset pencarian', () => {
        cy.intercept('GET', '**/web/index.php/directory/viewDirectory').as('searchEmployee');

        directoryPage.dropdownLocation();
        directoryPage.verifdropdown();
        directoryPage.verifLocation();
        directoryPage.searchButton;

        cy.wait(1000);
        // Klik tombol Reset
        directoryPage.resetButton();

        //verifikasi bahwa data di reset
        directoryPage.verifikasi_reset();
    });
});