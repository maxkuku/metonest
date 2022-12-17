import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import * as cookie from 'cookie';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { CommentsService } from './comments.service';
import { CommentsEntity } from './comments.entity';
export type Comment = { message: string; author: string };
@WebSocketGateway()
export class SocketCommentsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  // создали сервер
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
  // подписались на сообщения клиентов с типом 'addComment'
  @SubscribeMessage('addComment')
  async handleMessage(client: Socket, comment: CommentsEntity) {
    // парсим cookie-файлы
    const cookies = cookie.parse(client.handshake.headers.cookie);
    // извлекаем id новости
    const { idNews } = cookies;
    // создаём/подключаемся к комнате, идентификатором комнаты будет id новости
    client.join(idNews);
    // через метод to сообщаем, в какую комнату надо сделать рассылку сообщений с типом 'newComment'
    this.server.to(idNews).emit('newComment', comment);
  }
  // событие срабатывает после инициализации сервера
  afterInit(server: Server) {
    this.logger.log('Init');
  }
  // событие срабатывает после каждого отключения клиента
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
  // событие срабатывает после каждого подключения клиента
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
