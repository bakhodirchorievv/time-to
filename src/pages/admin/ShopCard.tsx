import AdminAuth from "../AdminAuth";
// import "./ShopCard.css";
// import "../../styles/AdminDashboard/ShopCard/ShopCard.css";

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

interface ShopCard {
	id: string;
	title: string;
	desc: number;
	imageUrl: string;
	userId?: string;
}

const ShopCard = () => {
	const [ShopCardList, setShopCardList] = useState<ShopCard[]>([]);

	//new ShopCard states
	const [newShopCardTitle, setnewShopCardTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newShopCardImage, setNewShopCardImage] = useState<File | null>(null);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const ShopCardsCollectionRef = collection(db, "ShopCards");
	const [isLoading, setIsLoading] = useState(true);
	const getShopCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(ShopCardsCollectionRef);
			const filteredData: ShopCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<ShopCard, "id">),
				id: doc.id,
			}));
			setShopCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getShopCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitShopCard = async () => {
		if (newShopCardImage && newdesc && newShopCardTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newShopCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newShopCardImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(ShopCardsCollectionRef, {
					title: newShopCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getShopCardList();
				setnewShopCardTitle("");
				setNewdesc("");
				setNewShopCardImage(null);

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

	const deleteShopCard = async (id: string, imageUrl: string) => {
		try {
			const ShopCardDoc = doc(db, "ShopCards", id);
			await deleteDoc(ShopCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getShopCardList();
			console.log("ShopCard and image deleted");
		} catch (error) {
			console.error("Error deleting ShopCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const ShopCardDoc = doc(db, "ShopCards", id);
			await updateDoc(ShopCardDoc, { title: updatedTitle });
			getShopCardList();
			setUpdatedTitle("");
			console.log("ShopCard updated");
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

				const ShopCardDoc = doc(db, "ShopCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(ShopCardDoc, { imageUrl });
				getShopCardList();
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

			const ShopCardDoc = doc(db, "ShopCards", id);
			await updateDoc(ShopCardDoc, { imageUrl: "" });

			getShopCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const ShopCardDoc = doc(db, "ShopCards", id);
			await updateDoc(ShopCardDoc, { desc: updatedDesc });
			getShopCardList();
			setupdatedDesc("");
			console.log("ShopCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="/styles/AdminDashboard/ShopCard/ShopCard.css"
				/>
			</Head>
			<div className="ShopCard-admin-wrapper">
				{userEmail && <NavBar />}
				<div className="right-side-wrapper">
					<AdminAuth />

					{userEmail && (
						<div className="controlAuthWrapper">
							<h2 className="addShopCardTitle">Add New Shop Card</h2>
							<input
								className="admin-input"
								type="text"
								placeholder="Shop Card title..."
								value={newShopCardTitle}
								onChange={(e) => setnewShopCardTitle(e.target.value)}
							/>
							<input
								className="admin-input"
								type="text"
								placeholder="Shop Card desc..."
								value={newdesc}
								onChange={(e) => setNewdesc(e.target.value)}
							/>
							<input
								className="admin-input"
								type="file"
								ref={fileInputRef}
								onChange={(e) =>
									setNewShopCardImage(e.target.files ? e.target.files[0] : null)
								}
							/>
							<button
								className="admin-btn"
								onClick={onSubmitShopCard}
								disabled={isLoading}
							>
								Submit Shop Card
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
								{ShopCardList.map((ShopCard) => (
									<div className="ShopCardItemWrapperFire" key={ShopCard.id}>
										{userEmail && (
											<>
												<h1 style={{ color: "white" }}>{ShopCard.title}</h1>
												<p>{ShopCard.desc}</p>
												{ShopCard.imageUrl && (
													<img
														className="ShopCardImgFire"
														src={ShopCard.imageUrl}
														alt={ShopCard.title}
														width="500"
													/>
												)}
												<button
													className="admin-btn deleteBtn"
													onClick={() =>
														deleteShopCard(ShopCard.id, ShopCard.imageUrl)
													}
												>
													Delete Shop Card
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
													onClick={() => onUpdateTitle(ShopCard.id)}
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
														onUpdateImage(ShopCard.id, ShopCard.imageUrl)
													}
												>
													Update Image
												</button>
												<br />
												<button
													className="admin-btn deleteBtn"
													onClick={() =>
														onDeleteImage(ShopCard.id, ShopCard.imageUrl)
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
													onClick={() => onUpDatedesc(ShopCard.id)}
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

export default ShopCard;
