import { Button } from "ui";

export default function Web() {
  const fetchData = () => {
    fetch("http://localhost:3001/api/ok")
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
