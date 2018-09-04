const puppeteer = require('puppeteer')
const { path } = require('../config/config.js')

async function begin() {
    //     puppeteer launch参数说明：
    // executablePath： 运行Chromium或Chrome可执行文件的路径
    // headless： 是否运行在浏览器headless模式，true为不打开浏览器执行，默认为true
    // timeout： 等待浏览器实例启动的最长时间（以毫秒为单位）。默认为30000（30秒）。通过0禁用超时
    // args： 传递给浏览器实例的其他参数
    // 打开一个浏览器
    const browser = await puppeteer.launch({
        headless: false
    });
    // 新建一个页面
    const page = await browser.newPage();
    // 让页面跳转到百度
    await page.goto('http://baidu.com');
    // 截屏
    await page.screenshot({
        path: `${path}/${Date.now()}.png`
    });
    await browser.close()
}

begin()