import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDto } from './message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  @SubscribeMessage('join-room')
  handleJoinRoom(
    @MessageBody() body: MessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.server.socketsJoin(body.roomId);
    console.log(`User with ID ${client.id} joined room ${body.roomId}`);
  }

  @SubscribeMessage('send-message')
  handleChatUpdate(@MessageBody() body: MessageDto) {
    this.server.to(body.roomId).emit('receive-msg', body);
  }

  afterInit() {
    console.log(`Initialized}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    console.log(`Connected ${client.id}`);
  }
}
