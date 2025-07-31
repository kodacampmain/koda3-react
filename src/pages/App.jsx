import { useState } from "react";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", pwd: "" });
  const [err, setErr] = useState({ email: null, pwd: null });
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
        <br />
        <p className="text-red-500">{err.email && err.email.message}</p>
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
        <br />
        <p className="text-red-500">{err.pwd && err.pwd.message}</p>
        <button
          type="button"
          onClick={() => {
            // const inputForm = {
            //   email,
            //   pwd,
            // };
            const emailRe = /^[\w.-]+@[a-zA-Z]+\.(com|net|gov)$/;
            const pwdRe =
              /^(?=.*[a-z])+(?=.*[A-Z])+(?=.*[!@#$%^&*/><])+[a-zA-Z!@#$%^&*/><]{8,}$/;
            let isError = false;
            // validasi email
            if (!emailRe.test(form.email)) {
              isError = true;
              setErr((error) => {
                return { ...error, email: new Error("invalid email format") };
              });
            } else {
              setErr((error) => ({ ...error, email: null }));
            }
            if (!pwdRe.test(form.pwd)) {
              isError = true;
              setErr((error) => {
                return {
                  ...error,
                  pwd: new Error(
                    "invalid password format: password minimal 8 karakter dengan minimal 1 huruf kecil, 1 huruf besar dan 1 karakter spesial (!@#$%^&*/><)",
                  ),
                };
              });
            } else {
              setErr((error) => ({ ...error, pwd: null }));
            }
            console.log(isError);
            // Proses
            if (isError) {
              return;
            }
            navigate("/movies");
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
function InputWithLabel({
  inputId,
  name,
  type,
  label,
  noValidate,
  value,
  onChange,
}) {
  return (
    <>
      <label htmlFor={inputId}>{label}</label>
      <input
        type={type}
        name={name}
        id={inputId}
        formNoValidate={noValidate}
        value={value}
        onChange={onChange}
        className="border-2 border-solid border-black p-1.25"
      />
    </>
  );
}

export default App;
