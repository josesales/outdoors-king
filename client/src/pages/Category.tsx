import React from 'react';
import { useHistory, useLocation } from 'react-router';
import CategoryItems from '../components/CategoryItems';
import globalStyles from '../globalStyles';
import CategoryLocation from '../interfaces/categoryLocation';

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
                        <CategoryItems key={category.id} category={category} />;
                    </div>

                    : null
            }
        </React.Fragment>
    );
}

export default Category;