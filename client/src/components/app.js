import { h } from 'preact';
import { Auth0Provider } from "@auth0/auth0-react";

import Home from './home';

// TODO: setup env variables and replace with prod server
const process = {
	env: {
		AUTH0_NAME: 'dev-cdjjnybm',
		AUTH0_CLIENT_ID: 'zgT5hA906Nnp2fPyvTRja411wFqFkg81'
	}
}

let redirectUri;
if (typeof window !== 'undefined') {
	redirectUri =  window.location.origin;
}

const App = () => {
	return (
		<Auth0Provider
		domain={`${process.env.AUTH0_NAME}.us.auth0.com`}
		clientId={process.env.AUTH0_CLIENT_ID}
		redirectUri={redirectUri}
		audience={`https://${process.env.AUTH0_NAME}.us.auth0.com/api/v2/`}
		scope="read:current_user update:current_user_metadata"
	>
		<div id="app">
			<Home path="/" />
		</div>
		</Auth0Provider>
	);
}

export default App;
