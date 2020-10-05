const puppeteer = require('puppeteer')
;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 1000, // slow down by 250ms
  })
  const page = await browser.newPage()
  await page.goto('https://www.ea.com/fifa/ultimate-team/web-app/')

  await page.waitForXPath("//button[contains(., 'Login')]")

  const elements = await page.$x("//button[contains(., 'Login')]")[0]

  const rect = await page.evaluate((elements) => {
    const { top, left, bottom, right } = elements.getBoundingClientRect()
    return { top, left, bottom, right }
  }, elements)
  console.log(JSON.stringify(rect))

  await page.mouse.down()
  await page.mouse.up()

  console.log(elements)

  await page.waitForSelector('#password').then(() => console.log('login exist'))

  // await page.click('.call-to-action')

  await page.screenshot({ path: 'example.png' })
  console.log('coucou')
  // await browser.close()
})()
