import Profile from "./profile";

interface User {
    id?: number,
    name: string,
    email: string,
    password: string,
    profile?: Profile,
}

export default User;