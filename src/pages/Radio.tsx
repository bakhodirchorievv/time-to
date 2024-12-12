// import "../styles/Radio/Radio.css";
// import "../styles/Radio/RadioResponsive.css";

import Head from "next/head";

const Radio = () => {
	return (
		<>
			<Head>
				<link rel="stylesheet" href="/styles/Radio/Radio.css" />
			</Head>
			<Head>
				<link rel="stylesheet" href="/styles/Radio/RadioResponsive.css" />
			</Head>
			<div className="radio-wrapper">
				<div className="innerHead">
					<h2 className="main-title">
						<span className="yellowFont">Реклама </span>
						на радио
					</h2>
					<p className="title-desc">
						Хотите, чтобы ваш бренд зазвучал на волне успеха? Мы предлагаем
						размещение рекламы на самых популярных радиостанциях Москвы и
						Питера! Доверьте нам вашу рекламу и позвольте вашему бизнесу
						зазвучать ярко и запоминающе!
					</p>
				</div>

				<div className="first-part">
					<h3 className="generalTitle first-title">
						Для чего используют рекламу на радио?
					</h3>
					<div className="third-body">
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Представление продукта</h4>
								<p className="flashDesc">
									демонстрирует новый товар или услугу, выделяет ключевые
									особенности и преимущества
								</p>
							</div>
						</div>
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">
									Информирование о специальных предложениях
								</h4>
								<p className="flashDesc notForAll">
									сообщает аудитории о доступных акциях, специальных ценах и
									подарках от компании
								</p>
							</div>
						</div>
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Сезонное напоминание о продукте</h4>
								<p className="flashDesc">
									напоминает о необходимых услугах в определенное время, таких
									как замена резины, стоматологические процедуры, подача
									декларации и другие
								</p>
							</div>
						</div>
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Передача ценностей компании</h4>
								<p className="flashDesc">
									раскрывает то, что важно для аудитории, выделяет основные
									преимущества и ценности бренда
								</p>
							</div>
						</div>
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Анонсирование мероприятий</h4>
								<p className="flashDesc">
									информирует о предстоящих событиях, включая тему, дату, время
									и целевую аудиторию
								</p>
							</div>
						</div>
					</div>

					<img src="/MainPage/radioMainImg.png" alt="" className="mainImg" />
				</div>

				<div className="second-part">
					<h3 className="generalTitle second-title">
						Почему выбирают именно нас?
					</h3>

					<div className="secondBody">
						<div className="secondBodyItem">
							<h4 className="secondBodyTitle">Профессионализм и опыт</h4>
							<p className="secondBodyDesc">
								наша компания имеет многолетний опыт работы в сфере рекламы на
								радио и предоставляет высококачественные услуги
							</p>
						</div>
						<div className="secondBodyItem">
							<h4 className="secondBodyTitle">Индивидуальный подход</h4>
							<p className="secondBodyDesc">
								мы разрабатываем уникальные медиапланы и креативные концепции,
								учитывая потребности и цели каждого клиента, что позволяет
								добиться максимальной эффективности рекламной кампании
							</p>
						</div>
						<div className="secondBodyItem">
							<h4 className="secondBodyTitle">Широкий выбор радиостанций</h4>
							<p className="secondBodyDesc">
								мы имеем хорошие партнерские отношения с различными
								радиостанциями, что позволяет нам предложить клиентам широкий
								выбор площадок для размещения рекламы
							</p>
						</div>
						<div className="secondBodyItem">
							<h4 className="secondBodyTitle">Комплексный подход</h4>
							<p className="secondBodyDesc">
								мы предоставляем полный спектр услуг по созданию и размещению
								рекламы на радио, начиная от разработки концепции и сценария до
								подготовки аудиоролика и контроля результатов
							</p>
						</div>
						<div className="secondBodyItem">
							<h4 className="secondBodyTitle">Прозрачность и отчетность</h4>
							<p className="secondBodyDesc">
								мы предоставляем клиентам прозрачные отчеты о результатах
								рекламной кампании, оперативно информируем об изменениях и
								всегда готовы ответить на любые вопросы
							</p>
						</div>
					</div>
				</div>

				<div className="third-part">
					<h3 className="generalTitle third-title">Как мы работаем?</h3>

					<div className="third-body">
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Шаг 1</h4>
								<p className="flashDesc">
									обратитесь к нам и поделитесь своими целями для рекламной
									кампании. Мы создадим уникальный медиаплан, учитывая вашу
									информацию, определим целевую аудиторию и подберем подходящие
									радиостанции.
								</p>
							</div>
						</div>
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Шаг 2</h4>
								<p className="flashDesc notForAll">
									предоставьте готовый ролик или доверьте его создание нашей
									команде профессионалов.
								</p>
							</div>
						</div>
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Шаг 3</h4>
								<p className="flashDesc">
									мы разработаем сценарий ролика, подберем идеальный голос
									диктора, проведем студийную запись и согласуем все детали с
									вами. Здесь же будет произведено подписание документов и
									оплата услуг.
								</p>
							</div>
						</div>
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Шаг 4</h4>
								<p className="flashDesc">
									запуск рекламной кампании с ежедневным контролем выходов. Мы
									оперативно предоставим все необходимые отчеты и закрывающие
									документы по завершении размещения
								</p>
							</div>
						</div>
					</div>

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

export default Radio;
