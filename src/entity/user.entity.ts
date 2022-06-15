import { Entity, Column, Index } from "typeorm";
import Model from "./model.entity";

@Entity("users")
export class User extends Model {
  @Column()
  name: string;

  @Index("email_index")
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  toJSON() {
    return { ...this, password: undefined };
  }
}
