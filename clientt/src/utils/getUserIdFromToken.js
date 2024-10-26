import jwt_decode from 'jwt-decode';

export const getStudentIdFromToken = (token) => {
    if (!token) {
        throw new Error('No token provided');
    }
    
    try {
        // Decode the token
        const decodedToken = jwt_decode(token);
        
        // Assuming the student ID is stored in the "sub" or "userId" claim
        return decodedToken.sub || decodedToken.userId; // Adjust according to your token structure
    } catch (error) {
        console.error('Error decoding token:', error);
        throw new Error('Invalid token');
    }
};
