import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuthContext();
    const location = useLocation();

    if (loading) {
        return (
            <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                minHeight="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;