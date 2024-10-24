import axios from "axios";
import { useQuery } from "react-query";


async function fetchCategory(category: string) {
    try {
        const { data, status } = await axios.get(`https://fakestoreapi.com/products/category/${category}`);

        if (status !== 200) throw new Error(`HTTP error! Status: ${status}`);
        if (!data) throw new Error("No Products available.");

        return data;

    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error.response?.status;

            if (axiosError === 404) {
                throw new Error("Product not found (404).");
            } else if (axiosError === 500) {
                throw new Error("Server error (500). Please try again later.");
            } else {
                throw new Error(`Unexpected error occurred. Status: ${axiosError}`);
            }
        } else {
            throw new Error("Failed to fetch Product. Please check your network.");
        }
    }
}

export function useCategory(category: string) {
    return useQuery(
        ['category', category],
        () => fetchCategory(category),
        {
            retry: 2,
            onError: (error: unknown) => {
                if (error instanceof Error) {
                    console.error("Error fetching details:", error.message);
                }
            }
        }
    )
}