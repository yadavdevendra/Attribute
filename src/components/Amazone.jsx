import { Stack, FormLayout, Select, Card, Button } from "@shopify/polaris";
import { useEffect, useState } from "react";

function Amazone({ id, components, handleComponent, users }) {
  const [select, setSelect] = useState("");
  const [select1, setSelect1] = useState("");
  const [select2, setSelect2] = useState("");

  // console.log("disable arraty", Array.isArray(disableArray), disableArray);
  // console.log("select", select);
  // console.log(components,"compo");
  // console.log("selectusers", users[select]);
  console.log("Amazone user", users);
  useEffect(() => {
    let newcomponent = components.map((item) => {
      if (item.id === id) return { ...item, select, select1, select2 };
      return item;
    });
    handleComponent(newcomponent);
  }, [select, select1, select2]);

  function handleDeleteButton() {
    let newComponentList = components.filter((comp) => comp.id !== id);
    handleComponent(newComponentList);
  }
  const disablevalue = (option) => {
    // console.log(option,"o9845941")
    let opt = { value: option, label: option, disabled: false };
    components.forEach((item) => {
      if (item.select == option) {
        console.log("INSIDE DISABLE VALUE",item.select);
        opt.disabled = true;
        return; 
      }
    });
    return opt
  };
  // console.log(disablevalue("Basic"), "compo");
  return (
    <Card sectioned>
      <Button onClick={handleDeleteButton}>Delete</Button>
      <Stack vertical spacing="extraTight">
        <FormLayout>
          <FormLayout.Group condensed>
            <Select
              label="Amazon Attribute"
              placeholder="Select"
              value={select}
              options={Object.keys(users).map((item, i) => {
                
                return disablevalue(item);
              })}
              onChange={(e) => {
                setSelect(e);
                setSelect1("");
                setSelect2("");
              }}
            />
            {select != "" && (
              <Select
                label="Shopify Attribute"
                placeholder="Select..."
                options={Object.keys(users[select])?.map((item) => {
                  return { value: item, label: item };
                })}
                value={select1}
                onChange={(e) => {
                  setSelect1(e);
                  setSelect2("");
                }}
              />
            )}
          </FormLayout.Group>
        </FormLayout>
        {select1 != "" && (
          <Select
            label="Set Shopify Attribute"
            placeholder="Select"
            options={Object.keys(users[select][select1])?.map((item) => {
              return { value: item, label: item };
            })}
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
export default Amazone;
