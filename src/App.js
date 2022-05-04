import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [msg, setMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  fetch();
  useEffect(() => {
    async function axiosFetch() {
      setIsLoading(true);
      try {
        const { data } = await axios.get("http://localhost:8000/hello", {
          proxy: true,
        });
        setMsg(data.hello);
      } catch (error) {
        setMsg("error");
      } finally {
        setIsLoading(false);
      }
    }
    axiosFetch();
  }, []);
  return <h1>{isLoading ? "Loading..." : msg}</h1>;
}

export default App;
