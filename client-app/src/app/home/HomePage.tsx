import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../stores/store";

import { Button, Container, Header, Segment } from "semantic-ui-react";
import LoginForm from "../userForms/LoginForm";
import RegisterForm from "../userForms/RegisterForm";


export default observer(function HomePage(){
    const { userStore, modalStore } = useStore();

    
    return(
        
        <Segment  vertical className="homepage">
                <Container className="homepageCont" >
                    <Header as='h1' inverted >
                        Diet Tracker <br/>
                    </Header>
                    <Header as='h2' inverted>Track the calories you burn ! </Header>
                </Container>
                
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to Diet Tracker' />
                        <Button as={Link} to='/tracker' size="huge" inverted>
                              Go to Main Page!
                        </Button>
                    </>
                ) : (

                        <Container className="homeButtonsContainer">
                            <Button onClick={() => modalStore.openModal(<LoginForm/>)} size="huge" inverted>
                                Login!
                            </Button>
                            <Button onClick={() => modalStore.openModal(<RegisterForm/>)} size="huge" inverted>
                                Register
                            </Button>
                        
                        </Container>
                       
                )}

              
               
           
        </Segment>      
          
        
    )
})