import signupPage from '../support/pages/signup/index'

describe('Cadastro', function () {
    context('Quando o usuario é novato', function () {
        const user = {
            name: 'Dhionathas felix',
            email: 'felix@samurai.com',
            password: 'pwd123'
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })
        it('Deve cadastrar com sucesso', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        });
    })


    context('Quando o email ja existe', function () {

        const user = {
            name: 'Joao Lucas',
            is_provider: true,
            email: 'joao@samurai.com',
            password: 'pwd123'

        }

        before(function () {
            cy.postUser(user)
        })


        it('não deve cadastrar o usuario', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')

        });
    })

    context('Quando o email é incorreto', function () {
        const user = {
            name: 'Eliza teste da silva',
            email: 'felix.samurai.com',
            password: 'pwd123'
        }

        it('Deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')

        });
    })

    context('Quando a senha é muito curta', function () {

        const passwords = ['1', '2s', '31a', '25qw', 'redt1']

        beforeEach(function () {
            signupPage.go()
        })

        passwords.forEach(function (pass) {
            it('Não deve cadastrar com a senha:' + pass, function () {
                const user = {
                    name: 'Marcos vinicius', email: 'marcos@samurai.com', password: pass
                }

                signupPage.form(user)
                signupPage.submit()
            });
        })

        afterEach(function () {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })
    })

    context('Quando o campos não são preenchidos', function () {

        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        beforeEach(function(){
            signupPage.go()
            signupPage.submit()
            
        })
        alertMessages.forEach(function(alert) {
            it('Deve exibir ' + alert.toLowerCase(), function () {
                signupPage.alertHaveText(alert)
            });
        })

    })
})


