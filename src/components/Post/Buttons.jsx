import { CiShare2 } from "react-icons/ci";
import { FaHeart, FaRegHeart, FaRetweet } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { db, auth } from "../../firebase/index";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Buttons = ({ tweet }) => {
  //oturumu açık olan kullanıcı bu tweet'i likeladı mı?
  const isLiked = tweet.likes.includes(auth.currentUser.uid);
  //like durumunu çevirir
  const toggleLike = async () => {
    //güncellenecek dökümanın referansını al
    const tweetRef = doc(db, "tweets", tweet.id);

    //referansı alınan tweet dökümanını güncelle
    await updateDoc(tweetRef, {
      likes: isLiked ? arrayRemove(auth.currentUser.uid) : arrayUnion(auth.currentUser.uid),
    });
  };
  return (
    <div className="flex justify-between items-center">
      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#33c1f93f] ">
        <LuMessageCircle />
      </div>

      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#00ff2a44] ">
        <FaRetweet />
      </div>

      <div
        onClick={toggleLike}
        className="flex gap-2 items-center p-3 rounded-full cursor-pointer transition hover:bg-[#ff00d444] "
      >

       {isLiked ? <FaHeart className="text-red-500"/> :  <FaRegHeart />}
        <span>{tweet.likes.length} </span>
      </div>

      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#3b3b3bac] ">
        <CiShare2 />
      </div>
    </div>
  );
};

export default Buttons;
