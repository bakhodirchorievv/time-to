import AdminAuth from "../AdminAuth";
// import "./SiteCard.css";
// import "../../styles/AdminDashboard/SiteCard/SiteCard.css";

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

interface SiteCard {
	id: string;
	title: string;
	desc: number;
	imageUrl: string;
	userId?: string;
}

const SiteCard = () => {
	const [SiteCardList, setSiteCardList] = useState<SiteCard[]>([]);

	//new SiteCard states
	const [newSiteCardTitle, setnewSiteCardTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newSiteCardImage, setNewSiteCardImage] = useState<File | null>(null);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const SiteCardsCollectionRef = collection(db, "SiteCards");
	const [isLoading, setIsLoading] = useState(true);
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
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getSiteCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitSiteCard = async () => {
		if (newSiteCardImage && newdesc && newSiteCardTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newSiteCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newSiteCardImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(SiteCardsCollectionRef, {
					title: newSiteCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getSiteCardList();
				setnewSiteCardTitle("");
				setNewdesc("");
				setNewSiteCardImage(null);

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

	const deleteSiteCard = async (id: string, imageUrl: string) => {
		try {
			const SiteCardDoc = doc(db, "SiteCards", id);
			await deleteDoc(SiteCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getSiteCardList();
			console.log("SiteCard and image deleted");
		} catch (error) {
			console.error("Error deleting SiteCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const SiteCardDoc = doc(db, "SiteCards", id);
			await updateDoc(SiteCardDoc, { title: updatedTitle });
			getSiteCardList();
			setUpdatedTitle("");
			console.log("SiteCard updated");
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

				const SiteCardDoc = doc(db, "SiteCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(SiteCardDoc, { imageUrl });
				getSiteCardList();
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

			const SiteCardDoc = doc(db, "SiteCards", id);
			await updateDoc(SiteCardDoc, { imageUrl: "" });

			getSiteCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const SiteCardDoc = doc(db, "SiteCards", id);
			await updateDoc(SiteCardDoc, { desc: updatedDesc });
			getSiteCardList();
			setupdatedDesc("");
			console.log("SiteCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="/styles/AdminDashboard/SiteCard/SiteCard.css"
				/>
			</Head>
			<div className="SiteCard-admin-wrapper">
				{userEmail && <NavBar />}
				<div className="right-side-wrapper">
					<AdminAuth />

					{userEmail && (
						<div className="controlAuthWrapper">
							<h2 className="addSiteCardTitle">Add New Site Card</h2>
							<input
								className="admin-input"
								type="text"
								placeholder="Site Card title..."
								value={newSiteCardTitle}
								onChange={(e) => setnewSiteCardTitle(e.target.value)}
							/>
							<input
								className="admin-input"
								type="text"
								placeholder="Site Card desc..."
								value={newdesc}
								onChange={(e) => setNewdesc(e.target.value)}
							/>
							<input
								className="admin-input"
								type="file"
								ref={fileInputRef}
								onChange={(e) =>
									setNewSiteCardImage(e.target.files ? e.target.files[0] : null)
								}
							/>
							<button
								className="admin-btn"
								onClick={onSubmitSiteCard}
								disabled={isLoading}
							>
								Submit Site Card
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
								{SiteCardList.map((SiteCard) => (
									<div className="SiteCardItemWrapperFire" key={SiteCard.id}>
										{userEmail && (
											<>
												<h1 style={{ color: "white" }}>{SiteCard.title}</h1>
												<p>{SiteCard.desc}</p>
												{SiteCard.imageUrl && (
													<img
														className="SiteCardImgFire"
														src={SiteCard.imageUrl}
														alt={SiteCard.title}
														width="500"
													/>
												)}
												<button
													className="admin-btn deleteBtn"
													onClick={() =>
														deleteSiteCard(SiteCard.id, SiteCard.imageUrl)
													}
												>
													Delete Site Card
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
													onClick={() => onUpdateTitle(SiteCard.id)}
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
														onUpdateImage(SiteCard.id, SiteCard.imageUrl)
													}
												>
													Update Image
												</button>
												<br />
												<button
													className="admin-btn deleteBtn"
													onClick={() =>
														onDeleteImage(SiteCard.id, SiteCard.imageUrl)
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
													onClick={() => onUpDatedesc(SiteCard.id)}
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

export default SiteCard;
