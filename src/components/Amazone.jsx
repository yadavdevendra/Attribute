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
  const [users, setUsers] = useState([]);
  const [select, setSelect] = useState("");
  const [select1, setSelect1] = useState("");
  const [select2, setSelect2] = useState("");
  const [isshow, setIsshow] = useState(false);
  const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY1Njc3MTM0LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNDdmZjBlNWY3MWUxMmE3NjE2M2E3MiJ9.RzQ3x98rGo-1q1dMkJIK2XJlz8LIEtDfazugK8q1e7O-cWQJWD5l0CTKGFIIGI58lGqEVI2a88szbHTKuilYglAqF_Z5QU0BWP8sHpj_Qn3oKVTHozpfH9ogSTfd8o2gmbyFb9Hz8ox-fCeltDsFmCKn48FfZy_Qlxq8OYgxm4FglpIbphDqDc8rfEktNuRBdscSfTQM0ke3o2YElrbyE4fHolFyBUxhd-ioEurSkG7d2NN9JfOEOwjxtcB1OJmUJx8uqW8kRUnNzMh1JpzBOWSjs9fRZLnuSZZMgkvH_BNaoXz3OvKkg_tnum9FC4Qkg5weZYCCpmqA0ArpP1qSWw`;
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

  function handlebutton() {
    setIsshow(true);
  }
  // const options = user?.map((item) => {
  //   return { value: item.marketplace, label: item.name };
  // });
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
            )}
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
