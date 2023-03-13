import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/Login.css";
import video from "../assets/ditto720main.mp4";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";

const Login = () => {
    //login states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    // modal states
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        // Perform login logic here
        setLoggedIn(true);
        {
            setTimeout(() => {
                navigate("/home", { replace: true });
            }, 2000);
        }
    };

    const handleLogout = () => {
        // Perform logout logic here
        setLoggedIn(false);
    };

    if (loggedIn) {
        return (
            <div>
                <p>You are logged in as {username}.</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    return (
        <div className="Login">
            <video
                className="main_vid"
                autoPlay={true}
                muted={true}
                loop={true}
                playsInline={true}
                src={video}
            />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you're reading this text in a modal!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="logo">LDC</div>
            <form className="login_form" onSubmit={handleLogin}>
                <InputGroup>
                    <Form.Control
                        className="username"
                        placeholder="Username"
                        aria-label="Username"
                        value={username}
                        aria-describedby="basic-addon1"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </InputGroup>
                <InputGroup>
                    <Form.Control
                        className="password"
                        placeholder="Password"
                        aria-label="Password"
                        value={password}
                        aria-describedby="basic-addon1"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </InputGroup>

                <Button
                    className="submit-btn"
                    type="submit"
                    variant="outline-primary"
                    size="md"
                    onClick={onsubmit}
                >
                    Log in
                </Button>
                <Button
                    className="signin-btn"
                    size="md"
                    variant="outline-primary"
                    onClick={handleShow}
                >
                    Sign in
                </Button>
            </form>
            <div className="google">login with google</div>
            <div className="register">don't have an account? Sign up</div>
        </div>
    );
};

export default Login;
