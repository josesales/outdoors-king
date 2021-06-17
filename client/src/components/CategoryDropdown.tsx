import React, { useState } from 'react';
import { useHistory } from 'react-router';
import globalStyles from '../globalStyles';
import Category from '../interfaces/models/category';
import { categoriesList } from '../testData/category';

const CategoryDropdown = () => {

    const [isVisible, setIsVisible] = useState(false);

    const history = useHistory();

    const categories: Array<Category> = categoriesList;

    const categoriesUi = categories.map(category =>
        <li onClick={() => history.push('/category', { category })}
            key={category.id} className={globalStyles.headerDropdown.li}>{category.name}</li>);

    return (
        <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}
            className={`flex-initial cursor-pointer relative capitalize z-40 ${globalStyles.textBig}`}>

            <span className={globalStyles.borderBottomHover}>Category</span>

            <div className={globalStyles.headerDropdown.div(isVisible, '-left-5')}>
                <ul className={globalStyles.headerDropdown.ul}>
                    {
                        categoriesUi ? categoriesUi : null
                    }
                </ul>
            </div>
        </div>
    );
}

export default CategoryDropdown;