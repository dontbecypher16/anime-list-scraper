
const puppeteer = require("puppeteer");

async function startBrowser() {
  console.log("Opening the browser......");
  let browser = await puppeteer.launch({
    headless: false
  });
  return browser;
}

module.exports = {
  startBrowser,
};