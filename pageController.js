const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance){

    let browser = await browserInstance;
    await pageScraper.scraper(browser);
    
    
}

module.exports = (browserInstance) => scrapeAll(browserInstance)