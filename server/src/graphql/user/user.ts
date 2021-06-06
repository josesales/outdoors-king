import { Field, ID, Int, ObjectType } from "type-graphql";
import Profile from "../profile/profile";

@ObjectType()
class User {
    @Field(() => Int)
    id?: number;

    @Field(() => String)
    name?: string;

    @Field(() => String, { nullable: true })
    email?: string;

    @Field(() => String, { nullable: true })
    password?: string;

    @Field(type => Profile, { nullable: true })
    profile?: Profile;
}

export default User;