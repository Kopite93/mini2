import React from "react";
import ContentsInput from "../elements/ContentsInput";
import Input from "../elements/Input";
import Grid from "../elements/Grid";

const AddContents = () => {
    return (
        <Grid>
            제목: <Input></Input>
            <Grid width={"650px"} is_flex margin={"0 auto"}>
                <p>내용 :</p> <ContentsInput></ContentsInput>
            </Grid>
        </Grid>
    );
};

export default AddContents;
