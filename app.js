'use strict'
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require("koa");
//解析request body
const bodyParser = require('koa-bodyparser');
//创建一个Koa对象表示web app本身
const app = new Koa();
// 导入controller middleware:
const controller = require('./controller');
/**
 * 测试middleware
 */
app.use(async (ctx, next) => {
    // 打印URL
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    // 调用下一个middleware
    await next();
});

app.use(async (ctx, next) => {
    // 当前时间
    const start = new Date().getTime();
    // 调用下一个middleware
    await next();
    // 耗费时间
    const ms = new Date().getTime() - start;
    // 打印耗费时间
    console.log(`Time: ${ms}ms`);
});
// add router middleware ==> bodyParser 必须在router之前注册
app
    .use(bodyParser())
    .use(controller())
    .listen(3000);
console.log('app started at port 3000...');
//对于任何请求APP将调用该异步函数处理请求
// app.use(async (ctx, next) => {
//     await next();
//     ctx.response.type = "text/html";
//     ctx.response.body = "<h1>Hello Koa2!</h1>";
//     console.log(`got request!${new Date().getTime()}`);
// }).listen(3000);