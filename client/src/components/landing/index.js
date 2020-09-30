import { h } from 'preact';
import { useAuth0 } from "@auth0/auth0-react";

const Landing = () => {
    const { loginWithRedirect } = useAuth0();
    return <button onClick={loginWithRedirect}>Log In</button>
};

export default Landing;