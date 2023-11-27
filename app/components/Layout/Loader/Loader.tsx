import { useAppSelector } from '@/app/hooks'
import { Box, CircularProgress } from '@mui/material'

const Loader = () => {
  const mainState = useAppSelector(state => state.main);

  return (
    <Box sx={{ display: mainState.isLoading == true ? 'flex' : 'none', justifyContent: 'center', minHeight: '600px', alignItems: 'center' }}>
      <CircularProgress size={ 100 } />
    </Box>
  );
}

export default Loader;
