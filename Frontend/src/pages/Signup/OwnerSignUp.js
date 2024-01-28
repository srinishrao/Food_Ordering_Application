import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import OwnerLogin from "../Login/OwnerLogin";
import { Link, useNavigate} from 'react-router-dom'
import '../../styles/register.css'
import logo from '../../images/grubhub-logo.png'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
const ZIP_CODE = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

const OwnerSignUp = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);


    const [restaurantName, setRestaurantName] = useState('');
    const [validRestaurantName, setValidRestaurantName] = useState(false);
    const [restaurantNameFocus, setRestaurantNameFocus] = useState(false);


    const [zipCode, setZipCode] = useState('');
    const [validZipCode, setValidZipCode] = useState(false);
    const [zipCodeFocus, setZipCodeFocus] = useState(false);
/*
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
*/
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidRestaurantName(USER_REGEX.test(restaurantName));
    }, [restaurantName])

    useEffect(() => {
        setValidFirstName(USER_REGEX.test(firstName));
    }, [firstName])

    useEffect(() => {
        setValidLastName(USER_REGEX.test(lastName));
    }, [lastName])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])

    useEffect(() => {
        setValidZipCode(ZIP_CODE.test(zipCode))
    }, [zipCode])

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, email, pwd, restaurantName, zipCode])

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(firstName);
        const v2 = PWD_REGEX.test(pwd);

        const input = {
            "firstName" : firstName,
            "lastName" : lastName,
            "email" : email,
            "password" : pwd,
            "restaurantName" : restaurantName,
            "zipCode" : zipCode,
            "userType" : "Owner" 
        }
        
       
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8080/api/users/Ownersignup", input , {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                }
            }).then(async (response) => {
                if(response.status === 201){
                    navigate('/Ownerlogin')
                }
                console.log(response.data);
            }
            )
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Email Already Exists');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? ( setSuccess(true) && 
                <OwnerLogin />
            ) : (
                <section>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className='logo'>
                            <img src={logo} alt="logo" />
                        </div>
                    </div>
                <div className="formSection">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className="headerName">Register</h1>
                    <form onSubmit={handleSubmit}>

                        <label htmlFor="firstname">
                            Firstname:
                            <FontAwesomeIcon icon={faCheck} className={validFirstName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validFirstName || !firstName ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            required
                            aria-invalid={validFirstName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setFirstNameFocus(true)}
                            onBlur={() => setFirstNameFocus(false)}
                        />
                        <p id="uidnote" className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="lastname">
                            Lastname:
                            <FontAwesomeIcon icon={faCheck} className={validLastName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validLastName || !lastName ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            required
                            aria-invalid={validLastName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setLastNameFocus(true)}
                            onBlur={() => setLastNameFocus(false)}
                        />
                        <p id="uidnote" className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Email is in Incorrect format!!!
                        </p>
                       

                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>

                        <label htmlFor="restaurantName">
                            RestaurantName:
                            <FontAwesomeIcon icon={faCheck} className={validRestaurantName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validRestaurantName || !restaurantName ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="restaurantName"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setRestaurantName(e.target.value)}
                            value={restaurantName}
                            required
                            aria-invalid={validRestaurantName ? "false" : "true"}
                            aria-describedby="resnote"
                            onFocus={() => setRestaurantNameFocus(true)}
                            onBlur={() => setRestaurantNameFocus(false)}
                        />
                        <p id="resnote" className={restaurantNameFocus && restaurantName && !validRestaurantName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="zipCode">
                            ZipCode:
                            <FontAwesomeIcon icon={faCheck} className={validZipCode ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validZipCode || !zipCode ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="zipCode"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setZipCode(e.target.value)}
                            value={zipCode}
                            required
                            aria-invalid={validZipCode ? "false" : "true"}
                            aria-describedby="zipnote"
                            onFocus={() => setZipCodeFocus(true)}
                            onBlur={() => setZipCodeFocus(false)}
                        />
                        <p id="zipnote" className={zipCodeFocus && zipCode && !validZipCode ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must be of 5 digit number.
                        </p>

                        <button className="signupButton" disabled={!validFirstName || !validLastName || !validEmail || !validPwd ? true : false}>Sign Up</button>
                    </form>
                    <Link to='/Ownerlogin'>
                        <span className='text-center'>Already have an account? Login</span>
                    </Link>
                </div>
                </section>
            )}
        </>
    )
}

export default OwnerSignUp
