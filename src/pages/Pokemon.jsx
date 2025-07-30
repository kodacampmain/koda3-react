import { useState, useEffect } from "react";
// import Header from "../components/Header";

function Pokemon() {
  const [formData, setFormData] = useState(() => {
    const initialData = localStorage.getItem("koda3:data");
    if (!initialData) return [];
    try {
      const data = JSON.parse(initialData);
      if (!Array.isArray(data)) throw new Error("invalid data");
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  });
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  function submitHandler(event) {
    event.preventDefault();
    // mengambil value dari form
    const form = event.target;
    const inputData = {};
    // cek duplikar data nama
    let isDuplicate = false;
    // formData.forEach((data) => {
    //   if (data.nama === form.nama.value) {
    //     isDuplicate = true;
    //   }
    // });
    for (let data of formData) {
      if (data.nama === form.nama.value) {
        isDuplicate = true;
        break;
      }
    }
    if (isDuplicate) {
      setError(new Error("duplicate data"));
      return;
    }
    // validasi nama
    const re = /^(?=[a-zA-Z]+)[a-zA-Z\s]{1,}$/;
    if (!re.test(form.nama.value)) {
      setError(new Error("invalid format"));
      return;
    }
    // mengambil data nama & umur
    Object.assign(inputData, {
      nama: form.nama.value,
      umur: form.umur.value,
    });
    setFormData((formData) => {
      return [...formData, inputData];
    });
    setError(null);
  }
  // useEffect(() => {
  //   // Start Synchronize (did mount, did update)
  //   return () => {
  //     // Stop Synchronize (did update, will unmount)
  //   };
  // }, []);

  // Did Mount
  useEffect(() => {
    console.log("once");
    const url = "https://pokeapi.co/api/v2/pokemon?limit=10";
    (async function () {
      try {
        const response = await fetch(url);
        // console.log(pokemons)
        if (!response.ok) throw new Error(response.status);
        const pokemonData = await response.json();
        const result = pokemonData.results.map(async (pokemon, idx) => {
          const obj = {
            name: pokemon.name,
          };
          try {
            const response = await fetch(pokemon.url);
            if (!response.ok) throw response.statusText;
            const pokemonDetail = await response.json();
            const pokemonAbilities = pokemonDetail.abilities.map((abilityItem) => {
              return abilityItem.ability.name;
            });
            Object.assign(obj, {
              abilities: pokemonAbilities,
            });
          } catch (err) {
            const error = new Error(`Error Fetching Pokemon Detail at index ${idx}\n${err.status}: ${err.statusText}`);
            throw error;
          }
          return obj;
        });
        setPokemons(await Promise.all(result));
      } catch (err) {
        throw err;
      }
    })();
    // return () => {
    //   alert("pokemon unmount");
    // };
  }, []);
  // Did Update
  useEffect(() => {
    console.log("for formData");
    localStorage.setItem("koda3:data", JSON.stringify(formData));
  }, [formData]);
  // Every Update
  useEffect(() => {
    console.log("for everyone");
  });
  return (
    <>
      {/* <Header /> */}
      <h1>Pokemon</h1>
      <main className="grid gap-[10px] grid-cols-3">
        {pokemons.length > 0 &&
          pokemons.map((pokemon, idx) => {
            return <PokemonItem key={idx} pokemon={pokemon} />;
          })}
      </main>
      <section className="bg-beige border-2 border-solid border-black p-2.5 mt-2">
        <canvas id="grafiksaya"></canvas>
      </section>
      <button onClick={() => setCount((count) => count + 1)}>Clicked {count} times</button>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Nama</label>
        <input type="text" name="nama" id="name" />
        {error && <p>{error.message}</p>}
        <br />
        <label htmlFor="age">Umur</label>
        <input type="number" name="umur" id="age" />
        <br />
        <button type="submit">SUBMIT</button>
      </form>
      <Table data={formData} />
    </>
  );
}

function Table(props) {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Nama</th>
          <th scope="col">Umur</th>
        </tr>
      </thead>
      <tbody>
        {props.data.length > 0 &&
          props.data.map((datum, idx) => {
            return (
              <tr key={idx}>
                <td>{datum.nama}</td>
                <td>{datum.umur}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

function PokemonItem({ pokemon }) {
  return (
    <section className="border-2 border-solid border-black p-1.25">
      <div>
        <p className="text-2xl font-[cursive]">{pokemon.name}</p>
      </div>
      <div className="flex gap-1.25">
        {pokemon.abilities.map((ability, idx) => {
          return <p key={idx}>{ability}</p>;
        })}
      </div>
    </section>
  );
}

export default Pokemon;
