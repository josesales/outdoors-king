import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import globalStyles from '../globalStyles';
import { getCategories } from '../redux/category/categoryAsyncActions';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const CategoryDropdown = () => {

    const [isVisible, setIsVisible] = useState(false);

    const history = useHistory();
    const dispatch = useAppDispatch();

    const categories = useAppSelector(state => state.category.categories);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    const categoriesUi = categories!.map(category =>
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