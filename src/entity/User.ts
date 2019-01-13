import bcrypt from "bcryptjs";
import { ObjectType, Field, ID, Root } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert
} from "typeorm";

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
  password: string;

  @Column("bool", { default: false })
  confirmed: boolean;

  @Field()
  name(@Root() paerent: User): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
