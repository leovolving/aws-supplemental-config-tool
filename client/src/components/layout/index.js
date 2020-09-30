import { h } from 'preact';
import style from './style.css';
import config from '../../config.json';

const Layout = () => {
	return (
		<header class={style.header}>
			<h1>{config.companyName}</h1>
			<h2>{config.projectName}</h2>
		</header>
	);
}

export default Layout;
