import React, { useState } from "react";
import HTML_ENTITIES from "../utils/htmlEntities";
import globalStyles from "../globalStyles";
import { useAppDispatch } from "../redux/hooks";
import { setProducts } from "../redux/product/productAsyncActions";
import {
  setIsSearching,
  setSearchActive,
} from "../redux/product/productReducer";
import { useDebounce } from "../hooks/useDebounce";

const Search = (): JSX.Element => {
  const [text, setText] = useState("");

  const dispatch = useAppDispatch();
  const debounce = useDebounce(1000);

  const searchProducts = debounce(async (name: string) => {
    if (name) {
      dispatch(setSearchActive(true));
      dispatch(setIsSearching(true));

      //fetch product by name
      await dispatch(
        setProducts({
          name,
        })
      );

      dispatch(setIsSearching(false));
    } else {
      dispatch(setSearchActive(false));
      dispatch(setIsSearching(false));
    }
  });

  const onTextChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentText = event.target.value;
    setText(currentText);
    searchProducts(currentText);
  };

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder={HTML_ENTITIES.search}
        required
        value={text}
        autoComplete="off"
        className={globalStyles.input}
        onChange={onTextChange}
      />
    </React.Fragment>
  );
};

export default Search;
