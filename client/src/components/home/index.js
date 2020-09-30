import { h } from 'preact';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from '../profile';
import Landing from '../landing';
import style from './style';

const Home = () => {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
	return (
		<div class={style.home}>
			<div class={style.button} onClick={loginWithRedirect}><button>Log In</button></div>
			<div class={style.button} onClick={logout}><button>Log Out</button></div>
			{isAuthenticated ? <Profile /> : <Landing />}
		</div>
)};

export default Home;
