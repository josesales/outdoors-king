import React from 'react';
import Categories from '../components/Categories';
import Search from '../components/Search';
import globalStyles from '../globalStyles';

const Home = () => {

    return (
        <div className={globalStyles.pageContainer}>

            <Search />

            <Categories />
        </div>
    );
}

export default Home;