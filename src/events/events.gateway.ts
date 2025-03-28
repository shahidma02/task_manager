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
}
// import {
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
// } from '@nestjs/websockets';
// import { Server } from 'socket.io';
// import { ServertoClientEvents } from '../events/types/events';

// @WebSocketGateway({ namespace: 'events' })
// export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server<any, ServertoClientEvents>;

//   private connectedUsers = new Map<string, string[]>();

//   handleConnection(client: any) {
//     console.log('handle connection');
//     const userId = client.handshake.query.userId;
//     console.log('id:', userId);
//     if (userId && !Array.isArray(userId)) {
//       if (!this.connectedUsers.has(userId)) {
//         this.connectedUsers.set(userId, []);
//       }
//       this.connectedUsers.get(userId)!.push(client.id);
//       console.log(`User ${userId} connected with socket ${client.id}`);
//       console.log('if', this.connectedUsers);
//     } else {
//       console.warn(`Connection without valid userId from socket ${client.id}`);
//       console.log('else', this.connectedUsers);
//     }
//   }

//   handleDisconnect(client: any) {
//     this.connectedUsers.forEach((sockets, userId) => {
//       const updatedSockets = sockets.filter((id) => id !== client.id);
//       if (updatedSockets.length > 0) {
//         this.connectedUsers.set(userId, updatedSockets);
//       } else {
//         this.connectedUsers.delete(userId);
//       }
//     });
//     console.log(`Client disconnected: ${client.id}`);
//   }

//   @SubscribeMessage('message')
//   handleMessage(client: any, payload: any): string {
//     console.log('handle message');
//     return 'Hello world!';
//   }

//   sendMessageToUsers(userIds: number[], message: any) {
//     console.log('send message');
//     userIds.forEach((userId) => {
//       const sockets = this.connectedUsers.get(userId.toString());
//       if (sockets) {
//         sockets.forEach((socketId) => {
//           this.server.to(socketId).emit('newMessage', message);
//         });
//       }
//     });
//   }
// }
