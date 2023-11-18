import React from "react";
import Grid from "../elements/Grid";
import Image from "../elements/Image";
import Input from "../elements/Input";

const AddImage = () => {
  return (
    <Grid>
      <Grid>
        <Input type={"file"}></Input>
      </Grid>
      <Image
        src={
          "https://newsimg.hankookilbo.com/cms/articlerelease/2021/05/17/b41ab909-e0e2-40e8-a36a-4bae809a9024.jpg"
        }
      ></Image>
    </Grid>
  );
};

export default AddImage;
