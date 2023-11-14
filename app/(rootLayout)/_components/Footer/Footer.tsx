import Image from "next/image";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Footer } from "antd/es/layout/layout";
import BackToTopButton from "./_component/BackToTopButton";

function HomeFooter() {
  return (
    <Footer>
      <div className="container-fluid">
        <div className="footer">
          <div className="logo">
            <Image src={"/dark_logo.png"} alt="logo" width={200} height={80} />
          </div>
          <ul className="socials">
            <li>
              <a href="https://www.facebook.com/">
                <FacebookOutlined />
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com/">
                <TwitterOutlined />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/kamrulsaad">
                <LinkedinOutlined />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/">
                <InstagramOutlined />
              </a>
            </li>
          </ul>
          <div className="copyright">Copyright &copy; 2023 Amar IT</div>
          <BackToTopButton />
        </div>
      </div>
    </Footer>
  );
}

export default HomeFooter;
