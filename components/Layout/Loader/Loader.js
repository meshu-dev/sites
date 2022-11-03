import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = ({ isLoading }) => {
  console.log('isLoading', isLoading);

  return (
    <Box sx={{ display: isLoading == true ? 'flex' : 'none', justifyContent: 'center', minHeight: '600px', alignItems: 'center' }}>
      <CircularProgress size={ 100 } />
    </Box>
  );
}

export default Loader;
