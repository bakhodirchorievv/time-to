import Link from "next/link";
// import "../styles/Descriptor/Descriptor.css";
// import "../styles/Descriptor/DescriptorResponsive.css";
// get data from firebase
import { db } from "./FirebaseConfig";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import Head from "next/head";

interface DescriptorCard {
	id: string;
	title: string;
	desc: string;
	imageUrl: string;
	userId?: string;
}

const Descriptor = () => {
	//get data from firebase
	const [DescriptorCardList, setDescriptorCardList] = useState<
		DescriptorCard[]
	>([]);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const DescriptorCardsCollectionRef = collection(db, "DescriptorCards");

	const getDescriptorCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(DescriptorCardsCollectionRef);
			const filteredData: DescriptorCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<DescriptorCard, "id">),
				id: doc.id,
			}));
			setDescriptorCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		getDescriptorCardList();
		console.log(DescriptorCardList);
	}, []);
	return (
		<>
			<Head>
				<link rel="stylesheet" href="/styles/Descriptor/Descriptor.css" />
			</Head>
			<Head>
				<link
					rel="stylesheet"
					href="/styles/Descriptor/DescriptorResponsive.css"
				/>
			</Head>
			<div className="descriptor-wrapper">
				<div className="innerHead">
					<h2 className="main-title">
						<span className="yellowText">Слоган</span> + Дескриптор
					</h2>
					<p className="main-desc">
						Добро пожаловать в Time to – Вашего надежного партнера в мире
						маркетинговых решений. 
					</p>
					<p className="main-desc mt-10">
						Все мы знаем, что сила слова может изменить мир, перевернуть взгляды
						и даже полки за собой повести. В сфере бизнеса и медиа этим
						уникальным оружием выступает слоган и дескриптор – именно эти
						атрибуты чаще всего приходят на ум при упоминании бренда. Но стоит
						ли так сильно зацикливаться на красивом слогане и ярком дескрипторе?
					</p>

					<div className="innerHeadFoot">
						<h3 className="mainFootTitle">Проблема потребителя</h3>
						<p className="mainFootDesc">
							В мире, насыщенном информацией и конкуренцией, привлечение
							внимания аудитории – это ключевая задача для любого бизнеса или
							медиа-проекта. Красивый и запоминающийся слоган становится мощным
							инструментом для выделения среди толпы, захватывая внимание и
							сохраняя бренд в сердцах и Вашей целевой аудитории.
						</p>
					</div>
				</div>

				<div className="first-part">
					<h3 className="generalTitle first-title">
						Как мы решаем эту проблему?
					</h3>
					<p className="first-desc">
						Мы, понимаем важность важность каждого слова и его воздействия на
						публику. Наша команда экспертов по маркетингу и копирайтингу
						специализируется на создании не просто говорящих слоганов, а
						историй, которые удерживают внимание, вызывают эмоции и запоминаются
						на долгое время. Мы помогаем Вашему бренду выделиться, утвердить
						свою уникальность и эффективно коммуницировать с аудиторией через
						мощную, красивую и эффективную фразу
					</p>

					<div className="first-body">
						<img
							src="/MainPage/DescriptorFirst.png"
							alt=""
							className="first-body-img"
						/>
						<img
							src="/MainPage/DescriptorSecond.png"
							alt=""
							className="first-body-img"
						/>
						<img
							src="/MainPage/DescriptorThird.png"
							alt=""
							className="first-body-img"
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
									Наша команда тщательно анализирует Ваш бренд, ценности, а
									также предпочтения целевой аудитории, чтобы разработать
									материал, который идеально подходит для Вас
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">Опыт и профессионализм</h3>
								<p className="flashDesc">
									Мы гордимся нашей командой опытных специалистов, которые
									обладают глубокими знаниями в области маркетинга и пониманием
									того, как создать слоганы и дескрипторы, которые заставят Ваш
									бренд выделиться
								</p>
							</div>
						</div>
						<div className="secondBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">Результативность</h3>
								<p className="flashDesc">
									Наши успешные кейсы и довольные клиенты - это наша лучшая
									реклама. Мы работаем над каждым проектом с полной преданностью
									и стремимся к достижению результатов, которые превзойдут
									ожидания.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="third-part">
					<h3 className="generalTitle third-title">Процесс работы</h3>
					<div className="third-body">
						<div className="third-body-item">
							<h4 className="thirdInnerTitle">
								Исследование и концептуализация
							</h4>
							<p className="thirdInnerDesc">
								После обработки заказа и обсуждения бриф-концепции, наш процесс
								работы начинается с тщательного исследования Вашего бренда. Мы
								изучаем конкуренцию в нише, анализируем тренды и выявляем
								ключевые моменты, которые необходимо учесть при создании слогана
								и дескриптора.
							</p>
						</div>
						<div className="third-body-item  sYellow">
							<h4 className="thirdInnerTitle yellowContent">
								Творческий процесс
							</h4>
							<p className="thirdInnerDesc yellowContent">
								Затем наша команда генерирует идеи и проводит тестирование,
								чтобы убедиться, что предложенные варианты соответствуют Вашим
								целям и эффективно передают Ваше послание /сообщение/message.
							</p>
						</div>
						<div className="third-body-item">
							<h4 className="thirdInnerTitle">Итерации и утверждение</h4>
							<p className="thirdInnerDesc">
								В итоге Вы получаете несколько уникальных и эффектных слоганов,
								которые идеально впишутся в образ Вашего бизнеса. 
							</p>
						</div>
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
							DescriptorCardList.map((card) => (
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
				</div>

				<div className="fifth-part">
					<h3 className="generalTitle fifth-title">Вместе мы можем</h3>
					<div className="fifth-body">
						<div className="fifthBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc fifthFlashDesc">
									Создать слоган, который будет олицетворять дух Вашего бренда и
									вдохновлять Вашу аудиторию
								</p>
							</div>
						</div>
						<div className="fifthBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc fifthFlashDesc">
									Разработать дескриптор, точно описывающий ключевые компетенции
									и преимущества Вашего бизнеса
								</p>
							</div>
						</div>
						<div className="fifthBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc fifthFlashDesc">
									Привлечь новых клиентов и укрепить связь с текущими, используя
									мощные слова и фразы
								</p>
							</div>
						</div>
						<div className="fifthBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<p className="flashDesc fifthFlashDesc">
									Сделать Ваш бренд запоминающимся и уникальным на рынке
								</p>
							</div>
						</div>
					</div>

					<div className="fifth-part-foot">
						<h3 className="fifth-foot-title">
							Самое время добавить гласности Вашему бизнесу.
						</h3>
						<div className="getsFlex">
							<p className="fifth-foot-desc">
								Наша команда готова помочь Вам создать уникальные и
								запоминающиеся атрибуты, которые станут ключом к Вашему успеху.
								Не упустите шанс поднять Ваш бренд на новый уровень!
							</p>

							<button className="fifth-foot-btn">Заполнить бриф →</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Descriptor;
