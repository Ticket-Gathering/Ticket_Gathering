// describe('Register', () => {
//     beforeEach(() =>{
//         cy.visit('http://localhost:3000/login')
//     })
//     it('register',function () {
//         cy.get('.Login_bottomOptions__3rK3U > :nth-child(2)').click();
//         cy.get('[type="text"]').type("test");
//         cy.get('[placeholder="请输入登录密码"]').type("test");
//         cy.get('[placeholder="请再次输入登录密码"]').type("test");
//         cy.get('.Login_loginBtn__ZRqpN').click();
//     })
// })
describe('logIn', () => {
    it('log_in',function () {
        cy.visit('/login')
        cy.get('[type="text"]').type("aaa");
        cy.get('[type="password"]').type("123");
        cy.get('[data-cy=login]').click();
        cy.url().should('contain','/')
    })
})

describe('logOut',()=>{
    before(()=>{
        cy.visit('/')
        cy.visit('/login')
        cy.get('[type="text"]').type("aaa");
        cy.get('[type="password"]').type("123");
        cy.get('[data-cy=login]').click();
    })
    it('log_out',function () {

        cy.get('[data-cy=self]').click()
        cy.url().should('include','/self')
        cy.get('[data-cy=logout]').click()
        cy.url().should('include','/')
    })
})

