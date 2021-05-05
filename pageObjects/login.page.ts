import { ElementFinder, $, $$ } from 'protractor'

export class LoginPageObject {
    usernameInput: ElementFinder
    passwordInput: ElementFinder
    loginButton: ElementFinder
    credentialsErrorMessage: ElementFinder

    constructor() {
        this.usernameInput = $('input[placeholder="Username"]')
        this.passwordInput = $('input[placeholder="Password"]')
        this.loginButton = $('#login-button')
        this.credentialsErrorMessage = $('h3[data-test="error"]')
    }

    async setUsername(username){
        await this.usernameInput.sendKeys(username)
    }
    async setPassword(password){
        await this.passwordInput.sendKeys(password)
    }
    async setCredentials(username, password){
        await this.usernameInput.sendKeys(username)
        await this.passwordInput.sendKeys(password)
    }
    async clickLoginButton(){
        await this.loginButton.click()
    }
    async getCredentialsErrorMessageText(){
        return await this.credentialsErrorMessage.getText()
    }
}
