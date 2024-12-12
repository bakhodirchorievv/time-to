import Link from "next/link";
// import "../styles/Packing/Packing.css";
// import "../styles/Packing/PackingResponsive.css";
// get data from firebase
import { db } from "./FirebaseConfig";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import Head from "next/head";

interface PackingCard {
	id: string;
	title: string;
	desc: string;
	imageUrl: string;
	userId?: string;
}

const Packing = () => {
	//get data from firebase
	const [PackingCardList, setPackingCardList] = useState<PackingCard[]>([]);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const PackingCardsCollectionRef = collection(db, "PackingCards");

	const getPackingCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(PackingCardsCollectionRef);
			const filteredData: PackingCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<PackingCard, "id">),
				id: doc.id,
			}));
			setPackingCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		getPackingCardList();
		console.log(PackingCardList);
	}, []);
	return (
		<>
			<Head>
				<link rel="stylesheet" href="/styles/Packing/Packing.css" />
			</Head>
			<Head>
				<link rel="stylesheet" href="/styles/Packing/PackingResponsive.css" />
			</Head>
			<div className="packing-wrapper">
				<div className="innerHead">
					<h2 className="main-title">Упаковка</h2>
					<p className="main-desc">
						Добро пожаловать в Time to – Вашего надежного партнера в мире
						маркетинговых решений. 
					</p>
					<p className="main-desc">
						Упаковка — это не просто оболочка продукта, это первое, что видит
						потребитель, и ключевой элемент в формировании впечатления о бренде.
						Мы гордимся тем, что помогаем компаниям выделиться среди
						конкурентов, создавая упаковки, которые не только привлекают
						внимание, но и укрепляют лояльность аудитории.
					</p>
					<p className="main-desc shortMainDesc">
						Наши упаковки — результат тщательного анализа Вашего бренда, Вашего
						продукта и Вашей целевой аудитории. Мы стремимся создать не просто
						функциональные оболочки, а своего рода произведения искусства,
						которые будут точно передавать Вашу уникальность и стиль.
					</p>

					<div className="head-foot">
						<div className="head-foot-item yellowFont">
							<h4 className="head-foot-title yellowContent">
								Проблема потребителя
							</h4>
							<p className="head-foot-desc yellowContent">
								В современном мире, перенасыщенном информацией и разнообразными
								предложениями, привлечение внимания целевой аудитории становится
								все более сложной задачей для бизнеса. Потребители оказываются
								окружены множеством альтернативных продуктов и услуг, и выбор
								становится непростым. В таких условиях, имеющаяся упаковка
								бизнеса или продукта играет решающую роль. Это не только первое,
								что видят потребители, но и ключевой фактор, влияющий на их
								решение о покупке.
							</p>
						</div>
						<div className="head-foot-item alignCenterItem">
							<p className="head-foot-desc">
								 Клиенты ожидают, чтобы упаковка отражала ценности бренда,
								предлагала уникальные решения и подчеркивала пользу продукта.
								Они ищут упаковку, которая не только защищает товар, но и
								визуально привлекает внимание, создавая эмоциональную связь и
								стимулируя покупку. В таких условиях, для бизнеса становится
								критически важным обеспечить упаковку, которая не только
								соответствует ожиданиям потребителей, но и выделяет его среди
								конкурентов.
							</p>
						</div>
					</div>
				</div>

				<div className="first-part">
					<h3 className="generalTitle first-title">
						Как мы решаем эту проблему?
					</h3>
					<p className="firstSectionDesc">
						Наша фирма решает проблему выбора для потребителей, предлагая
						инновационные дизайны упаковки. Мы создаем уникальные концепции,
						которые выделяют продукт среди конкурентов и привлекают внимание на
						полках магазинов. Наш подход направлен на то, чтобы упаковка была
						информативной, привлекательной и вызывающей эмоциональную
						привязанность у потребителей, делая их выбор проще и более
						интуитивным.
					</p>

					<div className="first-body">
						<img
							src="/MainPage/packingFirst.png"
							alt=""
							className="firstBodyImg"
						/>
						<img
							src="/MainPage/packingSecond.png"
							alt=""
							className="firstBodyImg"
						/>
						<img
							src="/MainPage/packingThird.png"
							alt=""
							className="firstBodyImg"
						/>
					</div>
				</div>

				<div className="second-part">
					<h3 className="generalTitle second-title">
						Преимущества нашей компании
					</h3>
					<div className="second-body">
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">Индивидуальный подход</h3>
								<p className="flashDesc">
									Мы уделяем внимание каждому клиенту, разрабатывая уникальные
									решения, которые соответствуют их потребностям и целям.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">Экспертность команды</h3>
								<p className="flashDesc">
									Наша команда состоит из опытных дизайнеров и маркетологов,
									обладающих глубокими знаниями в области создания эффективной
									упаковки и брендинга.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">Сотрудничество на всех этапах</h3>
								<p className="flashDesc">
									Мы предоставляем полную поддержку нашим клиентам на всех
									этапах проекта, начиная с консультации и заканчивая
									реализацией упаковки.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">
									Результат ориентированный на успех
								</h3>
								<p className="flashDesc">
									Наша цель - помочь Вашему продукту привлечь внимание и
									выделиться на рынке, что приведет к увеличению продаж и
									укреплению вашего бренда
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="third-part">
					<h3 className="generalTitle third-title">Процесс работы</h3>

					<div className="thirdBody">
						<div className="thirdBodyItem">
							<h4 className="thirdBodyTitle">Дизайн-аудит</h4>
							<p className="thirdBodyDesc">
								Мы начинаем с тщательного анализа текущей упаковки продукта или
								бренда. Этот этап помогает нам выявить сильные и слабые стороны
								существующего дизайна и определить ключевые аспекты, которые
								необходимо улучшить.
							</p>
						</div>
						<div className="thirdBodyItem">
							<h4 className="thirdBodyTitle">Разработка концепции</h4>
							<p className="thirdBodyDesc">
								На основе результатов дизайн-аудита наша команда разрабатывает
								уникальную концепцию упаковки, которая будет соответствовать
								Вашим бизнес-целям и привлекать внимание целевой аудитории. Мы
								учитываем Вашу маркетинговую стратегию, особенности продукта и
								предпочтения Вашей аудитории, чтобы создать дизайн, который
								эффективно передаст уникальные преимущества продукта.
							</p>
						</div>
						<div className="thirdBodyItem">
							<h4 className="thirdBodyTitle">Утверждение проекта</h4>
							<p className="thirdBodyDesc">
								После разработки концепции мы предоставляем Вам предварительные
								варианты дизайна для рассмотрения и обратной связи. Мы
								внимательно прислушиваемся к Вашим пожеланиям и корректируем
								дизайн в соответствии с Вашими требованиями. Как только
								окончательный дизайн утвержден, мы переходим к финализации
								проекта
							</p>
						</div>
					</div>
					<div className="third-foot">
						<h4 className="third-foot-title">
							Макет для печати этикетки в типографии
						</h4>
						<p className="third-foot-desc">
							Заключительным этапом всего процесса является подготовка макета
							для печати этикетки в типографии. Мы обеспечиваем высокое качество
							и профессиональную подготовку макета, чтобы Ваша упаковка
							выглядела привлекательно и профессионально на полках магазинов.
						</p>
					</div>
				</div>

				<div className="fourth-part">
					<h3 className="generalTitle fourth-title">Портфолио и отзывы</h3>

					<div className="fourthBody">
						{isLoading ? (
							<div className="loading-indicator">
								<ClipLoader size={50} color={"#eee"} loading={isLoading} />
							</div>
						) : (
							PackingCardList.map((card) => (
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
							Хотите, чтобы Ваш продукт выделялся из толпы?
						</h3>
						<div className="getsFlex">
							<p className="fourth-foot-desc">
								Не упустите возможность сделать Ваш бренд более привлекательным
								и узнаваемым на рынке! Свяжитесь с нами прямо сейчас, чтобы
								начать работу над уникальной упаковкой вашего продукта.
							</p>

							<button className="fourth-foot-btn">Заполнить бриф →</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Packing;
