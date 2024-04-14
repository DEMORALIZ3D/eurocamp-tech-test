import { Box, CircularProgress } from "@mui/material";

const LoadingCircle = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1, minHeight: '200px', minWidth: '200px' }}>
        <CircularProgress />
    </Box>
)
export default LoadingCircle;