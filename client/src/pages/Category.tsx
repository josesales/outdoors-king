import React from 'react';
import { useHistory, useLocation } from 'react-router';
import CategoryProducts from '../components/CategoryProducts';
import CategoryLocation from '../interfaces/location/categoryLocation';

const Category = () => {

    const history = useHistory();
    const location = useLocation<CategoryLocation>();
    const category = location && location.state && location.state.category;

    if (!category || !category.id) {
        history.push('/');
    }

    return (
        <React.Fragment>
            {
                category ?

                    <div className='w-full flex flex-col'>
                        <CategoryProducts key={category.id} category={category} />;
                    </div>

                    : null
            }
        </React.Fragment>
    );
}

export default Category;