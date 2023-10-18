"use client";

import { useState } from "react";
import { loginFields } from "./formFields";
import FormAction from "./FormAction";
import { CirclesWithBar } from "react-loader-spinner";
import useStore from "@/app/store";
import { useRouter } from "next/navigation";
import Input from "./Input";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const { setToken, setUsername } = useStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = () => {
    let loginFields = {
      username: loginState["email"],
      password: loginState["password"],
    };

    setLoading(true);
    fetch("https://extract-data-from-w2docs-django.onrender.com/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginFields),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed. Check your credentials.");
        }
        setLoading(false);
        return response.json();
      })
      .then((data) => {
        setToken(data["token"]);
        setUsername(loginState["email"]);
        router.push("/upload");
      })
      .catch((error) => {
        throw new Error("Error logging in:", error);
      });
  };

  return (
    <>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={loginState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
        </div>

        <FormAction handleSubmit={handleSubmit} text="Login" />
      </form>
      <div class=" ml-44">
        {loading && (
          <CirclesWithBar
            height="100"
            width="100"
            color="#9a4da9"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            outerCircleColor=""
            innerCircleColor=""
            barColor=""
            ariaLabel="circles-with-bar-loading"
          />
        )}
      </div>
    </>
  );
}
