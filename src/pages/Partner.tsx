import Link from "next/link";
// import "../styles/Partner/Partner.css";
// import "../styles/Partner/PartnerResponsive.css";
// get data from firebase
import { db } from "./FirebaseConfig";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import Head from "next/head";

interface PartnerCard {
	id: string;
	title: string;
	desc: string;
	imageUrl: string;
	userId?: string;
}

const Partner = () => {
	//get data from firebase
	const [PartnerCardList, setPartnerCardList] = useState<PartnerCard[]>([]);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const PartnerCardsCollectionRef = collection(db, "PartnerCards");

	const getPartnerCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(PartnerCardsCollectionRef);
			const filteredData: PartnerCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<PartnerCard, "id">),
				id: doc.id,
			}));
			setPartnerCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		getPartnerCardList();
		console.log(PartnerCardList);
	}, []);
	return (
		<>
			<Head>
				<link rel="stylesheet" href="/styles/Partner/Partner.css" />
			</Head>
			<Head>
				<link rel="stylesheet" href="/styles/Partner/PartnerResponsive.css" />
			</Head>
			<div className="partner-wrapper">
				<div className="innerHead">
					<h2 className="main-title">
						<span className="yellowFont"> Презентация </span>
						для партнеров и инвесторов
					</h2>
				</div>

				<div className="first-part">
					<p className="firstSectionDesc">
						Эффективные презентации для бизнеса разрабатываются здесь.{" "}
						<p>
							Ваш успех в презентациях - наш приоритет! Опыт и надежность на
							протяжении десятилетий
						</p>
					</p>
					<p className="firstSectionDesc">
						Мы специализируемся на создании успешных бизнес-презентаций, которые
						могут мотивировать вашу аудиторию. Наша команда готова быстро и
						качественно разработать дизайн. Мы предлагаем комплексный подход к
						вашему бизнесу, включая участие дизайнеров, копирайтеров и
						аналитиков.
					</p>

					<div className="firstImgWrap">
						<img
							src="/MainPage/PartnerMainImg.png"
							alt=""
							className="firstSectionImg"
						/>
					</div>
				</div>

				<div className="second-part">
					<h3 className="generalTitle second-title">Почему мы?</h3>
					<div className="second-body">
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">
									Работаем до согласования каждого этапа. Кайфуем от процесса
									работы и результата, который выдаем.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">
									Быстро включаемся и работаем по целям и задачам клиента.
									Знаем, что и как делать для получения результата.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">
									Дружелюбный сервис. Всегда выслушиваем все ваши пожелания и
									искренне хотим осуществить вам
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">
									Работа с нуля. У нас целая команда специалистов – дизайнеров,
									копирайтеров и аналитиков, которая способна создать уникальную
									презентацию конкретно для вас
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">
									Подготовим все материалы, даже если у вас нет ничего кроме
									названия и горящих сроков.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">
									Без ограничения правок. Работаем столько, сколько нужно,
									участвуя в процессе до согласования.
								</p>
							</div>
						</div>
					</div>

					<div className="secondPartBottom">
						<div className="bottomBody">
							<div className="bottomItem">
								<p className="bottomItemDesc">
									Инвесторы и потенциальные партнеры уделяют 3 минуты на оценку
									привлекательности нового проекта. Ключ к успеху заключается в
									том, чтобы представить свою идею таким образом, чтобы они
									запомнили вас и проявили интерес к дальнейшему рассмотрению.
								</p>
							</div>
							<div className="bottomItem">
								<p className="bottomItemDesc">
									Создание презентаций, освещающих перспективы развития
									организации, представляет собой важное и ответственное
									занятие. Такие презентации обычно представляются деловым
									партнерам и потенциальным инвесторам с целью привлечения
									дополнительных финансовых ресурсов и обеспечения успешного
									продвижения компании на рынке.
								</p>
							</div>
						</div>
						<div className="bottomFoot">
							<p className="bottomFootDesc">
								Эффективная презентация — это мощный инструмент в арсенале
								руководства компании, способный привлечь внимание аудитории,
								донести до нее важность и эффективность стратегии, заложенной в
								плане развития. Зачастую потенциальные инвесторы изучают
								презентации различных конкурирующих компаний, чтобы определить,
								какая из них является более инновационной и предлагает наиболее
								перспективные возможности для развития бизнеса. Для того чтобы
								заинтересовать инвесторов своим проектом, необходимо создать
								продающую презентацию, сочетающую в себе информативность и
								наглядность.
							</p>
						</div>
					</div>
				</div>

				<div className="third-part">
					<h3 className="generalTitle third-title">Схема работы</h3>
					<div className="thirdPartBottom">
						<div className="thirdBottomBody">
							<div className="thirdBottomItem">
								<h4 className="thirdBottomItemTitle">Заполнение брифа</h4>
								<p className="thirdBottomItemDesc">
									Вы заполняете бриф, мы определяем основные моменты и выявляем
									цели презентации. При необходимости мы готовы задать
									дополнительные вопросы по телефону, помочь в заполнении брифа
									и т.д.
								</p>
							</div>
							<div className="thirdBottomItem">
								<h4 className="thirdBottomItemTitle">Подписание договора</h4>
								<p className="thirdBottomItemDesc">
									Внесение заказчиком аванса согласно условиям договора
								</p>
							</div>
							<div className="thirdBottomItem">
								<h4 className="thirdBottomItemTitle">
									Составление структуры и текста
								</h4>
								<p className="thirdBottomItemDesc">
									В процессе работы над текстами мы можем задавать уточняющие
									вопросы по телефону, электронной почте. Заказчик может вносить
									корректировки
								</p>
							</div>
							<div className="thirdBottomItem">
								<h4 className="thirdBottomItemTitle">Создание сайта</h4>
								<p className="thirdBottomItemDesc">
									Создание 2 концепций дизайна на примере обложки и внутреннего
									слайда. Заказчик может вносить корректировк
								</p>
							</div>
							<div className="thirdBottomItem">
								<h4 className="thirdBottomItemTitle">Верстка</h4>
								<p className="thirdBottomItemDesc">
									Все остальные слайды верстаются на основе ранее согласованного
									текста и утвержденной концепции дизайна. Заказчик может
									вносить корректировки
								</p>
							</div>
							<div className="thirdBottomItem">
								<h4 className="thirdBottomItemTitle">Сдача проекта</h4>
								<p className="thirdBottomItemDesc">
									Оплата оставшейся части согласно условиям договора. Отправка
									исходников. Обмен оригиналами закрывающих документов
								</p>
							</div>
						</div>
						<div className="thirdBottomFoot">
							<h4 className="thirdBottomItemTitle bottomFootTitle">
								Не прощаемся
							</h4>
							<p className="thirdBottomFootDesc">
								Мы заинтересованы в долгосрочном сотрудничестве и будем рады
								исполнить для вас любые дополнительные услуги
							</p>
						</div>
					</div>
				</div>

				<div className="fourth-part">
					<h3 className="generalTitle fourth-title">
						Здесь представлены примеры наших работ для бизнес-партнеров
					</h3>

					<div className="fourthBody">
						{isLoading ? (
							<div className="loading-indicator">
								<ClipLoader size={50} color={"#eee"} loading={isLoading} />
							</div>
						) : (
							PartnerCardList.map((card) => (
								<div className="fourthBodyItem" key={card.id}>
									<div
										className="whiteBack"
										style={{ backgroundImage: `url(${card.imageUrl})` }}
									></div>
									<h3 className="fourthBodyTitle">
										{card.title || "Пропорция"}
									</h3>
									<p className="fourthBodyDesc">
										{card.desc || "Салон красоты"}
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
							<Link to={"/Site"}>
								<button className="fourthBtn">Сайт</button>
							</Link>
						</div>
						<div className="fourthBodyItem">
							<div className="whiteBack"></div>
							<h3 className="fourthBodyTitle">Пропорция</h3>
							<p className="fourthBodyDesc">Салон красоты</p>
							<Link to={"/Site"}>
								<button className="fourthBtn">Сайт</button>
							</Link>
						</div>
						<div className="fourthBodyItem">
							<div className="whiteBack"></div>
							<h3 className="fourthBodyTitle">Пропорция</h3>
							<p className="fourthBodyDesc">Салон красоты</p>
							<Link to={"/Site"}>
								<button className="fourthBtn">Сайт</button>
							</Link>
						</div> */}
					</div>

					<div className="fourth-part-foot">
						<h3 className="fourth-foot-title">
							Оставьте заявку и получите убедительную презентацию!
						</h3>
						<div className="getsFlex">
							<p className="fourth-foot-desc">
								Дайте вашему бизнесу дополнительное преимущество, которое
								повысит ваше положение на рынке в глазах клиентов
							</p>

							<button className="fourth-foot-btn">Заполнить бриф →</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Partner;
