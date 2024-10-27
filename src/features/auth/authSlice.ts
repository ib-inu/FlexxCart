import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type User = {
    id: number;
    email: string;
    username: string;
    name: {
        firstname: string;
        lastname: string;
    };
    address: {
        city: string;
        street: string;
        number: number;
        zipcode: string;
        geolocation: {
            lat: string;
            long: string;
        };
    };
    phone: string;
};


type AuthState = {
    user: User | null;
    loading: boolean;
    error: string | null;
};

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};



export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { 'Content-Type': 'application/json' },
            });

            // Log the raw response text
            const responseText = await response.text();

            if (!response.ok) {
                throw new Error(responseText);
            }

            const data = JSON.parse(responseText);
            return data;
        } catch (error: unknown) {
            console.log('Error:', error);
            return rejectWithValue((error as Error).message);
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload as User;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
