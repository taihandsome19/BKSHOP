import axios from 'axios';

const CheckAdmin = {
    async isAdmin() {
        try {
            const response = await axios.get('http://localhost:3001/user/info');
            return response.data.role === 'admin';
        } catch (error) {
            console.error("Error fetching user info:", error);
            return false;
        }
    }
};

export default CheckAdmin;
