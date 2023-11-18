import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const { type, onChange, padding, margin, width } = props;
  const styles = { padding: padding, margin: margin, width: width };
  return <TextInput type={type} onChange={onChange} {...styles}></TextInput>;
};

const TextInput = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid black;
  font-size: 1.2em;
  width: ${(props) => props.width};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;
export default Input;
