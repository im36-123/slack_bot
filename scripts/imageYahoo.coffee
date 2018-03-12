# Description:
#   tiqav から画像を取得する
#
# Notes:
#   画像 [keyword] で keyword にヒットした画像（ランダムに1枚）のURLを返却

request = require 'request'
cheerio = require 'cheerio'

module.exports = (robot) ->
  robot.respond /画像 (.+)/i, (msg) ->
    msg.send "#{msg.match[1]}の画像ですか。\n少々お待ち下さい"
    keyword = msg.match[1].replace(/\s/ig, '+')
    request {
      uri: 'https://search.yahoo.co.jp/image/search',
      qs: {p: keyword}
    }, (error, response, body)->
      return if error
      $ = cheerio.load body
      $obj = $('.gridmodule').not('#ISw')
      i = Math.floor(Math.random() * $obj.length + 1)
      image = $obj.eq(i).find('a').attr('href')
      msg.send image
