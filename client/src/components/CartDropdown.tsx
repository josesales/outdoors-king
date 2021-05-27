import React from 'react';
import cart from '../assets/cart.svg';
import { Link } from 'react-router-dom';

const CartDropdown = () => {

    return (
        <Link className='flex flex-none' to='/'>
            <img title="Cart" src={cart} alt="Your Cart" className="w-10 h-6 sm:w-20 sm:h-16" />
        </Link>
    );
}

export default CartDropdown;