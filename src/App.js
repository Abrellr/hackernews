import React, { useState , useEffect } from 'react';
import Header  from "./Components/Header";
import SearchBar from "./Components/SearchBar"
import List from './Components/MyList';
import AwesomeComponent from './Components/AwesomeComponent'
import Footer from './Components/Footer';
import './App.css';

const INITIAL_QUERY = "blockchain";
const LIMIT = "&hitsPerPage=30";

function App() {

  const [content, setContent] = useState([]);
  const [query, setQuery] = useState(INITIAL_QUERY);
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    console.log("from useEffect:", query)

    setSpinner(true);
    setError(false);

    const getData = () => {
      fetch(`https://hn.algolia.com/api/v1/search?query=${query}${LIMIT}`)
        .then((res) => res.json())
        .then(data => {
          console.log(data.hits)
          console.log("query from within fetch:", query)
          console.log("from fetch:", data.hits)
          for (let title of data.hits) {
            console.log(title.title);
          }
          setContent(data.hits);
          setSpinner(false);
        })
        .catch(() => setError(true));
    };
    getData();
    let id = setInterval(() => getData(), 300000);
    return () => clearInterval(id); // will only run when comp is unmounted!
  }, [query]);
  
    
  return (
    <>
     <Header />
     <SearchBar setquery={setQuery} query={query} />
     <AwesomeComponent loading={spinner}/>
     {/* <List content={content} error={error} query={query} /> */}
     {!spinner && <List content={content} error={error} query={query} />}
     <Footer />
    </>
  );
}

export default App;
