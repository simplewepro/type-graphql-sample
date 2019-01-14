import bcrypt from "bcryptjs";
import { ObjectType, Field, ID, Root } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";
import { Min } from "class-validator";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column("varchar", { unique: true })
  email: string;

  @Column("text")
  @Min(5)
  password: string;

  @Column("bool", { default: false })
  confirmed: boolean;

  @Field()
  name(@Root() parent: User): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
