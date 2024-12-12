import AdminAuth from "../AdminAuth";
// import "./CorporativeCard.css";
// import "../../styles/AdminDashboard/CorporativeCard/CorporativeCard.css";
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

interface CorporativeCard {
	id: string;
	title: string;
	desc: string;
	imageUrl: string;
	userId?: string;
}

const CorporativeCard = () => {
	const [CorporativeCardList, setCorporativeCardList] = useState<
		CorporativeCard[]
	>([]);

	//new CorporativeCard states
	const [newCorporativeCardTitle, setnewCorporativeCardTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newCorporativeCardImage, setNewCorporativeCardImage] =
		useState<File | null>(null);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const CorporativeCardsCollectionRef = collection(db, "CorporativeCards");
	const [isLoading, setIsLoading] = useState(true);
	const getCorporativeCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(CorporativeCardsCollectionRef);
			const filteredData: CorporativeCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<CorporativeCard, "id">),
				id: doc.id,
			}));
			setCorporativeCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getCorporativeCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitCorporativeCard = async () => {
		if (newCorporativeCardImage && newdesc && newCorporativeCardTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newCorporativeCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newCorporativeCardImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(CorporativeCardsCollectionRef, {
					title: newCorporativeCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getCorporativeCardList();
				setnewCorporativeCardTitle("");
				setNewdesc("");
				setNewCorporativeCardImage(null);

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

	const deleteCorporativeCard = async (id: string, imageUrl: string) => {
		try {
			const CorporativeCardDoc = doc(db, "CorporativeCards", id);
			await deleteDoc(CorporativeCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getCorporativeCardList();
			console.log("CorporativeCard and image deleted");
		} catch (error) {
			console.error("Error deleting CorporativeCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const CorporativeCardDoc = doc(db, "CorporativeCards", id);
			await updateDoc(CorporativeCardDoc, { title: updatedTitle });
			getCorporativeCardList();
			setUpdatedTitle("");
			console.log("CorporativeCard updated");
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

				const CorporativeCardDoc = doc(db, "CorporativeCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(CorporativeCardDoc, { imageUrl });
				getCorporativeCardList();
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

			const CorporativeCardDoc = doc(db, "CorporativeCards", id);
			await updateDoc(CorporativeCardDoc, { imageUrl: "" });

			getCorporativeCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const CorporativeCardDoc = doc(db, "CorporativeCards", id);
			await updateDoc(CorporativeCardDoc, { desc: updatedDesc });
			getCorporativeCardList();
			setupdatedDesc("");
			console.log("CorporativeCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="/styles/AdminDashboard/CorporativeCard/CorporativeCard.css"
				/>
			</Head>
			<div className="CorporativeCard-admin-wrapper">
				{userEmail && <NavBar />}
				<div className="right-side-wrapper">
					<AdminAuth />

					{userEmail && (
						<div className="controlAuthWrapper">
							<h2 className="addCorporativeCardTitle">
								Add New Corporative Card
							</h2>
							<input
								className="admin-input"
								type="text"
								placeholder="Corporative Card title..."
								value={newCorporativeCardTitle}
								onChange={(e) => setnewCorporativeCardTitle(e.target.value)}
							/>
							<input
								className="admin-input"
								type="text"
								placeholder="Corporative Card desc..."
								value={newdesc}
								onChange={(e) => setNewdesc(e.target.value)}
							/>
							<input
								className="admin-input"
								type="file"
								ref={fileInputRef}
								onChange={(e) =>
									setNewCorporativeCardImage(
										e.target.files ? e.target.files[0] : null
									)
								}
							/>
							<button
								className="admin-btn"
								onClick={onSubmitCorporativeCard}
								disabled={isLoading}
							>
								Submit Corporative Card
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
								{CorporativeCardList.map((CorporativeCard) => (
									<div
										className="CorporativeCardItemWrapperFire"
										key={CorporativeCard.id}
									>
										{userEmail && (
											<>
												<h1 style={{ color: "white" }}>
													{CorporativeCard.title}
												</h1>
												<p>{CorporativeCard.desc}</p>
												{CorporativeCard.imageUrl && (
													<img
														className="CorporativeCardImgFire"
														src={CorporativeCard.imageUrl}
														alt={CorporativeCard.title}
														width="500"
													/>
												)}
												<button
													className="admin-btn deleteBtn"
													onClick={() =>
														deleteCorporativeCard(
															CorporativeCard.id,
															CorporativeCard.imageUrl
														)
													}
												>
													Delete Corporative Card
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
													onClick={() => onUpdateTitle(CorporativeCard.id)}
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
															CorporativeCard.id,
															CorporativeCard.imageUrl
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
															CorporativeCard.id,
															CorporativeCard.imageUrl
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
													onClick={() => onUpDatedesc(CorporativeCard.id)}
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

export default CorporativeCard;
