import { useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';


const Loader = () => {
  const mainState = useSelector(state => state.main);

  return (
    <Box sx={{ display: mainState.isLoading == true ? 'flex' : 'none', justifyContent: 'center', minHeight: '600px', alignItems: 'center' }}>
      <CircularProgress size={ 100 } />
    </Box>
  );
}

export default Loader;
