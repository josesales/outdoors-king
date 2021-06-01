import React from 'react';
import { useHistory } from 'react-router';
import globalStyles from '../globalStyles';
import Category from '../interfaces/category';
import CategoryItem from './CategoryItem';

const CategoryItems = ({ category, minified }: { category: Category, minified?: boolean }) => {


    const history = useHistory();

    const { items, name } = category;
    let itemsUi = null;

    if (items) {
        itemsUi = items.filter((item, idx) => idx < 3).map(item => (<CategoryItem key={item.id} item={item} />));
        if (minified) {
            itemsUi = items.filter((item, idx) => idx < 3).map(item => (<CategoryItem key={item.id} item={item} />));
        } else {
            itemsUi = items.map(item => (<CategoryItem key={item.id} item={item} />));
        }
    }

    const showAllItems = () => {
        history.push('/category', { category })
    }

    return (
        <div className="mb-20">

            {
                name ?
                    <div className="w-full flex justify-between items-center">

                        <h1 onClick={showAllItems} className={`mb-8 sm:ml-8 cursor-pointer capitalize 
                            ${globalStyles.textXBig} ${globalStyles.borderBottomHover}`}>
                            {name}
                        </h1>

                        {
                            minified ?
                                <span onClick={showAllItems} className={`cursor-pointer mb-8 sm:mr-8 
                                ${globalStyles.textBig} ${globalStyles.borderBottomHover}`}>
                                    See more...
                            </span> : null
                        }
                    </div>
                    : ''
            }

            {
                itemsUi && itemsUi.length > 0 ?
                    <div className="flex justify-center flex-wrap">
                        {itemsUi}
                    </div>

                    :
                    <span className={`mt-10 sm:ml-8 cursor-default ${globalStyles.textBig}`}>
                        No products for this category  at the moment.
                    </span>
            }
        </div>
    );
}

export default CategoryItems;