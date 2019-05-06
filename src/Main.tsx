import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SimpleExpansionPanel from './SimpleExpansionPanel';

interface LocationInfo {
  name: string;
  address: string;
  nearest: number;
  ratings: number;
  categories: string[];
  coordinates: { latitude: number; longitude: number };
}

export const Main: React.FC = () => {
  // Set offset, this is being used instead of setState.
  // Implements https://reactjs.org/docs/hooks-overview.html
  const [offset, setOffset] = useState(1);
  let [data, setData] = useState();
  const addOffset = () => setOffset(offset + 1);
  const subtractOffset = () => setOffset(offset > 2 ? offset - 1 : 1);
  // Fetch data
  // Implements https://www.robinwieruch.de/react-hooks-fetch-data/
  useEffect(() => {
    async function fetchMyApi() {
      const apiCallResult = await axios(
        // Only works with CORS protection turned off on browser.
        `http://localhost:3000/api/${offset}`
      );

      const mapApiToProps: LocationInfo = apiCallResult.data.data.map(
        (location: any) => ({
          name: location.name,
          address: location.details.location.display_address.reduce(
            (acc: string, line: string) => `${acc}, ${line}`
          ),
          nearest: location.distances[0].distance,
          ratings: location.ratings,
          categories: location.details.categories.map(
            (category: { alias: string; title: string }) => category.title
          ),
          coordinates: location.details.coordinates,
        })
      );

      console.log(mapApiToProps);
      setData(mapApiToProps);
    }
    fetchMyApi();
  }, [offset]);

  if (data) {
    var collapsiblePanels = data.map((location: LocationInfo, i: number) => {
      return <SimpleExpansionPanel location={location} key={i} />;
    });
  }

  return (
    <div className="App">
      Offset: {offset}
      <button onClick={addOffset}>Add Offset</button>
      <button onClick={subtractOffset}>Subtract Offset</button>
      <div>{collapsiblePanels}</div>
    </div>
  );
};
