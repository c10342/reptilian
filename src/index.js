const puppeter = require('puppeteer');
const saveImage = require('../helper/saveImages.js');

// 任务:在百度搜索输入的关键字，然后下载图片
async function downLoadImages(conf) {
    // 打开浏览器
    const browser = await puppeter.launch({
        headless: false
    })
    // 新建一个页面
    const page = await browser.newPage()
    // 跳转到百度
    await page.goto('https://image.baidu.com/')
    console.log('go to https://image.baidu.com/')

    // 设置窗口大小。百度的图片采用的是图片懒加载，所以要获取到图片要么直接把窗口设置大一点，一次获取更多的图片，要么多滚动几次窗口，触发懒加载，获取图片
    await page.setViewport({
        width: 1920,
        height: 2080
    })
    console.log('rest viewport')
    // 让搜索框获取焦点
    await page.focus('#kw')
    console.log('focus')
    // 往搜索框里输入狗这个关键字
    await page.keyboard.sendCharacter(conf.kw)
    console.log('sendCharacter')
    // 点击搜索按钮
    await page.click('span.s_search')
    console.log('click')
    // 等待新页面加载完成
    page.on('load', async () => {
        console.log('loading');
        // page.evaluate可以写dom的一些api
        const srcs = await page.evaluate(() => { 
            const images=document.querySelectorAll('img.main_img')
            return Array.prototype.map.call(images,(image)=>{
                return image.src; 
            })
        })
        srcs.forEach(async (src) => {
            // 防止频繁去访问，从而触发反爬虫规则
            // await page.waitFor(500)
            // 保存图片
            await saveImage(src)
        });
        await browser.close()
    })
};

module.exports=downLoadImages

