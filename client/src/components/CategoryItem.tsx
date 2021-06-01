import React from 'react';
import globalStyles from '../globalStyles';
import Item from '../interfaces/item';

const CategoryItem = ({ item }: { item?: Item, minified?: boolean }) => {

    const onAddToCartClick = () => {

    }

    return (

        <React.Fragment>
            {
                item ?

                    <div className="flex flex-col items-center flex-none rounded-3xl w-2/5 md:w-1/4 lg:w-1/5 xl:w-1/6 mt-10 p-5 ml-4 mr-4 bg-indigo-100 sm:bg-indigo-100 lg:bg-white hover:bg-indigo-100">

                        <span className={`cursor-pointer mb-5 ${globalStyles.textDefault}`}>
                            {item.name}
                        </span>

                        <img src={item.image} className="w-32 h-28 sm:w-44 sm:h-44 lg:w-48 lg:h-48 xl:w-64 xl:h-64 flex-none" />

                        <div className="w-full flex flex-col justify-center items-center">

                            <span className={`flex-initial mt-5 cursor-default ${globalStyles.textDefault}`}>
                                $ {item.price}
                            </span>

                            <span className={`mt-2 cursor-pointer ${globalStyles.borderBottomHover} ${globalStyles.textDefault}`}>
                                Add to Cart
                            </span>
                        </div>

                    </div>

                    : null

            }
        </React.Fragment>
    );
}

export default CategoryItem;