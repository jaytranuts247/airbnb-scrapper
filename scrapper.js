// const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer");

const Selectors = {
  item: "._8s3ctt",
  type: "._b14dlit",
  title: "._5kaapu span",
  previewInfo: {
    current: "div._kqh46o",
    info: "span._3hmsj",
    amenities: "div._kqh46o",
  },
  pricePerNight:
    "div._12oal24 > div._h34mg6 > div._ls0e43 > div > div._mjvmnj > div > span._155sga30",
  ratings: "span._10fy1f8",
  reviewNumber: "span._a7a5sx",
  // images: "._9ofhsl",
  images: "div._skzmvy img",
  individualListingLink: "a._mm360j",
  forwardButton: "._1u6aumhe button",
  prevButton: "_1qfwqy2d button",
  individualListing: {
    ratings: {
      ratingTotal:
        '[data-plugin-in-point-id="REVIEWS_DEFAULT"] > div > div > section > h2 > span._goo6eo > div > span',
      ratingType: "._gmaj6l > div > div > div > div > div > div._y1ba89",
      ratingNum:
        "._gmaj6l > div > div > div > div > div > div._bgq2leu > span._4oybiu",
    },
    reviews: {
      reviewUser: "",
      reviewDate: "",
      reviewContent: "",
    },
    host: {
      name: "div._f47qa6 ._svr7sj h2", // text()
      image: "div._f47qa6 > div > div > a > div > div > img",
      description: "",
      joined: "div._f47qa6 ._svr7sj div._1fg5h8r",
      readMoreButton:
        "div._1byskwn > div._5zvpp1l > div._152qbzi > div > span > div._cfvh61 > div > button",
      Intro:
        "div._1byskwn > div._5zvpp1l > ._upzyfk1 > div > span > div > span",
      IntroClickMore:
        "div._1byskwn > div._5zvpp1l > ._152qbzi > div > span > div > span",
    },
    services: {
      parent: "._ryvszj",
      servicesString: "span > button> span._11o89bi",
      serviceFee: "span._ra05uc",
      cleaningFee: "span._ra05uc",
    },
  },
};

module.exports = function (url) {
  return new Promise((resolve, reject) => {
    (async () => {
      const browser = await puppeteer.launch({
        // headless: true, // debug only
        args: ["--no-sandbox"],
      });
      // const executablePath = await chromium.executablePath;

      // // setup
      // browser = await chromium.puppeteer.launch({
      //   args: chromium.args,
      //   executablePath: executablePath,
      //   headless: chromium.headless,
      //   defaultViewport: chromium.defaultViewport,
      // });

      const page = await browser.newPage();
      page.setViewport({ width: 1280, height: 800 });

      // await page.goto(url, {
      //   waitUntil: ["load", "networkidle0", "domcontentloaded"],
      //   timeout: 0,
      // });
      await page.goto(url);

      await page.waitForSelector("#data-state");
      await page.waitForSelector(Selectors.pricePerNight);

      const content = await page.evaluate(() => document.body.innerHTML);

      await browser.close();

      resolve(content);
    })().catch((err) => {
      console.log(err);
      reject(err);
    });
  });
};
