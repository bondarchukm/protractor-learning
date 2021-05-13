import { Config, browser } from 'protractor'

export let config: Config = {
    onPrepare: async () => await browser.waitForAngularEnabled(false),
    framework: 'jasmine',
    capabilities: {
        browserName: 'chrome',
    },
    specs: ['specs/**.js'],
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: true,

    // You could set no globals to true to avoid jQuery '$' and protractor '$'
    // collisions on the global namespace.
    noGlobals: true,
    SELENIUM_PROMISE_MANAGER: false,
}
