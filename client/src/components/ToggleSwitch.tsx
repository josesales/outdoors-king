import React, { useState } from 'react';
import HTML_ENTITIES from '../utils/htmlEntities';
import globalStyles from '../globalStyles';

const ToggleSwitch = ({ name, title, callback }: { name: string, title?: string, callback?: Function }): JSX.Element => {

    const [isActive, setIsActive] = useState(false);

    const onClickHandler = () => {

        setIsActive(!isActive);

        if (callback) {
            callback(!isActive);
        }
    };

    return (
        <div title={title ? title : ''} className="flex justify-around items-center mb-12 mt-12 
            w-10/12 sm:w-9/12 md:w-6/12 lg:w-1/3">

            <label title={title ? title : ''} className={globalStyles.textBig}>{name}</label>

            <div title={title ? title : 'aa'} onClick={onClickHandler} className={`${globalStyles.textBig} cursor-pointer 
                text-center p-4 rounded-2xl ${isActive ? 'bg-indigo-200' : 'bg-gray-400'}`}>

                <label className="cursor-pointer">
                    {isActive ? 'Yes' : 'No'}
                </label>
            </div>

        </div>
    );
}

export default ToggleSwitch;