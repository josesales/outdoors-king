import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Loader from '../components/Loader';
import globalStyles from '../globalStyles';
import User from '../interfaces/models/user';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { displayMessage } from '../redux/message/messageReducer';
import DisplayMessage from '../components/DisplayMessage';
import { signUp } from '../redux/user/userAsyncActions';
import HTML_ENTITIES from '../utils/htmlEntities';

const SignUp = (): JSX.Element => {

    const initialUser: User = {
        name: '',
        email: '',
        password: '',
    }

    const [user, setUser] = useState(initialUser);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    const dispatch = useAppDispatch();
    const { type, message } = useAppSelector(state => state.message);

    const onUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;

        setUser({ ...user, [name]: value });
    };

    const onConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const onBackClick = () => {
        history.push('/signIn', { toSignIn: true })
    }

    const onSignUpClick = async () => {

        if (user.password !== confirmPassword) {
            dispatch(displayMessage({ type: 'error', message: "Passwords don't match" }));
            return;
        }

        await setLoading(true);
        await dispatch(signUp(user));
        setLoading(false);
    }

    return (
        <form>

            <div className={globalStyles.pageContainer}>
                {loading ? <Loader /> :

                    <React.Fragment>

                        {
                            type && message ? <DisplayMessage type={type} message={message} /> : null
                        }

                        <h2 className={globalStyles.title}>Sign Up</h2>

                        <input type="text" name="name" placeholder="Name" required value={user.name} autoComplete="off"
                            className={globalStyles.input} onChange={onUserChange} />

                        <input type="email" name="email" placeholder="Email" required value={user.email}
                            autoComplete="off" className={globalStyles.input} onChange={onUserChange} />

                        <input type="password" name="password" placeholder="Password" required autoComplete="off"
                            className={globalStyles.input} value={user.password} onChange={onUserChange} />

                        <input type="password" placeholder="Confirm your Password" required autoComplete="off"
                            className={globalStyles.input} value={confirmPassword} onChange={onConfirmPasswordChange} />

                        <div className="flex justify-center items-center">

                            <button title="Back to Login" onClick={onBackClick} className={`${globalStyles.button} mr-4 md:mr-10 `}>
                                {HTML_ENTITIES.backArrow}
                            </button>

                            <button title="Create a new Account" onClick={onSignUpClick} className={globalStyles.button}>
                                Sign Up
                            </button>
                        </div>
                    </React.Fragment>
                }
            </div>
        </form>
    );
}

export default SignUp;