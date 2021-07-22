import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import serverlessExpress = require('@vendia/serverless-express');

let server;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress.configure({ app: expressApp });
}

export const handler = async (event, context, callback) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
