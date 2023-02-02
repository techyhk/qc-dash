import { useState } from "react";
import Router from "next/router";
import { useUser } from "../lib/hooks";
import Layout from "../components/layout/Layout";
import Form from "../components/form/Form";

const Signup = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) {
      setErrorMsg("");
    }

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      name: e.currentTarget.name.value,
      discord: e.currentTarget.discord.value,
    };

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`);
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push("/login");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <Layout>
      <Form isLogin={false} errorMessage={errorMsg} onSubmit={handleSubmit} />
    </Layout>
  );
};

export default Signup;
