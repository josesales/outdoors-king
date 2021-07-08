import React, { useEffect, useState } from 'react';
import globalStyles from '../globalStyles';

interface Option {
    id?: string,
    name?: string
}
const Select = ({ initialValue, placeholder, title, options, selectedOption, callback }:
    {
        initialValue?: string, placeholder: string, title?: string, options: Option[], selectedOption?: Option,
        callback?: Function
    }): JSX.Element => {

    const [text, setText] = useState(initialValue ? initialValue : '');
    const [isVisible, setIsVisible] = useState(false);

    const categoriesUi = options.map(option =>
        <li onClick={() => onOptionSelected(option)}
            key={option.id} className={`${globalStyles.inputDropdown.li} cursor-pointer`}>{option.name}</li>);

    const onOptionSelected = (option: Option) => {

        setText(option.name!);
        setIsVisible(false);

        if (callback) {
            callback(option);
        }
    };

    useEffect(() => {
        //Add the event so the function handleOutsideSuggestionsClick can be called whenever there is a click on the mouse
        document.addEventListener("mousedown", handleOutsideClick);

        //Remove the event listener when the component gets unmounted
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const handleOutsideClick = (e: MouseEvent) => {


        const id = (e.target as Element).id;
        const elementName = (e.target as Element).nodeName;
        // const id = containerRef.current && containerRef.current.id ? containerRef.current.id : null;
        //hides the dropdown if user clicks outside of it
        if (id === 'input-select' || id === 'select-container') {
            //inside of the div
            setIsVisible(true);
        } else if (elementName.toLowerCase() !== 'li') {
            // in case user click in li skip this method and go to onOptionSelected

            //outside of the div
            setIsVisible(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="relative w-10/12 sm:w-9/12 md:w-6/12 lg:w-1/3">

                <div className={globalStyles.inputDropdown.div(isVisible, 'left-0')}>
                    <ul id="select-container" className={`${globalStyles.inputDropdown.ul} ${globalStyles.textBig} capitalize`}>
                        {
                            categoriesUi ? categoriesUi : null
                        }
                    </ul>
                </div>
            </div>

            <input id="input-select" type="text" placeholder={placeholder} required value={text} autoComplete="off"
                className={`${globalStyles.input} cursor-pointer mb-0 capitalize`} readOnly={true}
                title={title ? title : ''} />

        </div>
    );
}

export default Select;