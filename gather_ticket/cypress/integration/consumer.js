//测试普通用户在self界面的一系列操作
describe('consumer_self_test',()=>{
    before(()=>{
        cy.fixture('example.json').as('testCase').then(
            (testCase)=>{
                cy.visit('/login')
                let user=testCase.User;
                let pwd=testCase.Password
                cy.get('[type="text"]').type(user);
                cy.get('[type="password"]').type(pwd);
                cy.get('[data-cy=login]').click();
                cy.get('[data-cy=self]').click();
            }
        )
    })

})
