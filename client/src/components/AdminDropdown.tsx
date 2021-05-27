import React, { useState } from 'react';
import globalStyles from '../globalStyles';

const AdminDropdown = () => {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}
            className={`flex-initial cursor-pointer relative ${globalStyles.textBig}`}>

            <span>Admin</span>

            <div className={globalStyles.dropdown.div(isVisible, '-left-16')}>
                <ul className={globalStyles.dropdown.ul}>
                    <li className={globalStyles.dropdown.li}>Add User</li>
                    <li className={globalStyles.dropdown.li}>Add Product</li>
                </ul>
            </div>
        </div>
    );
}

export default AdminDropdown;