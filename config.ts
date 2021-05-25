import { Config, browser } from 'protractor'
import { join } from 'path'

export let config: Config = {
    onPrepare: async () => await browser.waitForAngularEnabled(false),
    framework: 'jasmine',
    capabilities: {
        browserName: 'chrome',
    },
    specs: ['specs/**-tests.js'],
    seleniumAddress: 'http://localhost:4444/wd/hub',
    // directConnect: true,

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
        {
            displayHelpUrl: true, // Displays the aXe help URL along with the error. Defaults to true.
            displayContext: true, // Displays the HTML of interest. Defaults to true.
            displayPasses: true, // Display pass results. Defaults to true.
            displayViolations: true, // Display vioaltions. Defaults to true.
            // standardsToReport: ['wcag2a', 'wcag2aa'], // A list of standards to report on. If empty, reports on all standards.
            ignoreAxeFailures: false, // If true, aXe failures won't cause the whole test to fail. Defaults to false
            package: 'protractor-axe-html-report-plugin',
            globalParams: {
                exclude: 'mat-select',
                options: {
                    // runOnly: {
                    //     type: 'tag',
                    //     values: ['wcag2a', 'wcag2aa'],
                    // },
                },
            }, // This is a configuration object, see below for more detail.
            htmlReportPath: 'reports', // The path to the report folder. If null, no HTML report will be generated
        },
    ],
}
