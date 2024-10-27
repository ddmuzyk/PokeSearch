import styled from "styled-components"

const S = {
  NavButton: styled.div`
    color: black;
    font-size: 32px;
    font-family: Montserrat, sans-serif;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  `,
};

export const NavButton = ({ onClick, text, className }) => {
  return (
    <S.NavButton onClick={onClick} className={className}>{text}</S.NavButton>
  )
}