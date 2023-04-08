import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 576px) {
      ${props}
    }
  `;
};
export const desktop = (props) => {
  return css`
    @media only screen and (max-width: 1300px) {
      ${props}
    }
  `;
};
