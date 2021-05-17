import { browser } from 'protractor'
import { LoginPageObject } from '../pageObjects/login.page'

describe('Accessibility tests', () => {
    beforeAll(async () => {
        await browser.driver.manage().window().maximize()
    })
    beforeEach(async () => {
        await loginPage.navigateTo()
    })
    afterEach(async () => {
        await browser.executeScript('window.sessionStorage.clear();')
        await browser.executeScript('window.localStorage.clear();')
    })

    const loginPage = new LoginPageObject()

    let axe = require('protractor-axe-report-plugin')

    it('Should check accessibility of Login Page', async () => {
        axe.runAxeTest('Login page')
    })
})
