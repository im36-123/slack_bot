
// Description:
//   アルベド語変換
//
// Notes:
//   ja-alb [keyword] で keyword をアルベド語に変換する
const axios = require('axios');
const APIKEY = process.env.GOO_API
const BASE_URL = 'https://labs.goo.ne.jp/api/hiragana';
const OUTPU_TYPE = 'hiragana';

const options = {
  method: 'post',
  url: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json'
  },
  data: {
    app_id: APIKEY,
    output_type: OUTPU_TYPE
  }
};

const ja = [
  'あ', 'い', 'う', 'え', 'お',
  'か', 'き', 'く', 'け', 'こ',
  'さ', 'し', 'す', 'せ', 'そ',
  'た', 'ち', 'つ', 'て', 'と',
  'な', 'に', 'ぬ', 'ね', 'の',
  'は', 'ひ', 'ふ', 'へ', 'ほ',
  'ま', 'み', 'む', 'め', 'も',
  'や', 'ゆ', 'よ',
  'ら', 'り', 'る', 'れ', 'ろ',
  'わ', 'を', 'ん',
  'が', 'ぎ', 'ぐ', 'げ', 'ご',
  'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
  'だ', 'ぢ', 'づ', 'で', 'ど',
  'ば', 'び', 'ぶ', 'べ', 'ぼ',
  'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ',
  'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ',
  'ゃ', 'ゅ', 'ょ', 'っ'
]

const albhed = [
  'ワ', 'ミ', 'フ', 'ネ', 'ト',
  'ア', 'チ', 'ル', 'テ', 'ヨ',
  'ラ', 'キ', 'ヌ', 'ヘ', 'ホ',
  'サ', 'ヒ', 'ユ', 'セ', 'ソ',
  'ハ', 'シ', 'ス', 'メ', 'オ',
  'マ', 'リ', 'ク', 'ケ', 'ロ',
  'ヤ', 'イ', 'ツ', 'レ', 'コ',
  'タ', 'ヲ', 'モ',
  'ナ', 'ニ', 'ウ', 'エ', 'ノ',
  'カ', 'ム', 'ン',
  'ダ', 'ジ', 'ヅ', 'デ', 'ゾ',
  'バ', 'ギ', 'ブ', 'ゲ', 'ボ',
  'ガ', 'ビ', 'グ', 'ベ', 'ゴ',
  'ザ', 'ヂ', 'ズ', 'ゼ', 'ド',
  'プ', 'ペ', 'パ', 'ポ', 'ピ',
  'ァ', 'ィ', 'ゥ', 'ェ', 'ォ',
  'ャ', 'ュ', 'ョ', 'ッ'
]

module.exports = (robot) => {
robot.respond(/ja-alb (.+)/i, function(msg) {
    options.data.sentence = msg.match[1]
    axios(options)
    .then((res) => {
      const translatedKeyword = translate(res.data.converted)
      return msg.send(`アルベド語では \`${translatedKeyword}\` ですよ。`)
    })
    .catch((err) => {
      return msg.send(`おや、これはエラーのようですよ。\n\`\`\`\n${err}\n\`\`\``)
    });

    function translate(keyword) {
      const splitedKeyword = keyword.split('')
      const jpIndex = splitedKeyword.map(val => ja.indexOf(val))
      const translatedKeyword = jpIndex.map(val => albhed[val]).join('')
      return translatedKeyword
    }
  });
}
