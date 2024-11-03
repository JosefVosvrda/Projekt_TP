import React, {useState} from 'react';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = {
        email: email,
        password: password
    };

        try {
            // Send the form data as JSON to the server
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Successful login
                setSuccessMessage("Login successful!");
                setErrorMessage(''); // Clear any previous error messages
                // Optionally, redirect the user or handle success (e.g., save token)
                console.log(data); // You can do more with the response here
            } else {
                // If login failed (e.g., wrong password, user not found)
                setErrorMessage(data.message || "Login failed!");
                setSuccessMessage('');
            }
        } catch (error) {
            // Handle network or other errors
            setErrorMessage("An error occurred. Please try again.");
            setSuccessMessage('');
        }
    };

    return (
        <div className="LoginForm">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Login</button>
            </form>

            {/* Display error or success messages */}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
}
function Login(){
    return(
    <LoginForm/>
    )
}
export default Login;