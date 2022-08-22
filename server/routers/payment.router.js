const paypal = require("paypal-rest-sdk");
var express = require("express");
var cors = require('cors');


var router = express.Router();

let item = [
  {
    name: "thanh toans paypal",
    sku: "004",
    price: "5.00",
    currency: "USD",
    quantity: 2,
  },
  {
    name: "thanh toan bai dang phong tro",
    sku: "001",
    price: "1.00",
    currency: "USD",
    quantity: 1,
  },
  {
    name: "thanh toan bai dang nha tro",
    sku: "002",
    price: "1.50",
    currency: "USD",
    quantity: 1,
  },
  {
    name: "thanh toan bai dang can ho",
    sku: "003",
    price: "2.00",
    currency: "USD",
    quantity: 1,
  },
];

let total = 0;
for (let i = 0; i < item.length; i++) {
  total += parseFloat(item[i].price) * item[i].quantity;
}

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "Af2UxgHioDFPHM2LN1CnUpWo5HqGBpSXYmJu79Mg1JkwEnAzCC0bQMk5CvHujwq7RXCDnEtAFGGz-cJ4",
  client_secret:
    "EK1t_RGogU1FhooWwgikJKdvVm4WhgYwPATVfMFRQb9vQftGY_OOhuAN39aqAzrowUYvSMfXBZiXKLy5",
});

router.get("/", function (req, res) {
  res.render("index.handlebars", { items: item });
});

router.post("/pay",function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}, function (req, res) {
  let sku = req.body.sku;

  //filter post type
  const skuUnique = item.filter((x) => x.sku === sku);

  let total = 0;
  for (let i = 0; i < skuUnique.length; i++) {
    total += parseFloat(skuUnique[i].price) * skuUnique[i].quantity;
  }

  var create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `http://localhost:3001/thanh-toan/success?total=${total}`,
      cancel_url: "http://localhost:3001/thanh-toan/cancel",
    },
    transactions: [
      {
        item_list: {
          items: skuUnique,
        },
        amount: {
          currency: "USD",
          total: total.toString(),
        },
        description: "This is the payment description.",
      },
    ],
  };
  try {
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        // console.log("Create Payment Response");
        // console.log(payment);
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            res.json({forwardLink: payment.links[i].href});
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/success", async function (req, res) {
  let payerId = req.query.PayerID;
  let total = req.query.total;
  var execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: total.toString(),
        },
      },
    ],
  };

  let result = {
    state: true,
  }

  var paymentId = req.query.paymentId;
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        // console.log("Get Payment Response");
        console.log(JSON.stringify(payment));
        res.cookie('state',result.state)
        res.send("<script>window.close();</script > ")
      }
    }
  );
});

router.get("/cancel", function (req, res) {
  let result = {
    state: false
  }
  res.json(result);
});

module.exports = router;
