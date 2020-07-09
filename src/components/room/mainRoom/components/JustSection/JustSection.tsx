import React from 'react';
import styled from 'styled-components';

const JustSectionBlock = styled.div`
  background-color: white;
  border-radius: 10px;
  -webkit-box-shadow: 10px 10px 103px -20px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 10px 10px 103px -20px rgba(0, 0, 0, 0.24);
  box-shadow: 10px 10px 103px -20px rgba(0, 0, 0, 0.24);
  border-collapse: separate;
  /* border-spacing: 0 0.5rem; */
  border-spacing: 0;
`;

const JustSectionHeader = styled.div`
  border-bottom: 0.5px lightgray solid;
  padding: 0.7rem;
  letter-spacing: 2px;
  font-size: 0.9rem;
  color: #0198e1;
  font-weight: bold;
`;
const JustSectionContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface JustSection {
  title: string;
  children: React.ReactNode;
}

function JustSection(prop: JustSection) {
  return (
    <JustSectionBlock className="fadein">
      <JustSectionHeader>{prop.title}</JustSectionHeader>
      <JustSectionContent {...prop}>{prop.children}</JustSectionContent>
    </JustSectionBlock>
  );
}

export default JustSection;
