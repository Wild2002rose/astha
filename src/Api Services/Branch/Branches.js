import axios from "axios";

export const getAllBranches = async () => {
    try {
        const response = await axios.get('https://localhost:7230/api/Auth/GetBranches');
        console.log("API Response:", response.data); 
        return response.data;
    } catch (error) {
        console.error("Error fetching branches:", error);
        throw error; 
    }
};

export const getBranchById = async (id) => {
    try {
        const response = await axios.get(`https://localhost:7230/api/Auth/GetBranchById/${id}`)
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
} ;