import Link from "next/link";
import "./Footer.css";
import "./FooterResponsive.css";

import { db, auth } from "@/pages/FirebaseConfig";
import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";

const Footer = () => {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	//  pages link starts here
	const handlePageLinks = () => {
		const pageLinks = document.querySelector(".pages-link");
		const fullScreen = document.querySelector(".fullScreen");
		if (pageLinks?.classList.contains("scaleZero")) {
			pageLinks?.classList.remove("scaleZero");
			fullScreen?.classList.remove("scaleZero");
			document.body.style.overflowY = "hidden";
		} else {
			pageLinks?.classList.add("scaleZero");
			fullScreen?.classList.add("scaleZero");
			document.body.style.overflowY = "visible";
		}
	};

	const handleRemovePageLinks = () => {
		const pageLinks = document.querySelector(".pages-link");
		const fullScreen = document.querySelector(".fullScreen");
		pageLinks?.classList.add("scaleZero");
		fullScreen?.classList.add("scaleZero");
		document.body.style.overflowY = "visible";
	};

	// firebase starts from here

	const [newRequestName, setnewRequestName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [message, setMessage] = useState("");

	const RequestsCollectionRef = collection(db, "Requests");
	const [isLoading, setIsLoading] = useState(false);

	const onSubmitRequest = async () => {
		console.log("sent");
		if (newNumber && newRequestName) {
			setIsLoading(true);

			try {
				await addDoc(RequestsCollectionRef, {
					Name: newRequestName,
					Number: newNumber,
					userId: auth?.currentUser?.uid,
				});

				setnewRequestName("");
				setNewNumber("");

				setIsLoading(false);
			} catch (error) {
				console.error(error);
				setIsLoading(false);
			}

			setMessage("Ваш запрос успешно отправлен!");
		} else {
			console.error("Something is not selected (Name or Number)");
		}
	};

	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => {
				setMessage("");
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [message]);

	return (
		<>
			<footer className="footer">
				<div className="footer-left">
					<h2 className="overallTitle footer-title">Время обсудить проект</h2>
					<div className="footerBtns">
						<Link href={"/Native"}>
							<button className="overallBtn hasHover footerBtn">
								Рекламный креатив
							</button>
						</Link>
						<Link href={"/Naming"}>
							<button className="overallBtn hasHover footerBtn">Нейминг</button>
						</Link>
						<Link href={"/Descriptor"}>
							<button className="overallBtn hasHover footerBtn">
								Дескриптор, слоган
							</button>
						</Link>
						<Link href={"/Presentation"}>
							<button className="overallBtn hasHover footerBtn">Дизайн</button>
						</Link>
						<Link href={"/Logo"}>
							<button className="overallBtn hasHover footerBtn">Логотип</button>
						</Link>
						<Link href={"/Corporate"}>
							<button className="overallBtn hasHover footerBtn">
								Фирменный стиль
							</button>
						</Link>
						<Link href={"/Site"}>
							<button className="overallBtn hasHover footerBtn">Сайт</button>
						</Link>
						<Link href={"/Guideline"}>
							<button className="overallBtn hasHover footerBtn">
								Брендбук и гайдлайн
							</button>
						</Link>
						<Link href={"/MDesign"}>
							<button className="overallBtn hasHover footerBtn">
								Motio design
							</button>
						</Link>
						<Link href={"/Packing"}>
							<button className="overallBtn hasHover footerBtn">
								Упаковка
							</button>
						</Link>

						<Link href={"/ThreeDPage"}>
							<button className="overallBtn hasHover footerBtn">3D</button>
						</Link>

						<Link href={"/Presentation"}>
							<button className="overallBtn hasHover footerBtn">
								Дизайн презентаций
							</button>
						</Link>

						<Link href={"/Padpiski"}>
							<button className="overallBtn hasHover footerBtn">
								Дизайн подписка
							</button>
						</Link>

						<Link href={"/BrandStrategy"}>
							<button className="overallBtn hasHover footerBtn">
								Стратегия
							</button>
						</Link>

						<Link href={"/SMI"}>
							<button className="overallBtn hasHover footerBtn">СМИ</button>
						</Link>

						<Link href={"/Expert"}>
							<button className="overallBtn hasHover footerBtn">
								Эксперты мнения и соцсети
							</button>
						</Link>

						<Link href={"/Market"}>
							<button className="overallBtn hasHover footerBtn">
								Выход на рынок РФ
							</button>
						</Link>
					</div>
				</div>

				<div className="footer-right">
					<div className="inputs-wrapper">
						<input
							type="text"
							className="name-input input"
							placeholder="Имя"
							value={newRequestName}
							onChange={(e) => setnewRequestName(e.target.value)}
						/>
						<input
							type="text"
							className="phone-input input"
							placeholder="Телефон"
							value={newNumber}
							onChange={(e) => setNewNumber(e.target.value)}
						/>
					</div>

					<p className="success-message">{message}</p>
					<div className="send-wrapper">
						<button
							className="send-btn overallBtn"
							onClick={onSubmitRequest}
							disabled={isLoading}
						>
							Отправить
						</button>
						<p className="send-desc">
							Оставьте заявку и мы свяжемся с Вами в ближайшее время
						</p>
					</div>

					<div className="foot-right-bottom">
						<ul className="bottom-ul noneAdaptive">
							<Link href={"/Cases"}>
								<li className="bottom-list list-item head-case">Кейсы</li>
							</Link>
							<li
								onClick={handlePageLinks}
								className="bottom-list list-item head-service"
							>
								Услуги
							</li>
							<Link href={"/OCompany"}>
								<li className="bottom-list list-item head-company">
									О компании
								</li>
							</Link>
							<Link href={"/Contact"}>
								<li className="bottom-list list-item head-contact">Контакты</li>
							</Link>
						</ul>

						<div className="apps-wrapper blockAdaptive">
							<div className="app-logos">
								<div className="socials">
									<img
										src="/MainPage/realFacebook.png"
										alt=""
										className="app-logo"
									/>
									<img
										src="/MainPage/realInstagram.png"
										alt=""
										className="app-logo"
									/>
									<img
										src="/MainPage/realYouTube.png"
										alt=""
										className="app-logo"
									/>
								</div>
								<img
									onClick={scrollToTop}
									src="/MainPage/arrow-top.png"
									alt=""
									className="arrow-top noneAdaptive"
								/>
							</div>

							<div className="location">
								<p className="bolder">©️ 2024, time to agency</p>
								<p className="address">
									Санкт-Петербург, м. Адмиралтейская, ул. Большая Морская, д.
									46, оф. 777
								</p>
							</div>
						</div>

						<div className="apps-wrapper noneAdaptive">
							<div className="app-logos">
								<div className="socials">
									<img
										src="/MainPage/realFacebook.png"
										alt=""
										className="app-logo"
									/>
									<img
										src="/MainPage/realInstagram.png"
										alt=""
										className="app-logo"
									/>
									<img
										src="/MainPage/realYouTube.png"
										alt=""
										className="app-logo"
									/>
								</div>
								<img
									onClick={scrollToTop}
									src="/MainPage/arrow-top.png"
									alt=""
									className="arrow-top"
								/>
							</div>

							<div className="location">
								<p className="bolder">©️ 2024, time to agency</p>
								<p className="address">
									Санкт-Петербург, м. Адмиралтейская, ул. Большая Морская, д.
									46, оф. 777
								</p>
							</div>
						</div>

						<ul className="bottom-ul blockAdaptive">
							<Link href={"/Cases"}>
								<li className="bottom-list list-item head-case">Кейсы</li>
							</Link>
							<li
								onClick={handlePageLinks}
								className="bottom-list list-item head-service"
							>
								Услуги
							</li>
							<Link href={"/OCompany"}>
								<li className="bottom-list list-item head-company">
									О компании
								</li>
							</Link>
							<Link href={"/Contact"}>
								<li className="bottom-list list-item head-contact">Контакты</li>
							</Link>
						</ul>
					</div>
				</div>
				<img
					onClick={scrollToTop}
					src="/MainPage/arrow-top.png"
					alt=""
					className="arrow-top blockAdaptive"
				/>
			</footer>

			<div className="fullScreen scaleZero">
				<div className="pages-link scaleZero">
					<Link href={"/Native"}>
						<button className="overallBtn hasHover HeadfooterBtn">
							Рекламный креатив
						</button>
					</Link>
					<Link href={"/Naming"}>
						<button className="overallBtn hasHover HeadfooterBtn">
							Нейминг
						</button>
					</Link>
					<Link href={"/Descriptor"}>
						<button className="overallBtn hasHover HeadfooterBtn">
							Дескриптор, слоган
						</button>
					</Link>
					<Link href={"/Presentation"}>
						<button className="overallBtn hasHover HeadfooterBtn">
							Дизайн
						</button>
					</Link>
					<Link href={"/Logo"}>
						<button className="overallBtn hasHover HeadfooterBtn">
							Логотип
						</button>
					</Link>
					<Link href={"/Corporate"}>
						<button className="overallBtn hasHover HeadfooterBtn">
							Фирменный стиль
						</button>
					</Link>
					<Link href={"/Site"}>
						<button className="overallBtn hasHover HeadfooterBtn">Сайт</button>
					</Link>
					<Link href={"/Guideline"}>
						<button className="overallBtn hasHover HeadfooterBtn">
							Брендбук и гайдлайн
						</button>
					</Link>
					<Link href={"/MDesign"}>
						<button className="overallBtn hasHover HeadfooterBtn">
							Motio design
						</button>
					</Link>
					<Link href={"/Packing"}>
						<button className="overallBtn hasHover HeadfooterBtn">
							Упаковка
						</button>
					</Link>
					<Link href={"/ThreeDPage"}>
						<button className="overallBtn hasHover HeadfooterBtn">3D</button>
					</Link>
					<Link href={"/Presentation"}>
						<button className="overallBtn hasHover HeadfooterBtn">
							Дизайн презентаций
						</button>
					</Link>
					<Link href={"/Padpiski"}>
						<button className="overallBtn hasHover HeadfooterBtn">
							Дизайн подписка
						</button>
					</Link>
					<Link href={"/BrandStrategy"}>
						<button className="overallBtn hasHover HeadfooterBtn">
							Стратегия
						</button>
					</Link>
					<Link href={"/SMI"}>
						<button className="overallBtn hasHover HeadfooterBtn">СМИ</button>
					</Link>
					<Link href={"/Rebranding"}>
						<button className="overallBtn hasHover HeadfooterBtn">
							Ребрендинг →
						</button>
					</Link>
					<Link href={"/Expert"}>
						<button className="overallBtn hasHover HeadfooterBtn">
							Эксперты мнения и соцсети
						</button>
					</Link>
					<Link href={"/Market"}>
						<button className="overallBtn hasHover HeadfooterBtn">
							Выход на рынок РФ
						</button>
					</Link>
					<div onClick={handleRemovePageLinks} className="removePageLinks">
						×
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
