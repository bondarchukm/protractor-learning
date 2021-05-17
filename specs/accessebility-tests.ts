import { browser } from 'protractor'
import { userData } from '../lib/user.data'
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

    let axe = require('protractor-axe-html-report-plugin')

    it('Should check accessibility of Login Page', async () => {
        await axe.runAxeTest('Login page')
    })

    it('Should check accessibility of Products Page', async () => {
        await loginPage.loginToApp(userData.standardUserName, userData.password)
        await axe.runAxeTest('Products page')
    })
})
