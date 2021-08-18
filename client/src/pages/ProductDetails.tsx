import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import globalStyles from '../globalStyles';
import ProductLocation from '../interfaces/location/productLocation';
import { useHistory } from 'react-router-dom';
import { toDecimalString } from '../utils/math';


const ProductDetails = (): JSX.Element => {

    const location = useLocation<ProductLocation>();
    const product = location && location.state && location.state.product;

    const history = useHistory();

    if (!product || !product.id) {
        history.push('/');
    }

    useEffect(() => {
        window.scrollTo(0,0);
    });

    return (
        <div className={globalStyles.pageContainer}>

            <h2 className={`${globalStyles.title} capitalize`}>{product!.name}</h2>
            
            <img src={product!.image ? product!.image.toString(): ""} alt='item' className={`${globalStyles.imageDisplay} mb-12`} />

            <div className={globalStyles.productDetailsContainer}>
                <h2 className={`${globalStyles.textBig} mr-4`}>Price:</h2>
                <h2 className={globalStyles.textBig}>{"$" + toDecimalString(product!.price!)}</h2>
            </div>

            <div className={globalStyles.productDetailsContainer}>
                <h2 className={`${globalStyles.textBig} mr-4`}>Category:</h2>
                <h2 className={globalStyles.textBig}>{product!.category!.name}</h2>
            </div>

            {
                product?.description ?
                    <div className="flex flex-row flex-initial break-words justify-start items-center bg-gradient-to-r mb-12 cursor-default rounded-2xl from-indigo-100 via-red-400 to-yellow-400 w-10/12 sm:w-9/12 md:w-6/12 lg:w-1/3">
                        <p className={`${globalStyles.textBig} break-words w-full p-4`}>{product?.description}</p>
                    </div>
                : null
            }
            
        </div>
    );
}

export default ProductDetails;