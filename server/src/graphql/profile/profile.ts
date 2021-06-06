import { Field, ID, Int, ObjectType } from "type-graphql";

@ObjectType()
class Profile {
    @Field(() => Int)
    id?: number;

    @Field(() => String)
    name!: string;

}

export default Profile;