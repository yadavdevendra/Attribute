import {Stack,FormLayout,TextField,Select,Card,Button,} from "@shopify/polaris";
import { useState} from "react";

function Selectexample() {
  const [select, setSelect] = useState();
  const [select1, setSelect1] = useState();
  const [select2, setSelect2] = useState();
  const [textselect, setTextselect] = useState();
  const [isshow, setIsshow] = useState(false);
  const [textshow, setTextshow] = useState(false);
  const [change, setchange] = useState(false);

  function handlebutton() {
    setIsshow(true);
  }
  return (
    <Card sectioned>
      <Button textAlign="left" onClick={handlebutton}>
        Get All Amazon Attribute
      </Button>
      <Stack vertical spacing="extraTight">
        <FormLayout>
          <FormLayout.Group condensed>
            {isshow && (
              <Select
                label="Unit of measure"
                placeholder="Select"
                options={["oz", "g", "kg", "lb"]}
                value={select}
                onChange={(e) => {
                  setSelect(e);
                  setchange(true);
                }}
              />
            )}
            {change && (
              <Select
                label="Unit of measure"
                placeholder="Select"
                options={["text", "select"]}
                value={select1}
                onChange={(e) => {
                  setSelect1(e);
                  setTextshow(true);
                }}
              />
            )}
          </FormLayout.Group>
        </FormLayout>
        {select1 === "text" && (
          <TextField
            label="text type"
            type="text"
            value={textselect}
            onChange={(e) => {
              setTextselect(e);
            }}
            autoComplete="off"
          />
        )}
        {select1 === "select" && (
          <Select
            label="Unit of measure"
            placeholder="Select"
            options={["oz", "g", "kg", "lb"]}
            value={select2}
            onChange={(e) => {
              setSelect2(e);
            }}
          />
        )}
      </Stack>
    </Card>
  );
}
export default Selectexample;
