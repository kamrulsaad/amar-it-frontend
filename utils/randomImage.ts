import img1 from "@/assets/services/1.jpg";
import img2 from "@/assets/services/2.jpg";
import img3 from "@/assets/services/3.jpg";
import img4 from "@/assets/services/4.jpg";
import img5 from "@/assets/services/5.jpg";
import img6 from "@/assets/services/6.jpg";

function getRandomImage(index: number) {
  index > 5 && (index = index - 6);

  const imageNames = [img1, img2, img3, img4, img5, img6];
  return imageNames[index];
}

export default getRandomImage;
