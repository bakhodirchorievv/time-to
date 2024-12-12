import Link from "next/link";
// import "../styles/Shop/Shop.css";
// import "../styles/Shop/ShopResponsive.css";
// get data from firebase
import { db } from "./FirebaseConfig";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import Head from "next/head";

interface ShopCard {
	id: string;
	title: string;
	desc: string;
	imageUrl: string;
	userId?: string;
}

const Shop = () => {
	//get data from firebase
	const [ShopCardList, setShopCardList] = useState<ShopCard[]>([]);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const ShopCardsCollectionRef = collection(db, "ShopCards");

	const getShopCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(ShopCardsCollectionRef);
			const filteredData: ShopCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<ShopCard, "id">),
				id: doc.id,
			}));
			setShopCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		getShopCardList();
		console.log(ShopCardList);
	}, []);
	return (
		<>
			<Head>
				<link rel="stylesheet" href="/styles/Shop/Shop.css" />
			</Head>
			<Head>
				<link rel="stylesheet" href="/styles/Shop/ShopResponsive.css" />
			</Head>
			<div className="shop-wrapper">
				<div className="innerHead">
					<h2 className="main-title">
						<span className="yellowFont">Ваш бизнес </span>в онлайне:
						интернет-магазин от профессионалов
					</h2>
					<p className="title-desc">
						Создаем многофункциональный и привлекательный интернет-магазин под
						любые запросы
					</p>
				</div>

				<div className="first-part">
					<h3 className="generalTitle first-title">
						Что такое интернет-магазин?
					</h3>
					<p className="firstSectionDesc">
						Сегодня для успешного расширения объемов продаж необходимо
						оперировать не только розничной и оптовой торговлей, ограниченной
						географически, но и активно присутствовать в онлайн-пространстве.
						Интернет стал ключевым инструментом для привлечения новых клиентов и
						увеличения прибыли.
					</p>

					<div className="firstImgWrap">
						<img
							src="/MainPage/ShopMainImg.png"
							alt=""
							className="firstSectionImg"
						/>
					</div>
				</div>

				<div className="second-part">
					<h3 className="generalTitle second-title">
						Вам поможет интернет-магазин, если
					</h3>
					<div className="second-body">
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">
									Вы хотите расширить географию продаж, так как на данный момент
									она ограничена местным рынком, и привлечь клиентов из других
									регионов или стран.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">
									Вы стремитесь улучшить уровень сервиса для ваших клиентов,
									предоставив им возможность удобно выбирать и покупать товары
									онлайн.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">
									Хотите увеличить узнаваемость вашего бренда и создать
									дополнительный канал продаж.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">
									Вы хотите увеличить прибыль, сократив издержки на аренду и
									обслуживание физических магазинов.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">
									Вы хотите начать свой бизнес с минимальными затратами и
									рисками, используя интернет-магазин как первоначальную
									площадку для продаж.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="third-part">
					<h3 className="generalTitle thirdTitle">О нас</h3>
					<p className="thirdDesc">
						Проблема, которую часто испытывают бизнесы, заключается в том, что
						их текущий онлайн-магазин не отвечает современным требованиям
						пользователей. Стандартные шаблоны и неудобная навигация могут
						отпугнуть потенциальных покупателей, а устаревший дизайн не
						способствует доверию к бренду. В результате компания теряет клиентов
						и упускает возможность увеличить продажи.
					</p>
					<p className="thirdDesc">
						<span className="yellowFont">Time to</span> готова решить эту
						проблему, создавая качественные интернет-магазины с индивидуальным
						дизайном и удобной навигацией.
					</p>
					<p className="thirdDesc">
						Наша компания специализируется на создании уникальных
						интернет-магазинов, которые выделяются на фоне конкурентов. Мы
						предлагаем индивидуальный дизайн, который соответствует вашему
						бренду и привлекает внимание потенциальных клиентов. Наша команда
						разработчиков уделяет особое внимание удобной навигации и
						функциональности сайта, чтобы пользователи могли легко находить и
						заказывать товары. Кроме того, мы создаем адаптивные сайты, которые
						отлично отображаются на любых устройствах, что позволяет вашему
						бизнесу быть доступным для клиентов в любое время и из любой точки
						мира.
					</p>
					<p className="thirdDesc">
						Мы учитываем особенности бренда и потребности целевой аудитории,
						чтобы каждый сайт был эффективным инструментом продаж, улучшал
						пользовательский опыт и способствовал укреплению имиджа компании.
					</p>

					<div className="third-body">
						<img
							src="/MainPage/ShopFirst.png"
							alt=""
							className="thirdBodyImg"
						/>
						<img
							src="/MainPage/ShopSecond.png"
							alt=""
							className="thirdBodyImg"
						/>
						<img
							src="/MainPage/ShopThird.png"
							alt=""
							className="thirdBodyImg"
						/>
					</div>
				</div>

				<div className="fourth-part">
					<h3 className="generalTitle">Процесс работы</h3>

					<div className="fourthSectionBody">
						<div className="fourthBodyItem">
							<div className="fourthInnerItem">
								<h4 className="fourthInnerTitle">Консультация-знакомство</h4>
								<p className="fourthInnerDesc">
									Начнем с бесплатной консультации с нашими специалистами. Мы
									выслушаем ваши идеи и цели, чтобы создать концепцию,
									соответствующую вашему бизнесу.
								</p>
							</div>
							<div className="fourthInnerItem">
								<h4 className="fourthInnerTitle">Анализ рынка</h4>
								<p className="fourthInnerDesc">
									Наши аналитики проведут исследование вашей ниши и конкурентов,
									чтобы выделить уникальные возможности и разработать стратегию
									продвижения.
								</p>
							</div>
						</div>
						<div className="fourthBodyItem ">
							<div className="fourthInnerItem TwoInOne">
								<h4 className="fourthInnerTitle">Поддержка и развитие</h4>
								<p className="fourthInnerDesc">
									Мы не просто создаем сайты, мы предлагаем долгосрочное
									партнерство. При вашем желании наша команда будет поддерживать
									ваш интернет-магазин, обновлять его и развивать, чтобы он
									оставался конкурентоспособным и эффективным.
								</p>
							</div>
						</div>
						<div className="fourthBodyItem">
							<div className="fourthInnerItem">
								<h4 className="fourthInnerTitle">Дизайн и разработка</h4>
								<p className="fourthInnerDesc">
									Наши дизайнеры и разработчики создадут уникальный дизайн
									сайта, который привлечет ваших клиентов, и разработают
									функциональные возможности, чтобы обеспечить удобство
									использования.
								</p>
							</div>
							<div className="fourthInnerItem">
								<h4 className="fourthInnerTitle">Тестирование и запуск</h4>
								<p className="fourthInnerDesc">
									Мы проведем тщательное тестирование всех функций вашего
									интернет-магазина, чтобы убедиться в его правильной работе, и
									поможем вам запустить его на рынок.
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
						Наши интернет-магазины уже зарекомендовали себя и активно
						функционируют в бизнесе
					</h3>

					<div className="sixthBody">
						{isLoading ? (
							<div className="loading-indicator">
								<ClipLoader size={50} color={"#eee"} loading={isLoading} />
							</div>
						) : (
							ShopCardList.map((card) => (
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
							Закажите разработку функционального сайта у нас!
						</h3>
						<div className="getsFlex">
							<p className="sixth-foot-desc">
								Дайте вашему бизнесу возможность получить новый поток клиентов и
								увеличить прибыль
							</p>

							<button className="sixth-foot-btn">Заполнить бриф →</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Shop;
