const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const WebSocket = require('ws');
const wss = new WebSocket.Server({server});
const Router = require('koa-router');
const cors = require('koa-cors');
const bodyparser = require('koa-bodyparser');

app.use(bodyparser());
app.use(cors());

app.use(async function (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

const productDescriptions = [];
const productDescriptionMap = {};
const products = [];

function appendChars(prefix, startIndex, maxLength) {
  for (let i = startIndex; i < 26; i++) {
    const char = String.fromCharCode('a'.charCodeAt(0) + i);
    const word = [prefix, char].join('');
    const productDescription = { code: word, description: word };
    productDescriptions.push(productDescription);
    productDescriptionMap[word] = productDescription;
    if (word.length < maxLength) {
      appendChars(word, i + 1, maxLength);
    }
  }
}

appendChars('', 0, 3);

const router = new Router();
router.get('/ProductDescription', ctx => {
  const q = ctx.request.query.q || '';
  const page = parseInt(ctx.request.query.page || '1');
  const startIndex = (page - 1) * 10;
  const items = productDescriptions
    .filter(pd => pd.description.indexOf(q) >= 0)
    .slice(startIndex, startIndex + 10);
  const count = productDescriptions.length;
  ctx.response.body = { count, page, items };
  ctx.response.status = 200;
});

app.use(async (ctx, next) => {
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
  await next();
});

router.post('/Product', ctx => {
  const product = ctx.request.body;
  let issue;
  if (!product.quantity || typeof product.quantity !== 'number') {
    issue = {text: 'Quantity is missing or is not a number'};
  }
  if (!productDescriptionMap[product.code]) {
    issue = {text: 'Wrong product code'};
  }
  if (issue) {
    ctx.response.body = issue;
    ctx.response.status = 400;
  } else {
    product.id = products.length + 1;
    products.push(product);
    ctx.response.body = product;
    ctx.response.status = 201;
  }
});

router.get('/Product/report', ctx => {
  const location = ctx.request.query.location || '';
  const report = products
    .filter(p => p.location.indexOf(location) >= 0)
    .map(p => [productDescriptionMap[p.code].description, p.quantity].join(', '))
    .join('\n');
  ctx.response.body = { report };
  ctx.response.status = 200;
});

app.use(router.routes());
app.use(router.allowedMethods());

server.listen(3000);
