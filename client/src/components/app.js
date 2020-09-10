import { h } from 'preact';
import { Auth0Provider } from "@auth0/auth0-react";

import Header from './header';
import Home from './home';

const App = () =>  (
	<Auth0Provider
    domain={`${process.env.AUTH0_NAME}.us.auth0.com`}
    clientId={process.env.AUTH0_CLIENT_ID}
	redirectUri={window.location.origin}
	audience={`https://${process.env.AUTH0_NAME}.us.auth0.com/api/v2/`}
    scope="read:current_user update:current_user_metadata"
  >
	<div id="app">
		<Header />
		<Home path="/" />
	</div>
	</Auth0Provider>
);

export default App;
