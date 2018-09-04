const conf=require('./config/config.js')
const downLoadImages=require('./src/index.js')
const yargs=require('yargs')

//  获取命令行输入的参数  node -p 8000 ==>node --port=8000
const argv=yargs.usage('Reptilian [options]')
.option('w',{
    alias:'kw',
    describe:'要搜索的关键字',
    default:'狗'
}).version()
.alias('v','version')
.help() //输入--help是可查看所有命令
.argv;

downLoadImages(Object.assign({},conf,argv))