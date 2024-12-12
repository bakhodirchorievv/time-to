import AdminAuth from "../AdminAuth";
// import "./Requests.css";
// import "../../styles/AdminDashboard/Requests/Requests.css";

import { db, auth } from "../FirebaseConfig";
import { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

import NavBar from "./NavBar";
import { ClipLoader } from "react-spinners";
import Head from "next/head";

interface Request {
	id: string;
	Name: string;
	Number: number;
	userId?: string;
}

const Requests = () => {
	const [RequestList, setRequestList] = useState<Request[]>([]);

	//new Request states
	const [userEmail, setUserEmail] = useState<string | null>(null);

	const RequestsCollectionRef = collection(db, "Requests");
	const [isLoading, setIsLoading] = useState(true);
	const getRequestList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(RequestsCollectionRef);
			const filteredData: Request[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<Request, "id">),
				id: doc.id,
			}));
			setRequestList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getRequestList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const deleteRequest = async (id: string) => {
		try {
			const RequestDoc = doc(db, "Requests", id);
			await deleteDoc(RequestDoc);

			getRequestList();
			console.log("Request and image deleted");
		} catch (error) {
			console.error("Error deleting Request or image: ", error);
		}
	};

	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="/styles/AdminDashboard/Requests/Requests.css"
				/>
			</Head>
			<div className="Request-admin-wrapper">
				{userEmail && <NavBar />}
				<div className="right-side-wrapper">
					<AdminAuth />

					{userEmail &&
						(isLoading ? (
							<div className="loading-indicator">
								<ClipLoader size={50} color={"#eee"} loading={isLoading} />
							</div>
						) : (
							<div className="controlDataWrapper">
								{RequestList.map((Request) => (
									<div className="RequestItemWrapperFire" key={Request.id}>
										{userEmail && (
											<>
												<h1 style={{ color: "white" }}>
													<span className="name-number">Name:</span>{" "}
													{Request.Name}
												</h1>
												<p>
													<span className="name-number">Phone Number:</span>{" "}
													{Request.Number}
												</p>

												<button
													className="admin-btn deleteBtn"
													onClick={() => deleteRequest(Request.id)}
												>
													Delete Request
												</button>
												<br />
											</>
										)}
									</div>
								))}
							</div>
						))}
				</div>
			</div>
		</>
	);
};

export default Requests;
