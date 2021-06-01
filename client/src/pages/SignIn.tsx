import React, { useState } from 'react';
import { useHistory } from 'react-router';
import globalStyles from '../globalStyles';
import User from '../interfaces/user';

const SignIn = (): JSX.Element => {

    const initialUser: User = {
        name: '',
        email: '',
        password: '',
    }

    const [user, setUser] = useState(initialUser);

    const history = useHistory();

    const onUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;

        setUser({ ...user, [name]: value });
    };

    const onLoginClick = () => {

    }

    return (
        <div className={globalStyles.pageContainer}>

            <h2 className={globalStyles.title}>Login</h2>

            <input type="text" name="name" placeholder="Name" required value={user.name} autoComplete="off"
                className={globalStyles.input} onChange={onUserChange} />

            <input type="email" name="email" id="login-email" placeholder="Email" required value={user.email}
                autoComplete="off" className={globalStyles.input} onChange={onUserChange} />

            <input type="password" name="password" id="login-password" placeholder="Password" required
                autoComplete="off" className={globalStyles.input} value={user.password} onChange={onUserChange} />

            <button title="Login with my Account" onClick={onLoginClick} className={globalStyles.button}>Login</button>

            <span className={`flex-initial mt-10 cursor-pointer ${globalStyles.textBig} ${globalStyles.borderBottomHover}`}
                onClick={() => history.push('/signUp')}>
                I still don't have an account.
            </span>

            <span className={`flex-initial mt-10 cursor-pointer ${globalStyles.textBig} ${globalStyles.borderBottomHover}`}
                onClick={() => history.push('/passwordReset')}>
                I forgot my password!
            </span>
        </div>
    );
}

export default SignIn;