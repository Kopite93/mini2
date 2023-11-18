import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    width,
    margin,
    padding,
    bg,
    border,
    bor_radius,
    shadow,
    height,
    line_height,
    color,
    children,
  } = props;

  const styles = {
    border: border,
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    bor_radius: bor_radius,
    shadow: shadow,
    height: height,
    line_height: line_height,
    color: color,
  };

  return (
    <>
      <GridBox {...styles}>{children}</GridBox>
    </>
  );
};

Grid.defualtProps = {
  children: null,
  border: false,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  bor_radius: false,
  shadow: false,
  height: "100%",
  line_height: false,
  color: false,
};

const GridBox = styled.div`
  border: ${(props) => (props.border ? `${props.border};` : "none;")}
  ${(props) => (props.bor_radius ? `border-radius: 10px;` : "")}
  ${(props) => (props.shadow ? `box-shadow: 5px 5px 5px gray;` : "")}
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  ${(props) => (props.line_height ? `line-height: ${props.line_height};` : "")}
  ${(props) => (props.color ? `color: ${props.color};` : "black")}
  box-sizing: border-box;
  word-break:break-all;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
${(props) =>
  props.is_flex
    ? `display:flex; align-items:center; justify-content: space-between`
    : ""}
`;

export default Grid;
