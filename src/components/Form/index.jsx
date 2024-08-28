import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { BsCardImage } from "react-icons/bs";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { auth, db, storage } from '../../firebase'; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import Loader from "../../components/Loader"; 

const Form = ({ user }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const text = e.target[0].value;
        const file = e.target[1].files[0];

        if (!text && !file) {
            return toast.warning("Lütfen içerik giriniz", { position: "bottom-right" });
        }

        setIsLoading(true);

        try {
            let imageUrl = null;
            if (file) {
                const storageRef = ref(storage, `tweets/${auth.currentUser.uid}/${file.name}`);
                await uploadBytes(storageRef, file);
                imageUrl = await getDownloadURL(storageRef);
            }

            const tweetsCol = collection(db, "tweets");
            await addDoc(tweetsCol, {
                textContent: text,
                imageContent: imageUrl,
                likes: [],
                isEdited: false,
                createdAt: serverTimestamp(),
                user: {
                    id: auth.currentUser.uid,
                    name: auth.currentUser.displayName,
                    photo: auth.currentUser.photoURL,
                }
            });

            setIsLoading(false);
            e.target.reset();
            toast.success("Tweet başarıyla gönderildi!", { position: "bottom-right" });
        } catch (error) {
            setIsLoading(false);
            toast.error("Tweet gönderilirken bir hata oluştu.", { position: "bottom-right" });
            console.error("Error adding document: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-3 border-b border-zinc-600 p-4">
            <img
                className="rounded-full h-[35px] md:h-[45px]"
                src={user?.photoURL}
                alt={user?.displayName}
            />

            <div className="w-full">
                <input
                    className="w-full mt-1 mb-2 bg-transparent outline-none md:text-xl"
                    placeholder="Neler oluyor?"
                    type="text"
                />

                <div className="flex justify-between items-center">
                    <label className="text-lg transition p-4 cursor-pointer rounded-full hover:bg-gray-800" htmlFor="image">
                        <BsCardImage />
                    </label>

                    <input className="hidden" id="image" type="file" />
                    <button disabled={isLoading} className="bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800">
                        {isLoading ? <Loader /> : "Gönder"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Form;
