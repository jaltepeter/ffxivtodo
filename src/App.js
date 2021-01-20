/** React */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

/** CSS */
import './css/bootstrap.min.css';
import './css/App.css';

/** components */
import { Main } from './main';
import { Privacy } from './pages/privacy';
import { Cookies } from './pages/cookies';
import { Footer } from './layout/footer';

export function App() {
	return (
		<div>
			<Switch>
				<Route path="/" component={Main} exact />
				<Route path="/privacy" component={Privacy} exact />
				<Route path="/cookies" component={Cookies} exact />
				<Redirect to="/" />
			</Switch>
			<Footer />
		</div>

	);
}

export default App;