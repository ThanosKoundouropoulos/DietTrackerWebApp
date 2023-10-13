
import LoginForm from './userForms/LoginForm';
import { observer } from 'mobx-react-lite';
import { useStore } from './stores/store';
import { Button, Container, Dropdown, Menu } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';







export default observer(function NavBar() {
  const {userStore : {user,logout}} = useStore();
  return (
    <>
     <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    Reactivities
                </Menu.Item>'
                <Menu.Item as={NavLink} to='/activities' name="Activities"/>
                <Menu.Item as={NavLink} to='/errors' name="Errors"/>
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity'/>
                </Menu.Item>
                <Menu.Item position="right">
                    
                    <Dropdown pointing = 'top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text='My prifile' icon='user'/>
                            <Dropdown.Item onClick={logout} text='Logout' icon='power'/>
                        </Dropdown.Menu>
                       
                        
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
  
    </>
  );
})