"use client";
import React, { useState } from "react";
import { Spotlight } from "./spotLightbg";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BackgroundBeams } from "./ui/background-beams";
import { TextGenerateEffect } from "./ui/text-generation-effect";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

type ValidationResult = {
  valid: boolean;
  reason?: any;
  key: string;
};
export default function SpotlightPreview() {
  const [result, setResult] = useState<Array<ValidationResult>>([]);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      setLoading(true);
      if (result.length > 0) {
        setResult([]);
      }
      const apiResponse = await fetch("/api/validate", {
        cache: "no-store",
        method: "POST",
        body: formData,
      });
      if (apiResponse.status === 200) {
        const validDationResult = await apiResponse.json();
        const results: Array<ValidationResult> = Object.keys(
          validDationResult
        ).map((key) => {
          return { ...validDationResult[key], key };
        });
        setResult(results);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-[100dvh] w-full rounded-md flex md:items-center  md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <BackgroundBeams />
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20 h-[100dvh]"
        fill="white"
      />
      <div className="z-[2] h-[40rem] w-full rounded-md  relative flex flex-col items-center justify-center antialiased">
        <div className="  max-w-2xl mx-auto p-4 flex flex-col items-center">
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            Email SMTP Validator
          </h1>

          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            Utilise our Email SMTP validator to determine if an email address is
            real. detects potential bounces and bogus emails without ever
            sending one.
          </p>

          <form
            onSubmit={onSubmit}
            className="flex w-full items-center space-x-2 dark"
          >
            <Input
              required
              type="email"
              name={"email"}
              placeholder="Email"
              className="bg-transparent p-4"
            />

            <Button
              disabled={loading}
              type="submit"
              className="flex gap-2 w-[110px]"
            >
              {loading ? <Loader /> : null}
              validate
            </Button>
          </form>

          <div className="w-full flex flex-col gap-1 pt-4 h-[128px]">
            {result.map((res, index) => {
              return (
                <TextGenerateEffect
                  key={index}
                  words={`${res.key} : ${
                    res.valid
                      ? " Valid "
                      : " Fail - " + JSON.stringify(res.reason)
                  }`}
                  Icon={res.valid ? FaCircleCheck : MdCancel}
                  valid={res.valid}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
function Loader() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4  animate-spin  fill-neutral-900"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  );
}
