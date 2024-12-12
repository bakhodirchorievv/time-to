// import "../styles/Padpiski/Padpiski.css";
// import "../styles/Padpiski/PadpiskiResponsive.css";

import Head from "next/head";

const Padpiski = () => {
	return (
		<>
			<Head>
				<link rel="stylesheet" href="/styles/Padpiski/Padpiski.css" />
			</Head>
			<Head>
				<link rel="stylesheet" href="/styles/Padpiski/PadpiskiResponsive.css" />
			</Head>
			<div className="padpiski-wrapper">
				<div className="innerHead">
					<h2 className="main-title">
						Экономьте с помощью{" "}
						<span className="yellowFont">дизайн-подписки</span>
					</h2>
					<p className="title-desc">
						Исполнение всех ваших запросов по дизайну за фиксированную
						стоимость!
					</p>
				</div>

				<div className="first-part">
					<h3 className="generalTitle first-title">Дизайн-подписка</h3>
					<p className="firstSectionDesc">
						Это форма сотрудничества между бизнесом и дизайнерской студией, при
						которой клиент получает комплексное решение всех своих вопросов,
						связанных с визуальным оформлением, оплачивая их фиксированную сумму
						ежемесячно.
					</p>
					<p className="firstSectionDesc">
						Наша компания является экспертом в области дизайна для бизнеса и
						медиа. Мы понимаем, что качественное визуальное оформление имеет
						огромное значение для успеха бренда. Часто недооценивается,
						насколько ключевым этапом является создание дизайна для компании,
						продукта или услуги.
					</p>
					<p className="firstSectionDesc">
						Частая проблема, с которой сталкиваются многие бизнесы и
						медиапроекты, заключается в том, что неэффективный или неинтересный
						визуал не только может ухудшить узнаваемость и привлекательность
						бренда, но и создать препятствия для его успешного продвижения.
					</p>
					<p className="firstSectionDesc">
						Наша компания решает эту проблему, предлагая креативные подходы к
						созданию визуального контента, который не только точно отражает суть
						бренда, но и запоминается своей оригинальностью и
						привлекательностью. Мы гарантируем, что с нашими услугами ваш бренд
						будет выделяться на рынке и привлекать внимание вашей аудитории.
					</p>

					<div className="firstImgWrap">
						<img
							src="/MainPage/padpiski-mainImage.png"
							alt=""
							className="firstSectionImg"
						/>
					</div>
				</div>

				<div className="second-part">
					<h3 className="generalTitle second-title">Как будем работать?</h3>
					<p className="firstSectionDesc padpiskaOne">
						В течение месяца мы будем реализовывать ваши любые запросы по
						дизайну по следующим шагам:
					</p>
					<div className="second-body">
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Определим цели</h4>
								<p className="flashDesc">
									В ходе беседы мы поймем ваши точные цели и ожидания от
									проекта, чтобы обеспечить наилучший результат
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Изучим рынок</h4>
								<p className="flashDesc">
									Мы проведем анализ рынка и выявим актуальные тенденции и
									предпочтения, чтобы дизайн соответствовал требованиям вашей
									индустрии
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Запустим творческий процесс</h4>
								<p className="flashDesc">
									На основе полученной информации мы приступим к созданию
									уникального и привлекательного визуального контента, учитывая
									все наши выводы и аналитику.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Проверим уникальност</h4>
								<p className="flashDesc">
									Мы тщательно проверяем созданный дизайн на уникальность и
									соответствие вашим требованиям и стандартам.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Обсудим результаты</h4>
								<p className="flashDesc">
									Мы представим вам готовые варианты дизайна и подробно обсудим
									их потенциал и соответствие вашим целям и ожиданиям.
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
							Закажите дизайн-подписку в нашей компании и сэкономьте свои
							ресурсы!
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

export default Padpiski;
