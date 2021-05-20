const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

module.exports = function (url) {
  return new Promise((resolve, reject) => {
    (async () => {
      // const browser = await puppeteer.launch({
      //   // headless: true, // debug only
      //   args: ["--no-sandbox"],
      // });
      const executablePath = await chromium.executablePath;

      // setup
      browser = await chromium.puppeteer.launch({
        args: chromium.args,
        executablePath: executablePath,
        headless: chromium.headless,
        defaultViewport: chromium.defaultViewport,
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
    })().catch((err) => console.log(err));
  });
};
