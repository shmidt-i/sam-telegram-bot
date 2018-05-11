var koa = require('koa');
var app = koa();
app.get('/ping', ctx => (ctx.body = 'pong'));

module.exports = app;
