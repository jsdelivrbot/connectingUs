const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, '/public')))
  .set('app', path.join(__dirname, 'app'))
  .set('app engine', 'ejs')
  .get('/', (req, res) => res.render('app'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
