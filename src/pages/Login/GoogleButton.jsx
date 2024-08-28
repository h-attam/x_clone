import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleButton = () => {
  const navigate = useNavigate();

  //google hesabı ile oturum aç
  const handleLogin = () => {
    signInWithPopup(auth, provider).then(() => {
      navigate("/feed");
      toast.success("Hesaba giriş yapıldı");
    });
  };
  return (
    <button
      onClick={handleLogin}
      className="bg-white flex items-center py-2 px-10 rounded-full gap-3 transition hover:bg-gray-300 text-black white-space-nowrap"
    >
      <img className="h-[20px] " src="google-logo.svg" alt="google logo" />
      Google ile Giriş Yap
    </button>
  );
};

export default GoogleButton;
