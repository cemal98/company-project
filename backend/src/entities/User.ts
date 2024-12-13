import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from 'mongodb';

@Entity()
export class User {
   @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
