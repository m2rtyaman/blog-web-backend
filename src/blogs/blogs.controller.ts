import { Body, Controller, Post, UseGuards, Request, Param, Put, Delete, Get } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { createBlogDto } from './dto/create-blog.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('blogs')
export class BlogsController {
    constructor(private readonly blogService: BlogsService) { }
    @Post()
    @UseGuards(AuthGuard("jwt"))
    createBlog(@Body() dto: createBlogDto, @Request() req: any) {
        return this.blogService.createBlog(dto, req)
    }
    @Put()
    @UseGuards(AuthGuard("jwt"))
    updateBlog(@Body() dto: createBlogDto, @Param("id") blogId: string, @Request() req: any) {
        return this.blogService.updateBlog(dto, blogId, req)
    }
    @Delete(":id")
    @UseGuards(AuthGuard("jwt"))
    async deleteBlog(@Param('id') blogId: string, @Request() req: any) {
        return await this.blogService.deleteBlog(blogId,req)
    }
    @UseGuards(AuthGuard("jwt"))
    @Get('/AllBlogs')
    async getAllBlogs() {
        return await this.blogService.getAllBlogs()
    }
    @UseGuards(AuthGuard("jwt"))
    @Get('selfBlogs')
    async selfBlogsAll(@Request() req: any) {
        return await this.blogService.selfBlogsAll(req)
    }
    @UseGuards(AuthGuard("jwt"))
    @Get(':id')
    async focusBlog(@Param('id') blogId: string) {
        return await this.blogService.focusBlog(blogId)
    }

}
