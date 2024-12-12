import Link from "next/link";

import "../styles/Mmain/MmainPage.css";
import "../styles/Mmain/Mmresponsive.css";
import { useEffect, useRef, useState } from "react";
import CasesPart from "./CasesPart";

const MmainPage = () => {
	//  video controol start

	const handleMouseOver = (e: React.MouseEvent<HTMLSpanElement>) => {
		const mainImages = document.querySelectorAll(".mainImage");

		mainImages.forEach((video) => {
			video.classList.remove("realBlock");
			video.classList.remove("getNoneVideo");
		});

		if (e.currentTarget.classList.contains("creativeHover")) {
			mainImages[0].classList.add("getNoneVideo");
			mainImages[1].classList.add("realBlock");
			mainImages[2].classList.add("getNoneVideo");
		} else if (e.currentTarget.classList.contains("designHover")) {
			mainImages[0].classList.add("getNoneVideo");
			mainImages[1].classList.add("getNoneVideo");
			mainImages[2].classList.add("realBlock");
		} else if (e.currentTarget.classList.contains("mailHover")) {
			mainImages[0].classList.add("realBlock");
			mainImages[1].classList.add("getNoneVideo");
			mainImages[2].classList.add("getNoneVideo");
		}
	};

	const handleMouseLeave = () => {
		const mainImages = document.querySelectorAll(".mainImage");

		mainImages[0].classList.add("realBlock");
		mainImages[1].classList.remove("realBlock");
		mainImages[2].classList.remove("realBlock");
	};

	// custom-cursor start
	useEffect(() => {
		const cursorDot = document.querySelector(".cursor-dot") as HTMLElement;
		const cursorOutline = document.querySelector(
			".cursor-outline"
		) as HTMLElement;
		window.addEventListener("mousemove", (e) => {
			const posX = e.clientX;
			const posY = e.clientY;
			cursorDot.style.left = `${posX}px`;
			cursorDot.style.top = `${posY}px`;

			cursorOutline.style.left = `${posX}px`;
			cursorOutline.style.top = `${posY}px`;

			cursorOutline?.animate(
				{
					left: `${posX}px`,
					top: `${posY}px`,
				},
				{ duration: 500, fill: "forwards" }
			);
		});
	}, []);

	// Add hover effect for pointer elements
	useEffect(() => {
		document.querySelectorAll("*").forEach((el) => {
			el.addEventListener("mouseenter", () => {
				if (window.getComputedStyle(el).cursor === "pointer") {
					document.body.classList.add("pointer-hover");
				}
			});

			el.addEventListener("mouseleave", () => {
				document.body.classList.remove("pointer-hover");
			});
		});
	}, []);

	// animation start
	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("show");
				}
			});
		});
		const observer2 = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("toCenter");
				}
			});
		});

		const hiddenElements = document.querySelectorAll(".hidden");
		hiddenElements.forEach((el) => observer.observe(el));
		const fromCenterElements = document.querySelectorAll(".fromCenter");
		fromCenterElements.forEach((el) => observer2.observe(el));

		return () => {
			hiddenElements.forEach((el) => observer.unobserve(el));
			fromCenterElements.forEach((el) => observer2.unobserve(el));
		};
	}, []);

	// text animation start
	const [text, setText] = useState("");
	const fullText = `The media landscape is changing in front of our eyes, and brands need
	 to adapt how they communicate in order to thrive. Motion is the connective tissue between
	  a brand and its audience. It is a vital component of a brand’s platform, evolving
	   its ecosystem and communications in profound new ways.`;
	const timeDescRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setText("");
					const typeText = () => {
						for (let i = 0; i < fullText.length; i++) {
							setTimeout(() => {
								setText((prev) => prev + fullText[i]);
							}, i * 10);
						}
					};
					typeText();
					observer.unobserve(entry.target);
				}
			});
		});

		if (timeDescRef.current) {
			observer.observe(timeDescRef.current);
		}

		return () => {
			if (timeDescRef.current) {
				observer.unobserve(timeDescRef.current);
			}
		};
	}, []);
	// animation end

	// service info events start
	const showServiceInfo = (e: any) => {
		const target = e.target.parentElement.querySelector(".service-info");
		const minus = e.target.parentElement.querySelector(".minus");
		const plus = e.target.parentElement.querySelector(".plus");

		if (target.classList.contains("disappearWithAnimation")) {
			target.classList.remove("disappearWithAnimation");
			target.classList.add("appearWithAnimation");
			minus.classList.remove("disappearWithAnimation");
			plus.classList.add("disappearWithAnimation");
		} else {
			target.classList.add("disappearWithAnimation");
			target.classList.remove("appearWithAnimation");
			minus.classList.add("disappearWithAnimation");
			plus.classList.remove("disappearWithAnimation");
		}
	};
	const showServiceInfo2 = (e: any) => {
		const target =
			e.target.parentElement.parentElement.querySelector(".service-info");
		const minus = e.target.parentElement.parentElement.querySelector(".minus");
		const plus = e.target.parentElement.parentElement.querySelector(".plus");
		if (target.classList.contains("disappearWithAnimation")) {
			target.classList.remove("disappearWithAnimation");
			target.classList.add("appearWithAnimation");
			minus.classList.remove("disappearWithAnimation");
			plus.classList.add("disappearWithAnimation");
		} else {
			target.classList.add("disappearWithAnimation");
			target.classList.remove("appearWithAnimation");
			minus.classList.add("disappearWithAnimation");
			plus.classList.remove("disappearWithAnimation");
		}
	};

	// packing items click
	const handlePackingItem = (e: any) => {
		let target = e.target;

		if (
			e.target.classList.contains("packing-item-title") ||
			e.target.classList.contains("pack-price") ||
			e.target.classList.contains("blackLine") ||
			e.target.classList.contains("list-wrapper") ||
			e.target.classList.contains("packing-btn") ||
			e.target.classList.contains("overallBtn")
		) {
			target = e.target.parentElement;
		} else if (e.target.classList.contains("packing-list")) {
			target = e.target.parentElement.parentElement;
		}

		if (target.className === "packing-item") {
			const packingItems = document.querySelectorAll(".packing-item");
			packingItems.forEach((item) => {
				item.classList.remove("packing-item-click");

				const title = item.querySelector(".packing-item-title") as HTMLElement;
				const price = item.querySelector(".pack-price") as HTMLElement;
				const packingBtn = item.querySelector(".packing-btn") as HTMLElement;
				const list = item.querySelectorAll(".packing-list");
				title.classList.remove("packing-list-click");
				price.classList.remove("packing-list-click");
				packingBtn.classList.remove("packing-btn-click");
				list.forEach(
					(element: { classList: { remove: (arg0: string) => void } }) => {
						element.classList.remove("packing-list-click");
					}
				);
			});

			target.classList.add("packing-item-click");

			const title = target.querySelector(".packing-item-title");
			const price = target.querySelector(".pack-price");
			const packingBtn = target.querySelector(".packing-btn");
			const list = target.querySelectorAll(".packing-list");
			title.classList.add("packing-list-click");
			price.classList.add("packing-list-click");
			packingBtn.classList.add("packing-btn-click");
			list.forEach(
				(element: { classList: { add: (arg0: string) => void } }) => {
					element.classList.add("packing-list-click");
				}
			);
		}
	};

	// review next and back clicks
	let pxForBodyContent = 0;
	const shiftAmount = 100;

	let startX = 0;
	let currentX = 0;
	let isSwiping = false;

	// Review next and back clicks
	const revNextClick = () => {
		const bodyContents = document.querySelectorAll(
			".body-content"
		) as NodeListOf<HTMLElement>;
		if (pxForBodyContent >= (bodyContents.length - 1) * shiftAmount) return;
		pxForBodyContent += shiftAmount;
		bodyContents.forEach((content) => {
			content.style.transform = `translateX(-${pxForBodyContent}%)`;
		});
	};

	const revBackClick = () => {
		if (pxForBodyContent <= 0) return;
		pxForBodyContent -= shiftAmount;
		const bodyContents = document.querySelectorAll(
			".body-content"
		) as NodeListOf<HTMLElement>;
		bodyContents.forEach((content) => {
			content.style.transform = `translateX(-${pxForBodyContent}%)`;
		});
	};

	// Handle touch events
	const handleTouchStart = (e: TouchEvent) => {
		startX = e.touches[0].clientX;
		isSwiping = true;
	};

	const handleTouchMove = (e: TouchEvent) => {
		if (!isSwiping) return;
		currentX = e.touches[0].clientX;
	};

	const handleTouchEnd = () => {
		if (!isSwiping) return;
		const diffX = startX - currentX;

		if (diffX > 50) {
			revNextClick();
		} else if (diffX < -50) {
			revBackClick();
		}

		isSwiping = false;
	};

	useEffect(() => {
		const reviewBody = document.querySelector(".review-body") as HTMLElement;

		// Add touch event listeners
		reviewBody.addEventListener("touchstart", handleTouchStart);
		reviewBody.addEventListener("touchmove", handleTouchMove);
		reviewBody.addEventListener("touchend", handleTouchEnd);

		// Cleanup event listeners on unmount
		return () => {
			reviewBody.removeEventListener("touchstart", handleTouchStart);
			reviewBody.removeEventListener("touchmove", handleTouchMove);
			reviewBody.removeEventListener("touchend", handleTouchEnd);
		};
	}, []);

	const ScrollToBottom = () => {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: "smooth",
		});

		return null;
	};

	return (
		<>
			<div className="cursor-dot"></div>
			<div className="cursor-outline"></div>
			<div className="bottomOfHeader">
				<div className="hidden">
					<h1 className="head-title hidden">
						<span
							onMouseLeave={handleMouseLeave}
							onMouseOver={handleMouseOver}
							className="forBorder mailHover"
						>
							Стратегия
						</span>{" "}
						<span
							onMouseLeave={handleMouseLeave}
							onMouseOver={handleMouseOver}
							className="forBorder creativeHover"
						>
							Креатив
						</span>{" "}
						<span
							onMouseLeave={handleMouseLeave}
							onMouseOver={handleMouseOver}
							className="forBorder designHover"
						>
							Дизайн 
						</span>
					</h1>
					<p className="head-desc hidden">
						Комплексный подход к разработке коммуникаций между брендом и
						клиентом
					</p>
					<video
						src="/MainPage/mail.mp4"
						className="mainImage mailVideo"
						autoPlay
						loop
						muted
						preload="auto"
					/>
					<video
						src="/MainPage/creative-main.mp4"
						className="mainImage creativeVideo"
						autoPlay
						loop
						muted
						preload="auto"
					/>
					<video
						src="/MainPage/design.mp4"
						className="mainImage designVideo"
						autoPlay
						loop
						muted
						preload="auto"
					/>
					{
						//<img
						//	src="/MainPage/adaptive-headImg.png"
						//	alt=""
						//className="adaptiveImg"
						///>
					}
				</div>
			</div>

			<div className="mainPageWrapper hidden">
				<div className="components-wrapper hidden">
					<div className="components">
						<Link href={"/Corporate"}>
							<button className="overallBtn hasHover component-item click-item">
								Фирменный стиль →
							</button>
						</Link>
						<Link href={"/BrandStrategy"}>
							<button className="overallBtn hasHover component-item">
								Стратегия →
							</button>
						</Link>
						<Link href={"/Descriptor"}>
							<button className="overallBtn hasHover component-item">
								Слоган и дескриптор →
							</button>
						</Link>
						<Link href={"/Rebranding"}>
							<button className="overallBtn hasHover component-item">
								Ребрендинг →
							</button>
						</Link>

						<button className="overallBtn hasHover component-item">3D →</button>

						<Link href={"/MDesign"}>
							<button className="overallBtn hasHover component-item">
								Motio design →
							</button>
						</Link>
						<Link href={"/Logo"}>
							<button className="overallBtn hasHover component-item">
								Логотип →
							</button>
						</Link>
						<Link href={"/Naming"}>
							<button className="overallBtn hasHover component-item">
								Неймиг →{" "}
							</button>
						</Link>
						<button className="overallBtn hasHover component-item">
							Рекламный креатив →
						</button>
						<Link href={"/Site"}>
							<button className="overallBtn hasHover component-item">
								Сайт →
							</button>
						</Link>
					</div>
				</div>

				<div className="timeToWrapper hidden">
					<h2 className="timeToTitle">
						<span className="yellowSide">time to</span> - это команда
						экспертов,повседневная практика показывает, что консультация с
						широким активом
					</h2>

					<div className="timeToBody">
						<div className="timeLeft hidden">
							<p ref={timeDescRef} className="timeDesc">
								{text}
							</p>

							<Link href={"/Contact"}>
								<button className="overallBtn hasHover timeBtn hidden">
									время познакомиться →
								</button>
							</Link>
						</div>
						<div className="timeRight hidden">
							<div className="forOrder">
								<div className="timerightItem">
									<p className="numberRight">15+</p>
									<p className="textRight">Человек в команде</p>
								</div>
								<div className="timerightItem ten changePlaceN hidden">
									<p className="numberRight">30+</p>
									<p className="textRight">Успешных проектов</p>
								</div>
								<div className="timerightItem changePlaceB hidden">
									<p className="numberRight">
										<span className="beSmall">100</span>%
									</p>
									<p className="textRight">Эффективности</p>
								</div>
							</div>
							<div className="forOrder">
								<div className="timerightItem timeToTen">
									<p className="numberRight">10</p>
									<p className="textRight textRight10">
										лет опыта в маркетинге
									</p>
								</div>
								<div className="timerightItem changePlaceN hidden">
									<p className="numberRight">100%</p>
									<p className="textRight">Эффективности</p>
								</div>
								<div className="timerightItem ten changePlaceB hidden">
									<p className="numberRight">30+</p>
									<p className="textRight">Успешных проектов</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<CasesPart />

				<div className="yellow-wrapper fromCenter">
					<div className="yellow-left">
						<h3 className="yellow-title">
							Хочешь подобное для своего бизнеса?
						</h3>

						<Link href={"/Contact"}>
							<button className="overallBtn yellowBtn">
								время познакомиться →
							</button>
						</Link>
					</div>

					<div className="yellow-right">
						<img src="/MainPage/Vector.png" alt="" className="yellow-tt-img" />
					</div>
				</div>

				<div className="services-wrapper hidden">
					<h2 className="overallTitle services-title">Услуги</h2>

					<div className="hidden">
						<div className="service-item ">
							<div onClick={showServiceInfo} className="service-item-face">
								<div className="numberWrap">
									<p className="service-num">01</p>
									<h4 className="service-name">Стратегия</h4>
								</div>
								<img
									onClick={showServiceInfo2}
									src="/MainPage/plus-icon.png"
									alt=""
									className="plusMinus plus"
								/>
								<img
									onClick={showServiceInfo2}
									src="/MainPage/minus-icon.png"
									alt=""
									className="plusMinus minus disappearWithAnimation"
								/>
							</div>
							<div className="service-info disappearWithAnimation">
								<p className="service-desc">
									The media landscape is changing in front of our eyes, and
									brands need to adapt how they communicate in order to thrive.
									Motion is the connective tissue between a brand and its
									audience. It is a vital component of a brand’s platform,
									evolving its ecosystem and communications in profound new
									ways.
								</p>
								<div className="service-btns">
									<Link href={"/Logo"}>
										<button className="overallBtn hasHover service-btn">
											Логотип
										</button>
									</Link>
									<Link href={"/Corporate"}>
										<button className="overallBtn hasHover service-btn">
											Фирменный стиль
										</button>
									</Link>
									<Link href={"/MDesign"}>
										<button className="overallBtn hasHover service-btn">
											Motio design
										</button>
									</Link>
									<Link href={"/Site"}>
										<button className="overallBtn hasHover service-btn">
											Сайт
										</button>
									</Link>
									<Link href={"/Guideline"}>
										<button className="overallBtn hasHover service-btn">
											Брендбук и гайдлайн
										</button>
									</Link>
									<Link href={"/Packing"}>
										<button className="overallBtn hasHover service-btn">
											Упаковка
										</button>
									</Link>
									<Link href={"/ThreeDPage"}>
										<button className="overallBtn hasHover service-btn">
											3D
										</button>
									</Link>
									<Link href={"/Presentation"}>
										<button className="overallBtn hasHover service-btn">
											Дизайн презентаций
										</button>
									</Link>
									<Link href={"/Padpiski"}>
										<button className="overallBtn hasHover service-btn">
											Дизайн подписка
										</button>
									</Link>
								</div>
							</div>
						</div>
						<div className="service-item ">
							<div onClick={showServiceInfo} className="service-item-face">
								<div className="numberWrap">
									<p className="service-num">02</p>
									<h4 className="service-name">Креатив</h4>
								</div>
								<img
									onClick={showServiceInfo2}
									src="/MainPage/plus-icon.png"
									alt=""
									className="plusMinus plus"
								/>
								<img
									onClick={showServiceInfo2}
									src="/MainPage/minus-icon.png"
									alt=""
									className="plusMinus minus disappearWithAnimation"
								/>
							</div>
							<div className="service-info disappearWithAnimation">
								<p className="service-desc">
									The media landscape is changing in front of our eyes, and
									brands need to adapt how they communicate in order to thrive.
									Motion is the connective tissue between a brand and its
									audience. It is a vital component of a brand’s platform,
									evolving its ecosystem and communications in profound new
									ways.
								</p>
								<div className="service-btns">
									<Link href={"/Logo"}>
										<button className="overallBtn hasHover service-btn">
											Логотип
										</button>
									</Link>
									<Link href={"/Corporate"}>
										<button className="overallBtn hasHover service-btn">
											Фирменный стиль
										</button>
									</Link>
									<Link href={"/MDesign"}>
										<button className="overallBtn hasHover service-btn">
											Motio design
										</button>
									</Link>
									<Link href={"/Site"}>
										<button className="overallBtn hasHover service-btn">
											Сайт
										</button>
									</Link>
									<Link href={"/Guideline"}>
										<button className="overallBtn hasHover service-btn">
											Брендбук и гайдлайн
										</button>
									</Link>
									<Link href={"/Packing"}>
										<button className="overallBtn hasHover service-btn">
											Упаковка
										</button>
									</Link>
									<Link href={"/ThreeDPage"}>
										<button className="overallBtn hasHover service-btn">
											3D
										</button>
									</Link>
									<Link href={"/Presentation"}>
										<button className="overallBtn hasHover service-btn">
											Дизайн презентаций
										</button>
									</Link>
									<Link href={"/Padpiski"}>
										<button className="overallBtn hasHover service-btn">
											Дизайн подписка
										</button>
									</Link>
								</div>
							</div>
						</div>
						<div className="service-item ">
							<div onClick={showServiceInfo} className="service-item-face">
								<div className="numberWrap">
									<p className="service-num">03</p>
									<h4 className="service-name">Дизайн</h4>
								</div>
								<img
									onClick={showServiceInfo2}
									src="/MainPage/plus-icon.png"
									alt=""
									className="plusMinus plus"
								/>
								<img
									onClick={showServiceInfo2}
									src="/MainPage/minus-icon.png"
									alt=""
									className="plusMinus minus disappearWithAnimation"
								/>
							</div>
							<div className="service-info disappearWithAnimation">
								<p className="service-desc">
									The media landscape is changing in front of our eyes, and
									brands need to adapt how they communicate in order to thrive.
									Motion is the connective tissue between a brand and its
									audience. It is a vital component of a brand’s platform,
									evolving its ecosystem and communications in profound new
									ways.
								</p>
								<div className="service-btns">
									<Link href={"/Logo"}>
										<button className="overallBtn hasHover service-btn">
											Логотип
										</button>
									</Link>
									<Link href={"/Corporate"}>
										<button className="overallBtn hasHover service-btn">
											Фирменный стиль
										</button>
									</Link>
									<Link href={"/MDesign"}>
										<button className="overallBtn hasHover service-btn">
											Motio design
										</button>
									</Link>
									<Link href={"/Site"}>
										<button className="overallBtn hasHover service-btn">
											Сайт
										</button>
									</Link>
									<Link href={"/Guideline"}>
										<button className="overallBtn hasHover service-btn">
											Брендбук и гайдлайн
										</button>
									</Link>
									<Link href={"/Packing"}>
										<button className="overallBtn hasHover service-btn">
											Упаковка
										</button>
									</Link>
									<Link href={"/ThreeDPage"}>
										<button className="overallBtn hasHover service-btn">
											3D
										</button>
									</Link>
									<Link href={"/Presentation"}>
										<button className="overallBtn hasHover service-btn">
											Дизайн презентаций
										</button>
									</Link>
									<Link href={"/Padpiski"}>
										<button className="overallBtn hasHover service-btn">
											Дизайн подписка
										</button>
									</Link>
								</div>
							</div>
						</div>
						<div className="service-foot hidden">
							<p className="service-foot-desc">
								Про то что мы вообще много всего умеем, просто обращайтесь к нам
								и мы придумаем как креативно решить вашу задачу. Про то что мы
								вообще много всего умеем, просто обращайтесь к нам и мы Про то
								что мы вообще много всего умеем, просто обращайтесь
							</p>
							<button className="overallBtn hasHover service-foot-btn ">
								подробнее →
							</button>
						</div>
					</div>
				</div>

				<div className="packing-wrapper hidden">
					<div className="packing-head">
						<h2 className="overallTitle packing-title">Упаковка</h2>

						<p className="packing-desc">
							Выбери оптимально подходящий пакет для своего бизнеса. Эти три
							вида упаковки помогут бла бла бла и так далее и тому подобное.
						</p>
					</div>

					<div className="packing-body hidden">
						<div onClick={handlePackingItem} className="packing-item">
							<h3 className="packing-item-title">ДЕБЮТ</h3>
							<h3 className="pack-price">150 000 ₽</h3>

							<div className="blackLine"></div>

							<ul className="list-wrapper">
								<li className="packing-list">Логотип</li>
								<li className="packing-list">Фирменный стиль</li>
								<li className="packing-list">Фирменный носители</li>
							</ul>
							<button
								onClick={ScrollToBottom}
								className=" packing-btn overallBtn"
							>
								Оставить заявку →
							</button>
						</div>
						<div onClick={handlePackingItem} className="packing-item">
							<h3 className="packing-item-title">ОПТИМУС ПРАЙС</h3>
							<h3 className="pack-price">240 000 ₽</h3>

							<div className="blackLine"></div>

							<ul className="list-wrapper">
								<li className="packing-list">Нейминг</li>
								<li className="packing-list">Логотип</li>
								<li className="packing-list">Фирменный стиль</li>
								<li className="packing-list">Фирменные носители</li>
							</ul>
							<button
								onClick={ScrollToBottom}
								className=" packing-btn overallBtn"
							>
								Оставить заявку →
							</button>
						</div>
						<div onClick={handlePackingItem} className="packing-item">
							<h3 className="packing-item-title">Макси-секси</h3>
							<h3 className="pack-price">500 000 ₽</h3>

							<div className="blackLine"></div>

							<ul className="list-wrapper">
								<li className="packing-list">Бренд-платформа</li>
								<li className="packing-list">Нейминг</li>
								<li className="packing-list">Логотип</li>
								<li className="packing-list">Фирменный стиль</li>
								<li className="packing-list">Фирменный носители</li>
								<li className="packing-list">Бренд-гайд</li>
							</ul>
							<button
								onClick={ScrollToBottom}
								className=" packing-btn overallBtn"
							>
								Оставить заявку →
							</button>
						</div>
					</div>
				</div>

				<div className="workWith-wrapper hidden">
					<h2 className="overallTitle workWithTitle">Работали с</h2>

					<div className="workWithBody hidden">
						<img
							src="/MainPage/something-new.png"
							alt=""
							className="workWithImg"
						/>

						<img
							src="/MainPage/ScreenOfAdaptive.png"
							alt=""
							className="adaptiveParts"
						/>
					</div>
				</div>

				<div className="review-wrapper hidden">
					<div className="review-head">
						<h2 className="review-title overallTitle">Отзывы</h2>

						<div>
							<button className="overallBtn hasHover review-btn ">
								Все отзывы →
							</button>
						</div>
					</div>

					<div className="rev-body-wrap">
						<div className="review-body hidden">
							<div className="body-content">
								<div className="thePerson">
									<div className="person-left">
										<img
											src="/MainPage/the-person.png"
											alt=""
											className="person-img"
										/>
										<div className="person-info">
											<h3 className="person-name">Андрей Румянцев</h3>
											<p className="person-desc">
												Генеральный директор, Conect P
											</p>
										</div>
									</div>
									<h2 className="review-numbers">
										01<span className="overall-reviews">/10</span>
									</h2>
								</div>
								<p className="person-thoughts">
									The media landscape is changing in front of our eyes, and
									brands need to adapt how they communicate in order to thrive.
									Motion is the connective tissue between a brand and its
									audience. It is a vital component of a brand’s platform,
									evolving its ecosystem The media landscape is changing in
									front of
								</p>
								<div className="review-foot">
									<button className=" review-btn1 hasHover overallBtn hidden">
										Читать весь отзыв →
									</button>
									<Link href={"/Cases"}>
										<button className=" review-btn2 hasHover overallBtn hidden">
											Кейс →
										</button>
									</Link>
								</div>
							</div>
							<div className="body-content">
								<div className="thePerson">
									<div className="person-left">
										<img
											src="/MainPage/the-person.png"
											alt=""
											className="person-img"
										/>
										<div className="person-info">
											<h3 className="person-name">Андрей Румянцев</h3>
											<p className="person-desc">
												Генеральный директор, Conect P
											</p>
										</div>
									</div>
									<h2 className="review-numbers">
										02<span className="overall-reviews">/10</span>
									</h2>
								</div>
								<p className="person-thoughts">
									The media landscape is changing in front of our eyes, and
									brands need to adapt how they communicate in order to thrive.
									Motion is the connective tissue between a brand and its
									audience. It is a vital component of a brand’s platform,
									evolving its ecosystem The media landscape is changing in
									front of
								</p>
								<div className="review-foot">
									<button className=" review-btn1 hasHover overallBtn hidden">
										Читать весь отзыв →
									</button>
									<Link href={"/Cases"}>
										<button className=" review-btn2 hasHover overallBtn hidden">
											Кейс →
										</button>
									</Link>
								</div>
							</div>
						</div>
						<img
							src="/MainPage/arrow-right.svg"
							alt=""
							className="arrow-left"
							onClick={revBackClick}
						/>
						<img
							src="/MainPage/arrow-right.svg"
							alt=""
							className="arrow-right"
							onClick={revNextClick}
						/>
					</div>

					<button className="overallBtn review-btn review-btn-b ">
						Все отзывы →
					</button>
				</div>
			</div>
		</>
	);
};

export default MmainPage;
