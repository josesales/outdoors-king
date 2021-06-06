import User from "./user";

interface Profile {
    id?: number,
    name: string,
    users?: Array<User>,
}

export default Profile;