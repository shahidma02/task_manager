import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ServertoClientEvents } from '../events/types/events';
import { Message } from '../events/message/message.entity';

@WebSocketGateway({namespace:'events'})
export class EventsGateway {
  @WebSocketServer() server: Server<any,ServertoClientEvents>;
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

    sendMessage(message:any){
    this.server.emit('newMessage',  message );
  }
}
