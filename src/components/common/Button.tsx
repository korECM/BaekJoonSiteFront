import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const buttonStyle = css`
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  max-height: 49.5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  color: ${(prop: ButtonProp) => prop.textcolor};
  background-color: ${(prop: ButtonProp) => prop.color};
  &:hover {
    background-color: ${(prop: ButtonProp) => prop.hovercolor};
  }

  ${(prop: ButtonProp) =>
    prop.fullwidth &&
    css`
      width: 100%;
      padding: 0.8rem 1rem;
      font-size: 1.25rem;
    `}

  ${(prop: ButtonProp) =>
    prop.disabled &&
    css`
      background-color: lightgray;
      cursor: default;
      &:hover {
        background-color: lightgray;
      }
    `}
`;

interface ButtonProp {
  fullwidth?: boolean;
  textcolor: string;
  color: string;
  hovercolor: string;
  children?: React.ReactNode;
  disabled?: boolean;
  to?: string;
  onClick?: () => void;
}

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

function Button(prop: ButtonProp) {
  return prop.to ? <StyledLink to={prop.to!} {...prop}></StyledLink> : <StyledButton {...prop}></StyledButton>;
}

export default Button;
