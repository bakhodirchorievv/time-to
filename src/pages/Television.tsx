// import "../styles/Television/Television.css";
// import "../styles/Television/TeleResponsive.css";

import Head from "next/head";

const Television = () => {
	return (
		<>
			<Head>
				<link rel="stylesheet" href="/styles/Television/Television.css" />
			</Head>
			<Head>
				<link rel="stylesheet" href="/styles/Television/TeleResponsive.css" />
			</Head>
			<div className="television-wrapper">
				<div className="innerHead">
					<h2 className="main-title">
						<span className="yellowFont">Реклама </span>
						на телевидении
					</h2>
					<p className="title-desc">
						Компания &quot;Наша Реклама&quot; рада представить вам новую
						возможность для эффективного продвижения вашего бренда! Теперь вы
						можете разместить свою рекламу на самых популярных телеканалах!
					</p>
				</div>

				<div className="first-part">
					<h4 className="generalTitle first-title">О нас</h4>

					<p className="firstSectionDesc">
						Телевизионная реклама используется для разнообразного воздействия на
						аудиторию. Она представляет визуальные образы в динамике, что
						привлекает внимание зрителей и оказывает комплексное воздействие.
					</p>
					<p className="firstSectionDesc">
						Целью телерекламы является не только продемонстрировать продукт или
						услугу, но и показать их применение, объяснить функциональные
						особенности и передать ощущения от использования.
					</p>

					<div className="firstImgWrap">
						<img
							src="/MainPage/televisionMainImg.png"
							alt=""
							className="firstSectionImg"
						/>
					</div>
				</div>

				<div className="second-part">
					<h3 className="generalTitle second-title">
						Рекламу на ТВ используют для
					</h3>
					<div className="second-body">
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">продвижения товаров и услуг</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">увеличения узнаваемости бренда</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">привлечения новых клиентов</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">стимулирования продаж</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">формирования лояльности</p>
							</div>
						</div>
					</div>

					<div className="secondPartBottom">
						<h2 className="generalTitle">Что мы предлагаем?</h2>
						<div className="bottomBody">
							<div className="bottomItem">
								<h4 className="bottomItemTitle">Широкий охват</h4>
								<p className="bottomItemDesc">
									Мы сотрудничаем с разнообразными каналами и выбираем
									оптимальные временные слоты, чтобы ваша реклама была замечена
									максимальным числом зрителей.
								</p>
							</div>
							<div className="bottomItem">
								<h4 className="bottomItemTitle">Индивидуальный подход</h4>
								<p className="bottomItemDesc">
									Наш коллектив экспертов готов помочь вам создать рекламную
									стратегию, идеально отвечающую вашим требованиям и финансовым
									возможностям.
								</p>
							</div>
						</div>
						<div className="bottomFoot">
							<h4 className="bottomItemTitle bottomFootTitle">
								Результативность
							</h4>
							<p className="bottomFootDesc">
								Наша цель - не просто разместить вашу рекламу на ТВ, но и
								обеспечить ее успешное исполнение. Мы стремимся к тому, чтобы
								каждая секунда вашей рекламы была использована наиболее
								эффективно, чтобы привлечь внимание, увеличить узнаваемость
								вашего бренда и поднять продажи или конверсию.
							</p>
						</div>
					</div>
				</div>

				<div className="third-part">
					<h3 className="generalTitle third-title">
						Какие инструменты для разработки телевизионной рекламы мы
						используем?
					</h3>

					{/*repetition*/}
					<div className="second-body">
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Видеоматериалы</h4>
								<p className="flashDesc">
									Работаем до согласования каждого этапа. Кайфуем от процесса
									работы и результата, который выдаем.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Звуковое оформление</h4>
								<p className="flashDesc">
									Быстро включаемся и работаем по целям и задачам клиента.
									Знаем, что и как делать для получения результата.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Изображения</h4>
								<p className="flashDesc">
									Дружелюбный сервис. Всегда выслушиваем все ваши пожелания и
									искренне хотим осуществить вам
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Текст</h4>
								<p className="flashDesc">
									Работа с нуля. У нас целая команда специалистов – дизайнеров,
									копирайтеров и аналитиков, которая способна создать уникальную
									презентацию конкретно для вас
								</p>
							</div>
						</div>
					</div>
					{/*repetition*/}
					<div className="third-part-foot">
						<h3 className="third-foot-title">
							Оставьте заявку, и мы обязательно свяжемся с вами!
						</h3>
						<div className="getsFlex">
							<p className="third-foot-desc">
								Наша команда готова превратить ваши идеи в яркую и
								запоминающуюся телевизионную рекламу, которая подчеркнет
								уникальность вашего бренда.
							</p>

							<button className="third-foot-btn">Заполнить бриф →</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Television;
