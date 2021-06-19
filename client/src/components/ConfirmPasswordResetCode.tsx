import React, { useState } from 'react';
import { useHistory } from 'react-router';
import globalStyles from '../globalStyles';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { confirmPasswordResetCode } from '../redux/user/userAsyncActions';
import HTML_ENTITIES from '../utils/htmlEntities';
import Loader from '../components/Loader';
import DisplayMessage from '../components/DisplayMessage';
import ConfirmPasswordReset from './ConfirmPasswordReset';

const ConfirmPasswordResetCode = ({ email }: { email: string }): JSX.Element => {

    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    const dispatch = useAppDispatch();

    const confirmPassword = useAppSelector(state => state.user.confirmPassword);
    const { type, message } = useAppSelector(state => state.message);

    const onCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setCode(event.target.value);
    };

    const onBackClick = () => {
        history.push('/passwordReset', { confirmPasswordResetCode: true })
    }

    const onConfirmClick = async () => {
        await setLoading(true);
        await dispatch(confirmPasswordResetCode(email, +code));
        setLoading(false);
    }

    return (
        <div className={globalStyles.pageContainer}>

            {loading ? <Loader /> :
                <React.Fragment>

                    {
                        type && message ? <DisplayMessage type={type} message={message} /> : null
                    }

                    {
                        !confirmPassword?.id ?
                            <React.Fragment>

                                <h2 className={globalStyles.title}>Code</h2>

                                <input type="number" name="code" placeholder="Type the Code you got by Email"
                                    title="If you didn't get the email please check your spam"
                                    required value={code} className={globalStyles.input} onChange={onCodeChange} autoComplete="off" />

                                <div className="flex justify-center items-center">

                                    <button title="Back to Login" onClick={onBackClick} className={`${globalStyles.button} mr-4 md:mr-10 `}>
                                        {HTML_ENTITIES.backArrow}
                                    </button>

                                    <button title="Send new Password to my Email" onClick={onConfirmClick} className={globalStyles.button}>
                                        Confirm
                                    </button>

                                </div>
                            </React.Fragment>
                            :
                            <ConfirmPasswordReset email={email} name={confirmPassword!.name!} id={confirmPassword!.id!} />
                    }
                </React.Fragment>
            }
        </div>
    );
}

export default ConfirmPasswordResetCode;