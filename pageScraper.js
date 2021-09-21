


const scraperObject = {
     url:'https://myanimelist.net/topanime.php',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);

        // wait for dom to render
         await page.waitForSelector('.pb12 > table > tbody');
        // entire anime list
         let urls = await page.$$eval('.title.al.va-t.word-break', links => {
             // filter conditions
             links = links.filter(link => link.querySelector('.information.di-ib.mt4').textContent.includes("1997"))
             // extract the links
             links = links.map(el => el.querySelector('.di-ib.clearfix > h3 > a').href)
             return links;
         });
         

         console.log(urls)

    }
}

module.exports = scraperObject;


//#content > div.pb12 > table > tbody > tr.table-header > td.title

//#content > div.pb12 > table > tbody > tr:nth-child(2) > td.title.al.va-t.word-break > div > div.information.di-ib.mt4

// #content > div.pb12 > table > tbody > tr:nth-child(2) > td.title.al.va-t.word-break > div > div.di-ib.clearfix > h3


//#content > div.pb12 > table > tbody > tr:nth-child(3)

// entire row box
// #content > div.pb12 > table > tbody > tr:nth-child(3) > td.title.al.va-t.word-break