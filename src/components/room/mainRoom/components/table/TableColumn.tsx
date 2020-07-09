import React from 'react';
import styled from 'styled-components';

const TableColumnBlock = styled.tr`
  &:nth-child(2n) {
    background-color: #e0ffff;
  }
`;

const ColumnContent = styled.td`
  text-align: center;
  padding: 0.75rem 0.5rem;
`;

interface TableColumnProps {
  contents: string[];
}

function TableColumn({ contents }: TableColumnProps) {
  return (
    <TableColumnBlock>
      {contents.map((content, index) => (
        <ColumnContent key={`${content}+${index}`}>{content}</ColumnContent>
      ))}
    </TableColumnBlock>
  );
}

export default TableColumn;
