import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiProperty } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @UseGuards(AuthGuard("jwt"))
  @ApiProperty()
  @Get()
  async getHello() {
    return await this.appService.getHello();
  }

}
