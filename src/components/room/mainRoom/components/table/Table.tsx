import React from 'react';
import styled from 'styled-components';

const TableBlock = styled.table`
  position: relative;
  background-color: white;
  border-radius: 10px;
  -webkit-box-shadow: 10px 10px 103px -20px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 10px 10px 103px -20px rgba(0, 0, 0, 0.24);
  box-shadow: 10px 10px 103px -20px rgba(0, 0, 0, 0.24);
  border-collapse: separate;
  /* border-spacing: 0 0.5rem; */
  border-spacing: 0;
  display: block;
  text-overflow: none;
  white-space: nowrap;
`;

const TableHeader = styled.th`
  border-bottom: 0.5px lightgray solid;
  padding: 0.7rem;
  /* font-weight: bold; */
  letter-spacing: 2px;
  font-size: 0.9rem;
  color: #0198e1;
`;

const TableWrapper = styled.div``;

const TableBody = styled.tbody``;

const TableHead = styled.thead``;

interface TableProps {
  children: React.ReactNode;
  headers: string[];
}

function Table({ children, headers }: TableProps) {
  return (
    <TableWrapper>
      <TableBlock className="fadein">
        <TableHead>
          <tr>
            {headers.map((header) => (
              <TableHeader key={header}>{header}</TableHeader>
            ))}
          </tr>
        </TableHead>
        <TableBody>{children}</TableBody>
      </TableBlock>
    </TableWrapper>
  );
}

export default Table;
