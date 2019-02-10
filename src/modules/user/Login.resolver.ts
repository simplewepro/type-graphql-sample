import bcrypt from "bcryptjs";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";

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
      throw new Error("Wrong email");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Wrong password");
    }

    if (!user.confirmed) {
      throw new Error("User is not confirmed");
    }

    ctx.req.session!.userId = user.id;

    return user;
  }
}
