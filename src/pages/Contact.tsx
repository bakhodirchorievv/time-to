import "../styles/Contacts/Contact.css";
import "../styles/Contacts/ContactResponsive.css";

const Contact = () => {
	return (
		<>
			<div className="contact-wrapper">
				<h2 className="contact-title">Наши контактные данные</h2>

				<div className="contact-body">
					<div className="contactBodyItem">
						<h4 className="contactItemTitle">Телефон</h4>
						<p className="contactItemDesc">+7 999 710-39-95</p>
					</div>
					<div className="contactBodyItem">
						<h4 className="contactItemTitle">Адрес</h4>
						<p className="contactItemDesc">Санкт-Петербург</p>
					</div>
					<div className="contactBodyItem">
						<h4 className="contactItemTitle">Социальные-сети</h4>
						<p className="contactItemDesc">WhatsApp</p>
						<p className="contactItemDesc">Telegramm</p>
						<p className="contactItemDesc">VK</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Contact;
