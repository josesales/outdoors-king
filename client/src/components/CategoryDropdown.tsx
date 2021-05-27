import React, { useState } from 'react';
import globalStyles from '../globalStyles';

const CategoryDropdown = () => {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}
            className={`flex-initial cursor-pointer relative ${globalStyles.textBig}`}>

            <span>Category</span>

            <div className={globalStyles.dropdown.div(isVisible, '-left-5')}>
                <ul className={globalStyles.dropdown.ul}>
                    <li className={globalStyles.dropdown.li}>Water</li>
                    <li className={globalStyles.dropdown.li}>Snow</li>
                    <li className={globalStyles.dropdown.li}>Cycling</li>
                    <li className={globalStyles.dropdown.li}>Hiking</li>
                    <li className={globalStyles.dropdown.li}>Others</li>
                </ul>
            </div>
        </div>
    );
}

export default CategoryDropdown;