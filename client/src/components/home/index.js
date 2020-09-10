import { h } from 'preact';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from '../profile';
import style from './style';

const Home = () => {
	const { loginWithRedirect, logout } = useAuth0();
	return (
		<div class={style.home}>
			<div class={style.button} onClick={loginWithRedirect}><button>Log In</button></div>
			<div class={style.button} onClick={logout}><button>Log Out</button></div>
			<Profile />
		</div>
)};

export default Home;
