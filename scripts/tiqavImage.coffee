# Description:
#   tiqav から画像を取得する
#
# Notes:
#   ちくわぶ [keyword] で keyword にヒットした画像（ランダムに1枚）のURLを返却

module.exports = (robot) ->
  robot.respond /ちくわぶ (.*)/i, (msg) ->
    keyword = encodeURIComponent msg.match[1]
    url = "http://api.tiqav.com/search.json?q=#{keyword}"
    request = msg.http(url).get()
    request (err, res, body) ->
      json = JSON.parse body
      i = Math.floor(Math.random() * json.length + 1)
      id = json[i].id
      ext = json[i].ext
      imgUrl = "http://img.tiqav.com/#{id}.#{ext}"
      msg.send "はいよ #{imgUrl}"
