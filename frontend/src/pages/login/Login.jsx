import React, { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import sanitizeHtml from "sanitize-html";
import { loginUserApi, verifyLoginOtpApi } from "../../apis/api";
import "./Login.css";

const Login = () => {
    // User input states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Error states
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // OTP verification state
    const [showOtpOverlay, setShowOtpOverlay] = useState(false);
    const [otp, setOtp] = useState("");
    const recaptchaRef = useRef(null);

    // Helper function to sanitize input
    const cleanInput = (input) => sanitizeHtml(input, {
        allowedTags: [], // No HTML allowed
        allowedAttributes: {}
    });


    // Validation function
    const validate = () => {
        let isValid = true;
        setEmailError("");
        setPasswordError("");

        if (email.trim() === "" || !email.includes("@")) {
            setEmailError("Email address is required");
            toast.error("Email address is required");
            isValid = false;
        }

        if (password.trim() === "") {
            setPasswordError("Password is required");
            toast.error("Password is required");
            isValid = false;
        }

        return isValid;
    };

    // Login button handler
    const handleLogin = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        const captchaToken = recaptchaRef.current.getValue();
        if (!captchaToken) {
            toast.error("Please verify CAPTCHA");
            return;
        }

        const data = {
            email: cleanInput(email),
            password: cleanInput(password),
            captchaToken,
        };

        // Make API request to validate email and password
        loginUserApi(data)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);

                    // Reset CAPTCHA on failed login
                    recaptchaRef.current.reset();
                } else {
                    // If login successful, show OTP overlay
                    toast.success("OTP sent to your email. Please verify.");
                    setShowOtpOverlay(true);
                }
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.message) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error("An error occurred. Please try again.");
                }
                recaptchaRef.current.reset();
            });
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();

        if (!otp.trim()) {
            toast.error("Please enter the OTP.");
            return;
        }

        const data = { email, otp };

        console.log("Sending OTP verification data:", data); // Debugging

        verifyLoginOtpApi(data)
            .then((res) => {
                if (res.data.success) {
                    toast.success("Login successful!");

                    // Save token and user data to localStorage
                    localStorage.setItem("token", res.data.token);
                    const convertedData = JSON.stringify(res.data.userData);
                    localStorage.setItem("userData", convertedData);

                    // Redirect to home
                    window.location.href = "/";
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.message) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error("Failed to verify OTP. Please try again.");
                }
            });
    };


    // Image carousel logic
    const images = [
        {
            src: "assets/images/trek2.jpg",
            heading: "The perfect place to find your trekking gear",
            text: "Find your preferred trekking products anytime, anywhere with ease ",
        },
        {
            src: "assets/images/trek2.jpg",
            heading: "The perfect place to find your trekking gear",
            text: "Find your preferred trekking products anytime, anywhere with ease ",
        },
        {
            src: "assets/images/trek2.jpg",
            heading: "The perfect place to find your trekking gear",
            text: "Find your preferred trekking products anytime, anywhere with ease ",
        },
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <>
            <div className="mt-2">
                <div className="login-container">
                    <div className="login-content">
                        <div className="login-left">
                            <div className="carousel">
                                {images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`carousel-item ${index === currentImageIndex ? "active" : ""
                                            }`}
                                    >
                                        <img src={image.src} alt={`Slide ${index}`} className="login-image" />
                                        <div className="carousel-caption">
                                            <h3>{image.heading}</h3>
                                            <p>{image.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="login-right">
                            <div className="login-form">
                                <div className="logo">
                                    <img src="assets/images/hikeventure_logo.png" alt="logo" />
                                </div>
                                <h2>Hey!! Welcome back!!!</h2>
                                <p>Please enter your login details to continue</p>
                                <form>
                                    <label>Email Address</label>
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        placeholder="Email Address"
                                        required
                                    />
                                    {emailError && <p className="text-danger">{emailError}</p>}

                                    <label>Password</label>
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        placeholder="Password"
                                        required
                                    />
                                    {passwordError && <p className="text-danger">{passwordError}</p>}

                                    <ReCAPTCHA className="mt-4"
                                        sitekey="6Lc3iccqAAAAAKDkISSoAVeTn0xCki4mSSoUhtsf"
                                        ref={recaptchaRef}
                                    />

                                    <div className="login-options">
                                        <div>
                                            <input type="checkbox" id="remember" />
                                            <span>Remember me</span>
                                        </div>
                                        <a href="/forgot_password">Forgot Password?</a>
                                    </div>
                                    <button onClick={handleLogin} type="submit" className="login-button">
                                        Login
                                    </button>
                                </form>
                                <p className="terms">
                                    By creating an account, you agree to our{" "}
                                    <a href="/terms">Terms of Service</a> and{" "}
                                    <a href="/privacy">Privacy Policy</a>.
                                </p>
                                <p>
                                    Don't have an account?{" "}
                                    <a style={{ color: "#208894" }} href="/register">
                                        Sign Up
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* OTP Verification Overlay */}
            {showOtpOverlay && (
                <div className="otp-overlay">
                    <div className="otp-container">
                        <h2>Verify OTP</h2>
                        <p>A verification code has been sent to your email address</p>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="otp-input"
                        />
                        <button onClick={handleVerifyOtp} className="otp-button">
                            Verify OTP
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
