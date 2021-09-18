const scraperObject = {
     url:'https://myanimelist.net/anime/producer/11/Madhouse',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);

         await page.waitForSelector('.seasonal-anime js-seasonal-anime');

         let urls = await page.$$eval('.seasonal-anime js-seasonal-anime', links => {
             links = links.filter(link => link.querySelector('.info > .remain-time').textContent < "Dec 31, 2009")
             links = links.map(el => el.querySelector('image > a').href)
             return links;
         });
         console.log(urls);

    }
}

module.exports = scraperObject;