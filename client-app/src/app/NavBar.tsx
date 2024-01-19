

import { observer } from 'mobx-react-lite';
import { useStore } from './stores/store';
import { Button, Container, Dropdown, Icon, Menu, MenuItem } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { GiProgression,GiMuscularTorso} from 'react-icons/gi';
import { AiFillHome} from 'react-icons/ai';








export default observer(function NavBar() {
  const {userStore : {user,logout}} = useStore();
  return (
    <>
     <Menu inverted fixed="top">
            <Container className='navContainer'>
                <AiFillHome className="icons navIcon" size="35px" />
                <Menu.Item as={NavLink} to='/tracker' header position='left' className='navItem' >
                    Diet Tracker
                </Menu.Item>
                <GiProgression className="icons navIcon" size="35px" />
                <Menu.Item as={NavLink} to='/progress' name="Progress" position='left'></Menu.Item>
                <GiMuscularTorso className="icons navIcon" size="35px" />
                <Menu.Item as={NavLink} to='/calculator' name="Calculator"  position='left'/>
               
                <Menu.Item >
                    
                    <Dropdown pointing = 'top left' text={user?.displayName} icon='user' >
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={logout} text='Logout' icon='power'/>
                        </Dropdown.Menu>
                       
                        
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
  
    </>
  );
})