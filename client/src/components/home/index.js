import { h } from 'preact';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from '../profile';
import Landing from '../landing';
import style from './style';

const Home = () => {
	const { isAuthenticated } = useAuth0();
	return isAuthenticated ? <Profile /> : <Landing />
};

export default Home;
