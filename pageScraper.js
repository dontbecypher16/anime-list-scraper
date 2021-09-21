const { text } = require("express");


const scraperObject = {
     url:'https://myanimelist.net/topanime.php',
     async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        let scrapedData = []

        // wait for dom to render
        async function scrapeCurrentPage(){
         await page.waitForSelector('.pb12 > table > tbody');
        // entire anime list
         let urls = await page.$$eval('.title.al.va-t.word-break', links => {
             // filter conditions
             links = links.filter(link => link.querySelector('.information.di-ib.mt4').textContent.includes("1999"))
             // extract the links
             links = links.map(el => el.querySelector('.di-ib.clearfix > h3 > a').href)
             return links;
         });
         

         // Loop through each of those links, open a new page instance and get the relevant data from them
        let pagePromise = (link) => new Promise(async(resolve, reject) => {
            let dataObj = {};
            let newPage = await browser.newPage();
            await newPage.goto(link);

            dataObj['animeTitle'] = await newPage.$eval('.h1-title > div > h1 > strong', text => text.textContent);
            dataObj['altTitle'] = await newPage.$eval('div > div:nth-child(8)', text => text.textContent.trim().replace("English:", ""));
            //dataObj['seriesOrMovie'] = await newPage.$eval('div:nth-child(13) > a', text => text.textContent.trim().replace("Type:", ""));
           // dataObj['studio'] = await newPage.$eval('div:nth-child(19) > a', text => text.textContent.trim().replace("Studios:", ""));
            resolve(dataObj);
            await newPage.close();
        });

        for(link in urls){
            let currentPageData = await pagePromise(urls[link]);
            scrapedData.push(currentPageData);
            //console.log(currentPageData);
        }


        let nextButtonExist = false;
        try{
            const nextButton = await page.$eval('div.pb12 > div > a', a => a.textContent.includes("Next 50"));
            nextButtonExist = true;
        }
        catch(err){
            nextButtonExist = false;
        }
        if(nextButtonExist){
            await Promise.all([
                page.waitForNavigation(),
                page.click( 'div.pb12 > div > a.link-blue-box.next', 'div.pb12 > div > a'),
              ]);
            //await page.click('div.pb12 > div > a', 'div.pb12 > div > a.link-blue-box.next'); 
            return scrapeCurrentPage(); // Call this function recursively
        }
        await page.close();
        return scrapedData


    }

    let data = scrapeCurrentPage();
    console.log(data)
    
    

    }
}

module.exports = scraperObject;




  