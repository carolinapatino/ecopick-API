var TelegramBot = require("node-telegram-bot-api");
var token = "1235638372:AAFPpOVYNsfCef0EcN1GTfG80Ah1LLbhzKU";
var bot = new TelegramBot(token, { polling: true });
var request = require("request");

//Bienvenida
/*bot.onText(/^\/start/, function (msg) {
  var chatId = msg.chat.id;
  var nameUser = msg.from.first_name;
  bot.sendMessage(
    chatId,
    "Welcome to Mr.Postel " +
      nameUser +
      ". Introduce your tracking ID, like this /track  your ID"
  );
});*/

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

//Track
bot.onText(/\/track (.+)/, function (msg, match) {
  var chatId = msg.chat.id;
  var order = match[1];
  console.log(order);
  var id = order;
  request(`/shipment`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      bot.sendMessage(chatId, "We`re looking for your order " + order);
      bot.sendMessage(chatId, body);
    }
  });
});

//Detail
bot.onText(/\/detail (.+)/, function (msg, match) {
  var chatId = msg.chat.id;
  var order = match[1];
  console.log(order);
  var id = order;
  request(`/shipment`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      bot.sendMessage(chatId, "We`re looking for your order " + order);
      bot.sendMessage(chatId, body);
    }
  });
});
