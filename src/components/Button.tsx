import styled, { css } from "styled-components";

export const Button = styled.button<{ $variant?: "primary" | "secondary"; $fontSize?: number }>`
  padding: 0.5em;
  min-width: 5em;
  min-height: 2em;
  border-radius: 4px;
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.6s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  margin: 1em;

  ${(props) =>
    props.$variant === "secondary" &&
    css`
      background-color: #6c757d;
      &:hover {
        background-color: #9ca8b2;
      }
    `}

  ${(props) =>
    props.$variant === "primary" &&
    css`
      background-color: #007bff;
      &:hover {
        background-color: #5caff4;
      }
    `}

  ${(props) =>
    props.$fontSize &&
    css`
      font-size: ${props.$fontSize}em;
    `}
`;

Button.defaultProps = {
  $variant: "primary",
  $fontSize: 1,
};
