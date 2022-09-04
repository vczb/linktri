import { Button } from "ui";

export default function Web() {
  const fetchData = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${API_URL}/ok`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      <h1>Web</h1>
      <Button onClick={() => fetchData()} />
    </div>
  );
}
