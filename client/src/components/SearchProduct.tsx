import React, { useEffect } from "react";
import globalStyles from "../globalStyles";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setIsSearching,
  setSearchActive,
} from "../redux/product/productReducer";
import CategoryProduct from "./CategoryProduct";

const SearchProduct = () => {
  const dispatch = useAppDispatch();
  const filteredProducts = useAppSelector((state) => state.product.products!);

  let filteredProductsUi = null;

  if (filteredProducts) {
    filteredProductsUi = filteredProducts.map((product) => (
      <CategoryProduct key={product.id} product={product} />
    ));
  }

  useEffect(() => {
    window.addEventListener("beforeunload", (e) => {
      dispatch(setSearchActive(false));
      dispatch(setIsSearching(false));
    });

    return () => {
      document.removeEventListener("beforeunload", (e) => {
        dispatch(setSearchActive(false));
        dispatch(setIsSearching(false));
      });
    };
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col">
      {filteredProducts && filteredProducts.length > 0 ? (
        <div className="flex justify-center flex-wrap">
          {filteredProductsUi}
        </div>
      ) : (
        <span
          className={`w-full text-center cursor-default ${globalStyles.textBig}`}
        >
          No products found at the moment.
        </span>
      )}
    </div>
  );
};

export default SearchProduct;
