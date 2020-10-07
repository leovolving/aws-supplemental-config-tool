import { useAuth0 } from "@auth0/auth0-react";
import Text from '../text';
import style from './style.css';

const UserSection = ({userName}) => {
	const { logout } = useAuth0();
	if (userName) {
		return (
			<nav class={style.userNav}>
				<Text color="secondary">{userName}</Text>
				<button className={style.logButton} onClick={logout}>Log Out</button>
			</nav>
		)
	} else return null // TODO: handle loggedOut state
}

export default UserSection;