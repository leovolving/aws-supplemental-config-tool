import { h } from 'preact';
import Text from '../text';
import UserSection from '../user-section';
import style from './style.css';

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
				{subFooter && <Text className={style.subFooter}>{subFooter}</Text>}
				<footer className={style.footer}>
					
						<Text element="h3" color="secondary" className={style.h3}>Support:</Text>
					<div>
						<Text>+1 (818) 555 - 5555</Text>
						<Text>support@bukobabeach.com</Text>
					</div>
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
