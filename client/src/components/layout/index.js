import { h } from 'preact';
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

const Layout = props => {
	const { children, projectName, userName, pageTitle, pageDescription, subFooter } = props;
	// TODO replace footer contact info with an inquiry contact on landing page
	return (
		<div class={style.layout}>
			<div class={style.sidebar}>
				<header>
					<Text element="h1">{projectName}</Text>
					<Text>Powered By Bukoba Beach</Text>
				</header>

				<div>
					<Text element="h2">{pageTitle}</Text>
					<Text color="secondary">{pageDescription}</Text>
				</div>

				{subFooter && <Text>{subFooter}</Text>}

				<footer>
					<Text element="h3" color="secondary">Support:</Text>
					<Text>+1 (818) 555 - 5555</Text>
					<Text>support@bukobabeach.com</Text>
				</footer>
			</div>
			<div class={style.content}>
				<UserSection userName={userName} />
				{children}
			</div>
		</div>
	);
}

export default Layout;
