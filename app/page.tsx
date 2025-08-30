"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);
  const [selectedSource, setSelectedSource] = useState("be"); // "be" or "lambda"
  const [loading, setLoading] = useState(false);

  const fetchData = async (source: string) => {
    setLoading(true);
    try {
      let url: string;
      
      if (source === "lambda") {
        url = "/api/lambda";
      } else {
        url = "https://erfodimo-motivation-quotes-backend.onrender.com/api/quotes";
      }

      const response = await fetch(url);
      console.log("response", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("data", responseData);

      // Handle different response formats
      if (source === "lambda") {
        // Lambda returns single quote object
        setData([responseData]);
      } else {
        // BE returns array with data property
        setData(responseData?.data || []);
      }
    } catch (e) {
      console.error(e);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedSource);
  }, [selectedSource]);

  const handleSourceChange = (event: any) => {
    setSelectedSource(event.target.value);
  };

  return (
    <>
      <h1>Hello, Max</h1>
      
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="source-select" style={{ marginRight: "10px" }}>
          Choose data source:
        </label>
        <select
          id="source-select"
          value={selectedSource}
          onChange={handleSourceChange}
          style={{
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "14px"
          }}
        >
          <option value="be">Backend (BE)</option>
          <option value="lambda">AWS Lambda Function</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}

      <ul>
        {data?.map((el, index) => {
          return (
            <li key={el?.id || index}>
              <p>{el?.text}</p>
              <div>{el?.author}</div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
