import React from 'react';
import styled from 'styled-components';

const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 100px;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  width: 360px;
  transform: translateY(-100px);
  padding: 2rem;
  background-color: white;
  border-radius: 2px;
  -webkit-box-shadow: 10px 10px 103px -20px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 10px 10px 103px -20px rgba(0, 0, 0, 0.24);
  box-shadow: 10px 10px 103px -20px rgba(0, 0, 0, 0.24);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  padding-bottom: 1.5rem;
  text-align: center;
  color: #0198e1;
  font-weight: bolder;
  font-size: 2rem;
  letter-spacing: 2px;
`;

interface AuthTemplateProps {
  children: React.ReactNode;
}

function AuthTemplate({ children }: AuthTemplateProps) {
  return (
    <AuthTemplateBlock className="fadein">
      <WhiteBox>
        <Header>Logo</Header>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  );
}

export default AuthTemplate;
