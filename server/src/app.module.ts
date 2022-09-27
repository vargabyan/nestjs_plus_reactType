import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { ListUsersModule } from './users/listUsers.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../..', 'client', 'build'),
    }),
    ConfigModule.forRoot({ envFilePath: '.env' }),
    DatabaseModule,
    ListUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
