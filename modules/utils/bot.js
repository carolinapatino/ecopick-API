var TelegramBot = require("node-telegram-bot-api");
var token = process.env.BOT_TOKEN;
var bot = new TelegramBot(token, { polling: true });
var request = require("request");
var shipmentModel = require("../shipment/shipment.model");

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
  request(
    `http://localhost:3000/mrpostel/api/shipment/${order}/route`,
    function (error, response, body) {
      // if (body == 0) {
      if (response.statusCode == 204 && body == 0) {
        bot.sendMessage(
          chatId,
          "There isn`t a order with ID " +
            order +
            ". Please check and try again"
        );
      } else if (!error && response.statusCode == 200) {
        let route = JSON.parse(body);
        bot.sendMessage(chatId, "Tracking ID: " + order);
        bot.sendMessage(chatId, "Date: " + route[0].st_date);
        bot.sendMessage(chatId, "Status: " + route[0].status);
        bot.sendMessage(chatId, "Description: " + route[0].status_description);
      } else {
        console.log(error);
      }
    }
  );
});

//Detail -Consulta el detalle del envio
bot.onText(/\/detail (.+)/, function (msg, match) {
  let chatId = msg.chat.id;
  let order = match[1];
  request(`http://localhost:3000/mrpostel/api/shipment/${order}`, function (
    error,
    response,
    body
  ) {
    if (body == 0 && response.statusCode == 204) {
      bot.sendMessage(
        chatId,
        "There isn`t a order with ID " + order + ". Please check and try again"
      );
    } else if (!error && response.statusCode == 200) {
      let detail = JSON.parse(body);
      bot.sendMessage(chatId, "Tracking ID: " + detail[0].trackingid);
      bot.sendMessage(chatId, "Delivered date: " + detail[0].delivered);
      bot.sendMessage(chatId, "Arrival date: " + detail[0].arrival);
      bot.sendMessage(chatId, "Amount: " + detail[0].amount + " $");
      bot.sendMessage(chatId, "Office: " + detail[0].office);
      bot.sendMessage(chatId, "Direction: " + detail[0].direction);
      bot.sendMessage(chatId, "User: " + detail[0].user);
      bot.sendMessage(chatId, "Receiver: " + detail[0].receiver);
    } else {
      console.log(error);
    }
  });
});
