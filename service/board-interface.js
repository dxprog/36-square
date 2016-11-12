let board = null;

function registerBoard(sender) {
  board = sender;
}

module.exports = {
  handleBoardMessage(sender, data) {
    if (data.action === 'register') {
      registerBoard(sender, data);
    }
  },

  setPixel(data) {
    if (board) {
      board.sendUTF(JSON.stringify(data));
    } else {
      console.error(`Received setPixel message but no board has been registered`);
    }
  }
};