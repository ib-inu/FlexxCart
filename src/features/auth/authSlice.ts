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

type SignupData = Omit<User, 'id'> & {
    password: string;
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

export const signup = createAsyncThunk(
    'auth/signup',
    async (userData: SignupData, { rejectWithValue }) => {
        try {
            const response = await fetch('https://fakestoreapi.com/users', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = (await response.json()) as User;
            if (!response.ok) throw new Error('Signup failed');
            return data;
        } catch (error: unknown) {
            return rejectWithValue((error as Error).message);
        }
    }
);

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
            console.log('Response Text:', responseText); // Log the raw response

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
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
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
