import React from "react";
import { Select, AppProvider } from "@shopify/polaris";
import { useEffect, useState } from "react";
import Selectexample from "./Selectexample";

function Home() {
  const [user, setuser] = useState([]);
  const [selected, setSelected] = useState([]);
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
        `https://multi-account.sellernext.com/home/public/connector/profile/getAllCategory/`,
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
  function handleSelectChange() {}
  return (
    <>
      <AppProvider>
        <Select
          label="Get All Attributes:"
          options={options}
          onChange={handleSelectChange}
          value=""
        />
        <Select
          label="Get All Subtask:"
          options={options}
          onChange={handleSelectChange}
          value=""
        />
        <Selectexample />
      </AppProvider>
    </>
  );
}
export default Home;
