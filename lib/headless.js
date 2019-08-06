var logger = require('tracer').console()
const puppeteer = require('puppeteer');
const getData = async function(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const prerenderReady = page.mainFrame().waitForSelector('#prerenderReady');
    await prerenderReady.then(function(res){
        logger.trace("got resp ...");
    })
    const content = await page.content()
    logger.trace("done loading page...")
    await browser.close();
    return {"content":content}
}

module.exports.getData = getData;

