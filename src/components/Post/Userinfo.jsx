import moment from "moment";
import { MdEdit } from "react-icons/md";

const Userinfo = ({ tweet }) => {
  // Tarih verisine eriş
  let date = tweet.createdAt?.toDate();

  // Moment kütüphanesi yardımıyla şu anki tarihin ne kadar uzak olduğunu hesapla
  date = moment(date).fromNow();

  return (
    <div className="flex gap-3 items-center whitespace-nowrap">
      <p>{tweet.user.name}</p>

      <p className="text-gray-400 text-sm">@{tweet.user.name.toLowerCase().split(" ").join("_")}</p>

      <p className="text-gray-400 text-sm">{date}</p>

      {tweet.isEdited && (
        <div className="flex items-center gap-1 text-gray-400 text-xs">
          <span className="max-md:hidden">*düzenlendi</span>
          <MdEdit />
        </div>
      )}
    </div>
  );
};

export default Userinfo;
