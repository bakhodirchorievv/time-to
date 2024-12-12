import Link from "next/link";
// import "../styles/Corporate/Corporate.css";
// import "../styles/Corporate/CorporateResponsive.css";
// get data from firebase
import { db } from "./FirebaseConfig";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import Head from "next/head";

interface CorporateCard {
	id: string;
	title: string;
	desc: string;
	imageUrl: string;
	userId?: string;
}

const Corporate = () => {
	//get data from firebase
	const [CorporateCardList, setCorporateCardList] = useState<CorporateCard[]>(
		[]
	);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const CorporateCardsCollectionRef = collection(db, "CorporateCards");

	const getCorporateCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(CorporateCardsCollectionRef);
			const filteredData: CorporateCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<CorporateCard, "id">),
				id: doc.id,
			}));
			setCorporateCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		getCorporateCardList();
		console.log(CorporateCardList);
	}, []);
	return (
		<>
			<Head>
				<link rel="stylesheet" href="/styles/Corporate/Corporate.css" />
			</Head>
			<Head>
				<link
					rel="stylesheet"
					href="/styles/Corporate/CorporateResponsive.css"
				/>
			</Head>
			<div className="corporate-wrapper">
				<div className="innerHead">
					<h2 className="main-title">
						Фирменный стиль для вашего{" "}
						<span className="yellowFont">бизнеса</span>
					</h2>
					<p className="title-desc">
						Создание уникального образа для вашего для вашего продукта или
						услуги в течение
					</p>
				</div>

				<div className="first-part">
					<h3 className="generalTitle first-title">
						Что такое фирменный стиль?
					</h3>
					<p className="firstSectionDesc">
						Фирменный стиль — это комплексный подход к созданию
						идентификационных элементов бренда, таких как логотип, цветовая
						палитра, шрифты и дизайн. Он направлен на установление узнаваемости
						и формирование уникального образа вашего бренда в глазах
						потребителей. Фирменный стиль – первое, на что обращают внимание
						потребители при контакте с вашим бизнесом. 
					</p>

					<div className="firstImgWrap">
						<img
							src="/MainPage/corporate-main-img.png"
							alt=""
							className="firstSectionImg"
						/>
					</div>
				</div>

				<div className="second-part">
					<h3 className="generalTitle second-title">Фирменный стиль решает!</h3>
					<div className="second-body">
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">01</h3>
								<p className="flashDesc">
									Качественный и стильный дизайн вашего бренда создаст
									дополнительную стоимость для ваших товаров и услуг, делая их
									более привлекательными для потребителей.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">02</h3>
								<p className="flashDesc">
									Созданный нами уникальный фирменный стиль поможет вашей
									компании выделиться среди конкурентов и привлечь больше
									внимания к вашему бренду на рынке
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">03</h3>
								<p className="flashDesc">
									Мы создадим визуальный образ, который поможет быстрее
									запомнить ваш бренд и легко узнавать его среди других в вашей
									индустрии.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">04</h3>
								<p className="flashDesc">
									Фирменный стиль позволяет создать доверительный образ компании
									и поддержать ее имидж, что способствует укреплению доверия
									клиентов и партнеров к вашему бренду.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="third-part">
					<h3 className="generalTitle thirdTitle">О нас</h3>
					<p className="thirdDesc">
						Наша компания - эксперт в области маркетинга и брендинга,
						специализирующийся на разработке уникального фирменного стиля для
						вашего бизнеса и медиа. В условиях жесткой конкуренции необходимо
						создавать образ, который запоминается и выделяется среди других.
					</p>
					<p className="thirdDesc">
						В нынешнее время потребители сталкиваются с множеством брендов и
						информационным шумом. Им трудно запомнить и выделить одну компанию
						из множества других. Именно поэтому необходимо, чтобы ваш фирменный
						стиль был не просто уникальным, но и запоминающимся.
					</p>
					<p className="thirdDesc">
						Мы предлагаем Вам разработку индивидуального и эффектного фирменного
						стиля, который не только поможет Вам выделиться на рынке, но и стать
						узнаваемым брендом, который будет привлекать внимание!
					</p>

					<div className="third-body">
						<img
							src="/MainPage/corporateFirst.png"
							alt=""
							className="thirdBodyImg"
						/>
						<img
							src="/MainPage/corporateSecond.png"
							alt=""
							className="thirdBodyImg"
						/>
						<img
							src="/MainPage/corporateThird.png"
							alt=""
							className="thirdBodyImg"
						/>
					</div>
				</div>

				<div className="fourth-part">
					<h3 className="generalTitle">
						Всего 5 шагов на пути к эффектному фирменному стилю
					</h3>

					<div className="fourthSectionBody">
						<div className="fourthBodyItem">
							<div className="fourthInnerItem">
								<h4 className="fourthInnerTitle">Сформируем бриф</h4>
								<p className="fourthInnerDesc">
									Начнем с четкого определения целей проекта, чтобы разработать
									эффективный визуальный образ, который будет идеально
									соответствовать вашим целям и ожиданиям.
								</p>
							</div>
							<div className="fourthInnerItem">
								<h4 className="fourthInnerTitle">Проведем аудит</h4>
								<p className="fourthInnerDesc">
									Затем мы проведем анализ рынка, особенностей отрасли и
									детальный обзор конкурентов. Это позволит нам выявить
									уникальные возможности для создания стиля вашего бренда.
								</p>
							</div>
						</div>
						<div className="fourthBodyItem ">
							<div className="fourthInnerItem TwoInOne">
								<h4 className="fourthInnerTitle">Создадим брендбук</h4>
								<p className="fourthInnerDesc">
									Завершающим этапом будет создание брендбука. Этот документ
									поможет избежать ошибок при самостоятельной работе с
									айдентикой и обеспечит ее постоянство и эффективность в
									долгосрочной перспективе.
								</p>
							</div>
						</div>
						<div className="fourthBodyItem">
							<div className="fourthInnerItem">
								<h4 className="fourthInnerTitle">
									Запустим творческий процесс
								</h4>
								<p className="fourthInnerDesc">
									Наша команда создаст и предоставит вам 3 варианта фирменного
									стиля, учитывая полученные результаты анализа и ваши
									предпочтения
								</p>
							</div>
							<div className="fourthInnerItem">
								<h4 className="fourthInnerTitle">Сделаем финальные штрихи</h4>
								<p className="fourthInnerDesc">
									После выбора оптимального варианта мы приступим к развитию
									стиля на различных носителях бренда и, при необходимости,
									внесем корректировки для достижения идеального результата.
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
								<p className="fifth-foot-desc">
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
								<p className="fifth-foot-desc">Реализовано более проектов</p>
							</div>
						</div>
						<div className="fifth-foot-item">
							<img
								src="/MainPage/fifth-third.png"
								alt=""
								className="fifth-foot-img"
							/>
							<div>
								<p className="fifth-foot-desc">
									Более компаний обратились к нам
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="sixth-part">
					<h3 className="generalTitle sixth-title">
						Наши названия уже зарекомендовали себя и активно функционируют в
						бизнесе
					</h3>

					<div className="sixthBody">
						{isLoading ? (
							<div className="loading-indicator">
								<ClipLoader size={50} color={"#eee"} loading={isLoading} />
							</div>
						) : (
							CorporateCardList.map((card) => (
								<div className="sixthBodyItem" key={card.id}>
									<div
										className="whiteBack"
										style={{ backgroundImage: `url(${card.imageUrl})` }}
									></div>
									<h3 className="sixthBodyTitle">
										{card.title || "Пропорция"}
									</h3>
									<p className="sixthBodyDesc">
										{card.desc || "Салон красоты"}
									</p>
									<Link href={"/Site"}>
										<button className="sixthBtn">Сайт</button>
									</Link>
								</div>
							))
						)}
						{/* <div className="sixthBodyItem">
							<div className="whiteBack"></div>
							<h3 className="sixthBodyTitle">Пропорция</h3>
							<p className="sixthBodyDesc">Салон красоты</p>
							<Link to={"/Site"}>
								<button className="sixthBtn">Сайт</button>
							</Link>
						</div>
						<div className="sixthBodyItem">
							<div className="whiteBack"></div>
							<h3 className="sixthBodyTitle">Пропорция</h3>
							<p className="sixthBodyDesc">Салон красоты</p>
							<Link to={"/Site"}>
								<button className="sixthBtn">Сайт</button>
							</Link>
						</div>
						<div className="sixthBodyItem">
							<div className="whiteBack"></div>
							<h3 className="sixthBodyTitle">Пропорция</h3>
							<p className="sixthBodyDesc">Салон красоты</p>
							<Link to={"/Site"}>
								<button className="sixthBtn">Сайт</button>
							</Link>
						</div> */}
					</div>

					<div className="sixth-part-foot">
						<h3 className="sixth-foot-title">
							Закажите разработку эффектного фирменного стиля!
						</h3>
						<div className="getsFlex">
							<p className="sixth-foot-desc">
								Дайте вашему бренду образ, который оставит приятное впечатление
								и запомнится вашим клиентам
							</p>

							<button className="sixth-foot-btn">Заполнить бриф →</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Corporate;
