import { useState } from "react";

export default function Check() {
  const [inputValue, setInputValue] = useState("");
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit() {
    if (!inputValue.trim()) return;

    try {
      const response = await fetch(
        `https://api.github.com/users/${inputValue}`
      );

      if (!response.ok) {
        setError("User not found");
        setPayload(null);
        return;
      }

      const data = await response.json();
      setPayload(data);
      setError(null);
    } catch (e) {
      console.error("Fetch failed", e);
      setError("Something went wrong");
      setPayload(null);
    }
  }

  return (
    <div className="container">
      <div className="section1">
        <h1>GitHub User Finder</h1>
        <p>Search for any GitHub user to see their profile and repositories</p>

        <div className="inputField">
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            placeholder="Enter GitHub username..."
          />
          <button onClick={handleSubmit}>Search</button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {payload && (
        <div className="section2">
          <div className="profile">
            <img
              src={payload.avatar_url}
              alt="Profile"
              style={{ height: 50, width: 50, borderRadius: 25 }}
            />

            <div className="details">
              <p>{payload.name}</p>
              <p>{payload.login}</p>
              <p>{payload.bio}</p>
              <button onClick={() => window.open(payload.html_url, "_blank")}>
                View profile
              </button>
            </div>
          </div>

          <div className="statiscal">
            <p>Location: {payload.location || "N/A"}</p>
            <p>Repositories: {payload.public_repos}</p>
            <p>Joined: {new Date(payload.created_at).toDateString()}</p>
          </div>

          <div>
            <p>Followers: {payload.followers}</p>
            <p>Following: {payload.following}</p>
          </div>
        </div>
      )}
    </div>
  );
}
