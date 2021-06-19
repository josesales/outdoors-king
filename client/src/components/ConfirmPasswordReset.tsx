import React, { useState } from 'react';
import { useHistory } from 'react-router';
import globalStyles from '../globalStyles';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import HTML_ENTITIES from '../utils/htmlEntities';
import Loader from '../components/Loader';
import DisplayMessage from '../components/DisplayMessage';
import { resetPassword } from '../redux/user/userAsyncActions';
import { displayMessage } from '../redux/message/messageReducer';

const ConfirmPasswordReset = ({ id, name, email }: { id: string, name: string, email: string }): JSX.Element => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    const dispatch = useAppDispatch();

    const { type, message } = useAppSelector(state => state.message);

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setPassword(event.target.value);
    };

    const onConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setConfirmPassword(event.target.value);
    };

    const onBackClick = () => {
        history.push('/passwordReset', { confirmPasswordResetCode: false })
    }

    const onConfirmClick = async () => {

        if (password !== confirmPassword) {
            dispatch(displayMessage({ type: 'error', message: `Passwords don't match` }));
            return;
        }

        await setLoading(true);
        await dispatch(resetPassword(password, { id, name, email }));
        setLoading(false);
    }

    return (
        <div className={globalStyles.pageContainer}>

            {loading ? <Loader /> :
                <React.Fragment>

                    {
                        type && message ? <DisplayMessage type={type} message={message} /> : null
                    }


                    <h2 className={globalStyles.title}>Reset Password</h2>

                    <input type="password" name="password" placeholder="New Password" required autoComplete="off"
                        className={globalStyles.input} value={password} onChange={onPasswordChange} />

                    <input type="password" placeholder="Confirm your Password" required autoComplete="off"
                        className={globalStyles.input} value={confirmPassword} onChange={onConfirmPasswordChange} />

                    <div className="flex justify-center items-center">

                        <button title="Back to I Forgot my Password" onClick={onBackClick}
                            className={`${globalStyles.button} mr-4 md:mr-10 `}>
                            {HTML_ENTITIES.backArrow}
                        </button>

                        <button title="Reset" onClick={onConfirmClick} className={globalStyles.button}>
                            Reset
                        </button>

                    </div>

                </React.Fragment>
            }
        </div>
    );
}

export default ConfirmPasswordReset;