import { Entity, Column, Index, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bycryptjs";

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

  public HashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  public checkUnencryptedPassword(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
