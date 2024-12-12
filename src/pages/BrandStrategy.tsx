import Link from "next/link";
// import "../styles/BrandStrategy/BrandStrategy.css";
// import "../styles/BrandStrategy/BrandResponsive.css";
import { useRef } from "react";

// get data from firebase
// import { db } from "../../Components/AdminDashboard/FirebaseConfig";
import { db } from "./FirebaseConfig";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import Head from "next/head";

interface BrandStrategyCard {
	id: string;
	title: string;
	desc: string;
	imageUrl: string;
	userId?: string;
}

const BrandStrategy = () => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const handleScrollRight = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
		}
	};

	const handleScrollLeft = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
		}
	};

	//get data from firebase
	const [BrandStrategyCardList, setBrandStrategyCardList] = useState<
		BrandStrategyCard[]
	>([]);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const BrandStrategyCardsCollectionRef = collection(db, "BrandStrategyCards");

	const getBrandStrategyCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(BrandStrategyCardsCollectionRef);
			const filteredData: BrandStrategyCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<BrandStrategyCard, "id">),
				id: doc.id,
			}));
			setBrandStrategyCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		getBrandStrategyCardList();
		console.log(BrandStrategyCardList);
	}, []);

	return (
		<>
			<Head>
				<link rel="stylesheet" href="/styles/BrandStrategy/BrandStrategy.css" />
			</Head>
			<Head>
				<link
					rel="stylesheet"
					href="/styles/BrandStrategy/BrandResponsive.css"
				/>
			</Head>
			<div className="bottomOfHeader">
				<h1 className="head-title">Бренд Стратегия</h1>

				<p className="head-desc">
					Создание сильного бренда, который поведет за собой бизнес и людей
				</p>
				{/* 
				<img
					src="/MainPage/brandStrategy-mainImg.png"
					alt=""
					className="mainImage"
				/> */}
				<video
					src="/MainPage/brandstrategyMainVideo.mp4"
					className="mainImage brandStrategyMainVideo"
					autoPlay
					loop
					muted
				/>
			</div>

			<div className="brandStrategy-wrapper">
				<div className="first-section">
					<h3 className="generalTitle first-title">
						Что вы получаете, заказывая у нас создание бренд-стратегии?
					</h3>
					<div className="firstSectionBody">
						<div className="firstBodyItem">
							<div className="firstInnerItem">
								<h4 className="firstInnerTitle">Платформа бренда</h4>
								<p className="firstInnerDesc">
									Стратегия и смысловая основа для развития бренда. Включает в
									себя анализ рынка и аудитории, аудит продукта и основанное на
									исследовании позиционирование. Платформа бренда — база для
									названия, фирменного стиля и продвижения бренда в каналах
									коммуникации.
								</p>
							</div>
							<div className="firstInnerItem">
								<h4 className="firstInnerTitle">Определение миссии</h4>
								<p className="firstInnerDesc">
									ценностей, характера, стиля, тона коммуникации бренда.
									Постановка основных принципов, убеждения и идеи, на основе
									которых компания осуществляет свою деятельность. Они
									определяют, каких норм и стандартов компания придерживается в
									работе.
								</p>
							</div>
						</div>
						<div className="firstBodyItem ">
							<div className="firstInnerItem TwoInOne">
								<h4 className="firstInnerTitle">Создание легенды бренда</h4>
								<p className="firstInnerDesc">
									Это история о компании или продукте, которая помогает
									транслировать ценности, представлять бренд клиентам в выгодном
									свете для повышения продаж и узнаваемости. Легенда воплощает в
									себе концепцию бренда, наполняет его смыслом, который трудно
									передать с помощью нейминга и слогана.
								</p>
							</div>
						</div>
						<div className="firstBodyItem">
							<div className="firstInnerItem">
								<h4 className="firstInnerTitle">Позиционирование</h4>
								<p className="firstInnerDesc">
									Образ бренда, который направлен на формирование или
									закрепление конкурентной позиции бренда на рынке. Главная цель
									– выделиться на фоне конкурентов, и укрепить собственные
									позиции.
								</p>
							</div>
							<div className="firstInnerItem">
								<h4 className="firstInnerTitle">Разработка пирамиды бренда</h4>
								<p className="firstInnerDesc">
									Пирамида ценности бренда помогает найти и разложить по
									полочкам смыслы и подобрать правильные формулировки, обрести
									компании свой голос.
								</p>
							</div>
						</div>
					</div>

					<div className="first-section-foot">
						<h3 className="first-foot-title">
							Нужна стратегия развития бренда?
						</h3>
						<div className="getsFlex">
							<p className="first-foot-desc">
								Хотите построить сильный бренд, которому будут доверять?
								Заполните бриф, и мы свяжемся с вами в скором времени. Сделайте
								шаг навстречу успешному будущему вашей компании!
							</p>

							<button className="first-foot-btn">Заполнить бриф →</button>
						</div>
					</div>
				</div>

				<div className="second-section">
					<h3 className="generalTitle second-title">
						Идентичность бренда выражается через комплексную модель, которую
						можно представить в виде пирамиды
					</h3>

					<div className="second-body" ref={scrollContainerRef}>
						<div className="secondBodyItem">
							<h3 className="secondItemTitle">Дизайн-код</h3>
							<p className="secondItemDesc">
								Это образ бренда, такой как логотип, цветовая гамма, шрифты,
								иллюстрации, упаковка, ароматы и другие элементы, которые
								привлекают внимание потребителей. Это базовое основание, работа
								над которым проводится в последнюю очередь.
							</p>
						</div>
						<div className="secondBodyItem">
							<h3 className="secondItemTitle">Характер и ценности бренда</h3>
							<p className="secondItemDesc">
								В идеале характер и ценности вашего бренда должны совпадать с
								характером и ценностями вашей аудитории. Именно так мы находим
								лучших друзей — понимаем, что очень похожи. Именно такая дружба
								длится всю жизнь. Допустим, вы производите экопродукты. Ваши
								ценности: экологичность и натуральность. Характер: дружелюбный,
								искренний. Человек с таким же мировоззрением обязательно вас
								заметит.  
							</p>
						</div>
						<div className="secondBodyItem">
							<h3 className="secondItemTitle">Точки дифференциации</h3>
							<p className="secondItemDesc">
								Анализируем преимущества продукта:
							</p>
							<ul className="secondBodyUl">
								<li className="li-item">
									Ищем уникальные характеристики, выделяющие продукт на фоне
									конкурентов для вашей целевой аудитории.
								</li>
								<li className="li-item">
									Выявляем функциональные преимущества, значимые для всей
									категории продуктов.
								</li>
								<li className="li-item">
									Отмечаем достоинства конкурентов, отвечающие потребностям
									вашей целевой аудитории (что важно учитывать).
								</li>
								<li className="li-item">
									Определяем эмоциональные достоинства - какие чувства и
									впечатления этот продукт вызывает у потребителей
								</li>
							</ul>
						</div>
						<div className="secondBodyItem">
							<h3 className="secondItemTitle">Сущность и задача бренда</h3>
							<p className="secondItemDesc">
								Каким образом бренд призван изменить жизни своих клиентов и
								влиять на мир? Как бы ваш идеальный клиент описал ваш продукт
								коротко и емко в идеальном мире? И что бы он сказал своим
								друзьям о вашем бренде, если его разбудить ночью? Убедительность
								этого описания исходит от самого бренда, а не от клиента.
							</p>
						</div>
					</div>

					<div className="arrowWrap">
						<img
							src="/MainPage/Arrow.png"
							alt=""
							className="arrowLeft"
							onClick={handleScrollLeft}
						/>
						<img
							src="/MainPage/Arrow.png"
							alt=""
							className="arrowRight"
							onClick={handleScrollRight}
						/>
					</div>
				</div>

				<div className="third-section">
					<h3 className="generalTitle third-title">
						Почему стоит заказать бренд-стратегию именно у нас?
					</h3>

					<div className="thirdBody">
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">Индивидуальный подход</h3>
								<p className="flashDesc">
									Мы создаем каждую стратегию с учетом особенностей вашего
									бренда и рыночной среды, избегая шаблонных решений.
								</p>
							</div>
						</div>
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">Вовлечение ТОП-менеджмента</h3>
								<p className="flashDesc">
									Мы активно сотрудничаем с представителями вашей компании,
									чтобы обеспечить понимание и поддержку ценностей бренда на
									всех уровнях.
								</p>
							</div>
						</div>
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">Документирование</h3>
								<p className="flashDesc">
									Мы активно сотрудничаем с представителями вашей компании,
									чтобы обеспечить понимание и поддержку ценностей бренда на
									всех уровнях.
								</p>
							</div>
						</div>
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">Опытные специалисты</h3>
								<p className="flashDesc">
									Наша команда имеет многолетний опыт в стратегическом
									маркетинге, провели множество аудитов и мастер-классов по
									продвижению бренда
								</p>
							</div>
						</div>
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">Поддержка на этапе внедрения</h3>
								<p className="flashDesc">
									Мы не просто разрабатываем стратегию, но и оказываем помощь
									при ее реализации. Наши инструменты не останутся без внимания,
									мы поможем внедрить разработанные решения
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="fourth-section">
					<h3 className="generalTitle fourth-title">
						Примеры разработанных бренд-стратегий
					</h3>

					<div className="fourthBody">
						{isLoading ? (
							<div className="loading-indicator">
								<ClipLoader size={50} color={"#eee"} loading={isLoading} />
							</div>
						) : (
							BrandStrategyCardList.map((strategyItem) => (
								<div className="fourthBodyItem" key={strategyItem.id}>
									<div
										className="whiteBack"
										style={{ backgroundImage: `url(${strategyItem.imageUrl})` }}
									></div>
									<h3 className="fourthBodyTitle">
										{strategyItem.title || "Пропорция"}
									</h3>
									<p className="fourthBodyDesc">
										{strategyItem.desc || "Салон красоты"}
									</p>
									<Link href={"/Site"}>
										<button className="fourthBtn">Сайт</button>
									</Link>
								</div>
							))
						)}

						{/* <div className="fourthBodyItem">
							<div className="whiteBack"></div>
							<h3 className="fourthBodyTitle">Пропорция</h3>
							<p className="fourthBodyDesc">Салон красоты</p>
							<Link href={"/Site"}>
								<button className="fourthBtn">Сайт</button>
							</Link>
						</div>
						<div className="fourthBodyItem">
							<div className="whiteBack"></div>
							<h3 className="fourthBodyTitle">Пропорция</h3>
							<p className="fourthBodyDesc">Салон красоты</p>
							<Link href={"/Site"}>
								<button className="fourthBtn">Сайт</button>
							</Link>
						</div>
						<div className="fourthBodyItem">
							<div className="whiteBack"></div>
							<h3 className="fourthBodyTitle">Пропорция</h3>
							<p className="fourthBodyDesc">Салон красоты</p>
							<Link href={"/Site"}>
								<button className="fourthBtn">Сайт</button>
							</Link>
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default BrandStrategy;
