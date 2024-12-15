import { ObjectId } from "mongodb";
import { Entity, ObjectIdColumn, Column, UpdateDateColumn, DeleteDateColumn, CreateDateColumn } from "typeorm";

@Entity("products")
export class Product {
  @ObjectIdColumn()
  _id: ObjectId;
  
  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column("float")
  amount: number;

  @Column()
  amountUnit: string;

  @Column()
  companyId: ObjectId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;
}
