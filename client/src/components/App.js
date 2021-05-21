import './App.css';
import { useQuery } from '@apollo/client';
import { GET_ALL_RECIPES } from '../queries'


function App() {
  const { loading, error, data } = useQuery(GET_ALL_RECIPES, {

  });
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error</p>;
  console.log(data)
  return (
      <div className="App">
        <h1>Home</h1>
      </div>
  );
}

export default App;
