import { Injectable } from '@nestjs/common';

export interface HelloResponse {
  message: string;
  status: string;
  host?: string;
  port?: string;
  username?: string;
  password?: string;
  database?: string;
}

@Injectable()
export class AppService {
  getHello(): HelloResponse {
    return {
      message: 'Hello World Coy!',
      status: 'success',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    };
  }
}

