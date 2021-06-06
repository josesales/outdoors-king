import { Field, InputType, Int } from "type-graphql";
import ProfileInput from "../profile/profileInput";

@InputType()
class UserInput {
    @Field(() => Int, { nullable: true })
    id?: number;

    @Field(() => String)
    name!: string;

    @Field(() => String, { nullable: true })
    email!: string;

    @Field(() => String, { nullable: true })
    password?: string;

    @Field(type => ProfileInput, { nullable: true })
    profile?: ProfileInput;
}

export default UserInput;