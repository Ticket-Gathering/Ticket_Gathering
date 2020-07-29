//测试在about界面的一系列操作
describe('about_Test', function () {
    beforeEach(function () {
        cy.fixture('example.json').as('testCase')
        cy.visit("/about/1_1_611200540124")
    })

    //测试是否能选择票档
    it('priceSelect_test',function () {
        cy.get('[data-cy="price:1"]').click().then(($el)=>{
            const price=$el.text().match(/[0-9]+/)[0]
            cy.get('[data-cy=total]').then($el=>{
                const total=$el.text().slice(1,)
                expect(price).to.equal(total)
            })
        })
    })

    //测试是否能选择数量，且总价能正确显示
    it('numTotal_test',function () {
        //点击加 两次双击 此时数量为5
        cy.get('.el-icon-plus').dblclick()
        cy.get('.el-icon-plus').dblclick()
        cy.get('[data-cy="price:0"]').then(($el)=>{
            const price=parseInt($el.text().match(/[0-9]+/)[0])
            cy.get('[data-cy=total]').then($el=>{
                const total=parseInt($el.text().slice(1,))
                expect(price*5).to.equal(total)
            })
        })
        //点击减 双击 此时数量为3
        cy.get('.el-icon-minus').dblclick()
        cy.get('[data-cy="price:0"]').then(($el)=>{
            const price=parseInt($el.text().match(/[0-9]+/)[0])
            cy.get('[data-cy=total]').then($el=>{
                const total=parseInt($el.text().slice(1,))
                expect(price*3).to.equal(total)
            })
        })

        //直接使用数量输入
        cy.get('.el-input__inner').clear().type('20')
        cy.get('[data-cy="price:0"]').then(($el)=>{
            const price=parseInt($el.text().match(/[0-9]+/)[0])
            //dom元素改变有一定延迟
            cy.wait(1000)
            cy.get('[data-cy=total]').then($el=>{
                const total=parseInt($el.text().slice(1,))
                expect(price*20).to.equal(total)
            })
        })
    })

    //未登录购买测试
    it('buy_offline_test',function () {
        let baseUrl=this.testCase.baseUrl
        cy.get('[data-cy=buy]').click()
        //未登录购买会被要求登录
        cy.url().should('equal',baseUrl+'/login')
    })

    //登录购买测试
    it('buy_online_test',function () {
        let baseUrl=this.testCase.baseUrl
        let user=this.testCase.User
        let pwd=this.testCase.Password
        cy.visit('/login')
        cy.get('[type="text"]').type(user);
        cy.get('[type="password"]').type(pwd);
        cy.get('[data-cy=login]').click();
        //wait防止登录请求被取消
        cy.wait(1000)
        cy.visit("/about/1_1_611200540124")
        cy.get('[data-cy=buy]').click()
        cy.url().should('include',baseUrl+'/orderConfirm')
    })

    //测试未登录购买重新登录后页面是否正常跳转
    it.only('buy_offline_thenLog_test',function () {
        let baseUrl=this.testCase.baseUrl
        let user=this.testCase.User
        let pwd=this.testCase.Password
        cy.get('[data-cy=buy]').click()
        cy.get('[type="text"]').type(user);
        cy.get('[type="password"]').type(pwd);
        cy.get('[data-cy=login]').click();
        cy.url().should('include',baseUrl+'/orderConfirm')
    })
});
