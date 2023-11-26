import styled from "styled-components";
import img from '../images/AdobeStock_624243442.jpg';

export const StyledNav = styled.nav `

padding: 2rem 10%;
display: flex;
justify-content:space-around;
align-items: end;
box-shadow: 0 0 3px 1px rgba(150, 150, 150, 0.8);
background-image: url(${img});
background-repeat: no-repeat;
background-size:cover;
background-position: center center;

p {
    font-size: 3rem;
    color: white;
    display: flex;
    }
`