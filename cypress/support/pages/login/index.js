import { el } from "./elements"

class loginPage{

    go(){
        cy.visit('/')
    }

    form(user){
        cy.get(el.email).type(user.email)
        cy.get(el.passwords).type(user.password)
    }
    submit(){
        cy.contains(el.signIn)
            .click()
    }
}
export default new loginPage()