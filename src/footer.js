export function Footer() {
	return (
		<footer className="footer" >
			<div className="container" >
				© {new Date().getFullYear()} FFXIV Todo Tracker
			</div>
			<div className="container">
				<a href='/privacy'>Privacy Policy</a> | <a href='/cookies'>Cookie Policy</a>
			</div>
		</footer>
	);
}