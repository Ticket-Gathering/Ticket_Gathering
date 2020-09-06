//测试在orderConfirm界面的一系列操作
describe('orderConfirm_test',function () {
    beforeEach(function () {
        cy.fixture('example.json').as('testCase').then(($testCase)=>{
            cy.visit("/about/1_1_611200540124")
            let user=$testCase.adminUser
            let pwd=$testCase.adminPassword
            cy.get('[data-cy=buy]').click()
            cy.get('[type="text"]').type(user);
            cy.get('[type="password"]').type(pwd);
            cy.get('[data-cy=login]').click();
            cy.wait(500)
        })
    })
    //测试使用账户中的取票人是否可行
    it('receiverInput_test',function () {
        cy.get('[data-cy=receiverName]').should('be.empty')
        cy.get('[data-cy=receiverPhone]').should('be.empty')
        cy.get('[data-cy=receiverAddr]').should('be.empty')
        cy.get('[data-cy=addReceiver]').click()
        cy.get('[data-cy="receiverOption:2"]').click()
        cy.get('[data-cy=receiverConfirm]').click()
        cy.get('[data-cy=receiverName]').should('not.be.null')
        cy.get('[data-cy=receiverPhone]').should('not.be.null')
        cy.get('[data-cy=receiverAddr]').should('not.be.null')
    })

    //测试未填写全部必须信息是否触发提醒
    it('orderException_test',function () {
        let baseUrl=this.testCase.baseUrl
        //未填写取票人
        cy.get('[data-cy="结算"]').click()
        cy.url().should('include',baseUrl+'/orderConfirm')

        //填写取票人但不填写观影人
        cy.get('[data-cy=addReceiver]').click()
        cy.get('[data-cy="receiverOption:2"]').click()
        cy.get('[data-cy=receiverConfirm]').click()
        cy.get('[data-cy="结算"]').click()
        cy.url().should('include',baseUrl+'/orderConfirm')

        //填写取票人，观影人，但不勾选协议
        cy.get('.ant-checkbox-group > :nth-child(1) > .ant-checkbox > .ant-checkbox-input').click()
        cy.get('[data-cy="结算"]').click()
        cy.url().should('include',baseUrl+'/orderConfirm')
        cy.get('[data-cy="结算"]').click()
        cy.url().should('include',baseUrl+'/orderConfirm')

        //填写全部信息并勾选协议正常跳转
        cy.get('[data-cy="协议确定"]').click()
        cy.get('[data-cy="结算"]').click()
        cy.wait(500)
        cy.url().should('include',baseUrl+'/orderPay')
    })
})
