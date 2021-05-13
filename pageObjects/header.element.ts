import { ElementFinder, $, ProtractorExpectedConditions, browser, protractor } from 'protractor'
import { MenuElementObject } from '../pageObjects/menu.element'

export class HeaderElementObject {
    menuButton: ElementFinder
    shoppingCartButton: ElementFinder
    shoppingCartBadge: ElementFinder
    EC: ProtractorExpectedConditions
    menu: MenuElementObject

    constructor() {
        this.menuButton = $('#react-burger-menu-btn')
        this.shoppingCartButton = $('.shopping_cart_link')
        this.shoppingCartBadge = $('.shopping_cart_badge')
        this.menu = new MenuElementObject()
        this.EC = protractor.ExpectedConditions
    }

    async clickMenuButton(): Promise<void> {
        await this.menuButton.click()
        await browser.wait(this.EC.visibilityOf(this.menu.unhiddenMenuElement), 1000)
    }
    async clickShoppingCartButton(): Promise<void> {
        await this.shoppingCartButton.click()
    }
    async getShoppingCartBadgeNumber(): Promise<number> {
        let badgeNumber = await parseInt(await this.shoppingCartBadge.getText())
        return badgeNumber
    }
}
