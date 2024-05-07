
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';

import ModalContainer from './common/modals/modalContainer';
import HomePage from './home/HomePage';
import { observer } from 'mobx-react-lite';
import { useStore } from './stores/store';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();
  useEffect(() => {
    console.log('* 1App UseEffect loading ');
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])
  return (
    <>
       <ModalContainer/>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
        {location.pathname === '/' ? <HomePage /> : (
          <>
          <NavBar />
          
            <Outlet />
          
          </>
        )} 
      
    </>
 
  )
}

export default observer(App)
