/** React */
import React from 'react';
import { Routes, Route } from 'react-router-dom';

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
			<Routes>
				<Route path="/" element={<Main/>}  />
				<Route path="/privacy" element={<Privacy/>}  />
				<Route path="/cookies" element={<Cookies/>}  />
				{/* <Navigate to="/" /> */}
			</Routes>
			<Footer />
		</div>

	);
}

export default App;