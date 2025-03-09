// import puppeteer from 'puppeteer'
// import fs from 'fs'

// export const screenLoginX = async (): Promise<void> => {
//   const username = 'NthnamUtd'
//   const password = 'Nthnam17092001'
//   const userPhone = '0377917901'

//   const browser = await puppeteer.launch({
//     headless: false
//   })
//   /////// Remove page default
//   const pages = await browser.pages()

//   if (pages.length > 1) {
//     await pages[0].close()
//   }

//   // const page = await browser.newPage()
//   // const storedCookies = fs.readFileSync('cookies.json').toString()
//   // const cookies = JSON.parse(storedCookies)

//   // const Icookies = [
//   //   {
//   //     name: 'ct0',
//   //     value:
//   //       'f71ae3e60a75c6309200c85225d7af78a66ef7fc80ab0f53137777d6f35717e50941f48b59083942a2d8ca9fac79c427ca8b0698ed380af0af94fb48607a001c1c61bf4169c13ddf6374a73fcf97580e',
//   //     domain: '.x.com',
//   //     path: '/',
//   //     expires: 1775655357.935068,
//   //     size: 163,
//   //     httpOnly: false,
//   //     secure: true,
//   //     session: false
//   //   },
//   //   {
//   //     name: 'auth_token',
//   //     value: '95cf8b0cff3fcd499b6e1fd8422fd671e4b6015e',
//   //     domain: '.x.com',
//   //     path: '/',
//   //     expires: 1775655357.62032,
//   //     size: 50,
//   //     httpOnly: true,
//   //     secure: true,
//   //     session: false
//   //   }
//   // ]

//   // Set cookies for the page session
//   // await page.setCookie(...Icookies)

//   // Navigate to a page where login is required
//   // await page.goto('https://x.com')

//   // await page.goto('https://accounts.google.com/signin')

//   // await page.waitForNetworkIdle({ idleTime: 1500 })

//   // Enter the email address
//   // await page.waitForSelector('input[type="email"]')
//   // await page.type('input[type="email"]', 'masonnguyenx639@gmail.com') // Replace 'your_email@gmail.com' with your actual email
//   // await page.click('#identifierNext')

//   // Wait for the password input to appear
//   // await page.waitForSelector('input[type="password"]', { visible: true })
//   // await page.type('input[type="password"]', 'Nthnam1709200!') // Replace 'your_password' with your actual password
//   // await page.click('#passwordNext')

//   const page = await browser.newPage()

//   // const storedCookies = fs.readFileSync('cookies.json').toString()
//   // const cookies = JSON.parse(storedCookies)

//   await page.setCookie(...cookies)

//   await page.goto('https://x.com', { waitUntil: 'networkidle2' })

//   await page.waitForNetworkIdle({ idleTime: 3000 })

//   // // Wait for potential 2FA input
//   // try {
//   //   await page.waitForSelector('input[type="tel"], input[type="text"]', { timeout: 5000 })
//   //   // Handle 2FA input if necessary
//   //   await page.type('input[type="tel"], input[type="text"]', 'your_2fa_code') // Replace 'your_2fa_code' with your actual 2FA code
//   //   await page.click('#idvPreregisteredPhoneNext, #totpNext')
//   //   await page.waitForNavigation()
//   // } catch (e) {
//   //   console.log('No 2FA required or already handled')
//   // }

//   // Wait for navigation to Gmail
//   // await page.waitForNavigation({ waitUntil: 'networkidle0' })

//   const linkLogin = await page.evaluate(() => {
//     let result = false
//     const tagA = document.querySelectorAll('a')[4]
//     const href = tagA.href
//     if (tagA && href.includes('/login')) {
//       tagA.click()
//       result = true
//     }

//     return result
//   })

//   if (linkLogin) {
//     await page.waitForNetworkIdle({ idleTime: 2500 })
//     ///////////////////////////////////////////////////////////////////////////////////
//     // Select the user input
//     await page.waitForSelector('[autocomplete=username]')
//     await page.type('input[autocomplete=username]', username, { delay: 100 })
//     // Press the Next button
//     await page.evaluate(() => document.querySelectorAll('button')[2].click())
//     await page.waitForNetworkIdle({ idleTime: 2500 })
//     ///////////////////////////////////////////////////////////////////////////////////
//     // Sometimes twitter suspect suspicious activties, so it ask for your handle/phone Number
//     const extractedText = await page.content()
//     if (extractedText.includes('Enter your phone number or email address')) {
//       await page.waitForSelector('[autocomplete=on]')
//       await page.type('input[autocomplete=on]', userPhone, { delay: 100 })
//       await page.evaluate(() => document.querySelectorAll('button')[1].click())
//       await page.waitForNetworkIdle({ idleTime: 2000 })
//     }
//     ///////////////////////////////////////////////////////////////////////////////////
//     // Select the password input
//     await page.waitForSelector('[autocomplete="current-password"]')
//     await page.type('[autocomplete="current-password"]', password, { delay: 100 })
//     // Press the Login button
//     await page.evaluate(() => document.querySelectorAll('button')[3].click())
//     await page.waitForNetworkIdle({ idleTime: 2000 })

//     const cookiesI = await page.cookies()
//     const cookiesJson = JSON.stringify(cookiesI)
//     fs.writeFileSync('cookies.json', cookiesJson)
//   }

//   // const tweets = await page.$$('[data-testid="like"]')
//   // // if (tweets && tweets.length > 1) {
//   // // tweets[i].click()
//   // // /  }
//   // console.log(tweets, 'log')

//   // Like

//   // for (let i = 0; i < 12; i++) {
//   //   if (i % 2 == 0) {
//   //     console.log('like')
//   //     const tweets = await page.$$('[data-testid="like"]')
//   //     if (tweets && tweets.length > 1) {
//   //       tweets[i].click()
//   //     }
//   //   } else {
//   //     await post(false, page)
//   //   }

//   //   await page.mouse.wheel({ deltaY: 800 })
//   //   await page.waitForNetworkIdle({ idleTime: 150 })
//   // }

//   //Commment

//   // const cmtBtn = await page.$$('[data-testid="reply"]')

//   // console.log(cmtBtn, 'cmt')

//   // if (cmtBtn.length > 1) {
//   //   console.log(cmtBtn, 'cmtBtn')

//   //   cmtBtn[0].click()

//   //   await page.waitForSelector('[data-testid="tweetTextarea_0"]')
//   //   await page.type('div[data-testid="tweetTextarea_0"]', ' Wow Amazing very nice', { delay: 100 })

//   //   const tweetBtn = await page.waitForSelector('[data-testid="tweetButton"]')
//   //   await page.waitForNetworkIdle({ idleTime: 1000 })
//   //   tweetBtn?.click()
//   // }

//   // // Retweet
//   // const retweetBtn = await page.$$('[data-testid="retweet"]')
//   // if (retweetBtn && retweetBtn.length > 1) {
//   //   retweetBtn[0].click()
//   //   const retweetConfirmBtn = await page.waitForSelector('[data-testid="retweetConfirm"]')
//   //   if (retweetConfirmBtn) retweetConfirmBtn.click()
//   // }

//   // Post sibar

//   // const sibarPost = await page.waitForSelector('[data-testid="SideNav_NewTweet_Button"]')

//   // sibarPost?.click()

//   // const textAre = await page.$('[data-testid="tweetTextarea_0"]')
//   // console.log(textAre, 'text')
//   // await page.type('div[data-testid="tweetTextarea_0"]', ' Hi every body !!!', { delay: 150 })
//   // await page.waitForNetworkIdle({ idleTime: 1000 })

//   // const tablist = await page.$$('[data-viewportview="true"] [role="presentation"]')

//   // if (tablist && tablist.length > 1) {
//   //   const [fileChooser] = await Promise.all([page.waitForFileChooser(), tablist[0].click()])

//   //   await fileChooser.accept(['./anhtest.jpg'])

//   //   await page.waitForNetworkIdle({ idleTime: 3000 })
//   // }

//   // const tweetBtn = await page.waitForSelector('[data-testid="tweetButton"]')

//   // tweetBtn?.click()

//   // /// actions read notifi

//   // const notificationsBtn = await page.waitForSelector('[href="/notifications"]')

//   // console.log(notificationsBtn, 'noti')

//   // if (notificationsBtn) {
//   //   notificationsBtn.click()
//   //   for (let i = 0; i < 12; i++) {
//   //     await page.mouse.wheel({ deltaY: 800 })
//   //     await page.waitForNetworkIdle({ idleTime: 200 })
//   //   }
//   // }

//   // console.log(homeBtn, 'home')

//   // // const messageBtn = await page.waitForSelector('href="/messages"')

//   // await page.waitForNetworkIdle({ idleTime: 1000 })

//   // homeBtn?.click()

//   // for (let i = 0; i < 12; i++) {
//   //   console.log('like')
//   //   const tweets = await page.$$('[data-testid="like"]')
//   //   if (tweets && tweets.length > 1 && tweets.length > i) {
//   //     tweets[i].click()
//   //   }

//   //   await page.mouse.wheel({ deltaY: 800 })
//   //   await page.waitForNetworkIdle({ idleTime: 150 })
//   // }

//   // await page.waitForNetworkIdle({ idleTime: 3000 })

//   // homeBtn?.click()

//   // // search Actions
//   // const SearchBtn = await page.waitForSelector('[href="/explore"]')

//   // console.log(SearchBtn, 'search')

//   // if (SearchBtn) {
//   //   SearchBtn.click()

//   //   await page.waitForNetworkIdle({ idleTime: 2000 })

//   //   const trendTabs = await page.$$('[data-testid="trend"]')

//   //   if (trendTabs && trendTabs.length > 1) {
//   //     trendTabs[1].click()
//   //     await page.waitForNetworkIdle({ idleTime: 1500 })

//   //     const followBtn = await page.$$('[data-testid*="-follow"]')

//   //     if (followBtn && followBtn.length > 1) {
//   //       followBtn[1].click()
//   //       await page.waitForNetworkIdle({ idleTime: 1500 })

//   //       followBtn[0].click()
//   //       await page.waitForNetworkIdle({ idleTime: 1500 })
//   //     }

//   //     for (let i = 0; i < 15; i++) {
//   //       const tweets = await page.$$('[data-testid="like"]')
//   //       if (tweets && tweets.length > 1 && tweets.length > i && i > 2) {
//   //         tweets[i].click()
//   //         await page.waitForNetworkIdle({ idleTime: 1000 })
//   //       }

//   //       await page.mouse.wheel({ deltaY: 800 })
//   //       await page.waitForNetworkIdle({ idleTime: 150 })
//   //     }

//   //     const homeBtn = await page.waitForSelector('[href="/home"]')

//   //     console.log(homeBtn, 'home')

//   //     homeBtn?.click()
//   //   }
//   // }
// }

// // const post = async (is_media: boolean, page: Page): Promise<void> => {
// //   console.log('123123')

// //   const textAre = await page.$('[data-testid="tweetTextarea_0"]')
// //   console.log(textAre, 'text')

// //   const btnImg = await page.$$('[role="presentation"]')

// //   console.log(btnImg[0], 'btnImg')
// // }
