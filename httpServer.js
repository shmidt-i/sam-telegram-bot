var koa = require('koa');
var Router = require('koa-router');
var app = new koa();
var router = new Router();
router.get('/ping', ctx => (ctx.body = 'pong'));
app.use(router.routes());

module.exports = app;
