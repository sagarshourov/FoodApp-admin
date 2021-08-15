import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";

import { Row, Col } from "styled-bootstrap-grid";

const Accordion = (props) => {
  let data = props.data;
  const productrender = () => {
    let html = [];

    if (data && Object.keys(data.get_products).length > 0) {
      Object.keys(data.get_products).forEach(function (key) {
        html.push(
          <Table key={key}>
            <tbody>
              <tr>
                <td>
                  <input type="Checkbox" name="check" />
                </td>
                <td>{data.get_products[key].name}</td>
                <td>{data.get_products[key].price}</td>
              </tr>
            </tbody>
          </Table>
        );
      });
    }
    return html;
  };
  return (
    <According>
      <h5>{data.name && data.name}</h5>

      {productrender()}
    </According>
  );
};
export const According = styled.div`
    h5 {
        margin-bottom: 10px;
    }
  padding: 10px 10px;
`;
export const Table = styled.table`
  width: 100%;

  color: #212529;
  border: 1px solid #eee;

  tbody {
    tr {
      transition: background-color 0.2s;
      border-bottom: 1px solid #eee;
      background-color: #fff;
      td {
        text-align: left;
        padding: 0.75rem;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export default Accordion;
