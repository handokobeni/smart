import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      // ssl: true,
      extra: {
        max: 20,
        connectionTimeoutMillis: 3000,
        idleTimeoutMillis: 30000,
        poolSize: 20
      }
    }),
    AuthModule,
    CacheModule.register({
      ttl: 60,
      max: 100
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
