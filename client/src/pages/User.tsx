import React, { useState } from 'react';
import { useLocation } from 'react-router';
import ToggleSwitch from '../components/ToggleSwitch';
import globalStyles from '../globalStyles';
import UserInterface from '../interfaces/user';
import UserLocation from '../interfaces/userLocation';

const User = (): JSX.Element => {

    const initialUser: UserInterface = {
        name: '',
        email: '',
        password: '',
        profile: {
            id: 0,
            name: 'client'
        }
    }

    const location = useLocation<UserLocation>();
    const userState = location && location.state && location.state.user;

    const [user, setUser] = useState(userState ? userState : initialUser);
    const [confirmPassword, setConfirmPassword] = useState('');


    const onUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;

        setUser({ ...user, [name]: value });
    };

    const onConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const onConfirmClick = () => {

    }

    return (
        <div className={globalStyles.pageContainer}>

            <h2 className={globalStyles.title}>{userState ? 'Edit User' : 'Add User'}</h2>

            <input type="text" name="name" placeholder="Name" required value={user.name} autoComplete="off"
                className={globalStyles.input} onChange={onUserChange} />

            <input type="email" name="email" id="login-email" placeholder="Email" required value={user.email}
                autoComplete="off" className={globalStyles.input} onChange={onUserChange} />

            <input type="password" name="password" id="login-password" placeholder="Password" required
                autoComplete="off" className={globalStyles.input} value={user.password} onChange={onUserChange} />

            <input type="password" placeholder="Confirm your Password" required autoComplete="off"
                className={globalStyles.input} value={confirmPassword} onChange={onConfirmPasswordChange} />

            <ToggleSwitch name="Is Admin?" title="Is the new user an admin? For clients leave this option as No." />

            <button title="Confirm Operation" onClick={onConfirmClick} className={globalStyles.button}>
                {userState ? 'Edit' : 'Add'}
            </button>

        </div>
    );
}

export default User;