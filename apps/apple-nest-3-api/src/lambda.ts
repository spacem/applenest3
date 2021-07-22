import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import serverless = require('serverless-http');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverless(expressApp)
}

let server;
export const handler = async (event, context, callback) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
