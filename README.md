# reptilian

> 图片爬虫

## Build Setup

``` bash
# 全局安装
cnpm install imagereptilian -g
这里需要用的chromium,npm下载可能会比较缓慢，所以建议大家使用cnpm

#启动命令
imagereptilian -w 狗 -o ./img
或者
imagereptilian --keyword=人 --output=./img

#参数说明
-w或者是--kw是需要下载的图片关键字,默认是狗
-o或者是--output是需要保存图片的路径,默认是当前启动命令的路径下的images
```
