import axios from "axios";
import { useQuery } from "react-query";

// Define the Product interface
export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

// Function to fetch products with enhanced error handling
const fetchRandomProducts = async (): Promise<Product[]> => {
    try {
        const { data, status } = await axios.get('https://fakestoreapi.com/products');

        if (status !== 200) {
            throw new Error(`HTTP error! Status: ${status}`);
        }

        if (!data.length) {
            throw new Error("No products available.");
        }

        return data;
    } catch (error: unknown) {
        // Check if the error is an Axios error
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
            // For non-Axios errors (e.g., network issues)
            throw new Error("Failed to fetch products. Please check your network.");
        }
    }
};

// Hook to use random products with react-query's retry logic and error handling
export function useRandomProducts() {
    return useQuery(
        ['randomProducts'],
        fetchRandomProducts,
        {
            retry: 2,  // Automatically retry failed requests twice
            onError: (error: unknown) => {
                if (error instanceof Error) {
                    console.error("Error fetching products:", error.message);
                }
            }
        }
    );
}
