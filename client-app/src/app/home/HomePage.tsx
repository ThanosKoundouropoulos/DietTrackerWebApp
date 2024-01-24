import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../stores/store";

import { Button, Container, Header, Segment,Image } from "semantic-ui-react";
import LoginForm from "../userForms/LoginForm";
import RegisterForm from "../userForms/RegisterForm";


export default observer(function HomePage(){
    const { userStore, modalStore } = useStore();

    
    return(
        
        <Segment  vertical className="homepage">
            <div  className="flame-video-container">
                <video autoPlay muted loop className="flame-video">
                    <source src="/assets/flames.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <Container className="homepageCont" >
                    <Header className="title global-font" as='h1' >
                        Diet Tracker <br/>
                    </Header>
                    <Header as='h2' className="global-font" inverted>Take control of your health and fitness journey.<br/>
                    An all-in-one diet tracker designed to help you achieve your wellness goals ! </Header>
                </Container>
               
                <svg>
                    <filter id="fire">
                        <feTurbulence id="turbulance" baseFrequency="0.1 0.1" numOctaves="2" seed="3">
                        <animate attributeName="baseFrequency" dur="5s"
                        values="0.1 0.1;0.12 0.12" repeatCount="indefinite"></animate>
                        </feTurbulence>
                        
                        <feDisplacementMap in="SourceGraphic" scale=" 10"></feDisplacementMap>
                    </filter>
                </svg>
                
            </div>
            <div className="ember global-font">
                   <h2>Ember </h2> 
                </div>
                <p className="global-font" style={{ position: "absolute", top: 370, left: 220 }}>
                <span style={{ color: "#ff8c3b" }}>your</span> ambition now.
                <br /> <span style={{ color: "#ff8c3b" }}>Create</span> your calorie plan.
                <br /> <span style={{ color: "#ff8c3b" }}>Personalize</span> your daily calorie intake based on your goals.
                </p>

                <p className="global-font" style={{ position: "absolute", top: 320, right: 50 }}>
                <span  style={{ color: "#ff8c3b" }}>Nutrient Insights </span> Get detailed insights <br /> into your macronutrient and micronutrient intake.<br />
                See your calorie distribution throught the day
                </p>
                <div className="flame-video-container-3" style={{position:'absolute',top:450,right: 150}}> 
                    <Image   bordered   src="/assets/statsShot.png" size="medium"  />
                </div>

                <p className="global-font" style={{ position: "absolute", top: 620, left: 50 }}>
                    <span style={{ color: "#ff8c3b" }}> Track Your Meals</span>
                    : Effortlessly log your <br />meals and snacks throughout the day and stay on track.
                </p>
               
                    <Container className="flame-video-container-2">
                    <video autoPlay muted loop className="flame-video">
                    <source src="/assets/flames.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div style={{ position: "absolute", top: 20, left: 19 }}>
                    <Image 
                        bordered  
                        src="/assets/track.png" 
                        size="huge"
                        style={{  borderRadius: "10px", boxShadow: "10px 0 10px rgba(0, 0, 0, 0.2)" }} 
                    />
                </div>
                       
                    </Container>         
                <p className="global-font"   style={{ position: "absolute", top: 1320, left: 150 }}>
                <span  style={{ color: "#ff8c3b" }}>Monitor your progress:</span> Watch the fat 
                <h1 style={{position:"relative"}} className="emberHeader global-font" >Burn</h1>  or the muscles 
                <h2 className="emberHeader global-font" style={{position:"relative"}} >Gained</h2> with interactive charts <br/> and statistics. </p>
                
                <div className="flame-video-container-4" style={{ position: 'absolute', top: 1400, right: 350 }}>
                <Image
                    bordered
                    src="/assets/line.png"
                    size="huge"
                    style={{ width: '100%', height: '100%', borderRadius: '10px', boxShadow: '10px 0 10px rgba(0, 0, 0, 0.2)' }}
                />
                </div>

                <p className="global-font"   style={{ position: "absolute", top: 2020, left: 350 }}>
            
                <h1 style={{position:"relative",top:90, left:50}} className="emberHeader global-font" >Log-In</h1>
                <span  style={{ color: "#ff8c3b",fontSize:35,position:"relative",top:40,left:360 }}>or</span> 
                <h1 className="emberHeader global-font" style={{position:"relative",top:-40, left:550}} >Sign-up</h1> 
                <span  style={{ color: "#ff8c3b",fontSize:35,position:"relative",top:90,left:160 }}>To begin your journey !</span></p>
              
                
                <div className="flame-video-container-bottom">
                    <video autoPlay muted loop className="flame-video">
                        <source src="/assets/flames.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <Header as='h2' className="end global-font" inverted>Thesis of student Thanos
                     Koundouropoulos for 
                    the department of information technology 
                    and telecommunication of the university of Peloponnese </Header>
                    <div style={{position:"relative",bottom:210,right:-1270}}>
                        <Image  src="/assets/logo.png" size="small"  />
                    </div>
                  

                </div>
                
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
                                Login
                            </Button>
                            <Button onClick={() => modalStore.openModal(<RegisterForm/>)} size="huge"  inverted>
                                Sign-Up
                            </Button>
                        
                        </Container>
                       
                )}

              
               
           
        </Segment>      
          
        
    )
})