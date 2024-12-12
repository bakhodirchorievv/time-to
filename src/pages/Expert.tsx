import Link from "next/link";
import "../styles/Expert/Expert.css";
import "../styles/Expert/ExpertResponsive.css";
// get data from firebase
import { db } from "./FirebaseConfig";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { ClipLoader } from "react-spinners";

interface ExpertCard {
	id: string;
	title: string;
	desc: string;
	imageUrl: string;
	userId?: string;
}

const Expert = () => {
	//get data from firebase
	const [ExpertCardList, setExpertCardList] = useState<ExpertCard[]>([]);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const ExpertCardsCollectionRef = collection(db, "ExpertCards");

	const getExpertCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(ExpertCardsCollectionRef);
			const filteredData: ExpertCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<ExpertCard, "id">),
				id: doc.id,
			}));
			setExpertCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		getExpertCardList();
		console.log(ExpertCardList);
	}, []);
	return (
		<>
			<div className="expert-wrapper">
				<div className="innerHead">
					<h2 className="main-title">
						<span className="yellowFont">Эксперты </span>мнения и соцсети
					</h2>
				</div>

				<div className="first-part">
					<h3 className="generalTitle first-title">О нас</h3>
					<p className="firstSectionDesc">
						Мы - команда экспертов по продвижению твоего бизнеса в социальных
						сетях. Наша цель - помочь тебе увеличить узнаваемость бренда,
						привлечь новых клиентов и повысить продажи.
					</p>

					<div className="firstImgWrap">
						<img
							src="/MainPage/ExpertMainImg.png"
							alt=""
							className="firstSectionImg"
						/>
					</div>
				</div>

				<div className="second-part">
					<h3 className="generalTitle second-title">
						Что дает бизнесу продвижение и реклама в социальных сетях
					</h3>
					<div className="second-body">
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">Увеличение узнаваемости бренда.</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">
									Создание дополнительного канала продаж.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">
									Возможность установить контакт с потенциальными клиентами и
									понять их потребности.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">
									Привлечение дополнительного трафика на веб-сайт.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc">
									Повышение лояльности клиентов и доверия к бренду.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="third-part">
					<h3 className="generalTitle third-title">
						Наши ключевые направления
					</h3>

					<div className="thirdPartBody">
						<div className="thirdPartItem">
							<h4 className="thirdBodyTitle">
								Поиск и анализ блогеров с целевой аудиторией
							</h4>
							<p className="thirdBodyDesc">
								Наш сервис проводит автоматический анализ вашей целевой
								аудитории и подбирает наиболее подходящих блогеров для
								эффективного продвижения вашего продукта.{" "}
							</p>
						</div>
						<div className="thirdPartItem">
							<h4 className="thirdBodyTitle">Закупка рекламы</h4>
							<p className="thirdBodyDesc">
								Мы предлагаем полное сопровождение и помощь в продвижении вашей
								рекламы, чтобы достичь максимального эффекта. Мы работаем с
								различными социальными сетями, включая Instagram, VK, Facebook и
								другие
							</p>
						</div>
						<div className="thirdPartItem">
							<h4 className="thirdBodyTitle">Вирусная реклама</h4>
							<p className="thirdBodyDesc">
								Наш сервис может помочь вам в создании и распространении
								вирусной рекламы через социальные сети, подбирая подходящих
								блогеров и создавая контент, который будет привлекать внимание
								пользователей.
							</p>
						</div>
						<div className="thirdPartItem">
							<h4 className="thirdBodyTitle">Дизайн</h4>
							<p className="thirdBodyDesc">
								Мы разработаем для вас качественный дизайн для социальных сетей,
								который будет соответствовать вашим потребностям и поможет
								выделиться среди конкурентов.
							</p>
						</div>
						<div className="thirdPartItem">
							<h4 className="thirdBodyTitle">Крауд маркетинг</h4>
							<p className="thirdBodyDesc">
								Мы предоставляем услуги крауд-маркетинга, способствующие
								привлечению внимания широкой аудитории к вашему бренду или
								продукту, а также формированию мощного сообщества сторонников.
							</p>
						</div>
						<div className="thirdPartItem">
							<h4 className="thirdBodyTitle">Посев</h4>
							<p className="thirdBodyDesc">
								Наша команда профессионалов разместит рекламные посты от вашего
								имени в самых актуальных группах и сообществах, чтобы увеличить
								узнаваемость и привлечь новых клиентов.
							</p>
						</div>
					</div>
				</div>

				<div className="fourth-part">
					<h3 className="generalTitle fourth-title">
						Как мы создаем стратегию, которая работает
					</h3>
					<div className="fourth-body">
						<div className="fourthBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Сбор информации</h4>
								<p className="flashDesc ">
									Обсуждение ключевой информации с клиентом и заполнение брифа
								</p>
							</div>
						</div>
						<div className="fourthBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Планирование</h4>
								<p className="flashDesc flashDescTwo">
									Исследование целевой аудитории и конкурентов, разработка
									стратегии
								</p>
							</div>
						</div>
						<div className="fourthBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Создание контента</h4>
								<p className="flashDesc ">
									Разработка визуального концепта и «фундамента» страницы -
									контента
								</p>
							</div>
						</div>
						<div className="fourthBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Публикация</h4>
								<p className="flashDesc flashDescTwo">
									Управление социальными сетями, постинг и анализ
								</p>
							</div>
						</div>
						<div className="fourthBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Привлечение трафика</h4>
								<p className="flashDesc ">
									Таргетированная реклама, сотрудничество с блогерами,
									проведение розыгрышей, кросс-маркетинг
								</p>
							</div>
						</div>
						<div className="fourthBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Отчетность</h4>
								<p className="flashDesc flashDescTwo">
									Анализ и презентация результатов работы
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
							ExpertCardList.map((card) => (
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
						<h3 className="fifth-foot-title">Оставьте заявку!</h3>
						<div className="getsFlex">
							<p className="fifth-foot-desc">
								 наша команда экспертов превратит ваши концепции в
								запоминающуюся и оригинальную рекламу, которая эффективно
								подчеркнет уникальность вашего бренда.
							</p>

							<button className="fifth-foot-btn">Заполнить бриф →</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Expert;
