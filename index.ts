import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { onRequest } from 'firebase-functions/v2/https';
import { AppModule } from './src/app.module';

const expressServer = express();
let app: any;

const createFunction = async (expressInstance): Promise<void> => {
  if (!app) {
    app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressInstance),
    );
    await app.init();
  }
};

export const api = onRequest(
  { 
    memory: '256MiB',
    region: 'asia-southeast2',
    minInstances: 1
  }, 
  async (request, response) => {
    await createFunction(expressServer);
    expressServer(request, response);
  }
);