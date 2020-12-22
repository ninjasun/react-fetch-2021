var express = require("express");
var router = express.Router();

/* GET products listing. */
router.get("/", function (req, res, next) {
  return res.send(products);
});

router.get("/:id", function (req, res, next) {});

router.post("/", function (req, res, next) {});

module.exports = router;

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
