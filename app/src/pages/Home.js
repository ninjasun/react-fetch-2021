import { useQuery } from "react-query";

function Home() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("/api/products").then((res) => {
      return res.json();
    })
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {data.map((item) => (
        <div key={item.key}>
          <h1>{item.key}</h1>
          <p>
            <strong>👀 {item.name}</strong>{" "}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Home;
