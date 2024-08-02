import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from "dotenv"
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blogs/blogs.module';

dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      logging: true,
      entities: ['dist/**/*.entity.{js,ts}'],
    }),
    AuthModule,
    BlogsModule
    ,],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule { }
