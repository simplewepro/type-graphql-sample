import { MyContext } from "./../../types/MyContext";
import { Resolver, Ctx, Mutation } from "type-graphql";

@Resolver()
export class LogoutResolver {
  @Mutation(returns => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<boolean> {
    return new Promise((res, rej) =>
      ctx.req.session.destroy(err => {
        if (err) {
          console.log(err);
          return rej(false);
        }

        ctx.res.clearCookie("qid");
        return res(true);
      })
    );
  }
}
