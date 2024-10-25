import axios from "axios";
import { useQuery } from "react-query";

export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    category: string
    rating: {
        rate: number;
        count: number;
    };
}

const fetchRandomProducts = async (): Promise<Product[]> => {
    try {
        const { data, status } = await axios.get('https://fakestoreapi.com/products');

        if (status !== 200) throw new Error(`HTTP error! Status: ${status}`);


        if (!data.length) throw new Error("No products available.");


        return data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error.response?.status;

            if (axiosError === 404) {
                throw new Error("Products not found (404).");
            } else if (axiosError === 500) {
                throw new Error("Server error (500). Please try again later.");
            } else {
                throw new Error(`Unexpected error occurred. Status: ${axiosError}`);
            }
        } else {
            throw new Error("Failed to fetch products. Please check your network.");
        }
    }
};

export function useRandomProducts() {
    return useQuery(
        ['randomProducts'],
        fetchRandomProducts,
        {
            retry: 2,
            onError: (error: unknown) => {
                if (error instanceof Error) {
                    console.error("Error fetching products:", error.message);
                }
            }
        }
    );
}
