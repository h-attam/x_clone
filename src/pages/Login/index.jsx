import { useState } from "react";
import GoogleButton from "./GoogleButton";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ResetButton from "./ResetButton";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [isError, setIsError] = useState(false); // setIsError doğru yazıldı

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Giriş veya kaydolma işlemlerini buraya ekleyebilirsiniz
    if (isSignUp) {
      // Kaydolma modundaysa hesap oluştur
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("Hesabınız oluşturuldu");
          navigate("/feed");
        })
        .catch((err) => toast.error("Bir sorun oluştu:" + err.code));
    } else {
      // Giriş modundaysa hesaba giriş yap
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("Hesaba giriş yapıldı");
          navigate("/feed");
        })
        .catch((err) => {
          // Eğer şifre bilgileri yanlış hatası geldiyse:
          if (err.code === "auth/invalid-credential") {
            // error state'ini true'ya çek
            setIsError(true);
          }
          toast.error("Bir sorun oluştu:" + err.code);
        });
    }
  };

  return (
    <div className="h-screen bg-[#242424] text-white grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img
            className="h-[60px]"
            src="x-logo.webp"
            alt="x shaped logo black and white"
          />
        </div>

        <h1 className="text-lg font-bold text-center">Twitter'a giriş yap</h1>

        <GoogleButton />

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="mt-5">Şifre</label>
          <input
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="password"
            required
            onChange={(e) => setPass(e.target.value)}
          />

          <button className="mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300">
            {isSignUp ? "Kaydolun" : "Giriş Yap"}
          </button>
        </form>

        <p className="mt-5">
          <span className="text-gray-500">
            {isSignUp ? "Hesabınız varsa" : "Hesabınız yoksa"}
          </span>
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="cursor-pointer ms-2 text-blue-500"
          >
            {isSignUp ? "Giriş Yapın" : "Kaydolun"}
          </span>
        </p>

        {isError && <ResetButton email={email} />}
      </div>
    </div>
  );
};

export default Login;
