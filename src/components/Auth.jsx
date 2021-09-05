import { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

//import image
import signInImage from '../assets/signup.jpg';

const cookies = new Cookies(); // create instance of cookies

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {

    const [form, setForm] = useState(initialState);
    const [isSignUp, setisSignUp] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { fullName, username, password, phoneNumber, avatarURL } = form; // destructure and get all the data from the form

        const URL = 'http://localhost:5000/auth';

        const { data : { token, userId, hashedPassword } } = await axios.post(`${URL}/${isSignUp ? 'signup' : 'login'}`, {
            username, password, fullName, phoneNumber, avatarURL,
        }); //make post request each time to the backend, depending on if user is signing up or logging in and retireve the token, userId and hashedPassword from the backend

        //store data in browser cookies but don't use all 
        cookies.set('token', token); // add token to browser cookies
        cookies.set('username', username); // add username to browser cookies
        cookies.set('avatarURL', avatarURL);
        cookies.set('userId', userId);

        if (isSignUp) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        //reload browser so that the application will reload and this time, the authToken will be filled and go to the chat as a logged in user because the user will already have the authToken.
        window.location.reload();
    };

    const switchMode = () => {
        setisSignUp((prevIsSignUp) => !prevIsSignUp); // used to change state depending on the pevious state
    };

    return(
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignUp ? "Sign Up" : "Sign In"}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">
                                    Full Name
                                </label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="full name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="username">
                                    Username
                                </label>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="username"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">
                                    Phone Number
                                </label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">
                                    Avatar URL
                                </label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="confirmPassword"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button>
                                {isSignUp
                                    ? "Sign Up"
                                    : "Sign In"
                                }
                            </button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                          {isSignUp
                            ? "Already have an account "
                            : "Don't have an account? "
                          }
                          <span onClick={switchMode}>
                              {isSignUp
                                ? "Sign In"
                                : "Sign Up"
                              }
                          </span>
                        </p>
                    </div>
                </div>
                
            </div>
            <div className="auth__form-container_image">
                    <img src={signInImage} alt="sign up" />
                </div>
        </div>
    );
}

export default Auth;