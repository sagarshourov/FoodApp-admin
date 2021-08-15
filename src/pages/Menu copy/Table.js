import styled from "styled-components/macro";

export const Table = styled.table`
  width: 100%;

  color: #212529;
  thead {
    background-color: #e5782b;
    color: #fff;
    tr {
      th {
        text-align: center;
        border-bottom: 2px solid #dee2e6;
        padding: 0.75rem;
      }
    }
  }
  tbody {
    tr {
      transition: background-color 0.2s;
      border-bottom: 2px solid #212529;
      background-color: #fff;
      td {
        text-align: center;
        padding: 0.75rem;
      }

      &:hover {
        cursor: pointer;
        background-color: #edb58a;
        color: #fff;
        border: 2px solid rgba(229, 120, 40, 1);
      }
    }
  }
`;
