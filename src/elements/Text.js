import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { bold, color, size, margin, children } = props;
  const styles = {
    bold: bold,
    color: color,
    size: size,
    margin: margin,
  };

  return <P {...styles}>{children}</P>;
};

Text.defaultProps = {
  children: null,
  bold: false, //굵기
  color: "#222831", //너무 진하지 않은 검정
  fontSize: "1.2em",
  margin: false,
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")}; //볼드
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;

export default Text;
