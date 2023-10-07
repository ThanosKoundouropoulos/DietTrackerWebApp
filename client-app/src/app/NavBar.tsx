
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import LoginForm from './userForms/LoginForm';
import { observer } from 'mobx-react-lite';
import { useStore } from './stores/store';







export default observer(function NavBar() {
  const { modalStore} = useStore();
  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ flexGrow: 1 ,bgcolor:'success.main',borderRadius: '16px'}}>
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
            </Typography>
            
            <Button color="inherit">Progress</Button>
            <Button color="inherit">Homepage</Button>
            <Button onClick={() => modalStore.openModal(<LoginForm/>)} color="inherit">Login</Button>
            
            
           
            </Toolbar>
        </AppBar>
        </Box>
    </>
  );
})