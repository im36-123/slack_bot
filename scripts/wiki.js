
// Description:
//   アルベド語変換
//
// Notes:
//   ja-alb [keyword] で keyword をアルベド語に変換する
const axios = require('axios');
const jq = require('node-jq');

const options = {
  method: 'get',
  url: 'https://ja.wikipedia.org/w/api.php',
  params: {
    action: 'query',
    format: 'json',
    prop: 'extracts',
    redirects: 1,
    exchars: 300,
    explaintext: 1,
    titles: ''
  }
};

module.exports = (robot) => {
  robot.respond(/wiki (.+)/i, function (msg) {
    const keyword = msg.match[1]
    options.params.titles = encodeURIComponent(keyword)
    axios(options)
      .then((res) => {
        const dynamicKey = Object.keys(res.data.query.pages)[0]
        const text = res.data.query.pages[dynamicKey].extract
        return msg.send(`${keyword}は \n\`\`\`${text}\n\`\`\` ということですよ。`)
      })
      .catch((err) => {
        return msg.send(`おや、これはエラーのようですよ。\n\`\`\`\n${err}\n\`\`\``)
      });

  });
}
