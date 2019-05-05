import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Main: React.FC = () => {
  // Set offset, this is being used instead of setState.
  // Implements https://reactjs.org/docs/hooks-overview.html
  const [offset, setOffset] = useState(1);
  let [data, setData] = useState();
  const addOffset = () => setOffset(offset + 1);
  const subtractOffset = () => setOffset(offset > 1 ? offset - 1 : 0);
  // Fetch data
  // Implements https://www.robinwieruch.de/react-hooks-fetch-data/
  useEffect(() => {
    async function fetchMyApi() {
      const result = await axios(
        // TODO: I am stumped by why this works but my local API doesn't.
        // Only works with CORS protection turned off on browser.
        `http://localhost:3000/api/${offset}`
      );
      setData(result.data);
    }
    fetchMyApi();
  }, [offset]);
  return (
    <div className="App">
      Offset: {offset}
      <button onClick={addOffset}>Add Offset</button>
      <button onClick={subtractOffset}>Subtract Offset</button>
      <p>{data ? JSON.stringify(data.data) : 'something went wrong'}</p>
    </div>
  );
};
