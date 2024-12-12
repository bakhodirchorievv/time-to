import Link from "next/link";
import { useRouter } from "next/router";
import "../../styles/AdminDashboard/NavBar/NavBar.css";

const NavBar = () => {
	const location = useRouter();
	const currentPath = location.pathname;

	return (
		<div className="navBar-wrapper">
			<ul className="nav-item-wrapper">
				<Link href="/admin">
					<li
						className={`nav-item ${currentPath === "/admin" ? "clicked" : ""}`}
					>
						Cases
					</li>
				</Link>
				<Link href="/admin/MainPage">
					<li
						className={`nav-item ${
							currentPath === "/admin/MainPage" ? "clicked" : ""
						}`}
					>
						Main Page
					</li>
				</Link>
				<Link href="/admin/BrandStrategyCard">
					<li
						className={`nav-item ${
							currentPath === "/admin/BrandStrategyCard" ? "clicked" : ""
						}`}
					>
						Brand Strategy
					</li>
				</Link>
				<Link href="/admin/CasesCard">
					<li
						className={`nav-item ${
							currentPath === "/admin/CasesCard" ? "clicked" : ""
						}`}
					>
						Card
					</li>
				</Link>
				<Link href="/admin/CorporateCard">
					<li
						className={`nav-item ${
							currentPath === "/admin/CorporateCard" ? "clicked" : ""
						}`}
					>
						Corporate
					</li>
				</Link>
				<Link href="/admin/CorporativeCard">
					<li
						className={`nav-item ${
							currentPath === "/admin/CorporativeCard" ? "clicked" : ""
						}`}
					>
						Corporative
					</li>
				</Link>
				<Link href="/admin/DescriptorCard">
					<li
						className={`nav-item ${
							currentPath === "/admin/DescriptorCard" ? "clicked" : ""
						}`}
					>
						Descriptor
					</li>
				</Link>
				<Link href="/admin/ExpertCard">
					<li
						className={`nav-item ${
							currentPath === "/admin/ExpertCard" ? "clicked" : ""
						}`}
					>
						Expert
					</li>
				</Link>
				<Link href="/admin/GuidelineCard">
					<li
						className={`nav-item ${
							currentPath === "/admin/GuidelineCard" ? "clicked" : ""
						}`}
					>
						Guideline
					</li>
				</Link>
				<Link href="/admin/LogoCard">
					<li
						className={`nav-item ${
							currentPath === "/admin/LogoCard" ? "clicked" : ""
						}`}
					>
						Logo
					</li>
				</Link>
				<Link href="/admin/MotionDesignCard">
					<li
						className={`nav-item ${
							currentPath === "/admin/MotionDesignCard" ? "clicked" : ""
						}`}
					>
						Motion Design
					</li>
				</Link>
				<Link href="/admin/NamingCard">
					<li
						className={`nav-item ${
							currentPath === "/admin/NamingCard" ? "clicked" : ""
						}`}
					>
						Naming
					</li>
				</Link>
				<Link href="/admin/NativeCard">
					<li
						className={`nav-item ${
							currentPath === "/admin/NativeCard" ? "clicked" : ""
						}`}
					>
						Native
					</li>
				</Link>
				<Link href="/admin/PackingCard">
					<li
						className={`nav-item ${
							currentPath === "/admin/PackingCard" ? "clicked" : ""
						}`}
					>
						Packing
					</li>
				</Link>
				<Link href="/admin/PartnerCard">
					<li
						className={`nav-item ${
							currentPath === "/admin/PartnerCard" ? "clicked" : ""
						}`}
					>
						Partner
					</li>
				</Link>
				<Link href="/admin/PresentationCard">
					<li
						className={`nav-item ${
							currentPath === "/admin/PresentationCard" ? "clicked" : ""
						}`}
					>
						Presentation
					</li>
				</Link>
				<Link href="/admin/RadioCard">
					<li
						className={`nav-item ${
							currentPath === "/admin/RadioCard" ? "clicked" : ""
						}`}
					>
						Radio
					</li>
				</Link>
				<Link href="/admin/ShopCard">
					<li
						className={`nav-item ${
							currentPath === "/admin/ShopCard" ? "clicked" : ""
						}`}
					>
						Shop
					</li>
				</Link>
				<Link href="/admin/SiteCard">
					<li
						className={`nav-item ${
							currentPath === "/admin/SiteCard" ? "clicked" : ""
						}`}
					>
						Site
					</li>
				</Link>
				<Link href="/admin/SouvenirCard">
					<li
						className={`nav-item ${
							currentPath === "/admin/SouvenirCard" ? "clicked" : ""
						}`}
					>
						Souvenir
					</li>
				</Link>
				<Link href="/admin/TelevisionCard">
					<li
						className={`nav-item ${
							currentPath === "/admin/TelevisionCard" ? "clicked" : ""
						}`}
					>
						Television
					</li>
				</Link>
				<Link href="/admin/OurTeam">
					<li
						className={`nav-item ${
							currentPath === "/admin/OurTeam" ? "clicked" : ""
						}`}
					>
						OurTeam
					</li>
				</Link>
				<Link href="/admin/OCompanyCard">
					<li
						className={`nav-item ${
							currentPath === "/admin/OCompanyCard" ? "clicked" : ""
						}`}
					>
						OCompany
					</li>
				</Link>
				<Link href="/admin/Requests">
					<li
						className={`nav-item ${
							currentPath === "/admin/Requests" ? "clicked" : ""
						}`}
					>
						Requests
					</li>
				</Link>
			</ul>
		</div>
	);
};

export default NavBar;
