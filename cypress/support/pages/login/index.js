import { el } from "./elements"
import toast from '../components/toast'
class loginPage{

    go(){
        cy.visit('/')
    }

    form(user){
        cy.get(el.email).clear().type(user.email)
        cy.get(el.passwords).clear().type(user.password)
    }
    submit(){
        cy.contains(el.signIn)
            .click()
    }

    alertHaveText(expectedText){
        cy.contains(el.alertError, expectedText)
            .should('be.visible')
    }

    constructor(){
        this.toast = toast
    }
}
export default new loginPage()