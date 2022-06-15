import { Entity, Column, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index("username_index")
  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  toJSON() {
    return { ...this, password: undefined };
  }
}
