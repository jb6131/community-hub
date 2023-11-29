import styled from "styled-components";
import img from '../images/AdobeStock_624243442.jpg';

export const StyledNav = styled.nav `

background-color: #7f8537c3;
padding: 2rem 10%;
display: flex;
box-shadow: 0 0 0px 1px rgba(150, 150, 150, 0.8);
width: 100%;
p {
    font-size: 3rem;
    color: white;
    display: flex;
    }

nav {
    float: left;
    display: flex;
    margin-left: 33rem;
    max-width: 100%;
}

.nav-link {
    display: flex;
    margin: 5%;
    max-width: 100%;
}

.nav-link:hover {
    color: yellow;
}

.donate-link {
    margin-left: 25%;
}

.donate-link:hover {
    color: yellow;
}

@media screen and (max-width: 1280px) {
    nav {
        margin-left: 10px;
        flex-direction: column;
        flex-wrap: wrap;
    }
    .donate-link {
        flex-wrap: wrap;
        margin-left: 15%;
    }
}


`