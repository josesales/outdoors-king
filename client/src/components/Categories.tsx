import React from 'react';
import CategoryProducts from './CategoryProducts';
import { useAppSelector } from '../redux/hooks';

const Categories = () => {


    let categoriesUi = null;

    const categories = useAppSelector(state => state.category.categories);

    if (categories) {
        categoriesUi = categories.map(category => <CategoryProducts
            key={category.id} category={category} minified={true} />)
    }

    return (
        <div className='w-full flex flex-col'>
            {categoriesUi}
        </div>
    );
}

export default Categories;