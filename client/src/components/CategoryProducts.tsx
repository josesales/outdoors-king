import React from 'react';
import { useHistory } from 'react-router';
import globalStyles from '../globalStyles';
import Category from '../interfaces/models/category';
import CategoryProduct from './CategoryProduct';

const CategoryProducts = ({ category, minified }: { category: Category, minified?: boolean }) => {


    const history = useHistory();

    const { products, name } = category;
    let productsUi = null;

    if (products) {
        productsUi = products.filter((product, idx) => idx < 3).map(product => (<CategoryProduct key={product.id} product={product} />));
        if (minified) {
            productsUi = products.filter((product, idx) => idx < 3).map(product => (<CategoryProduct key={product.id} product={product} />));
        } else {
            productsUi = products.map(product => (<CategoryProduct key={product.id} product={product} />));
        }
    }

    const showAllProducts = () => {
        history.push('/category', { category })
    }

    return (
        <div className="mb-20">

            {
                name ?
                    <div className="w-full flex justify-between items-center">

                        <h1 onClick={showAllProducts} className={`mb-8 sm:ml-8 cursor-pointer capitalize 
                            ${globalStyles.textXBig} ${globalStyles.borderBottomHover}`}>
                            {name}
                        </h1>

                        {
                            minified ?
                                <span onClick={showAllProducts} className={`cursor-pointer mb-8 sm:mr-8 
                                ${globalStyles.textBig} ${globalStyles.borderBottomHover}`}>
                                    See more...
                                </span> : null
                        }
                    </div>
                    : ''
            }

            {
                productsUi && productsUi.length > 0 ?
                    <div className="flex justify-center flex-wrap">
                        {productsUi}
                    </div>

                    :
                    <span className={`mt-10 sm:ml-8 cursor-default ${globalStyles.textBig}`}>
                        No products for this category  at the moment.
                    </span>
            }
        </div>
    );
}

export default CategoryProducts;