import React, { useState } from 'react';
import { useHistory } from 'react-router';
import globalStyles from '../globalStyles';
import HTML_ENTITIES from '../utils/htmlEntities';

const PasswordReset = (): JSX.Element => {

    const [email, setEmail] = useState('');

    const history = useHistory();

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setEmail(event.target.value);
    };

    const onBackClick = () => {
        history.push('/signIn', { toSignIn: true })
    }

    const onSendClick = () => {

    }

    return (
        <div className={globalStyles.pageContainer}>

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
        </div>
    );
}

export default PasswordReset;