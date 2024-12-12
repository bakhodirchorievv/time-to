import Head from "next/head";
import Link from "next/link";

// import "./Header.css";
// import "./HeaderResponsive.css";
import { useEffect, useRef } from "react";

const Header = () => {
	const headerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let lastScrollTop = 0;

		const handleScroll = () => {
			const currentScrollTop =
				window.pageYOffset || document.documentElement.scrollTop;

			if (currentScrollTop > lastScrollTop) {
				// Scrolling down
				headerRef.current?.classList.add("hidden");
			} else {
				// Scrolling up
				headerRef.current?.classList.remove("hidden");
			}

			lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		const overlay = document.querySelector(".overlay");
		const navBarLis = document.querySelectorAll(".nav-bar-li");

		const handleNavItemClick = () => {
			const navBar = document.querySelector(".nav-bar-res");
			navBar?.classList.remove("appear");
			navBar?.classList.add("disappear");
			overlay?.classList.remove("block");
			document.body.classList.remove("overFlowHide");
		};

		navBarLis.forEach((li) => {
			li.addEventListener("click", handleNavItemClick);
		});

		return () => {
			navBarLis.forEach((li) => {
				li.removeEventListener("click", handleNavItemClick);
			});
		};
	}, []);

	const handleClickX = () => {
		const navBar = document.querySelector(".nav-bar-res");
		const overlay = document.querySelector(".overlay");
		navBar?.classList.remove("appear");
		navBar?.classList.add("disappear");
		overlay?.classList.remove("block");
		document.body.classList.remove("overFlowHide");
	};

	const handleClickAppear = () => {
		const navBar = document.querySelector(".nav-bar-res");
		const overlay = document.querySelector(".overlay");
		navBar?.classList.remove("disappear");
		navBar?.classList.add("appear");
		overlay?.classList.add("block");
		document.body.classList.add("overFlowHide");
	};

	const handleOverlay = () => {
		const navBar = document.querySelector(".nav-bar-res");
		const overlay = document.querySelector(".overlay");
		navBar?.classList.remove("appear");
		navBar?.classList.add("disappear");
		overlay?.classList.remove("block");
		document.body.classList.remove("overFlowHide");
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

	const ScrollToBottom = () => {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: "smooth",
		});

		return null;
	};

	return (
		<>
			<Head>
				<link rel="stylesheet" href="/styles/Header/Header.css" />
			</Head>
			<Head>
				<link rel="stylesheet" href="/styles/Header/HeaderResponsive.css" />
			</Head>
			<header id="real-main-header" ref={headerRef} className="header">
				<Link href={"/"}>
					<img className="head-img" src="/MainPage/TimeToLogo.svg" alt="" />
				</Link>
				<ul className="ul-wrapper getNone">
					<Link href={"/Cases"}>
						<li className="list-item head-case">Кейсы</li>
					</Link>
					<li onClick={handlePageLinks} className="list-item head-service">
						Услуги
					</li>
					<Link href={"/OCompany"}>
						<li className="list-item head-company">О компании</li>
					</Link>
					<Link href={"/Contact"}>
						<li className="list-item head-contact">Контакты</li>
					</Link>
				</ul>
				<div className="header-burger">
					<button
						onClick={ScrollToBottom}
						className="overallBtn hasHover head-btn getNone"
					>
						время написать
					</button>
					<img
						onClick={handleClickAppear}
						src="/MainPage/new-burger.png"
						alt=""
						className="getBlock burgerButton"
					/>
				</div>
			</header>

			<div className="nav-bar-res">
				<h2 onClick={handleClickX} className="xButton">
					×
				</h2>
				<Link href={"/"}>
					<img src="/MainPage/Vector (4).png" alt="" className="nav-bar-img" />
				</Link>

				<ul className="nav-bar-ul">
					<Link href={"/Cases"}>
						<li className="nav-bar-li">Кейсы</li>
					</Link>
					<li onClick={handlePageLinks} className="nav-bar-li">
						Услуги
					</li>
					<Link href={"/OCompany"}>
						<li className="nav-bar-li">О компании</li>
					</Link>
					<Link href={"/Contact"}>
						<li className="nav-bar-li">Контакты</li>
					</Link>
				</ul>
			</div>
			<div onClick={handleOverlay} className="overlay"></div>

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
							Ребрендинг
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

export default Header;
