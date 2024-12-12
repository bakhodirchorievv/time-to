// import "../styles/OCompany/Ocompany.css";
// import "../styles/OCompany/OCompanyResponsive.css";
import Link from "next/link";
// get data from firebase for our team
import { db } from "./FirebaseConfig";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import Head from "next/head";

interface OurTeam {
	id: string;
	title: string;
	desc: string;
	imageUrl: string;
	userId?: string;
}

// get data from firebase
interface OCompanyCard {
	id: string;
	title: string;
	desc: string;
	imageUrl: string;
	userId?: string;
}

const OCompany = () => {
	//get data from firebase for our team
	const [OurTeamList, setOurTeamList] = useState<OurTeam[]>([]);

	const [isLoadingTeam, setIsLoadingTeam] = useState<boolean>(true);
	const OurTeamsCollectionRef = collection(db, "OurTeams");

	const getOurTeamList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(OurTeamsCollectionRef);
			const filteredData: OurTeam[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<OurTeam, "id">),
				id: doc.id,
			}));
			setOurTeamList(filteredData);
			setIsLoadingTeam(false);
		} catch (error) {
			setIsLoadingTeam(false);
			console.error(error);
		}
	};

	useEffect(() => {
		getOurTeamList();
		console.log(OurTeamList);
	}, []);

	//get data from firebase
	const [OCompanyCardList, setOCompanyCardList] = useState<OCompanyCard[]>([]);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const OCompanyCardsCollectionRef = collection(db, "OCompanyCards");

	const getOCompanyCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(OCompanyCardsCollectionRef);
			const filteredData: OCompanyCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<OCompanyCard, "id">),
				id: doc.id,
			}));
			setOCompanyCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		getOCompanyCardList();
		console.log(OCompanyCardList);
	}, []);

	return (
		<>
			<Head>
				<link rel="stylesheet" href="/styles/OCompany/Ocompany.css" />
			</Head>
			<Head>
				<link rel="stylesheet" href="/styles/OCompany/OCompanyResponsive.css" />
			</Head>
			<div className="OCompany-wrapper">
				<div className="timeToWrapper hidden">
					<h2 className="timeToTitle">
						<span className="yellowSide">time to</span> - это команда
						экспертов,повседневная практика показывает, что консультация с
						широким активом
					</h2>
					<div className="timeToBody">
						<div className="timeLeft hidden">
							<p className="timeDesc">
								The media landscape is changing in front of our eyes, and brands
								need to adapt how they communicate in order to thrive. Motion is
								the connective tissue between a brand and its audience. It is a
								vital component of a brand’s platform, evolving its ecosystem
								and communications in profound new ways.
							</p>
							<Link href={"/Contact"}>
								<button className="overallBtn hasHover timeBtn hidden">
									время познакомиться →
								</button>
							</Link>
						</div>
						<div className="timeRight hidden">
							<div className="forOrder">
								<div className="timerightItem">
									<p className="numberRight">15+</p>
									<p className="textRight">Человек в команде</p>
								</div>
								<div className="timerightItem ten changePlaceN hidden">
									<p className="numberRight">30+</p>
									<p className="textRight">Успешных проектов</p>
								</div>
								<div className="timerightItem changePlaceB hidden">
									<p className="numberRight">
										<span className="beSmall">100</span>%
									</p>
									<p className="textRight">Эффективности</p>
								</div>
							</div>
							<div className="forOrder">
								<div className="timerightItem timeToTen">
									<p className="numberRight">10</p>
									<p className="textRight textRight10">
										лет опыта в маркетинге
									</p>
								</div>
								<div className="timerightItem changePlaceN hidden">
									<p className="numberRight">100%</p>
									<p className="textRight">Эффективности</p>
								</div>
								<div className="timerightItem ten changePlaceB hidden">
									<p className="numberRight">30+</p>
									<p className="textRight">Успешных проектов</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="our-services">
					<h3 className="our-service-title generalTitle">Наши услуги</h3>
					<div className="our-service-bodyy">
						<Link href={"/Native"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Рекламный креатив
							</button>
						</Link>
						<Link href={"/Naming"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Нейминг
							</button>
						</Link>
						<Link href={"/Descriptor"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Дескриптор, слоган
							</button>
						</Link>
						<Link href={"/Design"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Дизайн
							</button>
						</Link>
						<Link href={"/Logo"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Логотип
							</button>
						</Link>
						<Link href={"/Corporate"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Фирменный стиль
							</button>
						</Link>
						<Link href={"/Site"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Сайт
							</button>
						</Link>
						<Link href={"/Guideline"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Брендбук и гайдлайн
							</button>
						</Link>
						<Link href={"/MDesign"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Motio design
							</button>
						</Link>
						<Link href={"/Packing"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Упаковка
							</button>
						</Link>
						<Link href={"/ThreeDPage"}>
							<button className="overallBtn hasHover HeadfooterBtn">3D</button>
						</Link>
						<Link href={"/Presentation"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Дизайн презентаций
							</button>
						</Link>
						<Link href={"/Padpiski"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Дизайн подписка
							</button>
						</Link>
						<Link href={"/BrandStrategy"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Стратегия
							</button>
						</Link>
						<Link href={"/SMI"}>
							<button className="overallBtn hasHover HeadfooterBtn">СМИ</button>
						</Link>
						<Link href={"/BrandStrategy"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Бренд стратегия
							</button>
						</Link>
						<Link href={"/Card"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Сайт визитка
							</button>
						</Link>
						<Link href={"/Corporative"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Корпаротивный сайт
							</button>
						</Link>
						<Link href={"/Shop"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Интернет магазин
							</button>
						</Link>
						<Link href={"/Souvenir"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Мерч и сувениры
							</button>
						</Link>
						<Link href={"/Expert"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Эксперты мнения и соцсети
							</button>
						</Link>
						<Link href={"/Partner"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Презентация для партнеров и инвесторов
							</button>
						</Link>
						<Link href={"/Television"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Реклама на телевидении
							</button>
						</Link>
						<Link href={"/Radio"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Реклама на радио
							</button>
						</Link>
						<Link href={"/Native"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Реклама нативная
							</button>
						</Link>
						<Link href={"/ThreeDPage"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								3D анимации
							</button>
						</Link>
						<Link href={"/Market"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Выход на рынок РФ
							</button>
						</Link>
						<Link href={"/Rebranding"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								Ребрендинг
							</button>
						</Link>
						<Link href={"/SMI"}>
							<button className="overallBtn hasHover HeadfooterBtn">
								реклама на СМИ
							</button>
						</Link>
					</div>
				</div>

				<div className="our-team">
					<h3 className="our-team-title generalTitle">Наша команда</h3>
					<div className="fourthBody">
						{isLoadingTeam ? (
							<div className="loading-indicator">
								<ClipLoader size={50} color={"#eee"} loading={isLoading} />
							</div>
						) : (
							OurTeamList.map((ourTeamItem) => (
								<div className="fourthBodyItem" key={ourTeamItem.id}>
									<div
										className="whiteBack"
										style={{ backgroundImage: `url(${ourTeamItem.imageUrl})` }}
									></div>
									<h3 className="fourthBodyTitle">
										{ourTeamItem.title || "Юрий"}
									</h3>
									<p className="fourthBodyDesc">
										{ourTeamItem.desc || "Менеджер"}
									</p>
								</div>
							))
						)}
					</div>
				</div>

				<div className="examples">
					<h3 className="examples-title generalTitle">
						Примеры разработанных бренд-стратегий
					</h3>
					<div className="fourthBody">
						{isLoading ? (
							<div className="loading-indicator">
								<ClipLoader size={50} color={"#eee"} loading={isLoading} />
							</div>
						) : (
							OCompanyCardList.map((companyItem) => (
								<div className="fourthBodyItem" key={companyItem.id}>
									<div
										className="whiteBack"
										style={{ backgroundImage: `url(${companyItem.imageUrl})` }}
									></div>
									<h3 className="fourthBodyTitle">
										{companyItem.title || "Пропорция"}
									</h3>
									<p className="fourthBodyDesc">
										{companyItem.desc || "Салон красоты"}
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
							<Link href={"/Site"}>
								<button className="fourthBtn">Сайт</button>
							</Link>
						</div>
						<div className="fourthBodyItem">
							<div className="whiteBack"></div>
							<h3 className="fourthBodyTitle">Пропорция</h3>
							<p className="fourthBodyDesc">Салон красоты</p>
							<Link href={"/Site"}>
								<button className="fourthBtn">Сайт</button>
							</Link>
						</div>
						<div className="fourthBodyItem">
							<div className="whiteBack"></div>
							<h3 className="fourthBodyTitle">Пропорция</h3>
							<p className="fourthBodyDesc">Салон красоты</p>
							<Link href={"/Site"}>
								<button className="fourthBtn">Сайт</button>
							</Link>
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default OCompany;
