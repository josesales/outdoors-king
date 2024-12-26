import { sendRequest } from "../../graphql/request-sender";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { AnyAction } from "redux";
import { getCategories as getCategoriesAction } from "./categoryReducer";
import { displayMessage } from "../message/messageReducer";
import Category from "../../interfaces/models/category";
import { categoriesQuery } from "../../graphql/categoryGraphql";
import { setIsSearching, setSearchActive } from "../product/productReducer";

export const getCategories = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    try {
      dispatch(setSearchActive(true));
      dispatch(setIsSearching(true));
      const categories: Category[] = await sendRequest(categoriesQuery);
      dispatch(setSearchActive(false));
      dispatch(setIsSearching(false));
      dispatch(getCategoriesAction(categories));
    } catch (error) {
      dispatch(displayMessage({ type: "error", message: error.message }));
    }
  };
};
