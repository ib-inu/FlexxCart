import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
    productId: number | string;
    quantity: number;
    price: number | 0;
};

type CartState = {
    items: CartItem[];
    totalPrice: number;
    isRemoveModalOpen: boolean;
    selectedItem: number | null;
};

const initialState: CartState = {
    items: [],
    totalPrice: 0,
    isRemoveModalOpen: false,
    selectedItem: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const productExists = state.items.some(item => item.productId === action.payload.productId);

            if (!productExists) {
                state.items.push(action.payload);
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.productId !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
        addTotalPrice: (state, action: PayloadAction<number>) => {
            state.totalPrice += action.payload;
        },
        incQuantity: (state, action: PayloadAction<number | string>) => {
            const changingItem = state.items.find(item => item.productId === action.payload);

            if (changingItem && changingItem.quantity < 10) {
                changingItem.quantity += 1
            }
        },
        decQuantity: (state, action: PayloadAction<number | string>) => {
            const changingItem = state.items.find(item => item.productId === action.payload);

            if (changingItem && changingItem.quantity > 1) {
                changingItem.quantity -= 1
            }
        },
        addItemPrice: (state, action: PayloadAction<{ id: number | string, price: number }>) => {
            const changingItem = state.items.find(item => item.productId === action.payload.id);

            if (changingItem) {
                changingItem.price = action.payload.price
            }
        },
        calculateTotalPrice: (state) => {
            const price = state.items.map(item => Math.round(item.price * item.quantity))
            state.totalPrice = price.reduce((acc, cur) => acc + cur);
        },
        setRemoveModal: (state, action: PayloadAction<{ modal: boolean, selectedItemId: number }>) => {
            state.isRemoveModalOpen = action.payload.modal;
            state.selectedItem = action.payload.selectedItemId;
        },


    },
    // extraReducers: (builder) =>  {
    //     builder.addCase()
    // },
});

export const { addToCart, incQuantity, decQuantity, clearCart, addTotalPrice, addItemPrice, removeFromCart, calculateTotalPrice, setRemoveModal } = cartSlice.actions;
export default cartSlice.reducer;
