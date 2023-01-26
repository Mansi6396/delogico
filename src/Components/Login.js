import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [passerror, setPassError] = useState("");
//to validate data
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passreg = /^(?=.*?[A-Z])(?=.*?[0-9])[A-Za-z\d].{5,10}$/;

  const handleSubmit = () => {
    console.log("Email", email);
    console.log("Password", password);
    if (email === "") {
      setError("enter email");
    } else if (reg.test(email) === false) {
      setError("Email is not valid");
    }
   
    if (password === "") {
      setPassError("enter password");
      {
        console.log("rjjrj", passerror);
      }
    } else if (passreg.test(password) === false) {
      setPassError("Password is not valid");
    }

    if (email == "test@test.com" && password == "Password1") {
      navigate("/Home");
      localStorage.setItem("email", email);
    } else {
      navigate("/");
    }
  };
  const checkEmail = (e) => {
    setEmail(e.target.value);
  };
  const checkPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <h1>Login</h1>
      

      <TextField
        id="outlined-basic"
        label="Email Id"
        variant="outlined"
        value={email}
        onChange={checkEmail}
      />
      <p style={{ color: "red" }}>
        {email === "" ? <>{ error } </>: reg.test(email) === false ? <>{ error }</> : ""}
      </p>
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        value={password}
        onChange={checkPassword}
      />
      <p style={{ color: "red" }}>
        {password === "" ? <>{ passerror } </>: passreg.test(password) === false ? <>{ passerror }</> : ""}
      </p>
    
      <button onClick={handleSubmit}>Login</button>
    </>
  );
}
export default Login;
