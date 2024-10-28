import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductState = {
    category: string;
};

const initialState: ProductState = {
    category: "random"
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload
        }
    }
})

export const { setCategory } = productSlice.actions;
export default productSlice.reducer;
