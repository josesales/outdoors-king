import React from 'react';
import logo from '../assets/logo.png';
import { Link, useHistory } from 'react-router-dom';
import globalStyles from '../globalStyles';
import CategoryDropdown from './CategoryDropdown';
import AdminDropdown from './AdminDropdown';
import CartIcon from './CartIcon';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout } from '../redux/user/userAsyncActions';

const Header = (): JSX.Element => {

    const history = useHistory();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.currentUser);

    if (user?.token) {
        history.push('/');
    }

    const onLoginClick = async () => {

        if (user?.token) {
            await dispatch(logout(user.id!));
            return;
        }

        history.push('/signIn');
    }

    return (
        <React.Fragment>

            <div className="flex justify-around items-center fixed top-0 left-0 z-30 h-24 sm:h-40 bg-indigo-100
                border-b-2 border-gray-500 w-full">

                <Link className='flex flex-none' to='/'>
                    <img title="Home Page" src={logo} alt="Outdoor King Logo" className="w-24 sm:w-32" />
                </Link>

                <div className={`flex-initial ${globalStyles.textBig} cursor-pointer`}>
                    <span className={globalStyles.borderBottomHover} onClick={onLoginClick}>
                        {user?.token ? 'Logout' : 'Login'}
                    </span>
                </div>

                <CategoryDropdown />

                {
                    user?.profile?.name?.toLowerCase() === 'admin' ? <AdminDropdown /> : ''
                }

                <CartIcon />
            </div>

            <div className="mt-40 sm:mt-60"></div>
        </React.Fragment>

    );
}

export default Header;