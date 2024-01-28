import { useRef, useState, useEffect } from 'react';
import OwnerHome from '../Home/OwnerHome';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../../styles/register.css'
import logo from '../../images/grubhub-logo.png'

const OwnerLogin = () => {
    
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    //const [EmptyCredentials, setEmptyCredentials] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    //const [owner, setOwner] = useState({})

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const navigate = useNavigate();

    const onValidate = (e) => { 
        if(email === "" || email === " " || pwd === "" || pwd === " ") {
            //setEmptyCredentials("Email and Password cannot be Empty!!")
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = onValidate();
        if(isValid){
          const logindata = {
            "email" : email,
            "password" : pwd
          }
        console.log(logindata.email + logindata.password)
          try {
              await axios.post("http://localhost:8080/api/users/Ownerlogin", logindata, {
                mode: 'cors',
                  headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                  }
              }).then(async (response) => {
                  console.log("Status Code : ====> ",response.status);
                  if(response.status === 200){
                      //sessionStorage.setItem('email', email)
                      axios.get(`http://localhost:8080/api/users/useremail/${email}`)
                        .then((response) => {
                            //const data = JSON.stringify(response.data);
                            //const array = JSON.parse(data).array;
                            //setOwner(response.data)
                            //sessionStorage.setItem('owner', response.data)
                            console.log(response.data)
                            sessionStorage.setItem('userID',response.data.userID)
                            sessionStorage.setItem('firstName',response.data.firstName)
                            sessionStorage.setItem('lastName',response.data.lastName)
                            sessionStorage.setItem('email',response.data.email)
                            sessionStorage.setItem('restaurantName',response.data.restaurantName)
                            sessionStorage.setItem('phoneNumber',response.data.phoneNumber)
                            sessionStorage.setItem('cuisine',response.data.restaurantID.cuisine)
                            sessionStorage.setItem('profileImage',response.data.profileImage)
                            sessionStorage.setItem('restaurantImage',response.data.restaurantID.restaurantImage)
                            sessionStorage.setItem('restaurantID', response.data.restaurantID.restaurantID)
                            sessionStorage.setItem('userType',response.data.userType)
                        })
                        .then(() => {
                            //sessionStorage.setItem('owner', owner)
                            navigate('/OwnerHome')
                        })
                        .catch ((err) => console.log(err))    
                  }
                  console.log(response.data);
              }
              )
          } catch (err) {
              if (!err.response) {
                  setErrMsg('No Server Response');
              }else if(err.response.status === 202) {
                  setErrMsg('Incorrect Credentials')
              }else {
                  setErrMsg("Error in login")
              }

              errRef.current.focus();
          }
        }
    }

    return (
        <>
            {success ? ( setSuccess(true) &&
                <OwnerHome email={email} pwd={pwd}/>
            ) : (
                <section>
                  <div className='d-flex align-items-center justify-content-between'>
                      <div className='logo'>
                          <img src={logo} alt="logo" />
                      </div>
                  </div>
                  <h1>Restaurant Owner Login Page:</h1>
                  <div className='formSection'>
                      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                      <h1 className='headerName'>Sign In</h1>
                      <form onSubmit={handleSubmit}>
                          <label htmlFor="email">Email:</label>
                          <input
                              type="email"
                              id="email"
                              ref={userRef}
                              autoComplete="off"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                              required
                          />

                          <label htmlFor="password">Password:</label>
                          <input
                              type="password"
                              id="password"
                              onChange={(e) => setPwd(e.target.value)}
                              value={pwd}
                              required
                          />
                          <button className='signInButton'>Sign In</button>
                      </form>
                      <p>
                          Need an Account?<br />
                          <span className="line">
                            <Link to='/Ownersignup'>
                              Sign Up
                            </Link>
                          </span>
                      </p>
                  </div>
                </section>
            )}
        </>
    )
}

export default OwnerLogin