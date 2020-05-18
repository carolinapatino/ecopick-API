var TelegramBot = require("node-telegram-bot-api");
var token = process.env.BOT_TOKEN;
var bot = new TelegramBot(token, { polling: true });
var request = require("request");
var moment = require("moment");
const logger = require("../config/logger");

//Bienvenida con botones
bot.onText(/^\/start/, function (msg) {
  var chatId = msg.chat.id;
  var nameUser = msg.from.first_name;
  bot.sendMessage(
    chatId,
    "Welcome to Mr.Postel " + nameUser + ".  How can we help you?",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "My order detail", callback_data: "Detailbutton" },
            { text: "Track my Order", callback_data: "Trackbutton" },
          ],
        ],
      },
    }
  );
  logger.info({ message: "BOT | START" });
  bot.on("callback_query", function onCallbackQuery(action) {
    const data = action.data;
    const msg = action.message;

    if (data == "Detailbutton") {
      bot.sendMessage(chatId, "Introduce /detail your order id");
    }

    if (data == "Trackbutton") {
      bot.sendMessage(chatId, "Introduce /track your order id");
    }
  });
});

//Track - Consulta las rutas de forma textual
bot.onText(/\/track (.+)/, function (msg, match) {
  let chatId = msg.chat.id;
  let order = match[1];
  request(`${process.env.API_URL}/shipment/${order}/route`, function (
    error,
    response,
    body
  ) {
    if (response.statusCode == 204 && body == 0) {
      bot.sendMessage(
        chatId,
        "There isn`t an order with ID " + order + ". Please check and try again"
      );
      logger.info({ message: "BOT | /TRACK ORDER ERROR: UNKNOWN ORDER" });
    } else if (!error && response.statusCode == 200) {
      let route = JSON.parse(body);
      for (var i = 0; i < route.length; i++) {
        bot.sendMessage(
          chatId,
          "Tracking ID: " +
            order +
            "\n" +
            "Date: " +
            moment(route[i].st_date).format("MM/DD/YYYY") +
            "\n" +
            "Status: " +
            route[i].status +
            "\n" +
            "Description: " +
            route[i].status_description
        );
      }
      logger.info({ message: `BOT | /TRACK ORDER ${order} SUCCESSFUL` });
    } else {
      logger.error({ message: "BOT | /TRACK ORDER ERROR: UNKNOWN" });
    }
  });
});

//Detail -Consulta el detalle del envio
bot.onText(/\/detail (.+)/, function (msg, match) {
  let chatId = msg.chat.id;
  let order = match[1];
  request(`${process.env.API_URL}/shipment/${order}`, function (
    error,
    response,
    body
  ) {
    if (body == 0 && response.statusCode == 204) {
      bot.sendMessage(
        chatId,
        "There isn`t an order with ID " + order + ". Please check and try again"
      );
      logger.info({ message: "BOT | /DETAIL ORDER ERROR: UNKNOWN ORDER" });
    } else if (!error && response.statusCode == 200) {
      let detail = JSON.parse(body);
      bot.sendMessage(
        chatId,
        "Tracking ID: " +
          detail[0].trackingid +
          "\n" +
          "Delivered date: " +
          moment(detail[0].delivered).format("MM/DD/YYYY") +
          "\n" +
          "Arrival date: " +
          moment(detail[0].arrival).format("MM/DD/YYYY") +
          "\n" +
          "Amount: " +
          detail[0].amount +
          " $" +
          "\n" +
          "Office: " +
          detail[0].office +
          "\n" +
          "Direction: " +
          detail[0].direction +
          "\n" +
          "User: " +
          detail[0].user +
          "\n" +
          "Receiver: " +
          detail[0].receiver
      );
      logger.info({ message: `BOT | /DETAIL ORDER ${order} SUCCESSFUL` });
    } else {
      logger.error({ message: "BOT | /DETAIL ORDER ERROR: UNKNOWN" });
    }
  });
});
