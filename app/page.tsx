"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://erfodimo-motivation-quotes-backend.onrender.com/api/quotes"
        );
        console.log("response", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data", data);

        setData(data?.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h1>Hello, Max</h1>
      <ul>
        {data?.map((el) => {
          return (
            <li key={el?.id}>
              <p>{el?.text}</p>
              <div>{el?.author}</div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
