import {
  Stack,
  FormLayout,
  TextField,
  Select,
  Card,
  Button,
} from "@shopify/polaris";
import { useState, useEffect } from "react";

function Amazone() {
  const [user, setuser] = useState([]);
  const [select, setSelect] = useState();
  const [select1, setSelect1] = useState();
  const [select2, setSelect2] = useState();
  const [textselect, setTextselect] = useState();
  const [isshow, setIsshow] = useState(false);
  const [textshow, setTextshow] = useState(false);
  const [change, setchange] = useState(false);

  const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY1NTcwOTEzLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNDY2MDIxOTAwYzg0NjZiZjQ1ZDg1NSJ9.HUo6iQc7uK29Vq4sfAdWC8ybUhdwBQbiFDioWw6Vi3rMZNKRCrbVBjTOoVEAw8kvJhnin76Vh9N66Ze05FkSnePOI9aifMXVNhBOXU4Qv5GqFrgmGQJSSW6pePTsQuC-RSsDuyqlICrrvrQQYaeBWXhuee9vMBUgv91w2I3ufQBF3hYv5zGSnI1gcnHXd0pkPm2AA9Pk_bdzdbZ2e0Vl_sNaHSQS7rYe98rzQboylovkbOMg08Uz7IEMHo1GdLIZYYFmRJ1PDE4csA62WbA6IeYtxvvRr8LW-_BnR6Tme1kqjyfIf3aSOY7k1HjjixlID1kWqYvTe1LU9x0jQL0INw`;
  let options = user?.map((item) => {
    return { value: item.marketplace, label: item.name };
  });
  useEffect(() => {
    const fetchData = async () => {
      let payload = {
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
        selected: [],
        target: {
          marketplace: "amazon",
          shopId: "530",
        },
      };
      const response = await fetch(
        `https://multi-account.sellernext.com/home/public/connector/profile/getCategoryAttributes/?selected=[]`,
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
      setuser(data.data);
    }
    fetchData();
  }, []);
  console.log("Amazone user", user);

  function handlebutton() {
    setIsshow(true);
  }
  return (
    <Card sectioned>
      <Button textAlign="left" onClick={handlebutton}>
        Amazon Attribute
      </Button>
      <Stack vertical spacing="extraTight">
        <FormLayout>
          <FormLayout.Group condensed>
            {isshow && (
              <Select
                label="Amazon Attribute"
                placeholder="Select"
                options={["oz", "g", "kg", "lb"]}
                // disabled={disablevalue(select) ? true : false}
                value={select}
                onChange={(e) => {
                  setSelect(e);
                  setchange(true);
                }}
              />
            )}
            {change && (
              <Select
                label="Shopify Attribute"
                placeholder="Select..."
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
            label="Set Shopify Attribute"
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
            label="Set Shopify Attribute"
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
export default Amazone;
