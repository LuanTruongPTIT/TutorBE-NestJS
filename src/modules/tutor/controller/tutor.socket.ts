import { OnEvent } from '@nestjs/event-emitter';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class TutorGateway {
  private userSockets = new Map<string, Socket>();
  @SubscribeMessage('register')
  handleRegister(client: Socket, payload: { userId: string }) {
    console.log(payload.userId, typeof payload.userId);
    console.log('handleRegister');
    this.userSockets.set(payload.userId, client); // Fix: Change 'client.id' to 'client'
    console.log(this.userSockets.get(payload.userId));
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('notificationPeddingTutor')
  notificationPeddingTutor(@ConnectedSocket() client: Socket) {
    console.log('notificationPeddingTutor');
    client.emit('notificationPeddingTutors', {
      message: 'notificationPeddingTutor',
    });
  }
  @OnEvent('notificationAcceptedForm')
  handleRegisterTutorForm(data: any) {
    console.log('notificationAcceptedForm', data.userId);
    console.log('userSockets', this.userSockets);
    const socketId = this.userSockets.get(data.userId);
    console.log('socketId', socketId);
    this.server.to(socketId.id).emit('notificationPeddingTutors', data); // Fix: Access the 'id' property of 'socketId'
  }
}
