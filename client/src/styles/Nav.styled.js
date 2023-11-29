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
    }

nav {
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

@media screen and (max-width: 1440px) {
    justify-content: space-between;
    nav {
        margin: 0;
    }
    .navDiv {
        align-self: center;
    }
    .donate-link {
        margin: 0;
        align-self: center;
    }
}

@media screen and (max-width: 1280px) {
    nav {
        flex-direction: column;
        flex-wrap: wrap;
        margin: 0;
    }
    
    .donate-link {
        flex-wrap: wrap;
        margin: 0;
    }
}

@media screen and (max-width: 768px) {
    flex-flow: column wrap;
    justify-content: center;
    nav {
        flex-flow: row wrap;
        justify-content: center;
    }
    .donate-link {
        align: center;
    }
}

@media screen and (max-width: 320px) {
    .title {
        font-size: 2.4rem;
    }
}
`