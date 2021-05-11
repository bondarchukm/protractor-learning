import { ElementFinder, $, $$, promise } from 'protractor'

export class HeaderElementObject {
    menuButton: ElementFinder
    shoppingCartButton: ElementFinder
    shoppingCartBadge: ElementFinder

    constructor() {
        this.menuButton = $('#react-burger-menu-btn')
        this.shoppingCartButton = $('.shopping_cart_link')
        this.shoppingCartBadge = $('.shopping_cart_badge')
    }

    async clickMenuButton(): Promise<void> {
        await this.menuButton.click()
    }
    async clickShoppingCartButton(): Promise<void> {
        await this.shoppingCartButton.click()
    }
    getShoppingCartBadgeText(): promise.Promise<string> {
        return this.shoppingCartBadge.getText()
    }
}
