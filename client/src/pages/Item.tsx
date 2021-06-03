import React, { useState } from 'react';
import { useLocation } from 'react-router';
import ImageUpload from '../components/ImageUpload';
import Select from '../components/Select';
import globalStyles from '../globalStyles';
import Category from '../interfaces/category';
import ItemInterface from '../interfaces/item';
import ItemLocation from '../interfaces/itemLocation';
import { categoriesList } from '../testData/category';

const Item = (): JSX.Element => {

    const initialItem: ItemInterface = {
        name: '',
        category: {
            name: ''
        },
        price: 0,
    }

    const location = useLocation<ItemLocation>();
    const itemState = location && location.state && location.state.item;

    const [item, setItem] = useState(itemState ? itemState : initialItem);

    const categories: Category[] = categoriesList;


    const onItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;

        setItem({ ...item, [name]: value });
    };

    const onCategorySelected = (category: Category) => {
        console.log(category);
        setItem({ ...item, category });
    }

    const onConfirmClick = () => {
        //convert from string to number
        item.price = +item.price;
        console.log(item)
    }

    return (
        <div className={globalStyles.pageContainer}>

            <h2 className={globalStyles.title}>{itemState ? 'Edit Product' : 'Add Product'}</h2>

            <input type="text" name="name" placeholder="Name" required value={item.name} autoComplete="off"
                className={globalStyles.input} onChange={onItemChange} />

            <input type="number" min={0} name="price" placeholder="Price" required autoComplete="off"
                className={globalStyles.input} onChange={onItemChange} />

            <Select placeholder="Category" title="Select the Category of the Product."
                options={categories} callback={onCategorySelected} />

            <ImageUpload title="Upload Image" />

            <button title="Confirm Operation" onClick={onConfirmClick} className={globalStyles.button}>
                {itemState ? 'Edit' : 'Add'}
            </button>

        </div>
    );
}

export default Item;