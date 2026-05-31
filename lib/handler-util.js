'use strict';
const fs = require('node:fs');
const Cookies = require('cookies');
const  { currentThemeKey } = require('../config');

function handleLogout(req, res) {
  res.writeHead(401, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.end(
    `<!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <title>ログアウト - 今日の気分メモ</title>
        <style>
          body { font-family: sans-serif; background-color: #f0f7f9; color: #4a555a; text-align: center; padding-top: 100px; }
          h1 { color: #caa4b7; }
          a { display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #7eccdb; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; }
          a:hover { background-color: #66b9c9; }
        </style>
      </head>
      <body>
        <h1>ログアウトしました</h1>
        <a href="/posts">ログイン</a>
      </body>
    </html>`
  );
}

function handleChangeTheme(req, res) {
  const cookies = new Cookies(req, res);
  const currentTheme = (cookies.get(currentThemeKey) !== 'light' ? 'light' : 'dark');
  cookies.set(currentThemeKey, currentTheme);
  res.writeHead(303, {
    'Location': '/posts'
  });
  res.end();
}


function handleFavicon(req, res) {
  res.writeHead(200, {
    'Content-Type': 'image/vnd.microsoft.icon',
    'Cache-Control': 'public, max-age=604800'
  });
  const favicon = fs.readFileSync('./799391.png');
  res.end(favicon);
}

function handleStyleCssFile(req, res) {
  res.writeHead(200, {
  'Content-Type': 'text/css',
  });
  const cssfile = fs.readFileSync('./public/style.css');
  res.end(cssfile);
}

function handleNnChatJsFile(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/javascript',
  });
  const nnfile = fs.readFileSync('./public/nn-chat.js');
  res.end(nnfile);
}

function handleTopPage(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.write(
    `<!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <title>日常の入口</title>
        <style>
          body { font-family: sans-serif; background-color: #f0f7f9; color: #4a555a; text-align: center; padding-top: 100px; }
          h1 { color: #caa4b7; margin-bottom: 30px; }
          a { display: inline-block; width: 200px; margin: 10px; padding: 12px; background-color: #7eccdb; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; }
          a.logout-btn { background-color: #fff3b3; color: #4a555a; border: 1px solid #f3e182; }
          a:hover { opacity: 0.9; }
        </style>
      </head>
      <body>`
  );
  res.write('<h1>日常の入口</h1>');
  res.write('<p><a href="/posts">今日の気分メモ</a></p>');
  res.write('<p><a href="/logout">ログアウト</a></p>');
  res.write(`  </body></html>`);
  res.end();
}


function handleNotFound(req, res) {
  res.writeHead(404, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.write('<p>ページがみつかりません</p>');
  res.write('<p><a href="/posts">今日の気分メモに戻る</a></p>');
  res.end();
}

function handleBadRequest(req, res) {
  res.writeHead(400, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
  res.end('未対応のリクエストです');
}

module.exports = {
  handleLogout,
  handleChangeTheme,
  handleFavicon,
  handleStyleCssFile,
  handleNnChatJsFile,
  handleTopPage,
  handleNotFound,
  handleBadRequest,
};