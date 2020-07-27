describe('Classify', () => {
    beforeEach(() =>{
        cy.visit('/')
        cy.visit('/login')
    })
    it('classify',function () {
        cy.get('[type="text"]').type("sjw");
        cy.get('[type="password"]').type("123");
        cy.get('[data-cy=login]').click();
        cy.get('[data-cy=self]').click();
        cy.url().should('include', '/self');
        cy.get(':nth-child(3) > .ant-menu-submenu-title').click();
        cy.get('[data-cy=logout]').click();
        cy.url().should('include', '/');
        cy.get('[data-cy=login]').click();
        cy.url().should('include', '/login');
        cy.get('[type="text"]').type("test");
        cy.get('[type="password"]').type("test");
        cy.get('[data-cy=login]').click();
        cy.url().should('include', '/login');
    })
})
