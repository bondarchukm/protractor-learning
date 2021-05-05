import { ElementFinder, $, $$ } from 'protractor'

export class ProductsPageObject {
    pageTitle: ElementFinder

    constructor() {
        this.pageTitle = $('.title')
    }

    async getPageTitleText(): Promise<string> {
        const text: string = await this.pageTitle.getText()
        return text
    }
}
