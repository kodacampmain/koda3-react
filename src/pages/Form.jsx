import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  uname: yup
    .string()
    .matches(/^(?=[a-zA-Z]+)[a-zA-Z\s]{1,}$/)
    .required(),
  gender: yup.string().oneOf(["male", "female"]),
});

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <>
      <h1>Form</h1>
      <form
        onSubmit={handleSubmit((data) => {
          //   const re = /^(?=[a-zA-Z]+)[a-zA-Z\s]{1,}$/;
          //   if (!re.test(data.uname)) {
          //     console.log("invalid uname");
          //     return;
          //   }
          console.log(data);
        })}
      >
        <input
          type="text"
          placeholder="insert username"
          {...register(
            "uname"
            //     , {
            //     pattern: /^(?=[a-zA-Z]+)[a-zA-Z\s]{1,}$/,
            //     required: true,
            //   }
          )}
        />
        <br />
        {/* {errors.uname && (
          <div>
            {errors.uname.type === "pattern" && <span>Invalid Name</span>}
            {errors.uname.type === "required" && <span>Field is Required</span>}
          </div>
        )} */}
        {errors.uname && errors.uname.message}
        <select defaultValue="default" {...register("gender")}>
          <option value="default" disabled>
            Choose Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && errors.gender.message}
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Form;
