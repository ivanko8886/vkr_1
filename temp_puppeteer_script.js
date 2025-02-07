
        const puppeteer = require('puppeteer');
        (async () => {
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.goto('https://www.restate.ru/podbor.html?dealid=2&region=2&object=sareas-1&input-search=&price_to=&pricetype=1&frompodbor2021=1', { waitUntil: 'networkidle2' });
            await page.waitForSelector('.sri__descr', { timeout: 30000 });  // Increased timeout to 30 seconds
            const title = await page.title();
            console.log(`[Puppeteer] Title: ${title}`);
            const propertyListings = await page.$$eval('.sri__descr', elements => 
                elements.map((el, index) => `[Puppeteer] Property Listing ${index + 1}: ${el.textContent.trim()}`)
            );
            propertyListings.forEach(listing => console.log(listing));
            await browser.close();
        })();
        