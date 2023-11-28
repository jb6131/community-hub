import { useLocation, useNavigate } from 'react-router-dom';
import { StyledFooter } from '../../styles/Footer.styled';
import './index.css';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className='foot'>
        {location.pathname !== '/' && (
          <button
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4>
          © 2023 - CommunityHub
        </h4>
      </div>
  );
};

export default Footer;