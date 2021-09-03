import { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

//import image
import signInImage from '../assets/signup.jpg';

const Auth = () => {

    const [isSignUp, setisSignUp] = useState(true);
    const handleChange = () => {};
    return(
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignUp ? "Sign Up" : "Sign In"}</p>
                    <form onSubmit={() => {}}>
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
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Auth;