import Link from "next/link";
// import "../styles/MDesign/MDesign.css";
// import "../styles/MDesign/MDesignResponsive.css";
// get data from firebase
import { db } from "./FirebaseConfig";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import Head from "next/head";

interface MotionDesignCard {
	id: string;
	title: string;
	desc: string;
	imageUrl: string;
	userId?: string;
}

const MDesign = () => {
	//get data from firebase
	const [MotionDesignCardList, setMotionDesignCardList] = useState<
		MotionDesignCard[]
	>([]);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const MotionDesignCardsCollectionRef = collection(db, "MotionDesignCards");

	const getMotionDesignCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(MotionDesignCardsCollectionRef);
			const filteredData: MotionDesignCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<MotionDesignCard, "id">),
				id: doc.id,
			}));
			setMotionDesignCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		getMotionDesignCardList();
		console.log(MotionDesignCardList);
	}, []);
	return (
		<>
			<Head>
				<link rel="stylesheet" href="/styles/MDesign/MDesign.css" />
			</Head>
			<Head>
				<link rel="stylesheet" href="/styles/MDesign/MDesignResponsive.css" />
			</Head>
			<div className="motion-wrapper">
				<div className="innerHead">
					<h2 className="main-title">
						Игра света и движения: ключевые аспекты{" "}
						<span className="yellowFont blockSpan">Motion Design!</span>
					</h2>
					<p className="title-desc">
						Создаем уникальную графическую анимацию для привлечения внимания к
						вашему бизнесу
					</p>
				</div>

				<div className="first-part">
					<h3 className="generalTitle first-title">Что это за направление?</h3>
					<p className="firstSectionDesc">
						Моушн-дизайн (Motion Design) - это процесс разработки анимированных
						графических элементов для видео, веб-сайтов, игр и т.д.  Включает в
						себя работу с трансформацией, движением, переходом и визуальными
						эффектами для создания динамичного и привлекательного контента.
					</p>

					<div className="firstImgWrap">
						<img
							src="/MainPage/motion-first-img.png"
							alt=""
							className="firstSectionImg"
						/>
					</div>
				</div>

				<div className="second-part">
					<h3 className="generalTitle second-title">
						Какие бывают виды Motion Design?
					</h3>
					<div className="second-body">
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">01</h3>
								<p className="flashDesc">
									2D анимация – это процесс создания движущихся изображений или
									объектов в двумерной плоскости.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">02</h3>
								<p className="flashDesc">
									3D анимация – это процесс создания движущихся изображений и
									объектов в трехмерной среде.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">03</h3>
								<p className="flashDesc">
									Видео-эффекты – это добавление специальных эффектов, например,
									дым, огонь и другие.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">04</h3>
								<p className="flashDesc">
									Рекламный Motion Design – это специальный вид, в котором
									используется анимация и движущиеся объекты для создания
									рекламы.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">05</h3>
								<p className="flashDesc">
									Интерактивные – представляет собой технологию, которая дает
									возможность взаимодействия клиента с мультимедийным контентом.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">06</h3>
								<p className="flashDesc">
									Кинетическая типография – анимация текста и его совмещение с
									другими элементами.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="third-part">
					<h3 className="generalTitle">Почему стоит обратиться к нам?</h3>

					<div className="thirdSectionBody">
						<div className="thirdBodyItem">
							<div className="thirdInnerItem">
								<h4 className="thirdInnerTitle">Опыт</h4>
								<p className="thirdInnerDesc">
									Наш профессиональный опыт в области моушн-дизайна позволяет
									нам разрабатывать самые лучшие решения для наших клиентов. Мы
									обладаем богатым опытом работы в данном направлении.
								</p>
							</div>
							<div className="thirdInnerItem">
								<h4 className="thirdInnerTitle">Тенденции</h4>
								<p className="thirdInnerDesc">
									Работы нашей компании всегда актуальны в сфере Motion Design.
									Мы следим за новейшими тенденциями и разрабатываем новые
									уникальные эффекты и анимации.
								</p>
							</div>
						</div>
						<div className="thirdBodyItem ">
							<div className="thirdInnerItem TwoInOne">
								<p className="thirdInnerDesc">
									Мы всегда готовы реализовывать новые проекты и использовать
									современные технологии и инструменты, чтобы создавать
									эксклюзивные проекты.
								</p>
							</div>
						</div>
						<div className="thirdBodyItem">
							<div className="thirdInnerItem">
								<h4 className="thirdInnerTitle">Результат</h4>
								<p className="thirdInnerDesc">
									Мы всегда нацелены на достижение максимальных результатов для
									наших клиентов, создавая яркие проекты в направлении Motion
									Design.
								</p>
							</div>
							<div className="thirdInnerItem">
								<h4 className="thirdInnerTitle">Анализ</h4>
								<p className="thirdInnerDesc">
									Мы тщательно анализируем цели каждого клиента, чтобы
									предложить лучшие решения.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* as fourth */}
				<div className="second-part">
					<h3 className="generalTitle second-title">
						Преимущества Motion Design
					</h3>
					<div className="second-body">
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">01</h3>
								<p className="flashDesc">
									Движение и анимация привлекают больше внимания, чем обычные
									изображения.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">02</h3>
								<p className="flashDesc">
									Анимация способна улучшить восприятие какой-либо информации,
									делая её более понятной, в особенности если нужно донести
									трудную информацию.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">03</h3>
								<p className="flashDesc">
									Анимация и движение добавляет активности контенту, делая его
									более интересным.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">04</h3>
								<p className="flashDesc">
									Motion Design может быть использован для придания уникальности
									бренду и создания запоминающегося стиля.
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">05</h3>
								<p className="flashDesc">
									Motion Design позволит вам улучшить имидж вашей компании на
									рынке, увеличить поток клиентов за счет привлечения внимания и
									впоследствии увеличить прибыль.
								</p>
							</div>
						</div>
					</div>
				</div>
				{/* as fourth */}

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
						Примеры работ по Motion Design
					</h3>

					<div className="sixthBody">
						{isLoading ? (
							<div className="loading-indicator">
								<ClipLoader size={50} color={"#eee"} loading={isLoading} />
							</div>
						) : (
							MotionDesignCardList.map((card) => (
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
							Готовы преобразить свое видео либо же изображение?
						</h3>
						<div className="getsFlex">
							<p className="sixth-foot-desc">
								Тогда обращайтесь к нам, и мы покажем вам уникальные возможности
								<span className="blockSpan">Motion Design!</span>
							</p>

							<button className="sixth-foot-btn">Заполнить бриф →</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MDesign;
