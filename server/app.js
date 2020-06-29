const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-length,Authorization,Accept,X-Requested-with")
  res.writeHead(200, {
    "Content-Type": "text/json;charset=utf-8"
  })
  next()
})


app.get("/", function (req, res) {
  let data = JSON.stringify({
    code: 200,
    data: {
      name: "小明",
      age: "20",
      gender: "男"
    }
  })
  res.end(data)
})

app.listen(2600)