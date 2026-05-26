import { useEffect, useState } from "react";
import { getIllnesses } from "./api";

function App() {
  const [illnesses, setIllnesses] = useState([]);

  useEffect(() => {
    getIllnesses().then(setIllnesses);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Naturopathic UI</h1>
      <h2>Illnesses</h2>
      <ul>
        {illnesses.map((i) => (
          <li key={i.id}>{i.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
