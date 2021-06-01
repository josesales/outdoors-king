import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import globalStyles from '../globalStyles';
import CategoryDropdown from './CategoryDropdown';
import AdminDropdown from './AdminDropdown';
import CartIcon from './CartIcon';

const Header = (): JSX.Element => {

    return (
        <React.Fragment>

            <div className="flex justify-around items-center fixed top-0 left-0 z-30 h-48 bg-indigo-100
                border-b-2 border-gray-500 w-full">

                <Link className='flex flex-none' to='/'>
                    <img title="Home Page" src={logo} alt="Outdoor King Logo" className="w-24 sm:w-48" />
                </Link>

                <Link to='/signIn' className={`flex-initial ${globalStyles.textBig}`}>
                    <span className={globalStyles.borderBottomHover}>Login</span>
                </Link>

                <CategoryDropdown />

                <AdminDropdown />

                <CartIcon />
            </div>

            <div className="mt-60"></div>
        </React.Fragment>

    );
}

export default Header;