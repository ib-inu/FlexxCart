import axios from "axios";
import { Product } from "./useRandomProducts";
import { useQuery } from "react-query";


async function fetchProductDetails(id: string): Promise<Product> {
    try {
        const { data, status } = await axios.get(`https://fakestoreapi.com/products/${id}`);

        if (status !== 200) throw new Error(`HTTP error! Status: ${status}`);

        if (!data) throw new Error("No Details available.");

        return data;

    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error.response?.status;

            if (axiosError === 404) {
                throw new Error("Details not found (404).");
            } else if (axiosError === 500) {
                throw new Error("Server error (500). Please try again later.");
            } else {
                throw new Error(`Unexpected error occurred. Status: ${axiosError}`);
            }
        } else {
            throw new Error("Failed to fetch details. Please check your network.");
        }
    }
}

export function useProductDetails(id: string) {
    return useQuery(
        ['productDetails', id],
        () => fetchProductDetails(id),
        {
            retry: 2,
            onError: (error: unknown) => {
                if (error instanceof Error) {
                    console.error("Error fetching details:", error.message);
                }
            }
        }
    );
}
