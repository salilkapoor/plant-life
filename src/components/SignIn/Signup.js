import React, { useState } from "react";
import SignupStep1 from "./SignupStep1"
import SignupStep2 from "./SignupStep2"
function Signup(props) {
const {errorMessage,successMessage}=props

  const [state, setState] = React.useState(	{
    company: "",
    email : "",
    address: "",
    city: "",
    contact: "",
    firstName: "",
    lastName: "",
    password:  "",
    confirmPassword:'',
    state:''
    
});
const handleStateChange = (key,value) => {
  const newState = state
  newState[key]=value;
  setState({ ...newState });
};
  const [step , setStepSignUp] = useState(1);
  return (
    <>
          {step===1?<SignupStep1 setStepSignUp={setStepSignUp} handleStateChange={handleStateChange} errorMessage={errorMessage} successMessage={successMessage} state={state}/>:""}  
          {step===2?<SignupStep2 setStepSignUp={setStepSignUp} handleStateChange={handleStateChange} state={state} errorMessage={errorMessage} successMessage={successMessage} />:""}  

    </>
  );
}

export default Signup;
