import { ElementFinder, $, $$ } from 'protractor'

export class ProductsPageObject {
    pageTitle: ElementFinder
    
    constructor() {
        this.pageTitle = $('.title')
    }

    async getPageTitleText(){
        return await this.pageTitle.getText()
    }
}
