import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

// Parent route'un elementi
const Protected = () => {
  const [isAuth, setIsAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
   // kullancının oturumunu izler ve oturumda bir değişiklik olduğunda callback function'nu tetikler
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user);
    });

    // aboneliği temizle
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // eğer kullanıcının yetkisi yoksa logine yönlendir
    if (isAuth === false) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  // Kimlik doğrulama durumu belirlenirken, bir yükleme göstergesi veya null gösterebilirsiniz
  if (isAuth === null) {
    return null; // veya bir yükleme döndürücüsü döndürebilirsiniz
  }

  // eğer yetkisi varsa alt route'daki elementi göster
  return <Outlet />;
};

export default Protected;
