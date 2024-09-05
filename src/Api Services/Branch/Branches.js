import axios from "axios";

export const getAllBranches = async () => {
    try {
        const response = await axios.get('http://localhost:5137/api/Branches/getallbranches');
        console.log("API Response:", response.data); 
        return response.data;
    } catch (error) {
        console.error("Error fetching branches:", error);
        throw error; 
    }
};

export const getBranchById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5137/api/Branches/getbranchbyid/${id}`)
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
} ;