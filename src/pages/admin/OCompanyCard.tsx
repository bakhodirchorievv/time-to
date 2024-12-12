import AdminAuth from "../AdminAuth";
// import "./OCompanyCard.css";
// import "../../styles/AdminDashboard/OCompanyCard/OCompanyCard.css";

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

interface OCompanyCard {
	id: string;
	title: string;
	desc: number;
	imageUrl: string;
	userId?: string;
}

const OCompanyCard = () => {
	const [OCompanyCardList, setOCompanyCardList] = useState<OCompanyCard[]>([]);

	//new OCompanyCard states
	const [newOCompanyCardTitle, setnewOCompanyCardTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newOCompanyCardImage, setNewOCompanyCardImage] = useState<File | null>(
		null
	);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const OCompanyCardsCollectionRef = collection(db, "OCompanyCards");
	const [isLoading, setIsLoading] = useState(true);
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
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getOCompanyCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitOCompanyCard = async () => {
		if (newOCompanyCardImage && newdesc && newOCompanyCardTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newOCompanyCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newOCompanyCardImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(OCompanyCardsCollectionRef, {
					title: newOCompanyCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getOCompanyCardList();
				setnewOCompanyCardTitle("");
				setNewdesc("");
				setNewOCompanyCardImage(null);

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
	const deleteOCompanyCard = async (id: string, imageUrl: string) => {
		try {
			const OCompanyCardDoc = doc(db, "OCompanyCards", id);
			await deleteDoc(OCompanyCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getOCompanyCardList();
			console.log("OCompanyCard and image deleted");
		} catch (error) {
			console.error("Error deleting OCompanyCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const OCompanyCardDoc = doc(db, "OCompanyCards", id);
			await updateDoc(OCompanyCardDoc, { title: updatedTitle });
			getOCompanyCardList();
			setUpdatedTitle("");
			console.log("OCompanyCard updated");
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

				const OCompanyCardDoc = doc(db, "OCompanyCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(OCompanyCardDoc, { imageUrl });
				getOCompanyCardList();
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

			const OCompanyCardDoc = doc(db, "OCompanyCards", id);
			await updateDoc(OCompanyCardDoc, { imageUrl: "" });

			getOCompanyCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const OCompanyCardDoc = doc(db, "OCompanyCards", id);
			await updateDoc(OCompanyCardDoc, { desc: updatedDesc });
			getOCompanyCardList();
			setupdatedDesc("");
			console.log("OCompanyCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="/styles/AdminDashboard/OCompanyCard/OCompanyCard.css"
				/>
			</Head>
			<div className="OCompanyCard-admin-wrapper">
				{userEmail && <NavBar />}
				<div className="right-side-wrapper">
					<AdminAuth />

					{userEmail && (
						<div className="controlAuthWrapper">
							<h2 className="addOCompanyCardTitle">Add New OCompany Card</h2>
							<input
								className="admin-input"
								type="text"
								placeholder="OCompany Card title..."
								value={newOCompanyCardTitle}
								onChange={(e) => setnewOCompanyCardTitle(e.target.value)}
							/>
							<input
								className="admin-input"
								type="text"
								placeholder="OCompany Card desc..."
								value={newdesc}
								onChange={(e) => setNewdesc(e.target.value)}
							/>
							<input
								className="admin-input"
								type="file"
								ref={fileInputRef}
								onChange={(e) =>
									setNewOCompanyCardImage(
										e.target.files ? e.target.files[0] : null
									)
								}
							/>
							<button
								className="admin-btn"
								onClick={onSubmitOCompanyCard}
								disabled={isLoading}
							>
								Submit OCompany Card
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
								{OCompanyCardList.map((OCompanyCard) => (
									<div
										className="OCompanyCardItemWrapperFire"
										key={OCompanyCard.id}
									>
										{userEmail && (
											<>
												<h1 style={{ color: "white" }}>{OCompanyCard.title}</h1>
												<p>{OCompanyCard.desc}</p>
												{OCompanyCard.imageUrl && (
													<img
														className="OCompanyCardImgFire"
														src={OCompanyCard.imageUrl}
														alt={OCompanyCard.title}
														width="500"
													/>
												)}
												<button
													className="admin-btn deleteBtn"
													onClick={() =>
														deleteOCompanyCard(
															OCompanyCard.id,
															OCompanyCard.imageUrl
														)
													}
												>
													Delete OCompany Card
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
													onClick={() => onUpdateTitle(OCompanyCard.id)}
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
															OCompanyCard.id,
															OCompanyCard.imageUrl
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
															OCompanyCard.id,
															OCompanyCard.imageUrl
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
													onClick={() => onUpDatedesc(OCompanyCard.id)}
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
			</div>{" "}
		</>
	);
};

export default OCompanyCard;
