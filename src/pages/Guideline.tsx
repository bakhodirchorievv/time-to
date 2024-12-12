import Link from "next/link";
// import "../styles/Guideline/Guideline.css";
// import "../styles/Guideline/GuidelineResposive.css";
// get data from firebase
import { db } from "./FirebaseConfig";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import Head from "next/head";

interface GuidelineCard {
	id: string;
	title: string;
	desc: string;
	imageUrl: string;
	userId?: string;
}

const Guideline = () => {
	//get data from firebase
	const [GuidelineCardList, setGuidelineCardList] = useState<GuidelineCard[]>(
		[]
	);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const GuidelineCardsCollectionRef = collection(db, "GuidelineCards");

	const getGuidelineCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(GuidelineCardsCollectionRef);
			const filteredData: GuidelineCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<GuidelineCard, "id">),
				id: doc.id,
			}));
			setGuidelineCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		getGuidelineCardList();
		console.log(GuidelineCardList);
	}, []);
	return (
		<>
			<Head>
				<link rel="stylesheet" href="/styles/Guideline/Guideline.css" />
			</Head>
			<Head>
				<link
					rel="stylesheet"
					href="/styles/Guideline/GuidelineResposive.css"
				/>
			</Head>
			<div className="guidline-wrapper">
				<div className="innerHead">
					<h2 className="main-title">
						Превратите Ваши идеи в{" "}
						<span className="yellowFont"> реальность</span>
					</h2>
					<p className="title-desc">
						Создайте профессиональные брендбуки и гайдлайны вместе с нашей
						компанией!
					</p>
				</div>

				<div className="first-part">
					<h3 className="generalTitle first-title">
						Что такое брендбук и гайдлайн? Основное отличие
					</h3>
					<p className="firstSectionDesc">
						Брендбук представляет собой документ, включающий в себя полный набор
						информации о бренде, начиная от его философии и стратегии
						позиционирования, и заканчивая правилами использования айдентики и
						верстки рекламных материалов. Основная цель брендбука состоит в
						поддержании узнаваемости компании на рынке и выделении ее уникальных
						особенностей на протяжении всего срока ее существования.
					</p>
					<p className="firstSectionDesc firstSecDesc">
						Гайдлайн — это документ, который определяет стандарты и правила
						использования фирменного стиля в конкретных ситуациях, таких как
						дизайн продуктов, маркетинговые материалы или внутренняя
						корпоративная коммуникация. Основное отличие от брендбука
						заключается в том, что гайдлайн фокусируется на конкретных
						применениях айдентики бренда и его элементов, в то время как
						брендбук обычно включает в себя более широкий спектр информации,
						такой как стратегия бренда, ценности, миссия, а также правила по
						использованию брендовых элементов.
					</p>

					<div className="third-body">
						<img
							src="/MainPage/guidelineFirst.png"
							alt=""
							className="thirdBodyImg"
						/>
						<img
							src="/MainPage/guidelineSecond.png"
							alt=""
							className="thirdBodyImg"
						/>
						<img
							src="/MainPage/guidelineThird.png"
							alt=""
							className="thirdBodyImg"
						/>
					</div>
				</div>

				<div className="second-part">
					<h3 className="generalTitle second-title">
						Брендбук и гайдлайны нужны, если
					</h3>
					<div className="second-body">
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">01</h3>
								<p className="flashDesc">
									Вы сталкиваетесь с ситуацией, когда в результате работы с
									маркетинговыми агентствами получаете несогласованный и
									размытый визуальный образ своего бренда из-за отсутствия
									четких правил использования брендовых элементов.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">02</h3>
								<p className="flashDesc">
									Вы испытываете сложности с узнаваемостью своего бренда на
									рынке из-за неправильно сформированного фирменного стиля.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">03</h3>
								<p className="flashDesc">
									Вы беспокоитесь о поддержании профессионального и
									качественного имиджа своего бренда в различных видах
									визуальной коммуникации с потребителями.
								</p>
							</div>
						</div>
					</div>

					<p className="secondPartLastDesc">
						Соблюдая единый визуальный стиль, брендбук руководствуется
						характером и ценностями бренда, предоставляя рекомендации по
						использованию сюжетов в рекламных кампаниях и определяя допустимые и
						нежелательные варианты использования фирменного стиля в рекламе. В
						итоге брендбук и гайдлайны представляют примеры правильного дизайна
						рекламных материалов с соблюдением всех установленных требований.
						Это позволяет сохранить айдентику бренда, что немало важно для
						поддержания имиджа компании на рынке.
					</p>
				</div>

				<div className="third-part">
					<h3 className="generalTitle thirdTitle">О нас</h3>
					<p className="thirdDesc">
						Мы являемся командой опытных специалистов в области маркетинга и
						брендинга, которая специализируется на создании качественных и
						эффективных брендбуков и гайдлайнов для различных бизнесов и медиа
						проектов. Наша цель - помочь компаниям и брендам выделиться на рынке
						и создать прочные связи между вами и вашей целевой аудиторией.
					</p>
					<p className="thirdDesc">
						Создание единого и узнаваемого стиля для компании часто является
						сложной задачей, особенно при отсутствии опыта или
						специализированных знаний. Неопределенность в стиле и образе может
						привести к потере узнаваемости и доверия со стороны клиентов.
					</p>
					<p className="thirdDesc">
						Наша компания <span className="yellowFont">Time to</span> предлагает
						индивидуальный и профессиональный подход к созданию брендбуков и
						гайдлайнов, которые помогут вашему бизнесу стать заметным и успешным
						на рынке. Мы работаем над каждым проектом с особым вниманием к
						деталям, чтобы обеспечить соответствие вашего бренда вашим целям и
						амбициям.
					</p>

					<div className="third-body">
						<img
							src="/MainPage/guidelineFourth.png"
							alt=""
							className="thirdBodyImg"
						/>
						<img
							src="/MainPage/guidelineFifth.png"
							alt=""
							className="thirdBodyImg"
						/>
						<img
							src="/MainPage/guidelineSixth.png"
							alt=""
							className="thirdBodyImg"
						/>
					</div>
				</div>

				<div className="fourth-part">
					<h3 className="generalTitle">
						Всего 5 простых шагов, чтобы получить собственный брендбук или
						гайдлайн
					</h3>

					<div className="fourthSectionBody">
						<div className="fourthBodyItem">
							<div className="fourthInnerItem">
								<h4 className="fourthInnerTitle">Свяжитесь с нами</h4>
								<p className="fourthInnerDesc">
									Начните процесс, связавшись с нами любым удобным для вас
									способом - по телефону, электронной почте или через форму
									обратной связи на нашем сайте.
								</p>
							</div>
							<div className="fourthInnerItem">
								<h4 className="fourthInnerTitle">Проводим брифинг</h4>
								<p className="fourthInnerDesc">
									Мы проведем детальное собеседование, чтобы понять ценности
									вашего бизнеса, его миссию, ваши цели, запросы и пожелания
									относительно создания брендбука или гайдлайна.
								</p>
							</div>
						</div>
						<div className="fourthBodyItem ">
							<div className="fourthInnerItem TwoInOne">
								<h4 className="fourthInnerTitle">
									Утверждаем и передаем результат
								</h4>
								<p className="fourthInnerDesc">
									После вашего утверждения мы передадим вам готовый брендбук или
									гайдлайн в удобном для вас формате, готовый к использованию.
								</p>
							</div>
						</div>
						<div className="fourthBodyItem">
							<div className="fourthInnerItem">
								<h4 className="fourthInnerTitle">Разрабатываем концепцию</h4>
								<p className="fourthInnerDesc">
									На основе полученной информации и сделанных выводов мы
									разработаем концепцию вашего брендбука или гайдлайна, которая
									наилучшим образом отражает вашу уникальность и ценности.
								</p>
							</div>
							<div className="fourthInnerItem">
								<h4 className="fourthInnerTitle">Визуализируем</h4>
								<p className="fourthInnerDesc">
									Мы запускаем творческий процесс, а затем воплощаем нашу с вами
									совместную идею в жизнь, создавая эстетически привлекательный
									и функциональный документ с учетом всех ваших пожеланий.
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
							GuidelineCardList.map((card) => (
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
							Закажите разработку брендбука или гайдлайна!
						</h3>
						<div className="getsFlex">
							<p className="sixth-foot-desc">
								Если у Вас остались вопросы, оставьте заявку, и мы свяжемся с
								Вами в ближайшее время
							</p>

							<button className="sixth-foot-btn">Заполнить бриф →</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Guideline;
