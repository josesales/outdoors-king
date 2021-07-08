import React, { useEffect } from 'react';
import Categories from '../components/Categories';
import Search from '../components/Search';
import SearchProduct from '../components/SearchProduct';
import globalStyles from '../globalStyles';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Loader from '../components/Loader';
import { setIsSearching, setSearchActive } from '../redux/product/productReducer';
import DisplayMessage from '../components/DisplayMessage';

const Home = () => {

    const dispatch = useAppDispatch();

    const searchActive = useAppSelector(state => state.product.searchActive);
    const isSearching = useAppSelector(state => state.product.isSearching);

    const { type, message } = useAppSelector(state => state.message);

    useEffect(() => {

        return () => {
            dispatch(setSearchActive(false));
            dispatch(setIsSearching(false));
        }
    }, [dispatch])

    return (
        <div className={globalStyles.pageContainer}>
            {
                type && message ? <DisplayMessage type={type} message={message} /> : null
            }

            <Search />

            {
                isSearching ? <Loader /> :
                    searchActive ? <SearchProduct /> : <Categories />
            }
        </div>
    );
}

export default Home;