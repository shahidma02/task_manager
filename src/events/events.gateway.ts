import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ServertoClientEvents } from '../events/types/events';
import { Message } from '../events/message/message.entity';

@WebSocketGateway({ namespace: 'events' })
export class EventsGateway {
  @WebSocketServer() server: Server<any, ServertoClientEvents>;
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  sendMessage(message: any) {
    this.server.emit('newMessage', message);
  }

  sendMessageToUser(userId: number, message: any) {
    const socketId = String(userId);

    if (socketId) {
      this.server.to(socketId).emit('newMessage', message);
      console.log(`📩 Message sent to User ${userId}:`, message);
    } else {
      console.log(
        `⚠️ User ${userId} is not connected. Cannot deliver message now.`,
      );
    }
  }
}
