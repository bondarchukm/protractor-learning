import { Config, browser } from 'protractor'
import { join } from 'path'

export let config: Config = {
    onPrepare: async () => await browser.waitForAngularEnabled(false),
    framework: 'jasmine',
    capabilities: {
        browserName: 'chrome',
    },
    specs: ['specs/image-comparsion-tests.js'],
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: true,

    // You could set no globals to true to avoid jQuery '$' and protractor '$'
    // collisions on the global namespace.
    noGlobals: false,
    SELENIUM_PROMISE_MANAGER: false,
    plugins: [
        {
            // The module name
            package: 'protractor-image-comparison',
            // Some options, see the docs for more
            options: {
                baselineFolder: join(process.cwd(), './baseline/'),
                formatImageName: `{tag}-{logName}-{width}x{height}`,
                screenshotPath: join(process.cwd(), '.tmp/'),
                savePerInstance: true,
                autoSaveBaseline: true,
            },
        },
    ],
}

