import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export abstract class MyBaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @CreateDateColumn()
    createdDate: Date
    @UpdateDateColumn()
    updatedDate: Date
    @DeleteDateColumn()
    deletedDate:Date
}