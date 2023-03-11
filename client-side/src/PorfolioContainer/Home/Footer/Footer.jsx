import './Footer.css';
import _img from '../../../assets/Home/shape-bg.png';
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-parent">
        <img src={_img} alt="no internet connection" />
      </div>
    </div>
  );
};

export default Footer;
