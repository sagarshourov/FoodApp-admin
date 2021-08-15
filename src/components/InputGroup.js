import styled from "styled-components/macro";

export const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;

  .form-control:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .custome-select {
    background: url("/assets/img/arrow.jpg") no-repeat right 0 center/35px 100%;
    background-color: rgba(0, 0, 0, 0);
    background-clip: border-box;
    appearance: none;
  }
`;
export const Prepend = styled.div`
  margin-right: -1px;
`;
