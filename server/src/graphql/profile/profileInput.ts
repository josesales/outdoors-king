import { Field, InputType, Int } from "type-graphql";

@InputType()
class ProfileInput {
    @Field(() => Int, { nullable: true })
    id?: number;

    @Field(() => String, { nullable: true })
    name?: string;
}

export default ProfileInput;