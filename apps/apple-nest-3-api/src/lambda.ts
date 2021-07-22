import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import serverlessExpress = require('@vendia/serverless-express');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress.configure({
    app: expressApp
  });
}

// let server;
export const handler = async (event, context, callback) => {
  const server = await bootstrap()
  // server = server ?? (await bootstrap());
  console.log('event', event);
  return server({
    ...event,
    requestContext: {}
  }, context, callback);
};
