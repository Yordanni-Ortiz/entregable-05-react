import {createSlice} from "@reduxjs/toolkit";
import apiCalls from "/src/toolkit/apiCalls";
import {setIsLoading} from "./isLoading.slice";

export const getProductsSlice = createSlice({
    name: "getProducts",
    initialState: [],
    reducers: {
        setProducts: (state, action) => action.payload
    }
});

export const getProductsThunk = () => dispatch => {
    dispatch(setIsLoading(true));
    apiCalls({
        url: "https://e-commerce-api.academlo.tech/api/v1/products",
	resolve: res => dispatch(setProducts(res.data.products)),
	reject: console.log,
	$finally: () => dispatch(setIsLoading(false))
    });
}

export const {
    setProducts
} = getProductsSlice.actions;

export default getProductsSlice.reducer;
