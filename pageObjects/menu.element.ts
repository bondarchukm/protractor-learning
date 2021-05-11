import { ElementFinder, $, $$ } from 'protractor'

export class MenuElementObject {
    closeMenuButton: ElementFinder
    allItemsButton: ElementFinder
    aboutButton: ElementFinder
    logoutButton: ElementFinder
    resetAppStateButton: ElementFinder

    constructor() {
        this.closeMenuButton = $('#react-burger-cross-btn')
        this.allItemsButton = $('#inventory_sidebar_link')
        this.aboutButton = $('#about_sidebar_link')
        this.logoutButton = $('#logout_sidebar_link')
        this.resetAppStateButton = $('#reset_sidebar_link')
    }

    async clickCloseMenuButton(): Promise<void> {
        await this.closeMenuButton.click()
    }
    async clickAllItemsButton(): Promise<void> {
        await this.allItemsButton.click()
    }
    async clickAboutButton(): Promise<void> {
        await this.aboutButton.click()
    }
    async clickLogoutButton(): Promise<void>{
        await this.logoutButton.click()
    }
    async clickResetAppStateButton(): Promise<void>{
        await this.resetAppStateButton.click()
    }
}
