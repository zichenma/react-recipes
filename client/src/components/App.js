import './App.css';
import { useQuery } from '@apollo/client';
import { GET_ALL_RECIPES } from '../queries'
import Spinner from './Spinner';
import RecipeItem from '../components/Recipe/RecipeItem';


function App() {
  const { loading, error, data } = useQuery(GET_ALL_RECIPES);
  if (loading) return <Spinner />;
  if (error) return <p>Error</p>;
  return (
      <div className="App">
        <h1 className="main-title">
          Find Recipes You <strong>Love</strong>
        </h1>
        <ul className="cards">
          {
            data.getAllRecipes.map(recipe => (
              <RecipeItem key={ recipe._id } recipe={ recipe } />
            ))
          }
        </ul>
      </div>
  );
}

export default App;
