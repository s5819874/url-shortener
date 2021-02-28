const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
require('./config/mongoose')

const validUrl = require('valid-url')

const randomURL = require('./randomURL')

const baseUrl = process.env.NODE_ENV ? 'https://' : 'localhost:3000'

const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

//設定路由們

//去首頁
app.get('/', (req, res) => {
  res.render('index')
})

//縮網址
app.post('/', (req, res) => {

  let original = req.body.original
  console.log(original)

  //檢查url格式
  const bool = (!validUrl.isUri(original))
  if (bool) {
    res.render('index', { original, bool })
  }

  //檢查url是否已存在資料庫
  Url.findOne({ original })
    .then(url => {
      if (url) {
        const shorted = url.shorted
        const url = baseUrl + shorted
        res.render('result', { url })
      } else {
        //url不存在，創建新資料

        //檢查短網址是否重複

        while (true) {
          let shorted = randomURL(6)
          Url.findOne({ shorted })
            .then(url => {
              if (!url) {
                return;
              }
            })
            .catch(error => console.log(error))
        }

        Url.create({ original, shorted })
        return shorted
      }
    })
    .catch(error => console.log(error))
    .then(shorted => {
      const url = baseUrl + shorted
      res.render('result', { url })
    })
    .catch(error => console.log(error))
})


//連網址
app.get('/:shorted', (req, res) => {
  const shorted = req.params.shorted
  Url.findOne({ shorted })
    .then(url => {
      res.redirect(301, url[0].original)
    })
    .catch(() => res.status(404).send('Not Found!'))
})

app.listen(PORT, () => {
  console.log(`App is now running on http://localhost:${PORT}`)
})