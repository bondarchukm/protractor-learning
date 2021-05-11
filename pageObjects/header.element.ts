import { ElementFinder, $, $$ } from 'protractor'

export class HeaderElementObject {
    menuButton: ElementFinder
    shoppingCartButton: ElementFinder

    constructor() {
        this.menuButton = $('#react-burger-menu-btn')
        this.shoppingCartButton = $('.shopping_cart_link')
    }

    async clickMenuButton(): Promise<void> {
        await this.menuButton.click()
    }
    async clickShoppingCartButton(): Promise<void> {
        await this.shoppingCartButton.click()
    }
}
