const puppeteer = require("puppeteer");

module.exports = function (url) {
  return new Promise((resolve, reject) => {
    (async () => {
      const browser = await puppeteer.launch({
        // headless: true, // debug only
        args: ["--no-sandbox"],
      });

      const page = await browser.newPage();
      page.setViewport({ width: 1280, height: 800 });

      await page.goto(url, {
        waitUntil: ["load", "networkidle0", "domcontentloaded"],
        timeout: 0,
      });
      const content = await page.evaluate(() => document.body.innerHTML);

      await browser.close();

      resolve(content);
    })();
  });
};
