import React, { useState } from 'react';
import Autocomplete  from "./components/Autocomplete/index";
import CountriesList from "./resources/mock-data/countries.json";
import './App.css';
import { Item } from './types';

function App() {
  const [country, setcountry] = useState<Item>();


  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
        <header className="app-header">
          <h1>Autocomple component</h1>
        </header>
        <main >

          <Autocomplete 
            onSelect={(country) => setcountry(country)}
            getSources={(q: string): Promise<Item[]> => {
              return new Promise<Item[]>(resolve => {
                  
                  let dataFiltered = CountriesList.filter((item: any) =>
                      item.name.toLowerCase().includes(q.toLowerCase())
                  );
                  setTimeout(() => {
                      resolve(dataFiltered)
                  }, 2000);
              })
          }}
          />
        </main>
    </div>
  );
}

export default App;
