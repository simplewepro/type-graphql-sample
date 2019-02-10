import { Ctx, Query, Resolver, UseMiddleware, Authorized } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";
import { isAuth } from "./../middleware/isAuth";
import { logger } from "../middleware/logger";

@Resolver()
export class MeResolver {
  @Query(returns => User, { nullable: true })
  // @UseMiddleware(isAuth, logger)
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    if (!ctx.req.session.userId) {
      return undefined;
    }

    return User.findOne(ctx.req.session.userId);
  }
}
