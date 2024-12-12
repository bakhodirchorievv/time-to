import Link from "next/link";
import "../styles/Naming/Naming.css";
import "../styles/Naming/NamingResponsive.css";
// get data from firebase
import { db } from "./FirebaseConfig";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { ClipLoader } from "react-spinners";

interface NamingCard {
	id: string;
	title: string;
	desc: string;
	imageUrl: string;
	userId?: string;
}

const Naming = () => {
	//get data from firebase
	const [NamingCardList, setNamingCardList] = useState<NamingCard[]>([]);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const NamingCardsCollectionRef = collection(db, "NamingCards");

	const getNamingCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(NamingCardsCollectionRef);
			const filteredData: NamingCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<NamingCard, "id">),
				id: doc.id,
			}));
			setNamingCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		getNamingCardList();
		console.log(NamingCardList);
	}, []);
	return (
		<>
			<div className="naming-wrapper">
				<div>
					<h2 className="main-title">
						<span className="yellowFont">Названия,</span> которые покорят  мир:
					</h2>
					<h2 className="main-title">
						Ваш путь к бренду, о котором будут говорить!
					</h2>
					<p className="title-desc">
						Создание оригинального названия для вашего продукта или услуги в
						течение
					</p>
				</div>

				<div className="first-part">
					<h3 className="generalTitle first-title">Что такое нейминг?</h3>
					<p className="firstSectionDesc">
						Нейминг - создание уникального названия для бренда — это процесс,
						который требует внимательного подхода и творческого мышления. Хотя с
						виду может показаться, что нейминг не представляет особой сложности,
						на практике это искусство требует глубокого понимания деятельности
						компании, умения создать запоминающееся и гармоничное название, а
						также учета юридических аспектов.
					</p>

					<div className="firstImgWrap">
						<img
							src="/MainPage/first-section-img.png"
							alt=""
							className="firstSectionImg"
						/>
					</div>
				</div>

				<div className="second-part">
					<h3 className="generalTitle second-title">Нейминг нужен, если</h3>
					<div className="second-body">
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">01</h3>
								<p className="flashDesc">
									Ваше текущее название не передает сущность и особенности
									вашего бренда.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">02</h3>
								<p className="flashDesc">
									Ваша компания выходит на новые рынки и требуется
									привлекательное имя, которое привлечет внимание вашей целевой
									аудитории.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">03</h3>
								<p className="flashDesc">
									Ваш продукт конкурирует с многочисленными сильными брендами, и
									вы хотите выделиться среди них.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">04</h3>
								<p className="flashDesc">
									Вы запускаете новый проект и хотите, чтобы его название
									привлекало внимание и запоминалось.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="third-part">
					<h3 className="generalTitle thirdTitle">О нас</h3>
					<p className="thirdDesc">
						Наша компания является экспертом в области нейминга для бизнеса и
						медиа. Мы понимаем, что правильно подобранное название имеет
						огромное значение для успеха бренда. Часто недооценивается,
						насколько ключевым этапом является выбор названия для компании,
						продукта или услуги.
					</p>
					<p className="thirdDesc">
						Частая проблема, с которой сталкиваются многие бизнесы и
						медиапроекты, заключается в том, что неэффективные или неинтересные
						названия не только могут ухудшить узнаваемость и привлекательность
						бренда, но и создать препятствия для его успешного продвижения.
					</p>
					<p className="thirdDesc">
						Мы решаем эту проблему, предлагая инновационные и креативные подходы
						к созданию названий, которые не только точно отражают суть бренда,
						но и запоминаются своей оригинальностью и привлекательностью. Мы
						гарантируем, что с нашими услугами ваш бренд будет выделяться на
						рынке и привлекать внимание потребителей.
					</p>

					<div className="third-body">
						<img
							src="/MainPage/thirdFirst.png"
							alt=""
							className="thirdBodyImg"
						/>
						<img
							src="/MainPage/thirdSecond.png"
							alt=""
							className="thirdBodyImg"
						/>
						<img
							src="/MainPage/thirdThird.png"
							alt=""
							className="thirdBodyImg"
						/>
					</div>
				</div>

				<div className="fourth-part">
					<h3 className="generalTitle">
						Шаги на пути к названию, о котором будут говорить которое будет
						звучать
					</h3>

					<div className="fourthSectionBody">
						<div className="fourthBodyItem">
							<div className="fourthInnerItem">
								<h4 className="fourthInnerTitle">Определяем цели</h4>
								<p className="fourthInnerDesc">
									В ходе беседы мы берем на себя задачу понять ваши точные цели
									и ожидания от проекта, чтобы обеспечить наилучший результат
								</p>
							</div>
							<div className="fourthInnerItem">
								<h4 className="fourthInnerTitle">Изучаем рынок</h4>
								<p className="fourthInnerDesc">
									Мы проводим анализ рынка и выявляем тематические направления и
									семантические поля, чтобы название соответствовало требованиям
									вашей индустрии.
								</p>
							</div>
						</div>
						<div className="fourthBodyItem ">
							<div className="fourthInnerItem TwoInOne">
								<h4 className="fourthInnerTitle">Обсуждаем результаты</h4>
								<p className="fourthInnerDesc">
									Мы представляем вам готовые варианты названия и подробно
									обсуждаем их потенциал и соответствие вашим целям и ожиданиям.
								</p>
							</div>
						</div>
						<div className="fourthBodyItem">
							<div className="fourthInnerItem">
								<h4 className="fourthInnerTitle">
									Запускаем творческий процесс
								</h4>
								<p className="fourthInnerDesc">
									На основе полученной информации мы приступаем к созданию
									уникального и привлекательного названия, учитывая все наши
									выводы и аналитику.
								</p>
							</div>
							<div className="fourthInnerItem">
								<h4 className="fourthInnerTitle">Проверяем уникальность</h4>
								<p className="fourthInnerDesc">
									Мы тщательно проверяем выбранные названия на уникальность и
									возможность регистрации в соответствии с МКТУ.
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
							NamingCardList.map((card) => (
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
							Закажите разработку эффектного названия!
						</h3>
						<div className="getsFlex">
							<p className="sixth-foot-desc">
								Дайте вашему бренду имя, которое запомнят Если у Вас остались
								вопросы, оставьте заявку, и мы свяжемся с Вами в ближайшее время
							</p>

							<button className="sixth-foot-btn">
								Хочу оригинальный нейминг →
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Naming;
