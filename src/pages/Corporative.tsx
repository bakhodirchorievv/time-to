import Link from "next/link";
import "../styles/Corporative/Corporative.css";
import "../styles/Corporative/CorporativeResponsive.css";
// get data from firebase
import { db } from "./FirebaseConfig";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { ClipLoader } from "react-spinners";

interface CorporativeCard {
	id: string;
	title: string;
	desc: string;
	imageUrl: string;
	userId?: string;
}

const Corporative = () => {
	//get data from firebase
	const [CorporativeCardList, setCorporativeCardList] = useState<
		CorporativeCard[]
	>([]);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const CorporativeCardsCollectionRef = collection(db, "CorporativeCards");

	const getCorporativeCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(CorporativeCardsCollectionRef);
			const filteredData: CorporativeCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<CorporativeCard, "id">),
				id: doc.id,
			}));
			setCorporativeCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		getCorporativeCardList();
		console.log(CorporativeCardList);
	}, []);
	return (
		<>
			<div className="corporative-wrapper">
				<div className="innerHead">
					<h2 className="main-title">
						<span className="yellowFont">Корпоративный сайт: </span>
						ваш имидж в интернете
					</h2>
					<p className="title-desc">
						Создаем оригинальный функциональный сайт в течение 14 дней
					</p>
				</div>

				<div className="first-part">
					<h3 className="generalTitle first-title">
						Что такое Корпоративный сайт?
					</h3>
					<p className="firstSectionDesc">
						Корпоративный сайт — это веб-ресурс, представляющий компанию, её
						продукты и услуги в интернете. Он выполняет ряд важных функций,
						включая информационную поддержку бизнеса, обеспечение доступа к
						продуктам и услугам компании, установление контакта с потенциальными
						клиентами, а также создание и поддержание имиджа компании в
						онлайн-среде. Корпоративный сайт часто служит важным инструментом
						для привлечения новых клиентов и укрепления отношений с существующей
						аудиторией.
					</p>

					<div className="firstImgWrap">
						<img
							src="/MainPage/corporativeFirst.png"
							alt=""
							className="firstSectionImg"
						/>
					</div>
				</div>

				<div className="second-part">
					<h3 className="generalTitle second-title">
						Вашему бизнесу нужен корпоративный сайт, если
					</h3>
					<div className="second-body">
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">
									В данный момент у вас нет корпоративного сайта, который
									профессионально представит ваш бизнес в интернете, и вы хотите
									улучшить репутацию вашей компании.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">
									Ваш текущий сайт устарел или не соответствует современным
									требованиям дизайна и функциональности
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">
									Вы хотите улучшить взаимодействие с клиентами и партнерами
									через онлайн-платформу.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* extra repeat */}
				<div className="fourth-part">
					<h3 className="generalTitle">
						Сайт-визитка решает ряд проблем, с которыми может столкнуться
						компания
					</h3>

					<div className="fourthSectionBody">
						<div className="fourthBodyItem">
							<div className="fourthInnerItem smallCard">
								<p className="fourthInnerDesc">
									Недостаточное онлайн-присутствие: когда у вашего бизнеса нет
									веб-сайта, он упускает возможность привлечения новых клиентов
									из онлайн-среды.
								</p>
							</div>
							<div className="fourthInnerItem smallCard">
								<p className="fourthInnerDesc">
									Неудобство для клиентов: отсутствие сайта усложняет поиск
									ваших клиентов информацию о компании, ее продуктах и услугах.
								</p>
							</div>
						</div>
						<div className="fourthBodyItem ">
							<div className="fourthInnerItem smallCard smallTwoInOne TwoInOne">
								<p className="fourthInnerDesc">
									Ограниченные коммуникационные возможности: сайт-визитка
									позволяет компании эффективно коммуницировать с клиентами,
									предоставляя им важную информацию и обратную связь.
								</p>
							</div>
						</div>
						<div className="fourthBodyItem">
							<div className="fourthInnerItem smallCard">
								<p className="fourthInnerDesc">
									Ограниченные маркетинговые возможности: сайт-визитка позволяет
									бизнесу использовать онлайн-маркетинговые инструменты, такие
									как контент-маркетинг, SEO и рекламу, чтобы привлечь новый
									поток клиентов.
								</p>
							</div>
							<div className="fourthInnerItem smallCard">
								<p className="fourthInnerDesc">
									Недостаточное доверие со стороны целевой аудитории: наличие
									качественного сайта помогает установить доверие среди
									потенциальных клиентов и создать впечатление о
									профессионализме компании.
								</p>
							</div>
						</div>
					</div>
				</div>
				{/* extra repeat */}

				<div className="third-part">
					<h3 className="generalTitle thirdTitle">О нас</h3>
					<p className="thirdDesc">
						Наша компания <span className="yellowFont">Time to</span> — это
						команда профессионалов, специализирующаяся на создании современных и
						эффективных корпоративных сайтов. Мы объединяем опыт и творческий
						подход для того, чтобы каждый проект был уникальным и отвечал всем
						потребностям клиента.
					</p>
					<p className="thirdDesc">
						Ваш сайт — это лицо вашего бизнеса в онлайн-среде, поэтому мы
						стремимся создавать не просто сайты, а инструменты, которые помогут
						вам привлечь новых клиентов, укрепить отношения с текущими
						партнерами и повысить узнаваемость вашего бренда.
					</p>
					<p className="thirdDesc">
						Наш подход к разработке сайтов основан на индивидуальном подходе к
						каждому клиенту. Мы внимательно изучаем особенности вашего бизнеса,
						цели и задачи, чтобы создать сайт, который идеально отражает вашу
						компанию и помогает достичь поставленных целей.
					</p>
					<p className="thirdDesc">
						С нами работать легко и комфортно. Мы гарантируем качество каждого
						этапа работы, начиная от анализа и проектирования и заканчивая
						запуском и поддержкой сайта. Вместе мы сделаем ваш бизнес более
						успешным в онлайн-пространстве.
					</p>

					<div className="third-body">
						<img
							src="/MainPage/corporativeSecond.png"
							alt=""
							className="thirdBodyImg"
						/>
						<img
							src="/MainPage/corporativeThird.png"
							alt=""
							className="thirdBodyImg"
						/>
						<img
							src="/MainPage/corporativeFourth.png"
							alt=""
							className="thirdBodyImg"
						/>
					</div>
				</div>

				<div className="fourth-part">
					<h3 className="generalTitle fourth-title">
						Создать свой сайт с нами просто!
					</h3>

					<div className="fourthPartBody">
						<div className="fourthPartItem">
							<h4 className="fourthItemTitle">Бриф</h4>
							<p className="fourthItemDesc">
								Определим цели и задачи вашего сайта.
							</p>
						</div>
						<div className="fourthPartItem">
							<h4 className="fourthItemTitle">Анализ</h4>
							<p className="fourthItemDesc">
								Проведем анализ вашей целевой аудитории, конкурентов и
								особенностей вашего бизнеса. На основе этой информации
								разработаем стратегию создания сайта.
							</p>
						</div>
						<div className="fourthPartItem">
							<h4 className="fourthItemTitle">Дизайн</h4>
							<p className="fourthItemDesc">
								Разработаем уникальный функциональный и привлекательный дизайн
								сайта, который соответствует вашему бренду, целям и личным
								запросам.
							</p>
						</div>
						<div className="fourthPartItem">
							<h4 className="fourthItemTitle">Тестирование и запуск</h4>
							<p className="fourthItemDesc">
								Перед запуском сайта проведем тестирование его работоспособности
								и удобства использования. После успешного тестирования запустим
								сайт и продолжим отслеживать его работу для дальнейшего
								улучшения.
							</p>
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
							CorporativeCardList.map((card) => (
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
								Дайте вашему бизнесу дополнительное преимущество, которое
								повысит ваше положение на рынке в глазах клиентов
							</p>

							<button className="sixth-foot-btn">Заполнить бриф →</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Corporative;
