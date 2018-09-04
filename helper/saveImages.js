const { imagesPath } = require('../config/config.js')
const path = require('path')
const { promisify } = require('util')
const http = require('http')
const https = require('https')
const fs = require('fs')

const writeFile = promisify(fs.writeFile)

if(!fs.existsSync(imagesPath)){
    fs.mkdirSync(imagesPath)
}

module.exports = async function (src) {
    // 判断图片时请求还是base64
    if(/.(png|jpg|gif)$/.test(src)){
        urlToImage(src)
    }else{
        await base64ToImage(src)
    }
}

function urlToImage(src) {
    // 判断是否为https
    const mod = /^https/.test(src) ? https : http
    // 获取图片的格式
    const ext = path.extname(src)
    // 拼接路径
    const file = path.join(imagesPath, `${Date.now()}.${ext}`)
    // 发送请求
    mod.get(src, (res) => {
        // 保存图片到本地
        res.pipe(fs.createWriteStream(file)).on('finish', () => {
            console.log(src + '下载完成')
        })
    })
}

async function base64ToImage(src) {
    console.log(src);
    
    // base64格式:data:image/jpeg;base64,/retetedfg
    const matchs = src.match(/^data:(.+?);base64,(.+)$/)

    try {
        // matchs[1]-->image/jpeg
        const ext = matchs[1].split('/')[1]

        const file = path.join(imagesPath, `${Date.now()}.${ext}`)
        // matchs[2]-->/retetedfg
        await writeFile(file, matchs[2], 'base64')
        console.log(src + '下载完成')
    } catch (error) {
        console.log('非base64图片')
    }
}




