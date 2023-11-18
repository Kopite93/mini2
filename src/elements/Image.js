import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { src, width, height, bor_radius, border, onClick, margin } = props;
  const styles = {
    width: width,
    height: height,
    bor_radius: bor_radius,
    border: border,
    margin: margin,
  };
  return <Img src={src} {...styles} onClick={onClick}></Img>;
};

Image.defualtProps = {
  onClick: () => {},
};

const Img = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  ${(props) => (props.bor_radius ? `border-radius: 10px;` : "")}
  border:${(props) => props.border};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;

export default Image;
