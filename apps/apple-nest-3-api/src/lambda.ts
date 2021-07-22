import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import serverlessExpress = require('@vendia/serverless-express');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress.configure({
    eventSource: {
      getRequest: ({ event }) => {
        return {
          method: event.httpMethod,
          path: event.path,
          headers: event.headers
        };
      }
    },
    app: expressApp
  });
}

// let server;
export const handler = async (event, context, callback) => {
  const server = await bootstrap()
  // server = server ?? (await bootstrap());
  return server(event, context, callback);
};
