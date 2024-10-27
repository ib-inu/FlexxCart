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
            // Handle network or response errors
            if (error.response) {
                // The server responded with a status code out of the 2xx range
                const axiosErrorStatus = error.response.status;
                if (axiosErrorStatus === 404) {
                    throw new Error("Details not found (404).");
                } else if (axiosErrorStatus === 500) {
                    throw new Error("Server error (500). Please try again later.");
                } else {
                    throw new Error(`Unexpected error occurred. Status: ${axiosErrorStatus}`);
                }
            } else if (error.request) {
                // No response was received (network error)
                throw new Error("Network error. Please check your connection.");
            } else {
                // Something happened in setting up the request
                throw new Error("Request setup failed. Please try again.");
            }
        } else {
            // Generic fallback for non-Axios errors
            throw new Error("Failed to fetch details. Please check your network.");
        }
    }
};

export function useRandomProducts() {
    return useQuery(
        ['randomProducts'],
        fetchRandomProducts,
        {
            retry: false,
        }
    );
}
