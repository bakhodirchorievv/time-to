import AdminAuth from "../AdminAuth";
// import "./LogoCard.css";
// import "../../styles/AdminDashboard/LogoCard/LogoCard.css";

import { db, auth, storage } from "../FirebaseConfig";
import { useEffect, useRef, useState } from "react";
import {
	getDocs,
	collection,
	addDoc,
	deleteDoc,
	updateDoc,
	doc,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

import {
	ref,
	uploadBytes,
	getDownloadURL,
	deleteObject,
} from "firebase/storage";
import NavBar from "./NavBar";
import { ClipLoader } from "react-spinners";
import Head from "next/head";

interface LogoCard {
	id: string;
	title: string;
	desc: number;
	imageUrl: string;
	userId?: string;
}

const LogoCard = () => {
	const [LogoCardList, setLogoCardList] = useState<LogoCard[]>([]);

	//new LogoCard states
	const [newLogoCardTitle, setnewLogoCardTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newLogoCardImage, setNewLogoCardImage] = useState<File | null>(null);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const LogoCardsCollectionRef = collection(db, "LogoCards");
	const [isLoading, setIsLoading] = useState(true);
	const getLogoCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(LogoCardsCollectionRef);
			const filteredData: LogoCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<LogoCard, "id">),
				id: doc.id,
			}));
			setLogoCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getLogoCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitLogoCard = async () => {
		if (newLogoCardImage && newdesc && newLogoCardTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newLogoCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newLogoCardImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(LogoCardsCollectionRef, {
					title: newLogoCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getLogoCardList();
				setnewLogoCardTitle("");
				setNewdesc("");
				setNewLogoCardImage(null);

				if (fileInputRef.current) {
					fileInputRef.current.value = "";
				}
				setIsLoading(false);
			} catch (error) {
				console.error(error);
				setIsLoading(false);
			}
		} else {
			console.error("Something is not selected (image or title or desc)");
		}
	};
	const deleteLogoCard = async (id: string, imageUrl: string) => {
		try {
			const LogoCardDoc = doc(db, "LogoCards", id);
			await deleteDoc(LogoCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getLogoCardList();
			console.log("LogoCard and image deleted");
		} catch (error) {
			console.error("Error deleting LogoCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const LogoCardDoc = doc(db, "LogoCards", id);
			await updateDoc(LogoCardDoc, { title: updatedTitle });
			getLogoCardList();
			setUpdatedTitle("");
			console.log("LogoCard updated");
		} catch (error) {
			console.error("while updating title", error);
		}
	};

	const onUpdateImage = async (id: string, currentImageUrl: string) => {
		if (updatedImage) {
			try {
				const uniqueImageName = `${Date.now()}-${updatedImage.name}`;
				const imageRef = ref(storage, `images/${uniqueImageName}`);
				await uploadBytes(imageRef, updatedImage);
				const imageUrl = await getDownloadURL(imageRef);

				const LogoCardDoc = doc(db, "LogoCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(LogoCardDoc, { imageUrl });
				getLogoCardList();
				setUpdatedImage(null);

				if (updatedImageFile.current) {
					updatedImageFile.current.value = "";
				}
				console.log("Image updated");
			} catch (error) {
				console.error("Error updating image: ", error);
			}
		} else {
			console.error("No image selected for update");
		}
	};

	const onDeleteImage = async (id: string, imageUrl: string) => {
		const imageRef = ref(storage, imageUrl);

		try {
			await deleteObject(imageRef);

			const LogoCardDoc = doc(db, "LogoCards", id);
			await updateDoc(LogoCardDoc, { imageUrl: "" });

			getLogoCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const LogoCardDoc = doc(db, "LogoCards", id);
			await updateDoc(LogoCardDoc, { desc: updatedDesc });
			getLogoCardList();
			setupdatedDesc("");
			console.log("LogoCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="/styles/AdminDashboard/LogoCard/LogoCard.css"
				/>
			</Head>
			<div className="LogoCard-admin-wrapper">
				{userEmail && <NavBar />}
				<div className="right-side-wrapper">
					<AdminAuth />

					{userEmail && (
						<div className="controlAuthWrapper">
							<h2 className="addLogoCardTitle">Add New Logo Card</h2>
							<input
								className="admin-input"
								type="text"
								placeholder="Logo Card title..."
								value={newLogoCardTitle}
								onChange={(e) => setnewLogoCardTitle(e.target.value)}
							/>
							<input
								className="admin-input"
								type="text"
								placeholder="Logo Card desc..."
								value={newdesc}
								onChange={(e) => setNewdesc(e.target.value)}
							/>
							<input
								className="admin-input"
								type="file"
								ref={fileInputRef}
								onChange={(e) =>
									setNewLogoCardImage(e.target.files ? e.target.files[0] : null)
								}
							/>
							<button
								className="admin-btn"
								onClick={onSubmitLogoCard}
								disabled={isLoading}
							>
								Submit Logo Card
							</button>
						</div>
					)}

					{userEmail &&
						(isLoading ? (
							<div className="loading-indicator">
								<ClipLoader size={50} color={"#eee"} loading={isLoading} />
							</div>
						) : (
							<div className="controlDataWrapper">
								{LogoCardList.map((LogoCard) => (
									<div className="LogoCardItemWrapperFire" key={LogoCard.id}>
										{userEmail && (
											<>
												<h1 style={{ color: "white" }}>{LogoCard.title}</h1>
												<p>{LogoCard.desc}</p>
												{LogoCard.imageUrl && (
													<img
														className="LogoCardImgFire"
														src={LogoCard.imageUrl}
														alt={LogoCard.title}
														width="500"
													/>
												)}
												<button
													className="admin-btn deleteBtn"
													onClick={() =>
														deleteLogoCard(LogoCard.id, LogoCard.imageUrl)
													}
												>
													Delete Logo Card
												</button>
												<br />
												<input
													className="admin-input"
													onChange={(e) => setUpdatedTitle(e.target.value)}
													type="text"
													value={updatedTitle}
													placeholder="new title..."
												/>
												<button
													className="admin-btn"
													onClick={() => onUpdateTitle(LogoCard.id)}
												>
													Update Title
												</button>
												<br />
												<input
													className="admin-input"
													type="file"
													ref={updatedImageFile}
													onChange={(e) =>
														setUpdatedImage(
															e.target.files ? e.target.files[0] : null
														)
													}
												/>
												<button
													className="admin-btn"
													onClick={() =>
														onUpdateImage(LogoCard.id, LogoCard.imageUrl)
													}
												>
													Update Image
												</button>
												<br />
												<button
													className="admin-btn deleteBtn"
													onClick={() =>
														onDeleteImage(LogoCard.id, LogoCard.imageUrl)
													}
												>
													Delete Image
												</button>
												<br />
												<input
													className="admin-input"
													type="text"
													onChange={(e) => setupdatedDesc(e.target.value)}
													value={updatedDesc}
													placeholder="new desc..."
												/>
												<button
													className="admin-btn"
													onClick={() => onUpDatedesc(LogoCard.id)}
												>
													Update Desc
												</button>
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

export default LogoCard;
