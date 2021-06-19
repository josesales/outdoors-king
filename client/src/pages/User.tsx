import React, { useState } from 'react';
import { useLocation } from 'react-router';
import ToggleSwitch from '../components/ToggleSwitch';
import globalStyles from '../globalStyles';
import UserInterface from '../interfaces/models/user';
import UserLocation from '../interfaces/location/userLocation';
import Loader from '../components/Loader';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { displayMessage } from '../redux/message/messageReducer';
import { save } from '../redux/user/userAsyncActions';
import DisplayMessage from '../components/DisplayMessage';
import { useHistory } from 'react-router-dom';

const User = (): JSX.Element => {

    const initialUser: UserInterface = {
        name: '',
        email: '',
        password: '',
        profile: {
            name: 'client'
        }
    }

    const history = useHistory();
    const location = useLocation<UserLocation>();
    const userState = location && location.state && location.state.user;

    const [user, setUser] = useState(userState ? userState : initialUser);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();
    const { type, message } = useAppSelector(state => state.message);

    const currentUser = useAppSelector(state => state.user.currentUser);
    if (currentUser?.profile?.name?.toLowerCase() !== 'admin') {
        history.push('/');
    }

    const onUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;

        setUser({ ...user, [name]: value });
    };

    const onConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const onToggleSwitchChange = (isActive: boolean) => {

        if (isActive) {
            setUser({ ...user, profile: { name: 'admin' } });
            return;
        }

        setUser({ ...user, profile: { name: 'client' } });
    }

    const onConfirmClick = async () => {

        if (user.password !== confirmPassword) {
            dispatch(displayMessage({ type: 'error', message: "Passwords don't match" }));
            return;
        }

        await setLoading(true);

        if (currentUser?.token) {
            await dispatch(save(user, currentUser.token!));
        } else {
            await dispatch(save(user));
        }
        await setLoading(false);

        //if there is no error message from the save
        if (type === 'success') {
            setUser(initialUser);
            setConfirmPassword('');
        }
    }

    return (
        <form>

            <div className={globalStyles.pageContainer}>
                {loading ? <Loader /> :

                    <React.Fragment>

                        {
                            type && message ? <DisplayMessage type={type} message={message} /> : null
                        }

                        <h2 className={globalStyles.title}>{userState ? 'Edit User' : 'Add User'}</h2>

                        <input type="text" name="name" placeholder="Name" required value={user.name} autoComplete="off"
                            className={globalStyles.input} onChange={onUserChange} />

                        <input type="email" name="email" id="login-email" placeholder="Email" required value={user.email}
                            autoComplete="off" className={globalStyles.input} onChange={onUserChange} />

                        <input type="password" name="password" id="login-password" placeholder="Password" required
                            autoComplete="off" className={globalStyles.input} value={user.password} onChange={onUserChange} />

                        <input type="password" placeholder="Confirm your Password" required autoComplete="off"
                            className={globalStyles.input} value={confirmPassword} onChange={onConfirmPasswordChange} />

                        <ToggleSwitch name="Is Admin?" title="Is the new user an admin? For clients leave this option as No."
                            callback={onToggleSwitchChange} />

                        <button title="Confirm Operation" onClick={onConfirmClick} className={globalStyles.button}>
                            {userState ? 'Edit' : 'Add'}
                        </button>
                    </React.Fragment>
                }
            </div>
        </form>
    );
}

export default User;