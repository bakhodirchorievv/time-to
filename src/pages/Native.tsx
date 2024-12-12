// import "../styles/Native/Native.css";
// import "../styles/Native/NativeResponsive.css";

import Head from "next/head";

const Native = () => {
	return (
		<>
			<Head>
				<link rel="stylesheet" href="/styles/Native/Native.css" />
			</Head>
			<Head>
				<link rel="stylesheet" href="/styles/Native/NativeResponsive.css" />
			</Head>
			<div className="native-wrapper">
				<div className="innerHead">
					<h2 className="main-title">
						<span className="yellowFont">Реклама </span>нативная
					</h2>
					<p className="title-desc">
						Услуги создания и размещения нативной рекламы
					</p>
					<p className="title-desc">
						Нативная реклама — это реклама, которая демонстрирует ценность
						продукта, не восхваляя его преимущества с призывами покупки,
						зачастую воспринимается пользователями как рекомендация, поэтому не
						вызывает отторжения.
					</p>
				</div>

				<div className="first-part">
					<h3 className="generalTitle first-title"> О нас</h3>
					<p className="firstSectionDesc">
						Наша компания является экспертом в области продвижения бизнеса и
						нативной рекламы. Мы понимаем, что в современном мире, где интернет
						заполнен разнообразными рекламными материалами, включая баннеры,
						всплывающие окна и привлекательные заголовки, люди стали привыкать
						игнорировать этот поток информации, стремящийся привлечь их
						внимание. Однако продукты и услуги не могут продвигаться сами по
						себе, поэтому все чаще прибегают к использованию нативной рекламы.
					</p>

					<div className="firstImgWrap">
						<img
							src="/MainPage/nativeMainImg.png"
							alt=""
							className="firstSectionImg"
						/>
					</div>
				</div>

				<div className="second-part">
					<h3 className="generalTitle second-title">
						Что вы получите, если закажите нативную рекламу у нас?
					</h3>
					<div className="second-body">
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Естественность</h4>
								<p className="flashDesc">
									Ненавязчивая реклама считывается вместе с остальным
									наполнением ресурса. Она не утомляет и не раздражает
									пользователя, поскольку акцент смещен в сторону полезной или
									интересной информации
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Минимальный риск игнора</h4>
								<p className="flashDesc">
									Опытные пользователи уже не замечают рекламные баннеры, сразу
									пролистывая их или блокируя через дополнительный софт.
									Нативные материалы сложно проигнорировать, поскольку они
									практически ничем не отличаются от обычных
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Обход блокировок</h4>
								<p className="flashDesc">
									Блокировщики рекламы, в том числе популярный AdBlock, не
									причисляют нативку к обычной рекламе, т. к. она гармонично
									встроена в содержимое площадки и является частью контента
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Высокая вовлеченность</h4>
								<p className="flashDesc">
									Хорошая нативная статья, пост в социальной сети или видеообзор
									сами по себе интересны пользователям, поэтому люди с
									удовольствием изучают такой контент и делятся им с другими
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Универсальность</h4>
								<p className="flashDesc">
									С помощью этого инструмента можно продвигать практически любой
									продукт – от автомобильных шин до детского питания. Главное –
									найти платформу, где собирается ваша ЦА
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Длинный срок действия</h4>
								<p className="flashDesc">
									Стандартная реклама прекращает свою работу сразу после
									завершения основной кампании. Нативка же остается висеть в
									медиа или ленте, привлекая новую аудиторию.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="third-part">
					<h3 className="generalTitle third-title">Форматы нативной рекламы</h3>
					<div className="thirdBody">
						<div className="thirdBodyItem">
							<h4 className="thirdBodyTitle">Спонсорский контент</h4>
							<p className="thirdBodyDesc">
								Это статьи, в которых упоминается бренд, но сам материал
								рассказывает о другой теме, например, о жизни основателя
								компании. Хорошо работает материал о проблеме, которая была
								решена с помощью продукции бренда. Читатель убеждается в том,
								что проблема существует и есть решение.
							</p>
						</div>
						<div className="thirdBodyItem">
							<h4 className="thirdBodyTitle"> PR-статья</h4>
							<p className="thirdBodyDesc">
								Этот материал написан как обычная статья по новостной теме,
								например обзор новой линейки товаров бренда.
							</p>
						</div>
						<div className="thirdBodyItem">
							<h4 className="thirdBodyTitle">Мнение эксперта</h4>
							<p className="thirdBodyDesc">
								В данном формате сотрудник компании выступает экспертом по
								определенной проблеме. Если материал содержит убедительные
								аргументы и факты - это повысит доверие к бренду у читателей
							</p>
						</div>
						<div className="thirdBodyItem">
							<h4 className="thirdBodyTitle">Рекомендуемые материалы</h4>
							<p className="thirdBodyDesc">
								Эта статья размещается на сайте или в соцсетях компании и
								указывается как ссылка на другой материал. Пользователь,
								заинтересовавшийся, переходит по ссылке и знакомится с брендом
							</p>
						</div>
					</div>
				</div>

				<div className="fourth-part">
					<h3 className="generalTitle fourth-title">Почему именно мы?</h3>

					<div className="fourth-body">
						<div className="fourthBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">15 лет опыта</p>
							</div>
						</div>
						<div className="fourthBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">100+ сотрудников</p>
							</div>
						</div>
						<div className="fourthBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">400+ выполненных заказов</p>
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
							Хотите раскрыть потенциал своего бренда?
						</h3>
						<div className="getsFlex">
							<p className="fifth-foot-desc">
								Мы вам поможем!  Оставьте заявку, и мы свяжемся с вами в скором
								времени!
							</p>

							<button className="fifth-foot-btn">Заполнить бриф →</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Native;
