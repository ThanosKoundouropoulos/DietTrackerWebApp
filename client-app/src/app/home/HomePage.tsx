import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../stores/store";

import userStore from "../stores/userStore";
import { Button, Container, Header, Segment } from "semantic-ui-react";
import LoginForm from "../userForms/LoginForm";
import RegisterForm from "../userForms/RegisterForm";


export default observer(function HomePage(){
    const { userStore, modalStore} = useStore();
    const {userStore : {logout}} = useStore();
    return(
        
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container>
                <Header as='h1' inverted>
                   
                        Reactivities
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to reactivities' />
                        <Button as={Link} to='/activities' size="huge" inverted>
                              Go to Activities!
                        </Button>
                    </>
                ) : (

                        <>
                            <Button onClick={() => modalStore.openModal(<LoginForm/>)} size="huge" inverted>
                                Login!
                            </Button>
                            <Button onClick={() => modalStore.openModal(<RegisterForm/>)} size="huge" inverted>
                                Register
                            </Button>
                        
                        </>
                       
                )}

              
               
            </Container>
        </Segment>      
          
        
    )
})