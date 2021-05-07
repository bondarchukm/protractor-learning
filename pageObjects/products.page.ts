import {
    ElementFinder,
    $,
    $$,
    ElementArrayFinder,
    promise,
    element,
    by,
} from 'protractor'

export class ProductsPageObject {
    pageTitle: ElementFinder
    sortingOptionsDropdown: ElementFinder
    sortingOptions: string
    itemPrice: ElementArrayFinder
    itemName: ElementArrayFinder

    constructor() {
        this.pageTitle = $('.title')
        this.sortingOptionsDropdown = $('.product_sort_container')
        this.sortingOptions = '.product_sort_container option'
        this.itemPrice = $$('.inventory_item_price')
        this.itemName = $$('.inventory_item_name')
    }

    getPageTitleText(): promise.Promise<string> {
        return this.pageTitle.getText()
    }
    getSortingOptionLocator(text: string): ElementFinder {
        return element(by.cssContainingText(this.sortingOptions, text))
    }

    async printArray(array: number[]): Promise<void> {
        await array.forEach((item, index) => console.log(index, item))
    }

    async getItemsPriceNumberArray(): Promise<number[]> {
        // return this.itemPrice.map(async (el: ElementFinder) =>
        //     el ? parseFloat((await el.getText()).split('$')[1]) : undefined)
        let itemPriceArray: number[] = []
        for (let item of await this.itemPrice) {
            if (item != undefined) {
                itemPriceArray.push(
                    parseFloat((await item.getText()).split('$')[1])
                )
            } else return undefined
        }
        return itemPriceArray
    }

    async validateLoHiSorting(array: number[]): Promise<boolean> {
        console.log(array)
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] <= array[i + 1]) {
                continue
            } else {
                return false
            }
        }
        return true
    }
    async validateHiLoSorting(array: number[]): Promise<boolean> {
        console.log(array)
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] >= array[i + 1]) {
                continue
            } else {
                return false
            }
        }
        return true
    }
    async isPriceHiLoSorted(): Promise<boolean> {
        let sorted: boolean = await this.validateHiLoSorting(
            await this.getItemsPriceNumberArray()
        )
        return sorted
    }
    async isPriceLoHiSorted(): Promise<boolean> {
        let sorted: boolean = await this.validateLoHiSorting(
            await this.getItemsPriceNumberArray()
        )
        return sorted
    }

    async clickSortingOption(option: string): Promise<void> {
        ;(await this.getSortingOptionLocator(option)).click()
    }
    async clickSortingOptionsDropdown(): Promise<void> {
        await this.sortingOptionsDropdown.click()
    }
}
