"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { signupFields } from "@/components/formFields";
import FormAction from "@/components/FormAction";
import Input from "@/components/Input";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

const SignUpPage = () => {
  const router = useRouter();
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // router.push("/");
    createAccount();
  };

  //handle Signup API Integration here
  const createAccount = () => {
    fetch(
      "https://extract-data-from-w2docs-django.onrender.com/api/register/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupState),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed. Check your credentials.");
        }
          router.push("/");
        return response.json();
      })
      .catch((error) => {
        throw new Error("Error registering user:", error);
      });
  };
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Header
          heading="Signup to create an account"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/"
        />
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="">
            {fields.map((field) => (
              <Input
                key={field.id}
                handleChange={handleChange}
                value={signupState[field.id]}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={field.placeholder}
              />
            ))}
            <FormAction handleSubmit={handleSubmit} text="Signup" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
