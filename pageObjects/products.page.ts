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

    constructor() {
        this.pageTitle = $('.title')
        this.sortingOptionsDropdown = $('.product_sort_container')
        this.sortingOptions = '.product_sort_container option'
        this.itemPrice = $$('.inventory_item_price')
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

    getItemsPriceNumberArray(): number[] {
        let priceArr: Array<number> = []
        this.itemPrice.each((element) => {
            if (element != undefined) {
                element
                    .getText()
                    .then((text) => {
                        return text.split('$')
                    })
                    .then((text) => {
                        return parseFloat(text[1])
                    })
                    .then((number) => {
                        return priceArr.push(number)
                    })
            }
        })
        return priceArr
    }

    validateLoHiSorting(array: number[]): boolean {
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
    validateHiLoSorting(array: number[]): boolean {
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

    async clickSortingOption(option: string): Promise<void> {
        ;(await this.getSortingOptionLocator(option)).click()
    }
    async clickSortingOptionsDropdown(): Promise<void> {
        await this.sortingOptionsDropdown.click()
    }
}
