import bcrypt from "bcryptjs";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "./../../entity/User";
import { MyContext } from "./../../types/MyContext";

@Resolver()
export class LoginResolver {
  @Mutation(returns => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    console.log("user :", user);
    console.log("password :", password);

    const valid = await bcrypt.compare(password, user.password);

    console.log("valid :", valid);

    if (!valid) {
      return null;
    }

    ctx.req.session!.userId = user.id;

    return user;
  }
}
