import bcrypt from "bcryptjs";
import { ChangePasswordInput } from "./changePassword/ChangePasswordInput";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { forgotPasswordPrefix } from "../constants/redixPrefixes";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(returns => User, { nullable: true })
  async changePassword(
    @Arg("data")
    { token, password }: ChangePasswordInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);

    if (!userId) {
      return null;
    }

    await redis.del(forgotPasswordPrefix + token);

    const user = await User.findOne(userId);

    user.password = await bcrypt.hash(password, 12);

    await user.save();

    ctx.req.session.userId = user.id;

    return user;
  }
}
