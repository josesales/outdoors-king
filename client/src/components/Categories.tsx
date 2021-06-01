import React from 'react';
import CategoryItems from './CategoryItems';
import Category from '../interfaces/category';
import { categoriesList } from '../testData/category';

const Categories = () => {


    let categoriesUi = null;

    const categories = categoriesList;

    if (categories) {
        categoriesUi = categories.map(category => <CategoryItems
            key={category.id} category={category} minified={true} />)
    }

    return (
        <div className='w-full flex flex-col'>
            {categoriesUi}
        </div>
    );
}

export default Categories;