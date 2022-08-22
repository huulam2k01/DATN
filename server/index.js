// import { engine } from 'express-handlebars';

var express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
var bodyParser = require("body-parser");
// const paypal = require("paypal-rest-sdk");
const path = require("path");
const exphdbs = require("express-handlebars");
var session = require("express-session");
var cors = require('cors')

var userRouter = require("./routers/user.router");
var homeRouter = require("./routers/phongtro.router");
var homePageRouter = require("./routers/home.router");
var paymentRoute = require("./routers/payment.router")

var flash = require("connect-flash");

var app = express();
/* Khai báo để sử dụng kịch bản passport */
require("./config/passport.config");
mongoose.connect(
  "mongodb://localhost/Database_PhongTroVN",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) console.log(err + "");
    console.log("connect database success");
  }
);

app.use(cors())

app.use(
  session({
    name: "login",
    secret: "secured_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 15,
    },
  })
);

app.use([
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: true,
  }),
]);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));

app.use("/nguoi-dung", userRouter);
app.use("/phong-tro", homeRouter);
app.use("/trang-chu", homePageRouter);
app.use("/thanh-toan", paymentRoute)

app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphdbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// let item = [
//   {
//     name: "thanh toans paypal",
//     sku: "001",
//     price: "5.00",
//     currency: "USD",
//     quantity: 2,
//   },
//   {
//     name: "thanh toan bai dang phong tro",
//     sku: "002",
//     price: "1.00",
//     currency: "USD",
//     quantity: 1,
//   },
//   {
//     name: "thanh toan bai dang nha tro",
//     sku: "003",
//     price: "1.00",
//     currency: "USD",
//     quantity: 1,
//   },
//   {
//     name: "thanh toan bai dang can ho",
//     sku: "004",
//     price: "1.50",
//     currency: "USD",
//     quantity: 1,
//   },
// ];

// let total = 0;
// for (let i = 0; i < item.length; i++) {
//   total += parseFloat(item[i].price) * item[i].quantity;
// }

// paypal.configure({
//   mode: "sandbox", //sandbox or live
//   client_id:
//     "Af2UxgHioDFPHM2LN1CnUpWo5HqGBpSXYmJu79Mg1JkwEnAzCC0bQMk5CvHujwq7RXCDnEtAFGGz-cJ4",
//   client_secret:
//     "EK1t_RGogU1FhooWwgikJKdvVm4WhgYwPATVfMFRQb9vQftGY_OOhuAN39aqAzrowUYvSMfXBZiXKLy5",
// });

// app.get("/thanh-toan", function (req, res) {
//   res.render("index.handlebars", { items: item });
// });

// app.post("/pay", function (req, res) {
//   var create_payment_json = {
//     intent: "sale",
//     payer: {
//       payment_method: "paypal",
//     },
//     redirect_urls: {
//       return_url: "http://localhost:3001/thanh-toan/success",
//       cancel_url: "http://localhost:3001/thanh-toan/cancel",
//     },
//     transactions: [
//       {
//         item_list: {
//           items: item,
//         },
//         amount: {
//           currency: "USD",
//           total: total.toString(),
//         },
//         description: "This is the payment description.",
//       },
//     ],
//   };

//   paypal.payment.create(create_payment_json, function (error, payment) {
//     if (error) {
//       throw error;
//     } else {
//       // console.log("Create Payment Response");
//       // console.log(payment);
//       for (let i = 0; i < payment.links.length; i++) {
//         if (payment.links[i].rel === "approval_url") {
//           res.redirect(payment.links[i].href);
//         }
//       }
//     }
//   });
// });

// app.get("/thanh-toan/success", function (req, res) {
//   payerId = req.query.PayerID;

//   var execute_payment_json = {
//     payer_id: payerId,
//     transactions: [
//       {
//         amount: {
//           currency: "USD",
//           total: total.toString(),
//         },
//       },
//     ],
//   };

//   var paymentId = req.query.paymentId;

//   paypal.payment.execute(
//     paymentId,
//     execute_payment_json,
//     function (error, payment) {
//       if (error) {
//         console.log(error.response);
//         throw error;
//       } else {
//         // console.log("Get Payment Response");
//         // console.log(JSON.stringify(payment));
//         res.render("success.handlebars");
//       }
//     }
//   );
// });

app.listen(3001, (err) => {
  if (err) console.log(err);
  console.log("Listen port 3001");
});
