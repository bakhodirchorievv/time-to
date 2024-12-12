import Link from "next/link";
import "../styles/Site/Site.css";
import "../styles/Site/SiteResponsive.css";
// get data from firebase
import { db } from "./FirebaseConfig";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { ClipLoader } from "react-spinners";

interface SiteCard {
	id: string;
	title: string;
	desc: string;
	imageUrl: string;
	userId?: string;
}

const Site = () => {
	//get data from firebase
	const [SiteCardList, setSiteCardList] = useState<SiteCard[]>([]);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const SiteCardsCollectionRef = collection(db, "SiteCards");

	const getSiteCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(SiteCardsCollectionRef);
			const filteredData: SiteCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<SiteCard, "id">),
				id: doc.id,
			}));
			setSiteCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		getSiteCardList();
		console.log(SiteCardList);
	}, []);
	return (
		<>
			<div className="site-wrapper">
				<div className="innerHead">
					<h2 className="main-title">Сайт</h2>
					<p className="main-desc">
						Добро пожаловать в <span className="yellowDesc">Time to</span> -
						вашего надежного партнера в мире веб-разработки! Мы являемся
						ведущими экспертами в создании высококачественных и инновационных
						веб-сайтов, специализируясь на индивидуальном подходе к каждому
						проекту. Наша цель - не просто создать сайт, а предложить вам
						уникальный цифровой инструмент, который будет служить мощным
						инструментом для достижения ваших бизнес-целей.
					</p>
					<p className="main-desc">
						Мы понимаем, что ваш сайт - это лицо вашего бренда в онлайн-мире,
						поэтому мы стремимся создать нечто большее, чем просто
						интернет-страницу. Мы создаем цифровые пространства, которые
						воплощают вашу уникальную идентичность, эффективно коммуницируют с
						вашей аудиторией и способствуют росту вашего бизнеса. В [название
						компании] мы гордимся тем, что обеспечиваем клиентов не только
						высококлассными технологическими решениями, но и внимательным
						отношением к их потребностям и целям.
					</p>
					<p className="main-desc">
						Готовы воплотить вашу идею для сайта в реальность? Давайте начнем
						работу прямо сейчас!
					</p>
					<p className="main-desc">
						В современном цифровом мире конкуренция на рынке веб-пространства
						становится все более острой. Потребители сталкиваются с проблемой
						выбора среди множества сайтов, которые предлагают сходные услуги или
						товары. Они испытывают затруднения в поиске надежного и
						функционального веб-ресурса, который точно соответствует их
						потребностям и ожиданиям. Без качественного сайта компания может
						потерять потенциальных клиентов, а также упустить возможность
						привлечения новых. В <span className="yellowDesc">Time to</span> мы
						понимаем эти вызовы, и поэтому предлагаем инновационные решения,
						чтобы помочь потребителям решить свои проблемы и достичь своих
						целей:
					</p>
				</div>

				<div className="first-part">
					<div className="first-body">
						<div className="first-body-item">
							<h4 className="firstInnerTitle">Индивидуальный подход</h4>
							<p className="firstInnerDesc">
								Мы обеспечиваем персонализированный подход к каждому клиенту,
								учитывая их уникальные требования и желания. Наша команда
								внимательно слушает ваши потребности и воплощает их в
								реальность, создавая уникальные веб-ресурсы
							</p>
						</div>
						<div className="first-body-item  sYellow">
							<h4 className="firstInnerTitle yellowContent">
								Продуманный дизайн и удобство использования
							</h4>
							<p className="firstInnerDesc yellowContent">
								Мы разрабатываем дизайн сайта, который не только красив, но и
								функционален. Мы уделяем особое внимание пользовательскому опыту
								(UX) и пользовательскому интерфейсу (UI), чтобы создать сайт,
								который легко и приятно использовать для каждого посетителя.
							</p>
						</div>
						<div className="first-body-item">
							<h4 className="firstInnerTitle">Инновационные технологии</h4>
							<p className="firstInnerDesc">
								 Мы следим за последними технологическими тенденциями и
								используем передовые инструменты и технологии веб-разработки.
								Это позволяет нам создавать современные и мощные веб-ресурсы,
								которые соответствуют самым высоким стандартам качества и
								производительности
							</p>
						</div>
					</div>

					<div className="first-body">
						<img
							src="/MainPage/siteFirst.png"
							alt=""
							className="firstBodyImg"
						/>
						<img
							src="/MainPage/siteSecond.png"
							alt=""
							className="firstBodyImg"
						/>
						<img
							src="/MainPage/siteThird.png"
							alt=""
							className="firstBodyImg"
						/>
					</div>
				</div>

				<div className="second-part">
					<h3 className="generalTitle second-title">Наши услуги</h3>

					<div className="secondSectionBody">
						<div className="secondBodyItem">
							<div className="secondInnerItem">
								<h4 className="secondInnerTitle">Анализ рынка</h4>
								<p className="secondInnerDesc">
									Мы проводим глубокий анализ рынка, изучая тенденции,
									конкурентов и потребности вашей целевой аудитории. Наши
									специалисты предоставляют Вам полную картину рыночной
									ситуации, чтобы помочь с принятием информированных решений о
									вашем веб-проекте.
								</p>
							</div>
							<div className="secondInnerItem">
								<h4 className="secondInnerTitle">Дизайн сайта / UX / UI</h4>
								<p className="secondInnerDesc">
									Наша команда дизайнеров и разработчиков создает уникальные и
									креативные дизайны сайтов, учитывая принципы пользовательского
									опыта (UX) и интерфейса (UI). Мы стремимся к тому, чтобы Ваш
									сайт был не только красивым, но и функциональным
								</p>
							</div>
						</div>
						<div className="secondBodyItem ">
							<div className="secondInnerItem TwoInOne">
								<h4 className="secondInnerTitle">Интернет магазин / каталог</h4>
								<p className="secondInnerDesc">
									Мы создаем эффективные интернет-магазины и каталоги, которые
									помогут Вам увеличить продажи и привлечь новых клиентов. Мы
									обеспечиваем Вас всем необходимым функционалом для управления
									продуктами, заказами и платежами, чтобы вы могли эффективно
									вести Ваш бизнес в онлайн-пространстве.
								</p>
							</div>
						</div>
						<div className="secondBodyItem ">
							<div className="secondInnerItem simpleBack">
								<h4 className="secondInnerTitle">Корпоративный</h4>
								<p className="secondInnerDesc">
									Мы разрабатываем профессиональные корпоративные сайты, которые
									отражают вашу уникальную брендовую идентичность и обеспечивают
									Вас всем необходимым функционалом для успешного
									онлайн-присутствия.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="third-part">
					<h3 className="generalTitle third-title">Этапы работы</h3>
					<div className="third-body">
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">Сбор информации</h3>
								<p className="flashDesc">
									На этом этапе мы тщательно изучаем ваши потребности, цели и
									пожелания относительно будущего веб-проекта
								</p>
							</div>
						</div>
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">Планирование</h3>
								<p className="flashDesc">
									Мы разрабатываем детальный план создания вашего веб-сайта,
									определяя структуру, функционал и дизайн.
								</p>
							</div>
						</div>
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">Дизайн и разработка</h3>
								<p className="flashDesc">
									На этом этапе мы создаем дизайн вашего сайта, а затем
									приступаем к его разработке с использованием передовых
									технологий и инструментов.
								</p>
							</div>
						</div>
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">Тестирование и оптимизация</h3>
								<p className="flashDesc">
									Мы тщательно тестируем ваш веб-сайт на различных устройствах и
									браузерах, чтобы убедиться в его корректной работе.
								</p>
							</div>
						</div>
						<div className="thirdBodyItem">
							<img src="/MainPage/flash.png" alt="" className="flash" />
							<div className="flashInfo">
								<h3 className="flashTitle">Запуск и поддержка</h3>
								<p className="flashDesc">
									После успешного завершения всех этапов мы запускаем ваш
									веб-сайт и предоставляем вам полную поддержку и обслуживание,
									чтобы вы могли быть уверены в его надежности и безопасности.
								</p>
							</div>
						</div>
					</div>

					<p className="thirdPartLastDesc">
						Готовы преобразить свой онлайн имидж и выделиться из толпы
						конкурентов? Не упустите возможность создать уникальный и
						запоминающийся веб-сайт, который станет ключом к привлечению новых
						клиентов и укреплению вашего бренда!
					</p>
				</div>

				<div className="fourth-part">
					<h3 className="generalTitle fourth-title">
						Наши названия уже зарекомендовали себя и активно функционируют в
						бизнесе
					</h3>

					<div className="fourthBody">
						{isLoading ? (
							<div className="loading-indicator">
								<ClipLoader size={50} color={"#eee"} loading={isLoading} />
							</div>
						) : (
							SiteCardList.map((card) => (
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
							Закажите разработку брендбука или гайдлайна!
						</h3>
						<div className="getsFlex">
							<p className="fourth-foot-desc">
								Если у Вас остались вопросы, оставьте заявку, и мы свяжемся с
								Вами в ближайшее время
							</p>

							<button className="fourth-foot-btn">Заполнить бриф →</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Site;
