import Link from "next/link";

import "../styles/Presentatiton/Presentation.css";
import "../styles/Presentatiton/PresentResponsive.css";
// get data from firebase
import { db } from "./FirebaseConfig";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { ClipLoader } from "react-spinners";

interface PresentationCard {
	id: string;
	title: string;
	desc: string;
	imageUrl: string;
	userId?: string;
}

const Presentation = () => {
	//get data from firebase
	const [PresentationCardList, setPresentationCardList] = useState<
		PresentationCard[]
	>([]);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const PresentationCardsCollectionRef = collection(db, "PresentationCards");

	const getPresentationCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(PresentationCardsCollectionRef);
			const filteredData: PresentationCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<PresentationCard, "id">),
				id: doc.id,
			}));
			setPresentationCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		getPresentationCardList();
		console.log(PresentationCardList);
	}, []);
	return (
		<>
			<div className="presentation-wrapper">
				<div className="innerHead">
					<h2 className="main-title">
						Дизайн
						<span className="yellowFont"> Презентаций</span>
					</h2>
					<p className="title-desc">
						Добро пожаловать в <span className="yellowFont">Time to</span>,
						вашего надежного партнера в мире мерчандайзинга и сувенирной
						продукции.
					</p>
				</div>

				<div className="first-part">
					<h3 className="generalTitle first-title">Что такое презентация?</h3>
					<p className="firstSectionDesc">
						В мире бизнеса существует множество важных аспектов, но одним из
						ключевых является эффективная коммуникация с клиентами и партнерами.
						И нет лучшего способа привлечь их внимание, чем качественная
						презентация. Цель каждой презентации – заинтересовать аудиторию и
						передать информацию с максимальной эффективностью. Дизайн
						презентаций — это неотъемлемая часть успешной коммуникации в
						различных сферах бизнеса. Готовы заявить миру о вашем бизнесе с
						помощью уникальной презентации? Тогда позвольте нам помочь!
					</p>

					<div className="firstImgWrap">
						<img
							src="/MainPage/presentationMainImg.png"
							alt=""
							className="firstSectionImg"
						/>
					</div>
				</div>

				<div className="second-part">
					<h3 className="generalTitle second-title">Наши преимущества</h3>
					<div className="second-body">
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Индивидуальный подход</h4>
								<p className="flashDesc">
									Мы понимаем, что каждый бизнес уникален, поэтому мы подходим к
									каждому проекту индивидуально. Наша команда работает тесно с
									клиентами, чтобы понять их потребности, цели и особенности
									бренда, что позволяет нам создавать презентации, полностью
									соответствующие их ожиданиям.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Профессионализм</h4>
								<p className="flashDesc">
									Наши дизайнеры обладают богатым опытом в создании презентаций
									для различных отраслей бизнеса. Мы постоянно отслеживаем
									последние тенденции в дизайне и визуализации данных, чтобы
									гарантировать, что наши клиенты получают качественные и
									современные презентации.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h4 className="flashTitle">Полный цикл услуг</h4>
								<p className="flashDesc">
									Мы предоставляем полный цикл услуг, начиная с разработки
									концепции и заканчивая подготовкой презентаций в нужном
									формате. Наша команда экспертов поддерживает клиентов на всех
									этапах работы, гарантируя качественный результат и
									удовлетворение всех потребностей.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="third-part">
					<h3 className="generalTitle third-title">Процесс работы</h3>
					<div className="thirdBody">
						<div className="thirdBodyItem">
							<h4 className="thirdBodyTitle">Консультация</h4>
							<p className="thirdBodyDesc">
								 Мы начинаем с глубокого понимания потребностей и целей клиента.
								В ходе консультации мы обсуждаем детали проекта, выявляем
								основные сообщения, целевую аудиторию и планируем стратегию
								презентации.
							</p>
						</div>
						<div className="thirdBodyItem">
							<h4 className="thirdBodyTitle">Разработка концепции</h4>
							<p className="thirdBodyDesc">
								Наши дизайнеры создают уникальную концепцию презентации,
								учитывая структуру, дизайн и основные сообщения. Мы предлагаем
								клиентам различные варианты концепций и рекомендации для
								достижения оптимального результата.
							</p>
						</div>
						<div className="thirdBodyItem">
							<h4 className="thirdBodyTitle">Доработка и утверждение</h4>
							<p className="thirdBodyDesc">
								 Мы предоставляем клиентам возможность для комментариев и
								корректировок. Мы внимательно слушаем обратную связь и вносим
								необходимые изменения, чтобы презентация соответствовала
								ожиданиям клиента.
							</p>
						</div>
						<div className="thirdBodyItem">
							<h4 className="thirdBodyTitle">Итоговая подготовка</h4>
							<p className="thirdBodyDesc">
								После утверждения концепции мы окончательно оформляем
								презентацию и готовим ее к передаче в нужном формате. Мы
								гарантируем, что презентация будет готова к использованию на
								конференциях, встречах или в онлайн-формате.
							</p>
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
							PresentationCardList.map((card) => (
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
						<h3 className="fifth-foot-title">Не откладывайте успех на потом</h3>
						<div className="getsFlex">
							<p className="fifth-foot-desc">
								Свяжитесь с нами прямо сейчас и начнем работу!
							</p>

							<button className="fifth-foot-btn">Заполнить бриф →</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Presentation;
