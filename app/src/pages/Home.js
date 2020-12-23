import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";

function Home() {
  const [name, setName] = useState("");

  const { isLoading, error, data } = useQuery("products", () =>
    axios.get("/api/products").then((res) => {
      const { data } = res;
      return data;
    })
  );

  const mutation = useMutation((newProduct) =>
    axios.post("/api/products", newProduct)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          mutation.mutate({ key: new Date(), name: name });
        }}
      >
        Create product
      </button>
      <ul>
        {data.map((item) => (
          <li key={item.key}>
            <h1>{item.key}</h1>
            <p>
              <strong>👀 {item.name}</strong>{" "}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
