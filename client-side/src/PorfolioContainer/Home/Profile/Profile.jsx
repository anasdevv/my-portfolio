import './profile.css';
import Typical from 'react-typical';
import ScrollService from '../../../utils/ScrollService';
const Profile = (props) => {
  return (
    <div className="profile-container">
      <div className="profile-parent">
        <div className="profile-details">
          <div className="colz">
            <div className="colz-icon">
              <a href="https://www.facebook.com/anas.m.3517?mibextid=ZbWKwL">
                <i className="fa fa-facebook-square"></i>
              </a>
              <a href="https://github.com/anasdevv">
                <i class="fa fa-github" aria-hidden="true"></i>
              </a>
              <a href="https://instagram.com/annassss._?igshid=ZDdkNTZiNTM=">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="https://twitter.com/anas1_dev?t=9rVgnrJPWNkD7OtvCZpKSw&s=09">
                <i className="fa fa-twitter"></i>
              </a>
            </div>
          </div>
          <div className="profile-details-name">
            {' '}
            <span className="primary-text">
              Hello I'm
              <span className="highlighted-text"> Anas</span>
            </span>
          </div>
          <div className="profile-details-role">
            <span className="primary-text">
              <h1>
                {' '}
                <Typical
                  loop={Infinity}
                  steps={[
                    'MERN stack',
                    1000,
                    'Next.js ',
                    1000,
                    'NestJS',
                    1000,
                    'TypeScript',
                    1000,
                    'OOP principles',
                    1000,
                    'Solid principles',
                    1000,
                    'React',
                    1000,
                    'MongoDB',
                    1000,
                    'Express.js',
                    1000,
                    'Node.js',
                    1000,
                    'Git',
                    1000,
                    'Agile methodology',
                    1000,
                    'Deployment',
                    1000,
                  ]}
                />
              </h1>
              <span className="profile-role-tagline">
                Experience the power of modern web development with the perfect
                fusion of front-end and back-end operations
              </span>
            </span>
          </div>
          <div className="profile-options">
            <button
              className="btn primary-btn"
              onClick={() => {
                return ScrollService.scrollHandler.scrollToHireMe();
              }}
            >
              {' '}
              Hire Me{' '}
            </button>
            <a href="resume.pdf" download="Anas resume.pdf">
              <button className="btn highlighted-btn">Get Resume</button>
            </a>
          </div>
        </div>
        <div className="profile-picture">
          <div className="profile-picture-background"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
