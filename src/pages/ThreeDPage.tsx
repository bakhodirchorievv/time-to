// import "../styles/ThreeDPage/ThreeDPage.css";
// import "../styles/ThreeDPage/ThreeDPageResponsive.css";

import Head from "next/head";

const ThreeDPage = () => {
	return (
		<>
			<Head>
				<link rel="stylesheet" href="/styles/ThreeDPage/ThreeDPage.css" />
			</Head>
			<Head>
				<link
					rel="stylesheet"
					href="/styles/ThreeDPage/ThreeDPageResponsive.css"
				/>
			</Head>
			<div className="threeD-wrapper">
				<div className="innerHead">
					<h2 className="main-title">
						Захватывающие <span className="yellowFont">3D анимации</span> для
						вашего бренда
					</h2>
					<p className="title-desc">
						Профессиональные услуги по созданию моушн-дизайна, которые оживят
						ваши идеи и привлекут внимание аудитории
					</p>
				</div>

				<div className="first-part">
					<h3 className="generalTitle first-title">
						3D Моушн-дизайн (3D Motion Design)
					</h3>
					<p className="firstSectionDesc">
						Это процесс создания анимированных трёхмерных графических элементов,
						включающих текст, иллюстрации, значки и формы, с целью визуального
						представления информации, идей или концепций в трехмерном
						пространстве. Эта технология объединяет элементы традиционного
						моушн-дизайна и 3D-графики, создавая более реалистичные и
						захватывающие визуальные эффекты.
					</p>
					<p className="firstSectionDesc">
						Наша компания является экспертом в области моушн-дизайна для бизнеса
						и медиа. Мы осознаем, что высококачественная анимация и динамическое
						оформление могут сыграть особую роль для успеха вашего бренда.
					</p>
					<p className="firstSectionDesc">
						Частая проблема, с которой сталкиваются многие бизнесы и
						медиапроекты, заключается в том, что неэффективная или скучная
						анимация не только может ухудшить узнаваемость и привлекательность
						бренда, но и создать препятствия для его успешного продвижения.
					</p>
					<p className="firstSectionDesc">
						Наша компания решает эту задачу, предлагая современные креативные
						подходы к созданию моушн-дизайна, который не только точно передает
						суть бренда, но и запоминается своей эффектностью. Мы гарантируем,
						что с нашими услугами ваш бренд будет выделяться на рынке и
						привлекать внимание вашей целевой аудитории.
					</p>

					<div className="firstImgWrap">
						<img
							src="/MainPage/threeD-mainImage.png"
							alt=""
							className="firstSectionImg"
						/>
					</div>
				</div>

				<div className="third-part">
					<h3 className="generalTitle third-title">
						Зачем нужен 3D Моушн-дизайн (3D Motion Design)?
					</h3>
					<div className="thirdBody">
						<div className="thirdBodyItem">
							<h4 className="thirdBodyTitle">01</h4>
							<p className="thirdBodyDesc">
								Если ваша организация желает повысить известность бренда,
								моушн-дизайн (motion design) поможет разработать видеоклип,
								который представит ваш бренд в наилучшем освещении, привлечет
								новых потребителей.
							</p>
						</div>
						<div className="thirdBodyItem">
							<h4 className="thirdBodyTitle">02</h4>
							<p className="thirdBodyDesc">
								Если ваша фирма запускает новый товар или услугу, моушн-дизайн
								(motion design) может стать частью видеоматериала, который
								представит ваш продукт или услугу более эффектно, что привлечет
								больше внимания клиентов.
							</p>
						</div>
					</div>
					<div className="thirdBodyItem longThirdBodyItem">
						<h4 className="thirdBodyTitle">03</h4>
						<p className="thirdBodyDesc">
							Если ваша компания стремится увеличить объем продаж и улучшить
							коэффициент конверсии, моушн-дизайн (motion design) может помочь
							при создании видеороликов, которые подчеркивают преимущества
							вашего продукта или услуги и воздействуют на потребителей, что
							может привести к росту продаж и увеличению доходов.
						</p>
					</div>
				</div>

				<div className="second-part">
					<h3 className="generalTitle second-title">
						Выделяйтесь среди конкурентов всего за 4 шага с нами
					</h3>
					<div className="second-body">
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Анализ и планирование</h4>
								<p className="flashDesc">
									Обсуждаем ваши цели, целевую аудиторию и требования к проекту,
									чтобы создать чёткое представление о том, как должно выглядеть
									и функционировать ваше видео.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Разрабатываем концепции</h4>
								<p className="flashDesc">
									Создаем сценарий и визуальные макеты, чтобы определить
									структуру и стилистику анимации, включая ключевые элементы и
									сюжетные линии.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Создаем и анимируем</h4>
								<p className="flashDesc">
									Разрабатываем и анимируем графику, используя выбранные
									концепции и макеты, чтобы создать динамичный и привлекательный
									видеоматериал.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Обратная связь и доработка</h4>
								<p className="flashDesc">
									По окончании работы представляем вам готовый видеоролик для
									обсуждения и внесения правок, а затем завершаем проект с
									учётом ваших комментариев и пожеланий
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="fifth-part">
					<h3 className="generalTitle fifth-title">Нам доверяют</h3>
					<img
						src="/MainPage/fifth-image.png"
						alt=""
						className="fifthMainImg"
					/>
					<div className="fifth-foot">
						<div className="fifth-foot-item">
							<img
								src="/MainPage/fifth-first.png"
								alt=""
								className="fifth-foot-img"
							/>
							<div>
								<p className="fifthFootDesc">
									Работаем в индустрии брендинга с года
								</p>
							</div>
						</div>
						<div className="fifth-foot-item">
							<img
								src="/MainPage/fifth-second.png"
								alt=""
								className="fifth-foot-img"
							/>
							<div>
								<p className="fifthFootDesc">Реализовано более проектов</p>
							</div>
						</div>
						<div className="fifth-foot-item">
							<img
								src="/MainPage/fifth-third.png"
								alt=""
								className="fifth-foot-img"
							/>
							<div>
								<p className="fifthFootDesc">Более компаний обратились к нам</p>
							</div>
						</div>
					</div>

					<div className="fifth-part-foot">
						<h3 className="fifth-foot-title">
							Закажите 3D-дизайн в нашей компании и получите конкурентное
							преимущество!
						</h3>
						<div className="getsFlex">
							<p className="fifth-foot-desc">
								Если у Вас остались вопросы, оставьте заявку, и мы свяжемся с
								Вами в ближайшее время
							</p>

							<button className="fifth-foot-btn">Заполнить бриф →</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ThreeDPage;
