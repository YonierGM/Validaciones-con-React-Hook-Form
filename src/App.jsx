import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { useForm } from "react-hook-form";
import { Report } from "notiflix/build/notiflix-report-aio";
import { Loading } from "notiflix/build/notiflix-loading-aio";

function App() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    Loading.pulse("Enviando");

    setTimeout(() => {
      Loading.remove();
      Report.success(
        "Formulario enviado",
        "Felicidades sus datos se enviaron exitosamente",
        "Volver"
      );
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <form
        className="max-w-sm mx-auto my-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="su nombre"
            {...register("name", {
              required: {
                value: true,
                message: "ingrese su nombre",
              },
              minLength: {
                value: 4,
                message: "Minimo 4 caracteres",
              },
              maxLength: {
                value: 30,
                message: "Maximo 30 caracteres",
              },
            })}
          />

          {errors.name && errors.name.type === "required" && (
            <span
              className="text-xs font-medium text-red-500 dark:text-white"
              role="alert"
            >
              {errors.name.message}
            </span>
          )}
          {errors.name && errors.name.type === "minLength" && (
            <span
              className="text-xs font-medium text-red-500 dark:text-white"
              role="alert"
            >
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Correo
          </label>
          <input
            type="email"
            id="email"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="name@example.com"
            {...register("email", {
              required: {
                value: true,
                message: "Ingrese su correo",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Formato de correo invalido",
              },
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <span
              className="text-xs font-medium text-red-500 dark:text-white"
              role="alert"
            >
              {errors.email.message}
            </span>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <span
              className="text-xs font-medium text-red-500 dark:text-white"
              role="alert"
            >
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="********"
            {...register("password", {
              required: {
                value: true,
                message: "Ingrese su contraseña",
              },
              minLength: {
                value: 8,
                message: "Minimo 8 caracteres",
              },
            })}
          />

          {errors.password && errors.password.type === "required" && (
            <span
              className="text-xs font-medium text-red-500 dark:text-white"
              role="alert"
            >
              {errors.password.message}
            </span>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <span
              className="text-xs font-medium text-red-500 dark:text-white"
              role="alert"
            >
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="repeatPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirmar contraseña
          </label>
          <input
            type="password"
            id="repeatPassword"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="********"
            {...register("repeatPassword", {
              required: {
                value: true,
                message: "Confirme su contraseña",
              },
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            })}
          />

          {errors.repeatPassword &&
            errors.repeatPassword.type === "required" && (
              <span
                className="text-xs font-medium text-red-500 dark:text-white"
                role="alert"
              >
                {errors.repeatPassword.message}
              </span>
            )}
          {errors.repeatPassword &&
            errors.repeatPassword.type === "validate" && (
              <span
                className="text-xs font-medium text-red-500 dark:text-white"
                role="alert"
              >
                {errors.repeatPassword.message}
              </span>
            )}
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              {...register("checkbox", {
                required: {
                  value: true,
                  message: "Acepte los TyC",
                },
              })}
            />
          </div>
          <label
            htmlFor="terms"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Acepto{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terminos y condiciones
            </a>
          </label>
          {errors.checkbox && errors.checkbox.type === "required" && (
            <span
              className="text-xs font-medium text-red-500 dark:text-white"
              role="alert"
            >
              {errors.checkbox.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Enviar
        </button>
      </form>
    </>
  );
}

export default App;
