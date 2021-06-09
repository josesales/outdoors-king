import React from 'react';
import CategoryProducts from './CategoryProducts';
import Category from '../interfaces/category';
import { categoriesList } from '../testData/category';

const Categories = () => {


    let categoriesUi = null;

    const categories = categoriesList;

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