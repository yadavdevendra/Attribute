import { Stack, FormLayout, Select, Card, Button } from "@shopify/polaris";
import { useState, useEffect } from "react";

function Amazone({ id, components, handleComponent }) {
  const [users, setUsers] = useState([]);
  const [select, setSelect] = useState("");
  const [select1, setSelect1] = useState("");
  const [select2, setSelect2] = useState("");
  const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY1NzM3ODk5LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNDhlYzZiMmFkNmEzMjhiNjQzZjViNSJ9.dbnMaYopm5t9TItE5Sw-OtPSZpQp7g4HYXj2SzfG9yeQLgJMpCz3zYnC5D0drvUZcNnHSmF2K4QM24NfKJf9gRtUoFpVFsNMIWixMHaYmiVek21ryz6-CNgRJzrtmb3EmlpJAKIsK9H-zYOgIsMfG9nBwjguYaRLAqmmkOPFh7CRg7YInxcYUdfM4hh1sSSpLcr4s1-BMzACAqL1zGyB-Bo39tTQFJ4d4WuQcoXHkX-W1EL-srH09-EU3WAEFdG4-xR0ZSnAiXqIfrniwM0q770GjuUkFDrV5320STPXRZJmQ4rzOrxxDZbJRcHNP4Jrmx2sut8n20Aqw-9qo6YZqA`;
  // const options = user?.map((item) => {
  //   return { value: item.marketplace, label: item.name };
  // });
  console.log("select", select);
  console.log("selectusers", users[select]);
  useEffect(() => {
    const fetchData = async () => {
      let payload = {
        data: {
          barcode_exemption: false,
          browser_node_id: "1380072031",
          category: "major_appliances",
          sub_category: "microwaveoven",
        },
        source: {
          marketplace: "shopify",
          shopId: "500",
        },
        target: {
          marketplace: "amazon",
          shopId: "530",
        },
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
      };
      const response = await fetch(
        `https://multi-account.sellernext.com/home/public/connector/profile/getCategoryAttributes/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            appTag: "amazon_sales_channel",
            Authorization: `Bearer ${token}`,
            "Ced-Source-Id": 500,
            "Ced-Source-Name": "shopify",
            "Ced-Target-Id": 530,
            "Ced-Target-Name": "amazon",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      console.log("Amazone", data);
      setUsers(data.data);
    };
    fetchData();
  }, []);
  console.log("Amazone user", users);

  function handleDeleteButton() {
    let newComponentList = components.filter((comp) => comp.id !== id);
    handleComponent(newComponentList);
  }
  console.log(components, "compo");
  return (
    <Card sectioned>
      <Button  onClick={handleDeleteButton}>Delete</Button>
      <Stack vertical spacing="extraTight">
        <FormLayout>
          <FormLayout.Group condensed>
                <Select
                  label="Amazon Attribute"
                  placeholder="Select"
                  options={Object.keys(users)?.map((item) => {
                    return { value: item, label: item };
                  })}
                  // disabled={disablevalue(select) ? true : false}
                  value={select}
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
