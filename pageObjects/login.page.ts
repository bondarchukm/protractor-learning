import { ElementFinder, $, promise } from 'protractor'

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

    async setUsername(username: string): Promise<void> {
        await this.usernameInput.sendKeys(username)
    }
    async setPassword(password: string): Promise<void> {
        await this.passwordInput.sendKeys(password)
    }
    async setCredentials(username: string, password: string): Promise<void> {
        await this.setUsername(username)
        await this.setPassword(password)
    }
    async loginToApp(username: string, password: string): Promise<void>{
        await this.setCredentials(username, password)
        await this.clickLoginButton()
    }
    async clickLoginButton(): Promise<void> {
        await this.loginButton.click()
    }
    getCredentialsErrorMessageText(): promise.Promise<string> {
        return this.credentialsErrorMessage.getText()
    }
}
