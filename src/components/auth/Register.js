import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [passwordConf, setPasswordConf] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();

    function registerUser() {
        var user = {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConf
        }

        axios.post('https://medicalstore.mashupstack.com/api/register', user)
            .then(response => {
                setErrorMessage('');
                navigate('/login');
            })
            .catch(error => {
                if (error.response.data.errors) {
                    setErrorMessage(Object.values(error.response.data.errors).join(' '));
                } else {
                    setErrorMessage('Failed to connect to API');
                }
            });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="mb-4 text-center mt-5">SignUp</h1>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" className="form-control" id="name" value={name} onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="text" className="form-control" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordConf">Confirm Password:</label>
                            <input type="password" className="form-control" id="passwordConf" value={passwordConf} onChange={(event) => setPasswordConf(event.target.value)} />
                        </div>
                        <button type="button" className="btn btn-primary btn-block" onClick={registerUser}>SignUp</button>
                    </form>
                    <div className="mt-3 text-center">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
