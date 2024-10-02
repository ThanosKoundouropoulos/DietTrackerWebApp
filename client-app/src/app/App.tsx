
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import ModalContainer from './common/modals/modalContainer';
import HomePage from './home/HomePage';
import { observer } from 'mobx-react-lite';
import { useStore } from './stores/store';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import LoadingComponent from './LoadingComponent';

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();
  
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore,commonStore.token, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />
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
