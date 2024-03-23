const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    console.log('Developed by Sarwak');

    // you can add more status
    let messages = ['STATUS TO CHANGE1', 'STATUS TO CHANGE2'];
    let currentIndex = 0;

    client.user.setActivity(messages[currentIndex], { type: 'PLAYING' });

    setInterval(() => {
      currentIndex = (currentIndex + 1) % messages.length;
      client.user.setActivity(messages[currentIndex], { type: 'PLAYING' });
    }, 5 * 1000);
  }
}