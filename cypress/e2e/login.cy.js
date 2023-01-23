import loginPage from '../support/pages/login/index'
import dashPage from '../support/pages/dash'



describe('login', function () {
    context('Quando o usuario é muito bom', function () {

        const user = {
            name: 'Dhionathas felix',
            is_provider: true,
            email: 'felix@samurai.com',
            password: 'pwd123'

        }

        before(function () {
            cy.postUser(user)
        })

        it('Deve logar com sucesso', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            dashPage.header.userLoggedIn(user.name)



        });
    })

    context('quando o usuario é bom mas a senha é incorret', function(){
        
        let user= {
            name : 'Celso Kamura',
            email: 'kamura@samurai.com',
            password: 'pwd213',
            is_provider: true
        }

        const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

        before(function(){
            cy.postUser(user).then(function(){
                user.password = 'abd321'
            })
            
        })
        
        
        it('Deve notificar erro de credencial', function(){

            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            loginPage.toast.shouldHaveText(message)

        })
    })

    context.only('quando o formato do email é invalido', function(){

        const emails = [
            'papito.com.br',
            '@gmail.com',
            '@',
            'felix@',
            '111',
            '!@#!@#!@!',
            'pwdawe2'
        ]

        before(function(){
            loginPage.go()
        })
        emails.forEach(function(email){
            it('Não deve logar com o email: '+ email, function(){
                const user = {
                    email: email, 
                    password: '123456d',
                    message: 'Informe um email válido'
                }
                loginPage.form(user)
                loginPage.submit()
                loginPage.alertHaveText(user.message)
            })
        });


    })
})