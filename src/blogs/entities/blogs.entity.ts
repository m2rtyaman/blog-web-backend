import { User } from "src/auth/entities/user.entity";
import { MyBaseEntity } from "src/my-base-entity/my-base-entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Blogs extends MyBaseEntity {
    @Column()
    title: string
    @Column()
    content: string
    @Column()
    sharedBy: string
    @Column()
    userId: string
    @ManyToOne(() => User, user => user.blogs)
    user: User
}