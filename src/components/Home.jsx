import React from "react";
import { Select, AppProvider } from "@shopify/polaris";
import { useEffect, useState } from "react";
// import Selectexample from "./Selectexample";
import Amazone from "./Amazone";

function Home() {
  const [user, setuser] = useState([]);
  const [attribute, setAttribute] = useState("");
  const [attribute1, setAttribute1] = useState("");
  const [parentid,setParentid] = useState([])
  const [subtask, setSubtask] = useState();
  const [selectdata,setSelectdata] = useState([])
  const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY1NTg1NzcxLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNDY5YTJiZmE3OGU1MDllZTJiNGJjMiJ9.oHWv1sHWBkDQ9M3F35makQC9qsSvOUYHHWpHnB0f4tWIJH2KkMgqqSQ9bBfwx9y1Cao5zLfbsh02N0SbNW42l-pFrmV2o-RKXsR_tg8ZAkC-k1kkg9OTNJ3ppGPhF-JnmrD6lfvGAZdC8MKIDex7s41JH88VDW9OBFQdDqTvOjja1e1brMQWdKgILOEQqhIInZzHbn9T_1jjYhlrWxSNvQwBYgXHrNFph7baJVvUJLPXRadf4HyCcDfOikzgJ3BWnOiEaBz5G3d-4rnYAW5h9OD4-KqxE9wL0-_Q5Q-sJNPNp0ziolIpZUnXt4s1MeUL4ItHwxLdB6SuepN9q0acXA`;
  // let options = user?.map((item) => {
  //   return { value: item.marketplace, label: item.name };
  // });
  // console.log("selectdata",selectdata);
  console.log("subtask",subtask);
  useEffect(() => {
    const fetchData = async () => {
      let payload = {
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
        selected: parentid,
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
       console.log(data.data);
       if (user.length ===0) setuser(data.data);
       else setSelectdata(data.data)

      //   setSelected(data.data);
    };
    fetchData();
  }, [parentid]);
  // console.log("user", user);
 

  return (
    <>
      <AppProvider>
        <Select
          placeholder="select..."
          label="Get All Attributes:"
          options={user?.map((item) => {
            return { value: item.name, label: item.name };
          })}
          value={attribute}
          onChange={(e) => {
            setAttribute(e);
            const selectindex = user.find((item) => item.name === e);
            //console.log("select", selectindex.parent_id);
            setParentid(selectindex.parent_id);
          }}
        />
        {selectdata.length != 0 && (
          <Select
            placeholder="select..."
            label="Get Subtask:"
            options={selectdata?.map((item) => {
              return { value: item.name, label: item.name };
            })}
            value={attribute1}
            onChange={(e) => {
              setAttribute1(e);
              const selectindex = selectdata.find((item) => item.name == e);
              console.log("select", selectindex,e);
              setParentid(selectindex.parent_id);
              setSubtask(selectindex);
            }}
          />
        )}
        {(subtask && !subtask.hasChildren) && 
        <><Amazone/></>}
      </AppProvider>
    </>
  );
}
export default Home;
