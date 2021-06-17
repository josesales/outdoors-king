import Profile from "./profile";

interface User {
    id?: string,
    name?: string,
    email: string,
    password: string,
    profile?: Profile,
    token?: string,
}

export default User;