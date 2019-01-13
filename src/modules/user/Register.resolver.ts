import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
// import { isAuth, logger } from "../middleware";

@Resolver()
export class RegisterResolver {
  // @UseMiddleware(isAuth, logger)
  @Query(returns => String)
  hello() {
    return "Hello world!";
  }

  @Mutation(returns => User)
  register(@Arg("data")
  {
    firstName,
    lastName,
    email,
    password
  }: RegisterInput): Promise<User> {
    const user = User.create({
      firstName,
      lastName,
      email,
      password
    }).save();

    return user;
  }
}
