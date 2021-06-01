import React, { useState } from 'react';
import HTML_ENTITIES from '../utils/htmlEntities';
import globalStyles from '../globalStyles';

const Search = (): JSX.Element => {

    const [text, setText] = useState('');

    const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    return (
        <React.Fragment>

            <input type="text" placeholder={HTML_ENTITIES.search} required value={text} autoComplete="off"
                className={globalStyles.input} onChange={onTextChange} />
        </React.Fragment>
    );
}

export default Search;