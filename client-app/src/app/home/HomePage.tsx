import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../stores/store";
import { Button, Container } from "@mui/material";
import LoginForm from "../userForms/LoginForm";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Icon } from '@mui/material';


export default observer(function HomePage(){
    const { modalStore} = useStore();
    return(
        
            <Container>
                <h1>
                    <Icon fontSize="large"  style={{marginBottom: 12}} />
                        Reactivities
                </h1>
                
                    
                        <h2  content='Welcome to Diet Tracker' />
                       
                  
                

                        <>
                            <Button onClick={() => modalStore.openModal(<LoginForm/>)} size="large" >
                                Login!
                            </Button>
                            <Button size="large">
                                Register
                            </Button>
                        
                        </>
                       
              
            </Container>
        
    )
})