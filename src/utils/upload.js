/*herhangi bir medya içeriğini (foto,video,ses,doaya,belge) veritabanlarına doğrudan kaydetmeyiz.
Bu soruna çözüm olarak medya içeriklerini sadece medya verisi depolaması için tasarlanmış olan 
yapılarda depolayıp medyaya erişmek için kullanılan url adreslerini veri tabanında saklarız.
*/

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";

//bu fonksiyondan beklentimiz dosyayı alıp firebase'a yükleyip ardından url'sini return etmesi.
const upload = async(file) => {
    //1)dosya resim değilde veya dosya yoksa fonksiyonu durdur
    if(!file.type.startsWith("image") || !file){
        return null;
    }

    //2)dosyanın yükleneceği konumun referansını al
    const imageRef= ref(storage,v4()+ file.name);

    //3)referansını oluşturduğun konuma dosyayı yükle
    await uploadBytes(imageRef,file);

    //4)yklenen dosyanın url'ni al ve return et
    return await getDownloadURL(imageRef);
};

export default upload;
