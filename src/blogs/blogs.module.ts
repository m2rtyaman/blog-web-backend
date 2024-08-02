import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { Blogs } from './entities/blogs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blogs, User])],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule { }
