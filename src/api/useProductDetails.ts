import axios from "axios";
import { Product } from "./useRandomProducts";
import { useQuery } from "react-query";


async function fetchProductDetails(id: string | number): Promise<Product> {
    try {
        const { data, status } = await axios.get(`https://fakestoreapi.com/products/${id}`);

        if (status !== 200) throw new Error(`HTTP error! Status: ${status}`);
        if (!data) throw new Error("No Details available.");

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
}

export function useProductDetails(id: string | number) {
    return useQuery(
        ['productDetails', id],
        () => fetchProductDetails(id),
        {
            retry: false,
        }
    );
}
