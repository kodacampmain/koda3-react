import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router";

const schema = yup.object({
  uname: yup
    .string()
    .matches(/^(?=[a-zA-Z]+)[a-zA-Z\s]{6,}$/)
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
  const navigate = useNavigate();
  return (
    <section className="p-2.5">
      <h1 className="text-[3rem]">Form</h1>
      <form
        onSubmit={handleSubmit((data) => {
          //   const re = /^(?=[a-zA-Z]+)[a-zA-Z\s]{1,}$/;
          //   if (!re.test(data.uname)) {
          //     console.log("invalid uname");
          //     return;
          //   }
          console.log(data);
          navigate("/content/pokemon");
        })}
      >
        <input
          type="text"
          placeholder="insert username"
          {...register(
            "uname",
            //     , {
            //     pattern: /^(?=[a-zA-Z]+)[a-zA-Z\s]{1,}$/,
            //     required: true,
            //   }
          )}
          className="w-full rounded-[5px] border-2 border-solid border-black p-1.25"
        />
        {/* {errors.uname && (
          <div>
            {errors.uname.type === "pattern" && <span>Invalid Name</span>}
            {errors.uname.type === "required" && <span>Field is Required</span>}
          </div>
        )} */}
        <p className="text-red-500">
          {errors.uname &&
            "Username minimal 1 huruf kecil/besar dengan panjang total minimal 6 karakter"}
        </p>
        <select
          defaultValue="default"
          {...register("gender")}
          className="my-1.25 w-full cursor-pointer rounded-[5px] border-2 border-solid border-black p-1.25"
        >
          <option value="default" disabled>
            Choose Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <p className="text-red-500">
          {errors.gender && "Gender harus dipilih"}
        </p>
        <button
          type="submit"
          className="cursor-pointer border-2 border-solid border-black bg-slate-500 p-1.25 text-white select-none hover:bg-slate-700"
        >
          Submit
        </button>
      </form>
    </section>
  );
}

export default Form;
