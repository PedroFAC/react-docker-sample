import React, { useEffect, useState } from "react";
import axios from "axios";
import faker from "@faker-js/faker";

function App() {
  const [tableData, setTableData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  async function axiosFetch() {
    setIsLoading(true);
    try {
      const { data } = await axios.get("http://localhost:8000/users", {
        proxy: true,
      });
      setTableData(data.users);
    } catch (error) {
      setTableData("error");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    axiosFetch();
  }, []);
  async function addUser() {
    setIsLoading(true);

    try {
      await axios.post("http://localhost:8000/user", {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
      });
      await axiosFetch();
    } catch (error) {
      setTableData("error");
    } finally {
      setIsLoading(false);
    }
  }
  const table = (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {tableData?.map(({ firstName, lastName, email, id }) => (
          <tr key={id}>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <button disabled={isLoading} onClick={addUser}>
        Add new User
      </button>
      {isLoading ? <h1>Loading...</h1> : table}
    </div>
  );
}

export default App;
