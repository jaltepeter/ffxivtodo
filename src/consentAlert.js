/** react-cookie-consent */
import CookieConsent from "react-cookie-consent";

export function ConsentAlert() {
	return (
		<CookieConsent
			location="bottom"
			buttonText="I Accept!"
			cookieName="consentGranted"
			disableStyles={true}
			buttonClasses="consent-button btn btn-success"
			containerClasses="consent-alert alert alert-info col-lg-12"
			expires={150}
			overlay>
			<div className='consent-content'>
				<p>This website may use cookies to enhance your user experience and provide anonymous usage analytics.</p>
				<p>To find out more, please read our <a href='/privacy'>privacy policy</a> and <a href='/cookies'>cookie policy</a>.</p>
			</div>
		</CookieConsent>
	);
}