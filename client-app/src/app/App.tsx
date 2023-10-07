
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import LoginForm from './userForms/LoginForm';
import ModalContainer from './common/modals/modalContainer';
import HomePage from './home/HomePage';
import { observer } from 'mobx-react-lite';
function App() {
  const location = useLocation();

  return (
    <>
      <ModalContainer/>
      
        {location.pathname === '/' ? <HomePage /> : (
          <>
          <NavBar />
          <h6 >MAIN PAGE</h6>
          </>
        )} 
    </>
 
  )
}

export default observer(App)
