import React, { useState } from 'react';
import { useHistory } from 'react-router';
import globalStyles from '../globalStyles';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { sendPasswordEmail } from '../redux/user/userAsyncActions';
import HTML_ENTITIES from '../utils/htmlEntities';
import Loader from '../components/Loader';
import DisplayMessage from '../components/DisplayMessage';
import ConfirmPasswordResetCode from '../components/ConfirmPasswordResetCode';
import { useLocation } from 'react-router-dom';
import { confirmPassword } from '../redux/user/userReducer';

const PasswordReset = (): JSX.Element => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);

    const history = useHistory();
    const location = useLocation<{ confirmPasswordResetCode: boolean }>();
    const dispatch = useAppDispatch();
    dispatch(confirmPassword(null));

    const { type, message } = useAppSelector(state => state.message);

    if (isEmailSent && !location.state?.confirmPasswordResetCode) {
        return <ConfirmPasswordResetCode email={email} />
    }

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setEmail(event.target.value);
    };

    const onBackClick = () => {
        history.push('/signIn', { toSignIn: true })
    }

    const onSendClick = async () => {
        await setLoading(true);
        await dispatch(sendPasswordEmail(email));

        if (location.state?.confirmPasswordResetCode) {
            location.state.confirmPasswordResetCode = false;
        }

        setIsEmailSent(true);
        setLoading(false);
    }

    return (
        <div className={globalStyles.pageContainer}>

            {loading ? <Loader /> :
                <React.Fragment>

                    {
                        type && message ? <DisplayMessage type={type} message={message} /> : null
                    }

                    <h2 className={globalStyles.title}>Password Reset</h2>

                    <input type="email" name="email" id="login-email" placeholder="Email" required value={email}
                        className={globalStyles.input} onChange={onEmailChange} autoComplete="off" />

                    <div className="flex justify-center items-center">

                        <button title="Back to Login" onClick={onBackClick} className={`${globalStyles.button} mr-4 md:mr-10 `}>
                            {HTML_ENTITIES.backArrow}
                        </button>

                        <button title="Send new Password to my Email" onClick={onSendClick} className={globalStyles.button}>
                            Send
                        </button>
                    </div>
                </React.Fragment>
            }
        </div>
    );
}

export default PasswordReset;