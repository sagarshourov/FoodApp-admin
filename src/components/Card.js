import styled from "styled-components/macro";

export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin-top: ${(props) => props.mt || "0"};
 
  &.card-header {
    padding: 0.75rem 1.25rem;
  }
  h1 {
    text-align: center;
  }
  .card-body {
    flex: 1 1 auto;
    min-height: 1px;
 
    .steps-form {
      display: table;
      width: 100%;
      position: relative;
      .steps-row {
        display: table-row;

        &::before {
          top: 14px;
          bottom: 0;
          position: absolute;
          content: " ";
          width: 100%;
          height: 1px;
          background-color: #ccc;
        }
        .steps-step {
          display: table-cell;
          text-align: center;
          position: relative;
        }
      }
    }
  }
  .card-footer {
    padding: 0.75rem 1.25rem;
    background-color: rgba(0, 0, 0, 0.03);
    border-top: 1px solid rgba(0, 0, 0, 0.125);
  }
`;
