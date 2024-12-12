import AdminAuth from "../AdminAuth";
// import "./DescriptorCard.css";
import "../../styles/AdminDashboard/DescriptorCard/DescriptorCard.css";
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

interface DescriptorCard {
	id: string;
	title: string;
	desc: number;
	imageUrl: string;
	userId?: string;
}

const DescriptorCard = () => {
	const [DescriptorCardList, setDescriptorCardList] = useState<
		DescriptorCard[]
	>([]);

	//new DescriptorCard states
	const [newDescriptorCardTitle, setnewDescriptorCardTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newDescriptorCardImage, setNewDescriptorCardImage] =
		useState<File | null>(null);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const DescriptorCardsCollectionRef = collection(db, "DescriptorCards");
	const [isLoading, setIsLoading] = useState(true);
	const getDescriptorCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(DescriptorCardsCollectionRef);
			const filteredData: DescriptorCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<DescriptorCard, "id">),
				id: doc.id,
			}));
			setDescriptorCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getDescriptorCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitDescriptorCard = async () => {
		if (newDescriptorCardImage && newdesc && newDescriptorCardTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newDescriptorCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newDescriptorCardImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(DescriptorCardsCollectionRef, {
					title: newDescriptorCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getDescriptorCardList();
				setnewDescriptorCardTitle("");
				setNewdesc("");
				setNewDescriptorCardImage(null);

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

	const deleteDescriptorCard = async (id: string, imageUrl: string) => {
		try {
			const DescriptorCardDoc = doc(db, "DescriptorCards", id);
			await deleteDoc(DescriptorCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getDescriptorCardList();
			console.log("DescriptorCard and image deleted");
		} catch (error) {
			console.error("Error deleting DescriptorCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const DescriptorCardDoc = doc(db, "DescriptorCards", id);
			await updateDoc(DescriptorCardDoc, { title: updatedTitle });
			getDescriptorCardList();
			setUpdatedTitle("");
			console.log("DescriptorCard updated");
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

				const DescriptorCardDoc = doc(db, "DescriptorCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(DescriptorCardDoc, { imageUrl });
				getDescriptorCardList();
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

			const DescriptorCardDoc = doc(db, "DescriptorCards", id);
			await updateDoc(DescriptorCardDoc, { imageUrl: "" });

			getDescriptorCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const DescriptorCardDoc = doc(db, "DescriptorCards", id);
			await updateDoc(DescriptorCardDoc, { desc: updatedDesc });
			getDescriptorCardList();
			setupdatedDesc("");
			console.log("DescriptorCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<div className="DescriptorCard-admin-wrapper">
			{userEmail && <NavBar />}
			<div className="right-side-wrapper">
				<AdminAuth />

				{userEmail && (
					<div className="controlAuthWrapper">
						<h2 className="addDescriptorCardTitle">Add New Descriptor Card</h2>
						<input
							className="admin-input"
							type="text"
							placeholder="Descriptor Card title..."
							value={newDescriptorCardTitle}
							onChange={(e) => setnewDescriptorCardTitle(e.target.value)}
						/>
						<input
							className="admin-input"
							type="text"
							placeholder="Descriptor Card desc..."
							value={newdesc}
							onChange={(e) => setNewdesc(e.target.value)}
						/>
						<input
							className="admin-input"
							type="file"
							ref={fileInputRef}
							onChange={(e) =>
								setNewDescriptorCardImage(
									e.target.files ? e.target.files[0] : null
								)
							}
						/>
						<button
							className="admin-btn"
							onClick={onSubmitDescriptorCard}
							disabled={isLoading}
						>
							Submit Descriptor Card
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
							{DescriptorCardList.map((DescriptorCard) => (
								<div
									className="DescriptorCardItemWrapperFire"
									key={DescriptorCard.id}
								>
									{userEmail && (
										<>
											<h1 style={{ color: "white" }}>{DescriptorCard.title}</h1>
											<p>{DescriptorCard.desc}</p>
											{DescriptorCard.imageUrl && (
												<img
													className="DescriptorCardImgFire"
													src={DescriptorCard.imageUrl}
													alt={DescriptorCard.title}
													width="500"
												/>
											)}
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													deleteDescriptorCard(
														DescriptorCard.id,
														DescriptorCard.imageUrl
													)
												}
											>
												Delete Descriptor Card
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
												onClick={() => onUpdateTitle(DescriptorCard.id)}
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
														DescriptorCard.id,
														DescriptorCard.imageUrl
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
														DescriptorCard.id,
														DescriptorCard.imageUrl
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
												onClick={() => onUpDatedesc(DescriptorCard.id)}
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

export default DescriptorCard;
