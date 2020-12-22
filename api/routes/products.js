var express = require("express");
var router = express.Router();

const products = [
  {
    key: 1,
    name: "AAAA",
  },
  {
    key: 2,
    name: "BBBB",
  },
  {
    key: 3,
    name: "CCCC",
  },
  {
    key: 4,
    name: "DDDD",
  },
];
/* GET products listing. */
router.get("/", function (req, res, next) {
  res.status(200).send(products);
});

router.get("/:id", function (req, res, next) {});

router.post("/", function (req, res, next) {});

module.exports = router;
