import { h } from 'preact';
import { useAuth0 } from "@auth0/auth0-react";
import style from './style.css';

const UserSection = ({userName}) => {
	const { logout } = useAuth0();
	if (userName) {
		return (
			<nav class={style.userNav}>
				<p>{userName}</p>
				<button onClick={logout}>Log Out</button>
			</nav>
		)
	} else return null // TODO: handle loggedOut state
}

const Layout = props => {
	console.log({props})
	const { children, projectName, userName, pageTitle, pageDescription, subFooter } = props;
	// TODO replace footer contact info with an inquiry contact on landing page
	return (
		<div class={style.layout}>
			<div class={style.sidebar}>
				<header>
					<h1>{projectName}</h1>
					<p>Powered By Bukoba Beach</p>
				</header>

				<div>
					<h2>{pageTitle}</h2>
					<p>{pageDescription}</p>
				</div>

				{subFooter && <p>{subFooter}</p>}

				<footer>
					<h3>Support:</h3>
					<p>+1 (818) 555 - 5555</p>
					<p>support@bukobabeach.com</p>
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
