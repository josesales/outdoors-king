import React, { useState } from 'react';
import { useHistory } from 'react-router';
import globalStyles from '../globalStyles';
import User from '../interfaces/models/user';
import Loader from '../components/Loader';
import DisplayMessage from '../components/DisplayMessage';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { login } from '../redux/user/userAsyncActions';

const SignIn = (): JSX.Element => {

    const initialCredentials: User = {
        email: '',
        password: '',
    }

    const [credentials, setCredentials] = useState(initialCredentials);
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    const dispatch = useAppDispatch();

    const { type, message } = useAppSelector(state => state.message);

    const onUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;

        setCredentials({ ...credentials, [name]: value });
    };

    const onLoginClick = async () => {
        await setLoading(true);
        await dispatch(login(credentials));
        setLoading(false);
    }

    return (
        <div className={globalStyles.pageContainer}>
            {

                loading ? <Loader /> :
                    <React.Fragment>


                        {
                            type && message ? <DisplayMessage type={type} message={message} /> : null
                        }

                        <h2 className={globalStyles.title}>Login</h2>

                        <input type="email" name="email" id="login-email" placeholder="Email" required value={credentials.email}
                            autoComplete="off" className={globalStyles.input} onChange={onUserChange} />

                        <input type="password" name="password" id="login-password" placeholder="Password" required
                            autoComplete="off" className={globalStyles.input} value={credentials.password} onChange={onUserChange} />

                        <button title="Login with my Account" onClick={onLoginClick} className={globalStyles.button}>Login</button>

                        <span className={`flex-initial mt-10 cursor-pointer ${globalStyles.textBig} ${globalStyles.borderBottomHover}`}
                            onClick={() => history.push('/signUp')}>
                            I still don't have an account.
                        </span>

                        <span className={`flex-initial mt-10 cursor-pointer ${globalStyles.textBig} ${globalStyles.borderBottomHover}`}
                            onClick={() => history.push('/passwordReset')}>
                            I forgot my password!
                        </span>
                    </React.Fragment>
            }
        </div>
    );
}

export default SignIn;