import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EventsGateway } from './events/events.gateway';
import { Message } from './events/message/message.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted:true,
      transform:true
    }
  ),
);
  await app.listen(process.env.PORT ?? 3000);

  // let msg ={
  //   id:"1",
  //   message: "Hello Hania",
  //   authorId:"2",
  //   conversationId:"1",

  // }

  // const eventGateway = app.get(EventsGateway);
  // setInterval(()=>eventGateway.sendMessage(msg),2000);
}
bootstrap();
