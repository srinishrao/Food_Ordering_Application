import { useRef, useState, useEffect } from 'react';
import Home from '../Home/OwnerHome';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../../styles/register.css'
import logo from '../../images/grubhub-logo.png'

const BuyerLogin = () => {
    
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const [EmptyCredentials, setEmptyCredentials] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const navigate = useNavigate();

    const onValidate = (e) => { 
        if(email === "" || email === " " || pwd === "" || pwd === " ") {
            setEmptyCredentials("Email and Password cannot be Empty!!")
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
        
        try {
            await axios.post("http://localhost:8080/api/users/Buyerlogin", logindata, {
                headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                }
            }).then(async (response) => {
                console.log("Status Code : ====> ",response.status);
                if(response.status === 200){
                    axios.get(`http://localhost:8080/api/users/useremail/${email}`)
                    .then((response) => {
                        console.log(response.data)
                        sessionStorage.setItem('userID',response.data.userID)
                        sessionStorage.setItem('firstName',response.data.firstName)
                        sessionStorage.setItem('lastName',response.data.lastName)
                        sessionStorage.setItem('email',response.data.email)
                        sessionStorage.setItem('phoneNumber',response.data.phoneNumber)
                        sessionStorage.setItem('profileImage',response.data.profileImage)
                        sessionStorage.setItem('profileImage',response.data.profileImage)
                        sessionStorage.setItem('address', response.data.address)
                        sessionStorage.setItem('userType',response.data.userType)
                    })
                    .then(() => {
                        //sessionStorage.setItem('owner', owner)
                        navigate('/Home')
                    })
                }
            })
        } catch (err) {
            if (!err.response) {
                setErrMsg('No Server Response');
            }else if(err.response.status === 400) {
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
                <Home />
            ) : (
                <section>
                  <div className='d-flex align-items-center justify-content-between'>
                      <div className='logo'>
                          <img src={logo} alt="logo"/>
                      </div>
                  </div>
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
                            <Link to='/Buyersignup'>
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

export default BuyerLogin