import { useState, useEffect } from "react";

function Pokemon() {
  const [formData, setFormData] = useState([]);
  const [count, setCount] = useState(0);
  function submitHandler(event) {
    event.preventDefault();
    // mengambil value dari form
    const form = event.target;
    const inputData = {};
    // mengambil data nama & umur
    Object.assign(inputData, {
      nama: form.nama.value,
      umur: form.umur.value,
    });
    setFormData((formData) => {
      return [...formData, inputData];
    });
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
    // return () => {
    //   alert("pokemon unmount");
    // };
  }, []);
  // Did Update
  useEffect(() => {
    console.log("for formData");
  }, [formData]);
  // Every Update
  useEffect(() => {
    console.log("for everyone");
  });
  return (
    <>
      <header>
        <h1>Pokemon</h1>
      </header>
      <main className="grid gap-[10px] grid-cols-3"></main>
      <section className="bg-beige border-2 border-solid border-black p-2.5 mt-2">
        <canvas id="grafiksaya"></canvas>
      </section>
      <button onClick={() => setCount((count) => count + 1)}>Clicked {count} times</button>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Nama</label>
        <input type="text" name="nama" id="name" />
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

export default Pokemon;
