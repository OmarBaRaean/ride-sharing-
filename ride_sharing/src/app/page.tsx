"use client";

import { useState, useEffect, FormEvent } from "react";

interface DataItem {
  name: string;
}

interface FormData {
  name?: string;
}

export default function Home() {
  const [data, setData] = useState<DataItem[]>([]);
  const [searchData, setSearchdata] = useState<DataItem[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const [formData2, setFormData2] = useState<string>();

  useEffect(() => {
    fetch("http://127.0.0.1:8080/name")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [formData]);

  const handelSearch = async (e: FormEvent) => {
    e.preventDefault();
    fetch(
      `http://127.0.0.1:8080/name/person?name=${formData2 ? formData2 : ""}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log("handelSearch was called");

        setSearchdata(data);
      });
  };

  const handleSubmit = async (e: FormEvent) => {
    console.log("handleSubmit was called");
    e.preventDefault();
    await fetch("http://127.0.0.1:8080/name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        console.log(formData);
      })
      .finally(() => {
        if (formData2) {
          handelSearch(e);
        }
        setFormData({});
      });
  };

  return (
    <div>
      <h1>Data from MongoDB</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.name || ""}
          onChange={(e) => setFormData({ name: e.target.value })}
          placeholder="Enter name"
        />
        <button type="submit">Add Data</button>
      </form>

      <div className="mt-20">
        <form onSubmit={handelSearch}>
          <input
            type="text"
            value={formData2 || ""}
            onChange={(e) => setFormData2(e.target.value)}
            placeholder="Enter name"
          />
          <button type="submit">search</button>
        </form>

        <ul>
          {searchData.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
