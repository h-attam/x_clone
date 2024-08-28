import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { useRef, useState } from "react";
import Modal from "../Modal";

const Dropdown = ({ tweet }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //input referansı
  const inputRef = useRef()
  //dropdownı kapat 
  const close = () => {
    inputRef.current.checked = false;
  }

  // Silme işlemi
  const handleDelete = () => {
    // Silinecek tweet dökümanının referansını al
    const tweetRef = doc(db, "tweets", tweet.id);

    // Dökümanı kaldır
    deleteDoc(tweetRef)
      .then(() => toast.info("Gönderi akıştan kaldırıldı"))
      .catch(() => toast.error("Bir sorun oluştu"));

      close();
  };

  // Güncelleme işlemi
  const handleEdit = () => {
    setIsModalOpen(true);

    close();
    };

  return (
    <>
      <label className="popup">
        <input ref={inputRef} type="checkbox" />
        <div className="burger" tabIndex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="popup-window">
          <legend>Eylemler</legend>
          <ul>
            <li>
              <button onClick={handleEdit}>
                <MdEdit />
                <span>Düzenle</span>
              </button>
            </li>
            <hr />
            <li>
              <button onClick={handleDelete}>
                <FaTrashAlt className="text-red-500" />
                <span>Sil</span>
              </button>
            </li>
          </ul>
        </nav>
      </label>

      {isModalOpen && 
        <Modal tweet={tweet} close={() =>
         setIsModalOpen(false)} />}
    </>
  );
};

export default Dropdown;
