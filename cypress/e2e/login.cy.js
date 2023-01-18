import loginPage from '../support/pages/login/index'
import dashPage from '../support/pages/dash'

describe('login', function(){
    context('Quando o usuario é muito bom', function(){

        const user = {
            name: 'Dhionathas felix',
            email : 'felix@samurai.com',
            password: 'pwd123'

        }

        it('Deve logar com sucesso',function(){
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            dashPage.header.userLoggedIn(user.name)


            
        });
    })
})