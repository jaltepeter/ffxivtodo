export function Footer() {
	return (
		<footer class="footer" >
			<div class="container" >
				© {new Date().getFullYear()} FFXIV Todo Tracker
			</div>
			<div class="container">
				<a href='/privacy'>Privacy Policy</a> | <a href='/cookies'>Cookie Policy</a>
			</div>
		</footer>
	);
}