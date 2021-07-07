import React, { useState } from 'react';
import HTML_ENTITIES from '../utils/htmlEntities';
import globalStyles from '../globalStyles';
import { useAppDispatch } from '../redux/hooks';
import { setProducts } from '../redux/product/productAsyncActions';
import { setIsSearching, setSearchActive } from '../redux/product/productReducer';

const Search = (): JSX.Element => {

    const [text, setText] = useState('');

    const dispatch = useAppDispatch();

    const onTextChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

        const currentText = event.target.value;
        setText(currentText);

        if (currentText) {
            dispatch(setSearchActive(true));
            dispatch(setIsSearching(true));

            //fetch product by name
            await dispatch(setProducts({
                name: currentText
            }));

            dispatch(setIsSearching(false));
        } else {

            dispatch(setSearchActive(false));
            dispatch(setIsSearching(false));
        }
    };

    return (
        <React.Fragment>

            <input type="text" placeholder={HTML_ENTITIES.search} required value={text} autoComplete="off"
                className={globalStyles.input} onChange={onTextChange} />
        </React.Fragment>
    );
}

export default Search;