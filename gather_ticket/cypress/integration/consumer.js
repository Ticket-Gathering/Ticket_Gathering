//测试普通用户在self界面的一系列操作
describe('consumer_self_test',()=>{
    before(()=>{
        cy.visit('/login')
        cy.get('[type="text"]').type("aaa");
        cy.get('[type="password"]').type("123");
        cy.get('[data-cy=login]').click();
        cy.get('[data-cy=self]').click();
    })
    
})
