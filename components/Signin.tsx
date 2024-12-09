"use client";
import React, { useState } from "react";
import { Fugaz_One } from "next/font/google";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false)
  const { signup, signin } = useAuth()

  async function handleSubmit() {
    if (!email || !password || password.length < 6){
      return
    }
    setAuthenticating(true)
    try {
      if (isRegister){
      console.log('Signing up a new user')
      await signup(email, password)
    } else{
      console.log('Signing in existing user')
      await signin(email, password)
    }
    } catch (error) {
      console.log(error)
    } finally {
      setAuthenticating(false)
  }
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={"text-4xl sm:text-5xl md:text-6xl " + fugaz.className}>
        {isRegister ? "Register" : "Sign In"}
      </h3>
      <p>You are one step away!</p>
      <input
        className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400 rounded-xl outline-indigo-600"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400 rounded-xl outline-indigo-600"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <div className="max-w-[200px] w-full mx-auto">
        <Button clickHandler={handleSubmit} text={authenticating ? 'Submitting' : "Submit"} full />
      </div>
      <p>
        {isRegister ? 'Already have an account?' : 'Don\'t have an account? '}
        <button
          onClick={() => {
            setIsRegister(!isRegister);
          }}
          className="text-indigo-600"
        >
          {isRegister ? 'Sign in' : 'Sign up'}
        </button>
      </p>
    </div>
  );
}
