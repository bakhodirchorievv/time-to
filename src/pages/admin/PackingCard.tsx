import AdminAuth from "../AdminAuth";
// import "./PackingCard.css";
import "../../styles/AdminDashboard/PackingCard/PackingCard.css";

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

interface PackingCard {
	id: string;
	title: string;
	desc: number;
	imageUrl: string;
	userId?: string;
}

const PackingCard = () => {
	const [PackingCardList, setPackingCardList] = useState<PackingCard[]>([]);

	//new PackingCard states
	const [newPackingCardTitle, setnewPackingCardTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newPackingCardImage, setNewPackingCardImage] = useState<File | null>(
		null
	);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const PackingCardsCollectionRef = collection(db, "PackingCards");
	const [isLoading, setIsLoading] = useState(true);
	const getPackingCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(PackingCardsCollectionRef);
			const filteredData: PackingCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<PackingCard, "id">),
				id: doc.id,
			}));
			setPackingCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getPackingCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitPackingCard = async () => {
		if (newPackingCardImage && newdesc && newPackingCardTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newPackingCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newPackingCardImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(PackingCardsCollectionRef, {
					title: newPackingCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getPackingCardList();
				setnewPackingCardTitle("");
				setNewdesc("");
				setNewPackingCardImage(null);

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

	const deletePackingCard = async (id: string, imageUrl: string) => {
		try {
			const PackingCardDoc = doc(db, "PackingCards", id);
			await deleteDoc(PackingCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getPackingCardList();
			console.log("PackingCard and image deleted");
		} catch (error) {
			console.error("Error deleting PackingCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const PackingCardDoc = doc(db, "PackingCards", id);
			await updateDoc(PackingCardDoc, { title: updatedTitle });
			getPackingCardList();
			setUpdatedTitle("");
			console.log("PackingCard updated");
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

				const PackingCardDoc = doc(db, "PackingCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(PackingCardDoc, { imageUrl });
				getPackingCardList();
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

			const PackingCardDoc = doc(db, "PackingCards", id);
			await updateDoc(PackingCardDoc, { imageUrl: "" });

			getPackingCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const PackingCardDoc = doc(db, "PackingCards", id);
			await updateDoc(PackingCardDoc, { desc: updatedDesc });
			getPackingCardList();
			setupdatedDesc("");
			console.log("PackingCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<div className="PackingCard-admin-wrapper">
			{userEmail && <NavBar />}
			<div className="right-side-wrapper">
				<AdminAuth />

				{userEmail && (
					<div className="controlAuthWrapper">
						<h2 className="addPackingCardTitle">Add New Packing Card</h2>
						<input
							className="admin-input"
							type="text"
							placeholder="Packing Card title..."
							value={newPackingCardTitle}
							onChange={(e) => setnewPackingCardTitle(e.target.value)}
						/>
						<input
							className="admin-input"
							type="text"
							placeholder="Packing Card desc..."
							value={newdesc}
							onChange={(e) => setNewdesc(e.target.value)}
						/>
						<input
							className="admin-input"
							type="file"
							ref={fileInputRef}
							onChange={(e) =>
								setNewPackingCardImage(
									e.target.files ? e.target.files[0] : null
								)
							}
						/>
						<button
							className="admin-btn"
							onClick={onSubmitPackingCard}
							disabled={isLoading}
						>
							Submit Packing Card
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
							{PackingCardList.map((PackingCard) => (
								<div
									className="PackingCardItemWrapperFire"
									key={PackingCard.id}
								>
									{userEmail && (
										<>
											<h1 style={{ color: "white" }}>{PackingCard.title}</h1>
											<p>{PackingCard.desc}</p>
											{PackingCard.imageUrl && (
												<img
													className="PackingCardImgFire"
													src={PackingCard.imageUrl}
													alt={PackingCard.title}
													width="500"
												/>
											)}
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													deletePackingCard(
														PackingCard.id,
														PackingCard.imageUrl
													)
												}
											>
												Delete Packing Card
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
												onClick={() => onUpdateTitle(PackingCard.id)}
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
													onUpdateImage(PackingCard.id, PackingCard.imageUrl)
												}
											>
												Update Image
											</button>
											<br />
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													onDeleteImage(PackingCard.id, PackingCard.imageUrl)
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
												onClick={() => onUpDatedesc(PackingCard.id)}
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

export default PackingCard;
