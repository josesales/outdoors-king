import React from 'react';
import logo from '../assets/logo.png';
import cart from '../assets/cart.svg';
import { Link } from 'react-router-dom';
import globalStyles from '../globalStyles';


const Header = (): JSX.Element => {

    return (
        <React.Fragment>

            <div className="flex justify-around items-center fixed top-0 left-0 z-40 h-48 w-full 
                border-b-2 border-gray-500">

                <Link className='flex flex-none' to='/'>
                    <img title="Home Page" src={logo} alt="Outdoor King Logo" className="w-24 sm:w-48" />
                </Link>

                <Link to='/login' className={`flex-initial ${globalStyles.textBig} ${globalStyles.borderBottomHover}`}>
                    Login
                </Link>

                <div className={`flex-initial cursor-pointer ${globalStyles.textBig} ${globalStyles.borderBottomHover}`}>
                    Category
                </div>


                <div className={`flex-initial cursor-pointer ${globalStyles.textBig} ${globalStyles.borderBottomHover}`}>
                    Admin
                </div>

                <Link className='flex flex-none' to='/'>
                    <img title="Cart" src={cart} alt="Your Cart" className="w-10 h-6 sm:w-20 sm:h-16" />
                </Link>

            </div>

            <div className="mt-60"></div>

        </React.Fragment>
    );
}

export default Header;