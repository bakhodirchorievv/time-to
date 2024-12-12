import AdminAuth from "../AdminAuth";
// import "./MainPage.css";
// import "../../styles/AdminDashboard/MainPageCard/MainPage.css";

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

interface MainPageCard {
	id: string;
	title: string;
	desc: number;
	imageUrl: string;
	userId?: string;
}

const MainPageCard = () => {
	const [MainPageCardList, setMainPageCardList] = useState<MainPageCard[]>([]);

	//new MainPageCard states
	const [newMainPageCardTitle, setnewMainPageCardTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newMainPageCardImage, setNewMainPageCardImage] = useState<File | null>(
		null
	);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const MainPageCardsCollectionRef = collection(db, "MainPageCards");
	const [isLoading, setIsLoading] = useState(true);
	const getMainPageCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(MainPageCardsCollectionRef);
			const filteredData: MainPageCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<MainPageCard, "id">),
				id: doc.id,
			}));
			setMainPageCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getMainPageCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitMainPageCard = async () => {
		if (newMainPageCardImage && newdesc && newMainPageCardTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newMainPageCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newMainPageCardImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(MainPageCardsCollectionRef, {
					title: newMainPageCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getMainPageCardList();
				setnewMainPageCardTitle("");
				setNewdesc("");
				setNewMainPageCardImage(null);

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

	const deleteMainPageCard = async (id: string, imageUrl: string) => {
		try {
			const MainPageCardDoc = doc(db, "MainPageCards", id);
			await deleteDoc(MainPageCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getMainPageCardList();
			console.log("MainPageCard and image deleted");
		} catch (error) {
			console.error("Error deleting MainPageCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const MainPageCardDoc = doc(db, "MainPageCards", id);
			await updateDoc(MainPageCardDoc, { title: updatedTitle });
			getMainPageCardList();
			setUpdatedTitle("");
			console.log("MainPageCard updated");
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

				const MainPageCardDoc = doc(db, "MainPageCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(MainPageCardDoc, { imageUrl });
				getMainPageCardList();
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

			const MainPageCardDoc = doc(db, "MainPageCards", id);
			await updateDoc(MainPageCardDoc, { imageUrl: "" });

			getMainPageCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const MainPageCardDoc = doc(db, "MainPageCards", id);
			await updateDoc(MainPageCardDoc, { desc: updatedDesc });
			getMainPageCardList();
			setupdatedDesc("");
			console.log("MainPageCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="/styles/AdminDashboard/MainPageCard/MainPage.css"
				/>
			</Head>
			<div className="MainPageCard-admin-wrapper">
				{userEmail && <NavBar />}
				<div className="right-side-wrapper">
					<AdminAuth />

					{userEmail && (
						<div className="controlAuthWrapper">
							<h2 className="addMainPageCardTitle">Add New Main Page Card</h2>
							<input
								className="admin-input"
								type="text"
								placeholder="Main Page Card title..."
								value={newMainPageCardTitle}
								onChange={(e) => setnewMainPageCardTitle(e.target.value)}
							/>
							<input
								className="admin-input"
								type="text"
								placeholder="Main Page Card desc..."
								value={newdesc}
								onChange={(e) => setNewdesc(e.target.value)}
							/>
							<input
								className="admin-input"
								type="file"
								ref={fileInputRef}
								onChange={(e) =>
									setNewMainPageCardImage(
										e.target.files ? e.target.files[0] : null
									)
								}
							/>
							<button
								className="admin-btn"
								onClick={onSubmitMainPageCard}
								disabled={isLoading}
							>
								Submit Main Page Card
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
								{MainPageCardList.map((MainPageCard) => (
									<div
										className="MainPageCardItemWrapperFire"
										key={MainPageCard.id}
									>
										{userEmail && (
											<>
												<h1 style={{ color: "white" }}>{MainPageCard.title}</h1>
												<p>{MainPageCard.desc}</p>
												{MainPageCard.imageUrl && (
													<img
														className="MainPageCardImgFire"
														src={MainPageCard.imageUrl}
														alt={MainPageCard.title}
														width="500"
													/>
												)}
												<button
													className="admin-btn deleteBtn"
													onClick={() =>
														deleteMainPageCard(
															MainPageCard.id,
															MainPageCard.imageUrl
														)
													}
												>
													Delete Main Page Card
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
													onClick={() => onUpdateTitle(MainPageCard.id)}
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
														onUpdateImage(
															MainPageCard.id,
															MainPageCard.imageUrl
														)
													}
												>
													Update Image
												</button>
												<br />
												<button
													className="admin-btn deleteBtn"
													onClick={() =>
														onDeleteImage(
															MainPageCard.id,
															MainPageCard.imageUrl
														)
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
													onClick={() => onUpDatedesc(MainPageCard.id)}
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

export default MainPageCard;
