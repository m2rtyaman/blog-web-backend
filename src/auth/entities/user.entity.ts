import { Blogs } from "src/blogs/entities/blogs.entity";
import { MyBaseEntity } from "src/my-base-entity/my-base-entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class User extends MyBaseEntity {
    @Column()
    email: string
    @Column()
    password: string
    @OneToMany(() => Blogs, blogs => blogs.user)
    blogs: Blogs[];
}