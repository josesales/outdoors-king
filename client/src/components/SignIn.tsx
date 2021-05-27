import React, { useState } from 'react';
import globalStyles from '../globalStyles';

interface User {
    name: string,
    email: string,
    password: string,
}

const SignIn = (): JSX.Element => {

    const initialUser: User = {
        name: '',
        email: '',
        password: '',
    }
    const [user, setUser] = useState(initialUser);

    const onUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;

        setUser({ ...user, [name]: value });
    };

    const onLoginClick = () => {

    }

    return (
        <div className='w-full flex flex-col items-center'>

            <h2 className={globalStyles.title}>Login</h2>

            <input type="text" name="name" placeholder="Name" required value={user.name}
                className={globalStyles.input} onChange={onUserChange} />

            <input type="email" name="email" id="login-email" placeholder="Email" required value={user.email}
                className={globalStyles.input} onChange={onUserChange} />

            <input type="password" name="password" id="login-password" placeholder="Password" required
                className={globalStyles.input} value={user.password} onChange={onUserChange} />

            <button onClick={onLoginClick} className={globalStyles.button}>Login</button>
        </div>
    );
}

export default SignIn;