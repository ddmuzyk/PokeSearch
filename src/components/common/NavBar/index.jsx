import './style.css';
import styled from 'styled-components';

const S = {
  NavBar: styled.nav`
    height: 100px;
    width: 100vw;
    background: rgb(204, 169, 103);
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    z-index: 1000;
    @media screen and (max-width: 700px) {
      .nav-bar {
        height: 70px;
      }
    }
  `,
}

export const NavBar = ({ children, className }) => {
  return (
    <S.NavBar className={className}>
      {children}
    </S.NavBar>
  )
}