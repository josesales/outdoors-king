import React, { useState } from 'react';
import { useHistory } from 'react-router';
import globalStyles from '../globalStyles';

const AdminDropdown = () => {

    const [isVisible, setIsVisible] = useState(false);

    const history = useHistory();

    return (
        <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}
            className={`flex-initial cursor-pointer relative ${globalStyles.textBig}`}>

            <span className={globalStyles.borderBottomHover}>Admin</span>

            <div className={globalStyles.headerDropdown.div(isVisible, '-left-16')}>
                <ul className={globalStyles.headerDropdown.ul}>
                    <li onClick={() => history.push('/user')} className={globalStyles.headerDropdown.li}>Add User</li>
                    <li onClick={() => history.push('/product')} className={globalStyles.headerDropdown.li}>Add Product</li>
                </ul>
            </div>
        </div>
    );
}

export default AdminDropdown;