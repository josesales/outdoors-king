import { decode } from 'html-entities';

const HTML_ENTITIES = {

    //decode the html entity code to be shown in the browser 
    add: decode('&#43;'),
    remove: decode('&#88;'),
    backArrow: decode('&#8656;'),
    search: decode('&#x1f50d;'),
    leftArrow: decode('&#10094;'),
    rightArrow: decode('&#10095;'),
    clean: decode('&#10005;'),
}

export default HTML_ENTITIES;