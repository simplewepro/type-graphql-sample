import * as bcrypt from "bcryptjs";
import { ObjectType, Field, ID } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";

@ObjectType()
@Entity()
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Field()
  @Column("varchar", { length: 255 })
  email: string;

  @Field()
  @Column("text")
  password: string;

  @Field()
  @Column("bool")
  confirmed: boolean;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
