import { useState } from "react";
// import reactLogo from "../assets/react.svg";
// import viteLogo from '/vite.svg'

function App() {
  // const [count, setCount] = useState(() => {
  //   const firstValue = localStorage.getItem("koda3:count");
  //   const re = /^\d{1,}$/;
  //   if (re.test(firstValue)) return parseInt(firstValue);
  //   return 0;
  // });
  // const onClickHandler = () => {
  //   // const newCount = count + 1;
  //   setCount((count) => {
  //     return count + 1;
  //     // return newCount;
  //   });
  // };

  const [form, setForm] = useState({ email: "", pwd: "" });
  // const [email, setEmail] = useState("");
  // const [pwd, setPwd] = useState("");
  const onChangeHandler = (event) => {
    setForm((form) => {
      return {
        ...form,
        [event.target.name]: event.target.value,
      };
    });
  };
  return (
    <>
      <form>
        <InputWithLabel
          inputId="email"
          label="Email"
          name="email"
          type="email"
          noValidate
          // value={email}
          // onChange={(event) => setEmail(event.target.value)}
          value={form.email}
          onChange={onChangeHandler}
        />
        <InputWithLabel
          inputId="pwd"
          label="Password"
          name="pwd"
          type="password"
          noValidate
          // value={pwd}
          // onChange={(event) => setPwd(event.target.value)}
          value={form.pwd}
          onChange={onChangeHandler}
        />
        <button
          type="button"
          onClick={() => {
            // const inputForm = {
            //   email,
            //   pwd,
            // };
            console.log(form);
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
}

/**
 *
 * @param {Object} props
 * @param {string} props.inputId
 * @param {string} props.name
 * @param {string} props.type
 * @param {string} props.label
 * @param {boolean} props.noValidate
 * @param {any} props.value
 * @param {(event: Event) => void} props.onChange
 * @returns
 */
function InputWithLabel({ inputId, name, type, label, noValidate, value, onChange }) {
  return (
    <>
      <label htmlFor={inputId}>{label}</label>
      <input type={type} name={name} id={inputId} formNoValidate={noValidate} value={value} onChange={onChange} />
    </>
  );
}

export default App;
