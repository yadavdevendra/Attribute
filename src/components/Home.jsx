import React from "react";
import { Select, AppProvider } from "@shopify/polaris";
import { useEffect, useState } from "react";
// import Selectexample from "./Selectexample";
import Amazone from "./Amazone";

function Home() {
  const [user, setuser] = useState([]);
  // value set
  const [attribute, setAttribute] = useState("");
  const [attribute1, setAttribute1] = useState("");
  const [attribute2, setAttribute2] = useState("");
  const [attribute3, setAttribute3] = useState("");
  const [attribute4, setAttribute4] = useState("");
  const [attribute5, setAttribute5] = useState("");
  const [attribute6, setAttribute6] = useState("");
  const [attribute7, setAttribute7] = useState("");
  const [parentid, setParentid] = useState([]);
  const [subtask, setSubtask] = useState();
  // for selected data then open another grop down
  const [selectdata, setSelectdata] = useState([]);
  const [selectdata1, setSelectdata1] = useState([]);
  const [selectdata2, setSelectdata2] = useState([]);
  const [selectdata3, setSelectdata3] = useState([]);
  const [selectdata4, setSelectdata4] = useState([]);
  const [selectdata5, setSelectdata5] = useState([]);
  const [selectdata6, setSelectdata6] = useState([]);
  const [selectdata7, setSelectdata7] = useState([]);
  const [selectdata8, setSelectdata8] = useState([]);
  const [selectdata9, setSelectdata9] = useState([]);
  const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY1Njc3MTM0LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNDdmZjBlNWY3MWUxMmE3NjE2M2E3MiJ9.RzQ3x98rGo-1q1dMkJIK2XJlz8LIEtDfazugK8q1e7O-cWQJWD5l0CTKGFIIGI58lGqEVI2a88szbHTKuilYglAqF_Z5QU0BWP8sHpj_Qn3oKVTHozpfH9ogSTfd8o2gmbyFb9Hz8ox-fCeltDsFmCKn48FfZy_Qlxq8OYgxm4FglpIbphDqDc8rfEktNuRBdscSfTQM0ke3o2YElrbyE4fHolFyBUxhd-ioEurSkG7d2NN9JfOEOwjxtcB1OJmUJx8uqW8kRUnNzMh1JpzBOWSjs9fRZLnuSZZMgkvH_BNaoXz3OvKkg_tnum9FC4Qkg5weZYCCpmqA0ArpP1qSWw`;
  // let options = user?.map((item) => {
  //   return { value: item.marketplace, label: item.name };
  // });
  // console.log("selectdata",selectdata);
  // console.log("subtask", subtask);
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
      // const data = JSON.parse(JSON.stringify(d))
      console.log(data);
      // console.log(data.data);
      if (user.length === 0) setuser(data.data);
      else if (selectdata.length === 0) setSelectdata(data.data);
      else if (selectdata1.length === 0) setSelectdata1(data.data);
      else if (selectdata2.length === 0) setSelectdata2(data.data);
      else if (selectdata3.length === 0) setSelectdata3(data.data);
      else if (selectdata4.length === 0) setSelectdata4(data.data);
      else if (selectdata5.length === 0) setSelectdata5(data.data);
      else if (selectdata6.length === 0) setSelectdata6(data.data);
      else if (selectdata7.length === 0) setSelectdata7(data.data);
      else if (selectdata8.length === 0) setSelectdata8(data.data);
      else setSelectdata9(data.data);
    };
    fetchData();
  }, [parentid]);

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
            setSelectdata([]);
            setSelectdata1([]);
            setSelectdata2([]);
            setSelectdata3([]);
            setSelectdata4([]);
            setSelectdata5([]);
            setSelectdata6([]);
            setSelectdata7([]);
            setSelectdata8([]);
            setSubtask();
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
              setSelectdata1([]);
              setSelectdata2([]);
              setSelectdata3([]);
              setSelectdata4([]);
              setSelectdata5([]);
              setSelectdata6([]);
              setSelectdata7([]);
              setSelectdata8([]);
              setSubtask();
              setAttribute1(e);
              const selectindex = selectdata.find((item) => item.name == e);
              // console.log("select", selectindex, e);
              setParentid(selectindex.parent_id);
              setSubtask(selectindex);
            }}
          />
        )}
        {selectdata1.length != 0 && (
          <Select
            placeholder="select..."
            label="Get Subtask:"
            options={selectdata1?.map((item) => {
              return { value: item.name, label: item.name };
            })}
            value={attribute2}
            onChange={(e) => {
              setSelectdata2([]);
              setSelectdata3([]);
              setSelectdata4([]);
              setSelectdata5([]);
              setSelectdata6([]);
              setSelectdata7([]);
              setSelectdata8([]);
              setSubtask();
              setAttribute2(e);
              const selectindex = selectdata1.find((item) => item.name == e);
              // console.log("select", selectindex, e);
              setParentid(selectindex.parent_id);
              setSubtask(selectindex);
            }}
          />
        )}
        {selectdata2.length != 0 && (
          <Select
            placeholder="select..."
            label="Get Subtask:"
            options={selectdata2?.map((item) => {
              return { value: item.name, label: item.name };
            })}
            value={attribute3}
            onChange={(e) => {
              setSelectdata3([]);
              setSelectdata4([]);
              setSelectdata5([]);
              setSelectdata6([]);
              setSelectdata7([]);
              setSelectdata8([]);
              setSubtask();
              setAttribute3(e);
              const selectindex = selectdata2.find((item) => item.name == e);
              // console.log("select", selectindex, e);
              setParentid(selectindex.parent_id);
              setSubtask(selectindex);
            }}
          />
        )}
        {selectdata3.length != 0 && (
          <Select
            placeholder="select..."
            label="Get Subtask:"
            options={selectdata3?.map((item) => {
              return { value: item.name, label: item.name };
            })}
            value={attribute4}
            onChange={(e) => {
              setSelectdata4([]);
              setSelectdata5([]);
              setSelectdata6([]);
              setSelectdata7([]);
              setSelectdata8([]);
              setSubtask();
              setAttribute4(e);
              const selectindex = selectdata3.find((item) => item.name == e);
              // console.log("select", selectindex, e);
              setParentid(selectindex.parent_id);
              setSubtask(selectindex);
            }}
          />
        )}
        {selectdata4.length != 0 && (
          <Select
            placeholder="select..."
            label="Get Subtask:"
            options={selectdata4?.map((item) => {
              return { value: item.name, label: item.name };
            })}
            value={attribute5}
            onChange={(e) => {
              setSelectdata5([]);
              setSelectdata6([]);
              setSelectdata7([]);
              setSelectdata8([]);
              setSubtask();
              setAttribute5(e);
              const selectindex = selectdata4.find((item) => item.name == e);
              // console.log("select", selectindex, e);
              setParentid(selectindex.parent_id);
              setSubtask(selectindex);
            }}
          />
        )}
        {selectdata5.length != 0 && (
          <Select
            placeholder="select..."
            label="Get Subtask:"
            options={selectdata5?.map((item) => {
              return { value: item.name, label: item.name };
            })}
            value={attribute6}
            onChange={(e) => {
              setSelectdata6([]);
              setSelectdata7([]);
              setSelectdata8([]);
              setSubtask();
              setAttribute6(e);
              const selectindex = selectdata5.find((item) => item.name == e);
              // console.log("select", selectindex, e);
              setParentid(selectindex.parent_id);
              setSubtask(selectindex);
            }}
          />
        )}
        {selectdata6.length != 0 && (
          <Select
            placeholder="select..."
            label="Get Subtask:"
            options={selectdata6?.map((item) => {
              return { value: item.name, label: item.name };
            })}
            value={attribute7}
            onChange={(e) => {
              setSelectdata7([]);
              setSelectdata8([]);
              setSubtask();
              setAttribute7(e);
              const selectindex = selectdata6.find((item) => item.name == e);
              // console.log("select", selectindex, e);
              setParentid(selectindex.parent_id);
              setSubtask(selectindex);
            }}
          />
        )}
        {subtask && !subtask.hasChildren && (
          <>
            <Amazone />
          </>
        )}
      </AppProvider>
    </>
  );
}
export default Home;
