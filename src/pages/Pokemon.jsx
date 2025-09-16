import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pokemonActions } from "../redux/slices/pokemonSlice";
// import Header from "../components/Header";
// import { useLocation, useNavigate } from "react-router";

function Pokemon() {
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.pokemon);
  const [token, setToken] = useState("");
  const [formData] = useState(() => {
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
  // const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  // const { state } = useLocation();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   console.log(state);
  //   if (!state) {
  //     navigate("/content", {
  //       replace: true,
  //     });
  //   }
  // }, []);
  // function submitHandler(event) {
  //   event.preventDefault();
  //   // mengambil value dari form
  //   const form = event.target;
  //   const inputData = {};
  //   // cek duplikar data nama
  //   let isDuplicate = false;
  //   // formData.forEach((data) => {
  //   //   if (data.nama === form.nama.value) {
  //   //     isDuplicate = true;
  //   //   }
  //   // });
  //   for (let data of formData) {
  //     if (data.nama === form.nama.value) {
  //       isDuplicate = true;
  //       break;
  //     }
  //   }
  //   if (isDuplicate) {
  //     setError(new Error("duplicate data"));
  //     return;
  //   }
  //   // validasi nama
  //   const re = /^(?=[a-zA-Z]+)[a-zA-Z\s]{1,}$/;
  //   if (!re.test(form.nama.value)) {
  //     setError(new Error("invalid format"));
  //     return;
  //   }
  //   // mengambil data nama & umur
  //   Object.assign(inputData, {
  //     nama: form.nama.value,
  //     umur: form.umur.value,
  //   });
  //   setFormData((formData) => {
  //     return [...formData, inputData];
  //   });
  //   setError(null);
  // }
  function loginHandler(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const pwd = event.target.pwd.value;

    // empty validation
    if (name.length === 0 || pwd.length === 0) {
      setError("nama/password tidak boleh kosong");
      return;
    }

    const body = {
      nama_siswa: name,
      password: pwd,
    };
    const request = new Request(`${import.meta.env.VITE_BE_HOST}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetch(request, {
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) throw response.statusText;
        return response.json();
      })
      .then((res) => {
        setToken(res.data.token);
      })
      .catch((err) => console.log(err));
  }
  function editHandler(event) {
    event.preventDefault();
    const files = event.target.profile.files;
    const request = new Request(`${import.meta.env.VITE_BE_HOST}/students`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const formdata = new FormData();
    formdata.append("image", files[0]);
    fetch(request, {
      body: formdata,
    })
      .then((response) => {
        if (!response.ok) throw response.statusText;
        return response.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  // useEffect(() => {
  //   // Start Synchronize (did mount, did update)
  //   return () => {
  //     // Stop Synchronize (did update, will unmount)
  //   };
  // }, []);

  // Did Mount
  // useEffect(() => {
  //   console.log("once");
  //   const url = "https://pokeapi.co/api/v2/pokemon?limit=10";
  //   try {
  //     (async function () {
  //       const response = await fetch(url);
  //       // console.log(pokemons)
  //       if (!response.ok) throw new Error(response.status);
  //       const pokemonData = await response.json();
  //       const result = pokemonData.results.map(async (pokemon, idx) => {
  //         const obj = {
  //           name: pokemon.name,
  //         };
  //         try {
  //           const response = await fetch(pokemon.url);
  //           if (!response.ok) throw response.statusText;
  //           const pokemonDetail = await response.json();
  //           const pokemonAbilities = pokemonDetail.abilities.map(
  //             (abilityItem) => {
  //               return abilityItem.ability.name;
  //             },
  //           );
  //           Object.assign(obj, {
  //             abilities: pokemonAbilities,
  //           });
  //         } catch (err) {
  //           const error = new Error(
  //             `Error Fetching Pokemon Detail at index ${idx}\n${err.status}: ${err.statusText}`,
  //           );
  //           throw error;
  //         }
  //         return obj;
  //       });
  //       setPokemons(await Promise.all(result));
  //     })();
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   // return () => {
  //   //   alert("pokemon unmount");
  //   // };
  // }, []);
  // Did Update
  useEffect(() => {
    console.log("for formData");
    localStorage.setItem("koda3:data", JSON.stringify(formData));
  }, [formData]);
  // Every Update
  // useEffect(() => {
  //   console.log("for everyone");
  // });
  useEffect(() => {
    dispatch(pokemonActions.getPokemonThunk());
  }, []);
  useEffect(() => {
    const url = "http://localhost:3000/ping";
    const request = new Request(url, {
      method: "GET",
      // headers: {
      //   "Authorization": "Bearer "
      // }
    });
    fetch(request)
      .then((response) => {
        if (!response.ok) throw response.statusText;
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {/* <Header /> */}
      <h1>Pokemon</h1>
      <PokemonSearch inputValue={search} onInputValueChange={setSearch} />
      <main className="grid grid-cols-3 gap-[10px]">
        {pokemonState.isLoading && (
          <div className="animate-speeen loader my-2.5 w-fit pb-2 font-sans text-3xl font-bold before:content-['Loading...']"></div>
        )}
        {pokemonState.isSuccess &&
          pokemonState.pokemons
            .filter((pokemon) => {
              if (!search) return true;
              return pokemon.name.toLowerCase().includes(search.toLowerCase());
            })
            .map((pokemon, idx) => {
              return <PokemonItem key={idx} pokemon={pokemon} idx={idx} />;
            })}
        {pokemonState.isFailed && (
          <p className="text-bold col-start-1 -col-end-1 text-5xl text-red-500">
            {/* {JSON.stringify(pokemonState.error.payload)} */}
            Internal Server Error
          </p>
        )}
      </main>
      <section className="bg-beige mt-2 border-2 border-solid border-black p-2.5">
        <canvas id="grafiksaya"></canvas>
      </section>
      <button onClick={() => setCount((count) => count + 1)}>
        Clicked {count} times
      </button>
      <form onSubmit={loginHandler}>
        <label htmlFor="name">Nama</label>
        <input type="text" name="nama" id="name" />
        {error && <p>{error.message}</p>}
        <br />
        <label htmlFor="pwd">Password</label>
        <input type="password" name="pwd" id="pwd" />
        <br />
        <button type="submit">SUBMIT</button>
      </form>
      <form onSubmit={editHandler}>
        <label htmlFor="file">Masukkan foto terbaru</label>
        <input type="file" name="profile" id="file" />
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

function PokemonSearch({ inputValue, onInputValueChange }) {
  // const [search, setSearch] = useState("");
  /**
   * @param {Event} e
   */
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(inputValue);
  };
  return (
    <form className="p-2.5" onSubmit={submitHandler}>
      <input
        type="text"
        name="search"
        className="rounded-xl border-2 border-solid border-black p-1.25"
        placeholder="Search Pokemon..."
        value={inputValue}
        onChange={(e) => onInputValueChange(e.target.value)}
      />
      <button className="ml-2 cursor-pointer rounded-xl border-2 border-solid border-black p-1.25 select-none active:border-emerald-500 active:bg-black active:text-white">
        Search
      </button>
    </form>
  );
}

function PokemonItem({ pokemon, idx }) {
  const dispatch = useDispatch();
  return (
    <section
      className="border-2 border-solid border-black p-1.25"
      onClick={() => dispatch(pokemonActions.selectPokemon(idx))}
    >
      <div>
        <p className="font-[cursive] text-2xl">{pokemon.name}</p>
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
