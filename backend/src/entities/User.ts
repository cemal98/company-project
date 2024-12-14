import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from 'mongodb';

@Entity()
export class User {
   @ObjectIdColumn()
  _id: ObjectId;

  @Column({ unique: true })
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;
}
