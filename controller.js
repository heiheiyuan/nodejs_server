'use strict'
// 先导入fs模块，然后用readdirSync列出文件
var fs = require("fs");
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}
function addControllers(router,dirname) {
    //读取controllers下的js文件
    var files = fs.readdirSync(dirname);
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });
    //将所有接口添加至router中
    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        //引入接口
        let mapping = require(dirname + f);
        //添加接口
        addMapping(router, mapping);
    }
}
module.exports = function (dir) {
    let
        controllers_dir = dir || './controllers/', // 如果不传参数，扫描目录默认为'controllers'
        // 注意require('koa-router')返回的是函数:
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};