// Description:
//   tiqav から画像を取得する
//
// Notes:
//   画像 [keyword] で keyword にヒットした画像（ランダムに1枚）のURLを返却

var cheerio, request;

request = require('request');
cheerio = require('cheerio');

module.exports = function(robot) {
  return robot.respond(/image (.+)/i, function(msg) {
    var keyword;
    msg.send(`\`${msg.match[1]}\` の画像ですか。\n少々お待ち下さい。`);
    keyword = msg.match[1].replace(/\s/ig, '+');
    request({
      uri: 'https://search.yahoo.co.jp/image/search',
      qs: {
        p: keyword
      }
    }, function(error, response, body) {
      var $, $obj, i, image;
      if (error) {
        return;
      }
      $ = cheerio.load(body);
      $obj = $('#ISm .gridmodule');
      i = Math.floor(Math.random() * $obj.length);
      image = $obj.eq(i).find('img').attr('src');
      if (image) {
        return msg.send(image);
      } else if ($('.noRes')[0]) {
        return msg.send(`\`${msg.match[1]}\` に一致する画像はみつからなかったようですよ。`);
      } else {
        return msg.send(`おや、 \`${msg.match[1]}\` を探しに行ったカイトくんは、一体どこへ行ったのでしょうか。`);
      }
    });
  });
};
