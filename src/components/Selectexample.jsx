import {
  Stack,
  FormLayout,
  TextField,
  Select,
  InlineError,
  Card,
  TextStyle,
  Link,
  Button,
} from "@shopify/polaris";
import { useState, useCallback } from "react";

function Selectexample() {
  const [isshow, setIsshow] = useState(false);
  const [select, setSelect] = useState();
  const [textshow, setTextshow] = useState(false);
  const [change, setchange] = useState(false);

  function handlebutton() {
    setIsshow(true);
  }
  function handleselect(e) {
    setSelect(e)
    setchange(true);
  }
 
  function handletext(value) {
setSelect(value)
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
                options={["oz", "g", "kg", "lb"]}
                value="oz"
                onChange={(e) => {
                  setSelect(e);
                  setTextshow(true);
                }}
              />
            )}
          </FormLayout.Group>
        </FormLayout>
        {textshow && (
          <TextField
            label="text type"
            type="text"
            value={select}
            onChange={handletext}
            autoComplete="off"
          />
        )}
      </Stack>
    </Card>
  );
}
export default Selectexample;
