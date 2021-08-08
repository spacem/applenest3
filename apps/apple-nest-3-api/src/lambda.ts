import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import serverless = require('serverless-http');
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = '.netlify/functions/main';
  Logger.log('Bootstrapping server at ' + globalPrefix);
  app.setGlobalPrefix(globalPrefix);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverless(expressApp)
}

let server;
export const handler = async (event, context, callback) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
