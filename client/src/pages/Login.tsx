import React from 'react';
import SignIn from '../components/SignIn';
import globalStyles from '../globalStyles';

const Login = (): JSX.Element => {

    return (
        <div className="w-full flex flex-col items-center">

            <SignIn />

            <span className={`flex-initial mt-10 cursor-pointer ${globalStyles.textBig} ${globalStyles.borderBottomHover}`}>
                I still don't have an account.
            </span>

            <span className={`flex-initial mt-10 cursor-pointer ${globalStyles.textBig} ${globalStyles.borderBottomHover}`}>
                I forgot my password!
            </span>
        </div>
    );
}

export default Login;