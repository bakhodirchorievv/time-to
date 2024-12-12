import Link from "next/link";
// import "../styles/Souvenir/Souvenir.css";
// import "../styles/Souvenir/SouvenirResponsive.css";
// get data from firebase
import { db } from "./FirebaseConfig";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import Head from "next/head";

interface SouvenirCard {
	id: string;
	title: string;
	desc: string;
	imageUrl: string;
	userId?: string;
}

const Souvenir = () => {
	//get data from firebase
	const [SouvenirCardList, setSouvenirCardList] = useState<SouvenirCard[]>([]);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const SouvenirCardsCollectionRef = collection(db, "SouvenirCards");

	const getSouvenirCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(SouvenirCardsCollectionRef);
			const filteredData: SouvenirCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<SouvenirCard, "id">),
				id: doc.id,
			}));
			setSouvenirCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		getSouvenirCardList();
		console.log(SouvenirCardList);
	}, []);
	return (
		<>
			<Head>
				<link rel="stylesheet" href="/styles/Souvenir/Souvenir.css" />
			</Head>
			<Head>
				<link rel="stylesheet" href="/styles/Souvenir/SouvenirResponsive.css" />
			</Head>
			<div className="souvenir-wrapper">
				<div className="innerHead">
					<h2 className="main-title">
						<span className="yellowFont">МЕРЧ </span>И СУВЕНИРЫ
					</h2>
					<p className="title-desc">
						Добро пожаловать в <span className="yellowFont">Time to</span>,
						вашего надежного партнера в мире мерчандайзинга и сувенирной
						продукции.
					</p>
					<p className="title-desc">
						Мерчандайзинг и сувениры - это не только продукты, они становятся
						частью вашего бренда, которую ваши клиенты могут купить и
						использовать в повседневной жизни. Мы поможем вам создать уникальные
						и запоминающиеся продукты, которые будут не только отражать ваш
						бренд, но и станут предметом гордости для ваших клиентов и
						партнеров.
					</p>
					<p className="title-desc">
						Наша команда экспертов по дизайну и производству мерча и сувениров
						готова помочь вам в каждом этапе: от разработки креативной концепции
						до подготовки файлов к печати. Доверьтесь нам, и мы сделаем так,
						чтобы ваш мерч носили!
					</p>
				</div>

				<div className="first-part">
					<h3 className="generalTitle first-title">Что такое Мерч-дизайн?</h3>
					<p className="firstSectionDesc">
						В современном мире бизнеса важно не только привлечь внимание целевой
						аудитории, но и удержать ее. Один из способов сделать это - создать
						уникальные и качественные мерч и сувениры, которые будут не просто
						продуктами, а символами вашего бренда. Многие компании сталкиваются
						с проблемой разработки таких продуктов, которые бы не только
						отражали их бренд, но и вдохновляли их клиентов и партнеров. Наша
						компания решает эту проблему, предоставляя услуги по разработке
						уникальной концепции, дизайна и подготовке к печати, помогая
						компаниям выделиться на рынке и создать продукцию, которая вызывает
						восторг и лояльность у клиентов.
					</p>

					<div className="firstImgWrap">
						<img
							src="/MainPage/souvenirMainImg.png"
							alt=""
							className="firstSectionImg"
						/>
					</div>
				</div>

				<div className="second-part">
					<h3 className="generalTitle second-title">комплексный подход</h3>
					<div className="second-body">
						<div className="second-body-item">
							<h4 className="secondInnerTitle">Креативная концепция</h4>
							<p className="secondInnerDesc">
								 Наша команда анализирует ваш бренд, целевую аудиторию и цели
								продукции, чтобы разработать креативные идеи, которые отражают
								уникальность вашего бренда и привлекают внимание клиентов и
								партнеров.
							</p>
						</div>
						<div className="second-body-item  sYellow">
							<h4 className="secondInnerTitle yellowContent">Дизайн макета</h4>
							<p className="secondInnerDesc yellowContent">
								Мы учитываем особенности вашего бренда и целей продукции, чтобы
								создать дизайн, который не только соответствует вашему стилю, но
								и эффективно передает ваше сообщение. Независимо от того, нужен
								ли вам мерч для продажи или сувенир для промо-акций, мы
								разработаем дизайн, который подходит именно для вашей цели.
							</p>
						</div>
						<div className="second-body-item">
							<h4 className="secondInnerTitle">Подготовка файла к печати</h4>
							<p className="secondInnerDesc">
								Наши специалисты обладают опытом работы с различными типами
								печати и материалами, чтобы обеспечить высокое качество и
								точность печати вашей продукции. Мы гарантируем, что ваш мерч и
								сувениры будут выглядеть идеально на любой поверхности и
								привлекать внимание вашей аудитории.
							</p>
						</div>
					</div>
				</div>

				<div className="third-part">
					<h3 className="generalTitle third-title">Почему именно мы?</h3>
					<div className="third-body">
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Опыт и экспертиза</h4>
								<p className="flashDesc">
									Мы обладаем богатым опытом работы в сфере мерчандайзинга и
									создания сувенирной продукции. Наша команда состоит из опытных
									специалистов, которые готовы решать самые сложные задачи и
									предлагать креативные решения для вашего бренда.
								</p>
							</div>
						</div>
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Индивидуальный подход</h4>
								<p className="flashDesc">
									Мы понимаем, что каждый бренд уникален, и поэтому мы
									разрабатываем индивидуальные стратегии для каждого клиента. Мы
									учитываем особенности вашего бренда, целевую аудиторию и цели
									продукции, чтобы создать уникальные и запоминающиеся продукты.
								</p>
							</div>
						</div>
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Качество и надежность</h4>
								<p className="flashDesc">
									Мы гарантируем высокое качество нашей продукции и точность
									выполнения каждого заказа. Мы работаем только с проверенными
									поставщиками и используем только качественные материалы, чтобы
									обеспечить долговечность и привлекательный внешний вид вашего
									мерча и сувениров.
								</p>
							</div>
						</div>
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Широкий спектр услуг</h4>
								<p className="flashDesc">
									Мы предлагаем полный спектр услуг по созданию мерча и
									сувениров, включая разработку концепции, дизайн макета,
									подготовку файла к печати и многое другое. Мы обеспечим вас
									всем необходимым для успешной реализации вашего проекта,
									сделаем его уникальным и запоминающимся.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="fourth-part">
					<h3 className="generalTitle fourth-title">Нам доверяют</h3>
					<img
						src="/MainPage/fifth-image.png"
						alt=""
						className="fourthMainImg"
					/>
					<div className="fourth-foot">
						<div className="fourth-foot-item">
							<img
								src="/MainPage/fifth-first.png"
								alt=""
								className="fourth-foot-img"
							/>
							<div>
								<p className="fourth-foot-desc">
									Работаем в индустрии брендинга с года
								</p>
							</div>
						</div>
						<div className="fourth-foot-item">
							<img
								src="/MainPage/fifth-second.png"
								alt=""
								className="fourth-foot-img"
							/>
							<div>
								<p className="fourth-foot-desc">Реализовано более проектов</p>
							</div>
						</div>
						<div className="fourth-foot-item">
							<img
								src="/MainPage/fifth-third.png"
								alt=""
								className="fourth-foot-img"
							/>
							<div>
								<p className="fourth-foot-desc">
									Более компаний обратились к нам
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="fifth-part">
					<h3 className="generalTitle fifth-title">Портфолио</h3>

					<div className="fifthBody">
						{isLoading ? (
							<div className="loading-indicator">
								<ClipLoader size={50} color={"#eee"} loading={isLoading} />
							</div>
						) : (
							SouvenirCardList.map((card) => (
								<div className="fifthBodyItem" key={card.id}>
									<div
										className="whiteBack"
										style={{ backgroundImage: `url(${card.imageUrl})` }}
									></div>
									<h3 className="fifthBodyTitle">
										{card.title || "Пропорция"}
									</h3>
									<p className="fifthBodyDesc">
										{card.desc || "Салон красоты"}
									</p>
									<Link href={"/Site"}>
										<button className="fifthBtn">Сайт</button>
									</Link>
								</div>
							))
						)}
						{/* <div className="fifthBodyItem">
							<div className="whiteBack"></div>
							<h3 className="fifthBodyTitle">Пропорция</h3>
							<p className="fifthBodyDesc">Салон красоты</p>
							<Link to={"/Site"}>
								<button className="fifthBtn">Сайт</button>
							</Link>
						</div>
						<div className="fifthBodyItem">
							<div className="whiteBack"></div>
							<h3 className="fifthBodyTitle">Пропорция</h3>
							<p className="fifthBodyDesc">Салон красоты</p>
							<Link to={"/Site"}>
								<button className="fifthBtn">Сайт</button>
							</Link>
						</div>
						<div className="fifthBodyItem">
							<div className="whiteBack"></div>
							<h3 className="fifthBodyTitle">Пропорция</h3>
							<p className="fifthBodyDesc">Салон красоты</p>
							<Link to={"/Site"}>
								<button className="fifthBtn">Сайт</button>
							</Link>
						</div> */}
					</div>

					<div className="fifth-part-foot">
						<h3 className="fifth-foot-title">
							Готовы сделать ваш бренд незабываемым?
						</h3>
						<div className="getsFlex">
							<p className="fifth-foot-desc">
								Свяжитесь с нами прямо сейчас для создания уникального мерча и
								сувениров, которые будут выделять вас из толпы
							</p>

							<button className="fifth-foot-btn">Заполнить бриф →</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Souvenir;
