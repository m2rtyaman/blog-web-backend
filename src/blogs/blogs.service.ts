import { InjectRepository } from '@nestjs/typeorm';
import { Blogs } from './entities/blogs.entity';
import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { createBlogDto } from './dto/create-blog.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class BlogsService {
    constructor(
        @InjectRepository(Blogs) private readonly blogRepo: Repository<Blogs>,
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ) { }

    async createBlog(dto: createBlogDto, req: any) {
        const newBlog = this.blogRepo.create(dto);
        const user = this.userRepo.findOne({ where: { id: req.user.id } })
        newBlog.sharedBy = (await user).email
        newBlog.userId = (await user).id
        return await this.blogRepo.save(newBlog)
    }

    async updateBlog(dto: createBlogDto, blogId: string, req: any) {
        const blogFind = await this.blogRepo.findOne({ where: { id: blogId } });
        if (!blogFind) {
            throw new NotFoundException('Blog not found');
        }
        if (blogFind.userId !== req.user.id) {
            throw new InternalServerErrorException('You are not authorized to update this blog');
        }
        Object.assign(blogFind, dto);
        return await this.blogRepo.save(blogFind);
    }

    async deleteBlog(blogId: string, req: any) {
        const findBlog = this.blogRepo.findOne({ where: { id: blogId } })
        if (!findBlog) {
            throw new NotFoundException("blog not found ")
        }
        if ((await findBlog).userId !== req.user.id) {
            throw new InternalServerErrorException("You are not authorized to update this blog")
        }
        return await this.blogRepo.softDelete(blogId)
    }
    async getAllBlogs() {
        return await this.blogRepo.find({
            relations:
                ["user"]
        });
    }
    async selfBlogsAll(req: any) {
        return await this.blogRepo.find({ where: { userId: req.user.id }, relations: ["user"] })
    }
    async focusBlog(blogId: string) {
        return await this.blogRepo.find({ where: { id: blogId }, relations: ["user"] })
    }

}
