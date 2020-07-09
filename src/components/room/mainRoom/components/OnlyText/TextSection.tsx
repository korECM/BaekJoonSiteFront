import React from 'react';
import styled from 'styled-components';

const TextSectionBlock = styled.div`
  background-color: white;
  border-radius: 10px;
  -webkit-box-shadow: 10px 10px 103px -20px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 10px 10px 103px -20px rgba(0, 0, 0, 0.24);
  box-shadow: 10px 10px 103px -20px rgba(0, 0, 0, 0.24);
  border-collapse: separate;
  /* border-spacing: 0 0.5rem; */
  border-spacing: 0;
`;

const TextSectionHeader = styled.div`
  border-bottom: 0.5px lightgray solid;
  padding: 0.7rem;
  /* font-weight: bold; */
  letter-spacing: 2px;
  font-size: 0.9rem;
  color: #0198e1;
  font-weight: bold;
`;
const TextSectionContent = styled.div`
  text-align: ${(prop: TextSection) => prop.textalign};
  color: ${(prop: TextSection) => prop.color};
  font-size: ${(prop: TextSection) => prop.fontsize};
  padding: 2rem;
`;

interface TextSection {
  text: string;
  title: string;
  color: string;
  fontsize: string;
  textalign: string;
}

function TextSection(prop: TextSection) {
  return (
    <TextSectionBlock className="fadein">
      <TextSectionHeader>{prop.title}</TextSectionHeader>
      <TextSectionContent {...prop}>{prop.text}</TextSectionContent>
    </TextSectionBlock>
  );
}

export default TextSection;
