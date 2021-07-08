import React from 'react';
import { useHistory, useLocation } from 'react-router';
import CategoryProducts from '../components/CategoryProducts';
import CategoryLocation from '../interfaces/location/categoryLocation';
import DisplayMessage from '../components/DisplayMessage';
import { useAppSelector } from '../redux/hooks';

const Category = () => {

    const history = useHistory();
    const location = useLocation<CategoryLocation>();
    const category = location && location.state && location.state.category;

    const { type, message } = useAppSelector(state => state.message);

    if (!category || !category.id) {
        history.push('/');
    }

    return (
        <React.Fragment>

            {
                type && message ?
                    <div className='w-full flex justify-center'>
                        <DisplayMessage type={type} message={message} />
                    </div> : null
            }

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