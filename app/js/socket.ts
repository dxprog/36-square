const EVT_OPEN = 'open';
const EVT_ERROR = 'error';
const EVT_MESSAGE = 'message';

export default class Socket {

  private events: {
    [key: string]: (Array<Function>)
  };

  private connection: WebSocket;

  /*******************************
   *  LIFECYCLE METHODS
   ******************************/

  constructor(url: string, port: number = 80) {
    this.events = {};

    const connection = new WebSocket(`${url}:${port}`, '36-square');
    connection.addEventListener(EVT_OPEN, this.handleOpen.bind(this));
    connection.addEventListener(EVT_MESSAGE, this.handleMessage.bind(this));
    connection.addEventListener(EVT_ERROR, this.handleError.bind(this));
    this.connection = connection;
  }

  /*******************************
   *  EVENT HANDLERS
   ******************************/

  private handleOpen() {
    this.trigger(EVT_OPEN);
  }

  private handleMessage(evt: MessageEvent) {
    this.trigger(EVT_MESSAGE, evt);
  }

  private handleError(err: Error) {
    this.trigger(EVT_ERROR, err);
  }

  /*******************************
   *  PUBLIC METHODS
   ******************************/

  sendData(data: any) {
    this.connection.send(JSON.stringify({
      sender: 'client',
      data
    }));
  }

  on(eventName: string, callback: Function) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  /*******************************
   *  PRIVATE METHODS
   ******************************/

  private trigger(eventName: string, ...args: any[]) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => {
        callback(...args);
      });
    }
  }
}