import { useLocation, useNavigate } from 'react-router-dom';
import { StyledFooter } from '../../styles/Footer.styled';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <StyledFooter>
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
    </StyledFooter>
  );
};

export default Footer;