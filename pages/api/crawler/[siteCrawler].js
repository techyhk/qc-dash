const puppeteer = require("puppeteer-extra");
// Enable stealth plugin with all evasions
puppeteer.use(require("puppeteer-extra-plugin-stealth")());
const fs = require("fs");

let flag = 0;

export default async function handler(req, res) {
  const { siteCrawler } = req.query;
  let page, similarWebData;
  try {
    console.log("Puppeteer is running", siteCrawler);
    const browser = await puppeteer.launch({
      executablePath: process.env.CHROME_PATH,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-gpu",
        "--disable-extensions",
        "--disable-default-apps",
        "--disable-background-networking",
        "--disable-sync",
        "--disable-translate",
      ],
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36",
      headless: true,
      defaultViewport: { width: 1920, height: 1080 },
    });
    page = await browser.newPage();
    const url = siteCrawler.replace(/^https?:\/\//, "").replace("www.", "");
    let domain = url.split(".");
    domain = domain[domain.length - 2];

    console.log("Fetching similar web data for ", url);
    await page.goto(`https://data.similarweb.com/api/v1/data?domain=${url}`, {
      waitUntil: "load",
      timeout: 15000,
    });
    similarWebData = JSON.parse(
      await page.evaluate(() => {
        return document.querySelector("pre").textContent;
      })
    );

    // Go To Site
    await page.goto(`https://${url}`, { waitUntil: "load", timeout: 30000 });
    await page.waitForSelector("body");
    await mouseJiggler(page);
    await new Promise((r) => setTimeout(r, 5000));

    // Fetch privacy policy
    const privacyPolicy = await page.evaluate(() => {
      const privacyPolicy = document.querySelector('a[href*="privacy"]');
      return privacyPolicy ? privacyPolicy.href : "No privacy policy found";
    });

    // Fetch terms and conditions
    const termsAndConditions = await page.evaluate(() => {
      const termsAndConditions = document.querySelector('a[href*="terms"]');
      return termsAndConditions
        ? termsAndConditions.href
        : "No terms and conditions found";
    });

    // Fetch social links
    const socialLinks = await page.evaluate(() => {
      const socialLinks = {};

      const facebook = document.querySelector('a[href*="facebook.com"]');
      if (facebook) socialLinks.facebook = facebook.href;

      const twitter = document.querySelector('a[href*="twitter.com"]');
      if (twitter) socialLinks.twitter = twitter.href;

      const instagram = document.querySelector('a[href*="instagram.com"]');
      if (instagram) socialLinks.instagram = instagram.href;

      const linkedin = document.querySelector('a[href*="linkedin.com"]');
      if (linkedin) socialLinks.linkedin = linkedin.href;

      const youtube = document.querySelector('a[href*="youtube.com"]');
      if (youtube) socialLinks.youtube = youtube.href;

      const pinterest = document.querySelector('a[href*="pinterest.com"]');
      if (pinterest) socialLinks.pinterest = pinterest.href;

      const github = document.querySelector('a[href*="github.com"]');
      if (github) socialLinks.github = github.href;

      const whatsapp = document.querySelector('a[href*="whatsapp.com"]');
      if (whatsapp) socialLinks.whatsapp = whatsapp.href;

      const telegram = document.querySelector('a[href*="telegram.com"]');
      if (telegram) socialLinks.telegram = telegram.href;

      const snapchat = document.querySelector('a[href*="snapchat.com"]');
      if (snapchat) socialLinks.snapchat = snapchat.href;

      const tiktok = document.querySelector('a[href*="tiktok.com"]');
      if (tiktok) socialLinks.tiktok = tiktok.href;

      const reddit = document.querySelector('a[href*="reddit.com"]');
      if (reddit) socialLinks.reddit = reddit.href;

      const discord = document.querySelector('a[href*="discord.com"]');
      if (discord) socialLinks.discord = discord.href;

      const twitch = document.querySelector('a[href*="twitch.com"]');
      if (twitch) socialLinks.twitch = twitch.href;

      const vimeo = document.querySelector('a[href*="vimeo.com"]');
      if (vimeo) socialLinks.vimeo = vimeo.href;

      return socialLinks;
    });

    try {
      if (!fs.existsSync(`./data/${domain}`)) {
        fs.mkdirSync(`./data/${domain}`);
      }
    } catch (err) {
      console.error(err);
    }

    console.log("content Ratio", await adToContentRatio(page));
    console.log("Google Ads", await googleAds(page));
    await page.screenshot({
      path: `./data/${domain}/homepage.png`,
      fullPage: true,
    });
    await page.setViewport({ width: 375, height: 667 });
    await new Promise((r) => setTimeout(r, 2000));
    await page.reload({ waitUntil: "load", timeout: 15000 });
    await page.screenshot({
      path: `./data/${domain}/homepage_mobile.png`,
      fullPage: true,
    });

    console.log("Fetching urls Category");
    let categoryurls = await filterUrls(
      page,
      await fetchUrls(page, "li a"),
      url,
      "category"
    );
    categoryurls = await removeDuplicates(categoryurls);

    console.log("Fetching urls Articles");
    let articleurls = await filterUrls(
      page,
      await fetchUrls(page, "a"),
      url,
      "article"
    );
    articleurls = await removeDuplicates(articleurls);

    let articleUrl, categoryUrl;
    if (categoryurls.length > 0) {
      console.log("Opening url Category");
      const page2 = await browser.newPage();
      categoryUrl = await random(categoryurls);
      await page2.goto(categoryUrl, { waitUntil: "load", timeout: 15000 });
      await page2.screenshot({
        path: `./data/${domain}/category.png`,
        fullPage: true,
      });
      await page2.setViewport({ width: 375, height: 667 });
      await page2.reload({ waitUntil: "load", timeout: 15000 });
      await new Promise((r) => setTimeout(r, 2000));
      await page2.screenshot({
        path: `./data/${domain}/category_mobile.png`,
        fullPage: true,
      });
    }

    if (articleurls.length > 0) {
      console.log("Opening url Article");
      const page3 = await browser.newPage();
      articleUrl = await random(articleurls);
      await page3.goto(articleUrl, { waitUntil: "load", timeout: 15000 });
      await page3.screenshot({
        path: `./data/${domain}/article.png`,
        fullPage: true,
      });
      await page3.setViewport({ width: 375, height: 667 });
      await page3.reload({ waitUntil: "load", timeout: 15000 });
      await new Promise((r) => setTimeout(r, 2000));
      await page3.screenshot({
        path: `./data/${domain}/article_mobile.png`,
        fullPage: true,
      });
    }
    await browser.close();
    console.log("Done");
    res.status(200).json({
      socialLinks: socialLinks,
      privacyPolicy: privacyPolicy,
      termsAndConditions: termsAndConditions,
      homepageUrl: `https://${url}`,
      categoryUrl: categoryurls.length > 0 ? categoryUrl : "Not Found",
      articleUrl: articleurls.length > 0 ? articleUrl : "Not Found",
      similarWebData: similarWebData,
    });
  } catch (error) {
    console.log(error.message);
    try {
      await page.screenshot({ path: `./data/error.png`, fullPage: true });
    } catch (error) {
      console.log(error.message);
    }
    res.status(404).json({ error: error.message });
  }
}

async function fetchUrls(page, locator) {
  try {
    await page.waitForSelector(`${locator}`, {
      state: "attached",
      timeout: 5000,
    });
  } catch (error) {
    await page.waitForSelector(`a`, { state: "attached", timeout: 5000 });
  }
  const hrefs = await page.$$eval(locator, (anchors) => {
    return anchors.map((anchor) => anchor.href);
  });
  return hrefs;
}

async function filterUrls(page, urls, domain, pageFilter) {
  const conditions = [
    "correction",
    "#content",
    "copyright-notice",
    "privacy-policy",
    "terms-of-use",
    "terms-and-conditions",
    "pdf",
    "doc/",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "zip",
    "rar",
    "/page",
    "dmca",
    "googleads.g.doubleclick.net",
    "googleadservices.com",
    "googlesyndication.com",
    "google-analytics.com",
    "googletagservices.com",
    "facebook",
    "twitter",
    "youtube",
    "doubleclick",
    "whatsapp",
    "linkedin",
    "pinterest",
    "reddit",
    "undefined",
    "null",
    "NaN",
    "#",
    "about",
    "contact",
    "privacy",
    "terms",
    "sitemap",
    "/faq",
    "disclaimer",
    "advertise",
    "careers",
    "feedback",
    "help",
    "login",
    "register",
    "subscribe",
    "unsubscribe",
    "sitemap.xml",
    "robots.txt",
    "rss",
    "/feed",
    "xml",
    "json",
    "api",
    "wp-json",
    "wp-content",
    "wp-includes",
    "wp-admin",
    "wp-login",
    "wp-cron",
    "wp-trackback",
    "wp-comments",
    "wp-feed",
    "wp-mail",
    "wp-signup",
    "wp-settings",
    "wp-links",
    "wp-activate",
    "wp-atom",
    "wp-rdf",
    "wp-rss",
    "wp-rss2",
  ];

  let filteredUrls = urls.filter((url) => {
    if (url.includes(domain)) {
      if (!conditions.some((el) => url.includes(el))) {
        return url;
      }
    }
  });

  switch (pageFilter) {
    case "category":
      filteredUrls = await filteredUrls.filter((url) => {
        if (url.endsWith("/")) {
          url = url.slice(0, -1);
        }
        if (
          (url.split("/").slice(3).join("/").length <= 20 &&
            url.split("/").slice(3).join("/").length >= 3) ||
          url.includes("category")
        ) {
          if (!url.includes("post/") && !url.includes("post-")) return url;
        }
      });
      break;

    case "article":
      filteredUrls = await filteredUrls.filter((url) => {
        if (url.endsWith("/")) {
          url = url.slice(0, -1);
        }
        const urlParts = url.split("/");
        const lastPart = urlParts[urlParts.length - 1];
        if (
          url.split("/").slice(3).join("/").length >= 30 ||
          /^[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]*$/g.test(lastPart)
        ) {
          if (
            !url.includes("category") &&
            !url.includes("tag") &&
            !url.includes("page") &&
            !url.includes("author") &&
            !url.includes("wiki/")
          ) {
            return url;
          }
        }
      });
      break;

    default:
      throw new Error("Invalid type of filter");
  }

  if (filteredUrls.length < 1 && flag == 0) {
    console.log("fetching new Urls");
    const newurls = await fetchUrls(page, "a");
    flag = 1;
    return await filterUrls(page, newurls, domain, pageFilter);
  } else {
    return filteredUrls;
  }
}

async function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

async function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// advertisment to content ratio of a website (advertisment to content ratio of a website)
async function adToContentRatio(page) {
  const adToContentRatio = await page.evaluate(() => {
    const ads = document.querySelectorAll("iframe[title='Advertisement']");
    const content = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, a");
    return (ads.length / content.length) * 100;
  });
  return adToContentRatio;
}

// check if google ads are present on the website
async function googleAds(page) {
  const googleAds = await page.evaluate(() => {
    const ads = document.querySelectorAll("iframe[title='Advertisement']");
    return ads.length;
  });
  return googleAds;
}

async function mouseJiggler(page) {
  await page.mouse.move(0, 0);
  await page.mouse.move(100, 100);
  await page.mouse.move(200, 200);
  await page.mouse.move(300, 300);
  await page.mouse.move(400, 400);
}