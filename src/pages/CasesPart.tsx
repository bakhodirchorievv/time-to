import Link from "next/link";

import { db } from "./FirebaseConfig";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import "../styles/CasesPart/CasesPart.css";
import "../styles/CasesPart/CasesPartResponsive.css";

interface Case {
	id: string;
	title: string;
	desc: string;
	imageUrl: string;
	userId?: string;
}

const CasesPart = () => {
	const [caseList, setCaseList] = useState<Case[]>([]);
	const casesCollectionRef = collection(db, "cases");

	const [isDataLoaded, setIsDataLoaded] = useState(false);

	const [isLoading, setIsLoading] = useState(true);
	const getCaseList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(casesCollectionRef);
			const filteredData: Case[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<Case, "id">),
				id: doc.id,
			}));
			setCaseList(filteredData);
			setIsLoading(false);
			setIsDataLoaded(true);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getCaseList();
		console.log(caseList);
	}, []);

	// IntersectionObserver for animations
	useEffect(() => {
		if (isDataLoaded) {
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("show-animation");
					}
				});
			});

			const observer2 = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("toCenter");
					}
				});
			});

			const hiddenElements = document.querySelectorAll(".hidden-animation");
			hiddenElements.forEach((el) => observer.observe(el));
			const fromCenterElements = document.querySelectorAll(".fromCenter");
			fromCenterElements.forEach((el) => observer2.observe(el));

			return () => {
				hiddenElements.forEach((el) => observer.unobserve(el));
				fromCenterElements.forEach((el) => observer2.unobserve(el));
			};
		}
	}, [isDataLoaded]);

	return (
		<div className="cases-wrapper hidden">
			<h2 className="case-title getBlock overallTitle topTitle">Кейсы</h2>

			<div className="case-left">
				{caseList.length &&
					caseList.slice(0, 3).map((caseItem, index) => (
						<div
							className={`left-case-item fromCenter ${
								index === 2 ? "bigger" : ""
							}`}
							key={caseItem.id}
						>
							<div
								className="whiteBack"
								style={{ backgroundImage: `url(${caseItem.imageUrl})` }}
							></div>
							<h3 className="caseTitle">{caseItem.title || "Valor"}</h3>
							<p className="case-desc">
								{caseItem.desc || "Ювелирные изделия"}
							</p>
							<div className="caseBtnWrapper">
								<Link href={"/Logo"}>
									<button className="overallBtn caseBtn">Логотип</button>
								</Link>
								<button className="overallBtn caseBtn">Брендинг</button>
								<Link href={"/Site"}>
									<button className="overallBtn caseBtn">Сайт</button>
								</Link>
							</div>
						</div>
					))}
			</div>

			<div className="case-right">
				<h2 className="case-title getNone overallTitle">Кейсы</h2>
				{isLoading ? (
					<div className="loading-indicator">
						<ClipLoader size={50} color={"#eee"} loading={isLoading} />
					</div>
				) : (
					caseList.length &&
					caseList.slice(3, 5).map((caseItem, index) => (
						<div
							className={`left-case-item fromCenter ${
								index === 2 ? "bigger" : ""
							}`}
							key={caseItem.id}
						>
							<div
								className="whiteBack"
								style={{ backgroundImage: `url(${caseItem.imageUrl})` }}
							></div>
							<h3 className="caseTitle">{caseItem.title || "Valor"}</h3>
							<p className="case-desc">
								{caseItem.desc || "Ювелирные изделия"}
							</p>
							<div className="caseBtnWrapper">
								<Link href={"/Logo"}>
									<button className="overallBtn caseBtn">Логотип</button>
								</Link>
								<button className="overallBtn caseBtn">Брендинг</button>
								<Link href={"/Site"}>
									<button className="overallBtn caseBtn">Сайт</button>
								</Link>
							</div>
						</div>
					))
				)}
				<Link href={"/Cases"}>
					<button
						style={{ display: isLoading ? "none" : "block" }}
						className="overallBtn hasHover moreCaseBtn hidden"
					>
						больше кейсов →
					</button>
				</Link>
			</div>

			{isDataLoaded && (
				<img
					src="/MainPage/bckg-layer.png"
					alt=""
					className="bckg-layer CasesParthidden getNone"
				/>
			)}
		</div>
	);
};

export default CasesPart;
