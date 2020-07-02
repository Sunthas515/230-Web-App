var express = require('express');
var router = express.Router();
let jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Stocks Database API' });
});

/* GET stocks/symbols data. */
let request = null;
router.get("/stocks/symbols", function (req, res, next) {
  if (req.query.industry) {
    request = req.db.from('stocks').distinct("name", "symbol", "industry").where('industry', 'Like', '%' + req.query.industry + '%').orderBy('symbol', 'asc')
  }
  else {
    request = req.db.from('stocks').distinct("name", "symbol", "industry").orderBy('symbol', 'asc')
  }
  request
    .then((rows) => {
      if (!rows.length) {
        res.status(404).send({ "Error": true, "message": "Industry sector not found" });
      }
      if (!req.query.industry && !(Object.keys(req.query).length === 0)) {
        res.status(400).send({ "Error": true, "message": "Invalid query parameter: only 'industry' is permitted" })
      }
      res.json(rows)
    })
    .catch((err) => {
      console.log(err);
    })
})

/* GET stocks/:Symbol data. */
router.get("/stocks/:symbol", function (req, res, next) {
  req.db.from('stocks').select("*").where('symbol', '=', req.params.symbol).orderBy('timestamp', 'desc')
    .then((rows) => {
      if (!rows.length) {
        res.status(404).send({ "Error": true, "message": "No entry for symbol in stocks database" });
      }
      if (!(Object.keys(req.query).length === 0)) {
        res.status(400).send({ "Error": true, "message": "Date parameters only available on authenticated route /stocks/authed"})
      }
      res.json(rows[0])
    })
    .catch((err) => {
      console.log(err);
    })
})

//http://localhost:3000/stocks/authed/AAPL?from=2020-03-15T00:00:00.000Z&end=2020-03-20T00:00:00.000Z

/* GET authed stocks data */
const authorize = (req, res, next) => {
  const authorization = req.headers.authorization
  let token = null;
  const secretKey = "secret key"

  console.log(authorization, req.headers.authorization);

  //Retrieve token
  if (authorization && authorization.split(" ").length === 2) {
    token = authorization.split(" ")[1]
    console.log("Token: ", token)
  } else {
    console.log("Unauthorized user")
    res.status(403).send({ "Error": true, "message": "Authorization header not found" })
    return
  }

  //Verify JWT and check expiration date
  try {
    const decoded = jwt.verify(token, secretKey)

    if (decoded.exp > Date.now()) {
      console.log("Token has expired")
      res.status(403).send({ "Error": true, "message": "Authorization header not found" })
      return
    }
    //Permit user to advance to route
    next()
  } catch (e) {
    console.log("Token is not valid: ", e)
    res.status(403).send({ "Error": true, "message": "Authorization header not found" })
  }
}

router.get("/stocks/authed/:symbol", authorize, function (req, res, next) {
  req.db.from('stocks').select("*").where('symbol', '=', req.params.symbol).havingBetween('timestamp', [req.query.from, req.query.to])
    .then((rows) => {
      if (!req.query.from || !req.query.to) {
        res.status(400).send({ "Error": true, "message": "Parameters allowed are 'from' and 'to', example: /stocks/authed/AAL?from=2020-03-15" });
      }
      if ((Date.parse(req.query.from) < Date.parse("2019-11-06")) || (Date.parse(req.query.to) > Date.parse("2020-03-24"))) {
        res.status(404).send({ "Error": true, "message": "Set dates outside data range." });
      }
      res.json(rows)
    })
    .catch((err) => {
      console.log(err);    
    })
})

module.exports = router;
