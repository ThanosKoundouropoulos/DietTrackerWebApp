

import { observer } from 'mobx-react-lite';
import { useStore } from './stores/store';
import { Button, Container, Dropdown, Icon, Menu, MenuItem } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { GiProgression,GiMuscularTorso} from 'react-icons/gi';
import { AiFillHome} from 'react-icons/ai';
import { useState } from 'react';
import CalculatorModal from './calculator/CalculatorModal';








export default observer(function NavBar() {
  const {userStore : {user,logout}} = useStore();
  const [isCalculatorModalOpen, setCalculatorModalOpen] = useState(false);

  const handleCalculatorClick = () => {
    setCalculatorModalOpen(true);
  };

  const handleCalculatorModalClose = () => {
    setCalculatorModalOpen(false);
  };
  return (
    <>
     <Menu inverted fixed="top">
            <Container className='navContainer'>
                <AiFillHome className="icons navIcon " size="35px" />
                <Menu.Item as={NavLink} to='/tracker' header position='left' className='navItem global-font' >
                    Diet Tracker
                </Menu.Item>
                <GiProgression className="icons navIcon" size="35px" />
                <Menu.Item className='global-font' as={NavLink} to='/progress' name="Progress" position='left'></Menu.Item>
                <Menu.Item onClick={handleCalculatorClick} position='left'>
                    <GiMuscularTorso className="icons navIcon" size="35px"  />
                    <span className='global-font' >Calculator</span>
                </Menu.Item>
               
                <Menu.Item >
                    
                    <Dropdown className='global-font' pointing = 'top left' text={user?.displayName} icon='user' >
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={logout} text='Logout' icon='power'/>
                        </Dropdown.Menu>
                       
                        
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
        <CalculatorModal open={isCalculatorModalOpen} onClose={handleCalculatorModalClose} />
    </>
  );
})

//<GiMuscularTorso className="icons navIcon" size="35px" />
//<Menu.Item as={NavLink} to='/calculator' name="Calculator"  position='left'/>