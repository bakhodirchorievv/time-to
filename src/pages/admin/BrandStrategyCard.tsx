import AdminAuth from "../AdminAuth";
import "../../styles/AdminDashboard/BrandStrategyCard/BrandStrategyCard.css";
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

interface BrandStrategyCard {
	id: string;
	title: string;
	desc: string;
	imageUrl: string;
	userId?: string;
}

const BrandStrategyCard = () => {
	const [BrandStrategyCardList, setBrandStrategyCardList] = useState<
		BrandStrategyCard[]
	>([]);

	//new BrandStrategyCard states
	const [newBrandStrategyCardTitle, setnewBrandStrategyCardTitle] =
		useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newBrandStrategyCardImage, setNewBrandStrategyCardImage] =
		useState<File | null>(null);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const BrandStrategyCardsCollectionRef = collection(db, "BrandStrategyCards");

	const [isLoading, setIsLoading] = useState(true);

	const getBrandStrategyCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(BrandStrategyCardsCollectionRef);
			const filteredData: BrandStrategyCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<BrandStrategyCard, "id">),
				id: doc.id,
			}));
			setBrandStrategyCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getBrandStrategyCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitBrandStrategyCard = async () => {
		if (newBrandStrategyCardImage && newdesc && newBrandStrategyCardTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newBrandStrategyCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newBrandStrategyCardImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(BrandStrategyCardsCollectionRef, {
					title: newBrandStrategyCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getBrandStrategyCardList();
				setnewBrandStrategyCardTitle("");
				setNewdesc("");
				setNewBrandStrategyCardImage(null);

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

	const deleteBrandStrategyCard = async (id: string, imageUrl: string) => {
		try {
			const BrandStrategyCardDoc = doc(db, "BrandStrategyCards", id);
			await deleteDoc(BrandStrategyCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getBrandStrategyCardList();
			console.log("BrandStrategyCard and image deleted");
		} catch (error) {
			console.error("Error deleting BrandStrategyCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const BrandStrategyCardDoc = doc(db, "BrandStrategyCards", id);
			await updateDoc(BrandStrategyCardDoc, { title: updatedTitle });
			getBrandStrategyCardList();
			setUpdatedTitle("");
			console.log("BrandStrategyCard updated");
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

				const BrandStrategyCardDoc = doc(db, "BrandStrategyCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(BrandStrategyCardDoc, { imageUrl });
				getBrandStrategyCardList();
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

			const BrandStrategyCardDoc = doc(db, "BrandStrategyCards", id);
			await updateDoc(BrandStrategyCardDoc, { imageUrl: "" });

			getBrandStrategyCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const BrandStrategyCardDoc = doc(db, "BrandStrategyCards", id);
			await updateDoc(BrandStrategyCardDoc, { desc: updatedDesc });
			getBrandStrategyCardList();
			setupdatedDesc("");
			console.log("BrandStrategyCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<div className="BrandStrategyCard-admin-wrapper">
			{userEmail && <NavBar />}
			<div className="right-side-wrapper">
				<AdminAuth />

				{userEmail && (
					<div className="controlAuthWrapper">
						<h2 className="addBrandStrategyCardTitle">
							Add New BrandStrategy Card
						</h2>
						<input
							className="admin-input"
							type="text"
							placeholder="BrandStrategy Card title..."
							value={newBrandStrategyCardTitle}
							onChange={(e) => setnewBrandStrategyCardTitle(e.target.value)}
						/>
						<input
							className="admin-input"
							type="text"
							placeholder="BrandStrategy Card desc..."
							value={newdesc}
							onChange={(e) => setNewdesc(e.target.value)}
						/>
						<input
							className="admin-input"
							type="file"
							ref={fileInputRef}
							onChange={(e) =>
								setNewBrandStrategyCardImage(
									e.target.files ? e.target.files[0] : null
								)
							}
						/>
						<button
							className="admin-btn submitBtn"
							onClick={onSubmitBrandStrategyCard}
							disabled={isLoading}
						>
							Submit BrandStrategy Card
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
							{BrandStrategyCardList.map((BrandStrategyCard) => (
								<div
									className="BrandStrategyCardItemWrapperFire"
									key={BrandStrategyCard.id}
								>
									{userEmail && (
										<>
											<h1 style={{ color: "white" }}>
												{BrandStrategyCard.title}
											</h1>
											<p>{BrandStrategyCard.desc}</p>
											{BrandStrategyCard.imageUrl && (
												<img
													className="BrandStrategyCardImgFire"
													src={BrandStrategyCard.imageUrl}
													alt={BrandStrategyCard.title}
													width="500"
												/>
											)}
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													deleteBrandStrategyCard(
														BrandStrategyCard.id,
														BrandStrategyCard.imageUrl
													)
												}
											>
												Delete BrandStrategy Card
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
												onClick={() => onUpdateTitle(BrandStrategyCard.id)}
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
														BrandStrategyCard.id,
														BrandStrategyCard.imageUrl
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
														BrandStrategyCard.id,
														BrandStrategyCard.imageUrl
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
												onClick={() => onUpDatedesc(BrandStrategyCard.id)}
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
	);
};

export default BrandStrategyCard;
