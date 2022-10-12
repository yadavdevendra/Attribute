import {
  Stack,
  FormLayout,
  TextField,
  Select,
  Card,
  Button,
} from "@shopify/polaris";
import { useState,useEffect } from "react";

function Selectexample() {
  const [user, setuser] = useState([]);
  const [select, setSelect] = useState();
  const [select1, setSelect1] = useState();
  const [select2, setSelect2] = useState();
  const [textselect, setTextselect] = useState();
  const [isshow, setIsshow] = useState(false);
  const [textshow, setTextshow] = useState(false);
  const [change, setchange] = useState(false);

  const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY1NDk2NTIzLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNDUzZDhiMjVjMmY4MGUyZjc2NmMzMiJ9.Fmb-Ih64Hnwky6EpBijF0B4idNZ_SEgAOx9VOTrDgGxrRS5IhzwyZgsyrNJQIhuCUGg2eVt242SUd_rDOX_gruxgNqrFMBc0c_5wT3DAaI6yBO-yB7Jq6FNIwAijZd74Seojyn7gEFxfVYvWyCRO1ZrXouQEfRl41HgZqoAOey7RI0fZPNWewK1W15oA1edCsq62yeawdFPBv1J3Gjoad5v1lrfR0jvoYRec22aUAK6yqkHfH4fe1KDqBM0I2Gd3p9lEmXK2SYkNowPF_KCELt1odskd-o6wfaw5xGTQ_MxDvvKFYMQXrQr8jeACIMOoW1YJRWY-xQkeYCTN0PvJ0A`;
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
      console.log(data);
      setuser(data.data);
      //   setSelected(data.data);
    };
    fetchData();
  }, []);
  console.log("user", user);

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
