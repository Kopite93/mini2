import React from "react";
import styled from "styled-components";
import Grid from "./Grid";
const PostInput = (props) => {
  const styles = {
    height: props.height,
    width: props.width,
    margin: props.margin,
  };
  return (
    <Grid padding="0 30px" margin={props.margin}>
      <p>{props.children}</p>
      <TextInput
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        {...styles}
      />
    </Grid>
  );
};

PostInput.defaultProps = {
  height: false,
  width: false,
  margin: false,
};

const TextInput = styled.textarea`
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  font-size: 1.1em;
  padding: 10px;
  border-radius: 10px;
  outline: none;
  width: ${(props) => props.width};
  resize: none;
  ${(props) => (props.height ? `height: ${props.height};` : "")}
`;

export default PostInput;
