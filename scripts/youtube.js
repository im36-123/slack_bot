// Description:
//   youtube から keyword にヒットする動画を取得する
//
// Notes:
//   youtube [keyword] で keyword で検索された1番目の動画のタイトルとURLを返却する

const axios = require('axios');
const APIKEY = process.env.GOOGEL_YOUTUBE_API
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

const OPTIONS = {
  method: 'get',
  url: BASE_URL,
  params: {
    key: APIKEY,
    part: 'snippet',
    type: 'video',
    maxResults : 1
  }
}

module.exports = function(robot) {
  return robot.respond(/youtube (.+)/i, function(msg) {
    msg.send(`\`${msg.match[1]}\` の動画ですか。\n少々お待ち下さい。`);
    const KEYWORD = msg.match[1].replace(/\s/ig, '+');
    OPTIONS.params.q = KEYWORD
    axios(OPTIONS)
    .then((res) => {
      const RES_DATA = res.data.items[0]
      const TITLE = RES_DATA.snippet.title
      const ID = RES_DATA.id.videoId
      const URL = `https://www.youtube.com/watch?v=${ID}`
      msg.send(`\`${TITLE}\`\n${URL}\``)
    })
    .catch((err) => {
      msg.send(`おや、これはエラーのようですよ。\n\`\`\`\n${err}\n\`\`\``)
    })
  })
}
