import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

function Home() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");

  const { status, data, error, isFetching } = useQuery("products", async () => {
    const res = await axios.get("/api/products");
    return res.data;
  });

  const addMutation = useMutation(
    (item) => axios.post("/api/products", { key: new Date(), name: item }),
    {
      onMutate: async (item) => {
        setName("");
        const product = { key: new Date(), name: item };
        await queryClient.cancelQueries("products");

        const previousValue = queryClient.getQueryData("products");

        queryClient.setQueryData("products", (old) => ({
          ...old,
          products: [...old.products, product],
        }));

        return previousValue;
      },
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addMutation.mutate(name);
        }}
      >
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          value={name}
        />
        <button type="submit">Create product</button>
      </form>
      <>
        {status === "loading" ? (
          "Loading..."
        ) : status === "error" ? (
          error.message
        ) : (
          <>
            <ul>
              {data.products.map((item) => (
                <li key={item.key}>
                  <p>
                    <strong>👀 {item.name}</strong>{" "}
                  </p>
                </li>
              ))}
            </ul>
            <div>{isFetching ? "Updating in background..." : " "}</div>
          </>
        )}
      </>
    </div>
  );
}

export default Home;
