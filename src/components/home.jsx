import { useEffect, useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [payload, setPayload] = useState('');

  async function dataFetch() {
    if (!inputValue) return
    try {
      const response = await fetch(
        "https://api.github.com/users/${inputValue}"
      );
      const data = await response.json();
      console.log("User Data", data);
      setPayload(data);
    } catch (e) {
      console.log("Fetching data", e);
    }
  }


  
  return (
    <div className="container">
      <div className="section1">
        <h1>Github User Finder</h1>
        <p>Search for any Gitbub user to see their profile and respositories</p>
        <div className="inputField">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            placeholder="Enter your search here..."
          />
          <button onClick={dataFetch}>Search</button>
        </div>
      </div>

      <div className="section2 ">
        <div className="profile">
          {payload && (
            <img
              src={payload.avatar_url}
              alt="Logo"
              style={{ height: 50, width: 50, borderRadius: 25 }}
            />
          )}

          <div className="details">
            
            {payload && <p>{payload.name}</p>}
            {payload && <p>{payload.login}</p>}
            {payload && <p>{payload.bio}</p>}
            
            <button>View profile</button>
          </div>
        </div>

        <div className="statiscal">
          <div>
            <p>location</p>
            <p>joined-date</p>
            <p>respositories</p>
          </div>
        </div>

        <div>
          <p>following</p>
          <p>followers</p>
          <p>public-repo</p>
        </div>
      </div>
    </div>
  );
}
