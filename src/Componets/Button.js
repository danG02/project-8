import styled from "styled-components";


//This styled componet can be user in any project we just need to delete const ButtonContainer to default
export const ButtonContainer = styled.button `
    text-transform: capitalize;
    font-size: 1.4rem;
    background: transparent;
    border: 0.05rem solid var(--mainWhite);
    border-color: ${props => props.cart ? "var(--mainYellow)" : "var(--mainWhite)"};
    color: ${prop => prop.cart ? "var(--mainYellow)" : "var(--mainWhite)"};
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    margin: 0.2rem 0.5rem 0.2rem 0;
    transition: all 0.5s ease-in-out;
&:hover {
    background: ${prop => prop.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
    color: var(--mainWhite);
    border-color: ${prop => prop.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
} 
&:focus {
    outline: none;
}

`;