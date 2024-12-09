import React from "react";
import Link from "next/link"
import { Fugaz_One } from "next/font/google";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import Button from "./Button";
import Calendar from "./Calendar";
import { demoData } from "@/utils";
import CallToAction from "./CallToAction";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Hero() {
  return (
    <div className="py-4 sm:py-10 flex flex-col gap-8 sm:gap-10">
      <h1
        className={
          "text-5xl sm:text-text-6xl md:text-7xl text-center " + fugaz.className
        }
      >
        <span className="textGradient">Find your cuddle companion today</span>
      </h1>

      <p className="text-sm sm:text-lg md:text-2xl text-center font-normal w-full mx-auto max-w-[700px]">
        We&prime;ll connect you with a cuddle buddy to build a companionship
        <span className="font-semibold"> focused on platonic cuddling</span>
        &sbquo; with no expectations for anything beyond that.
      </p>
      <CallToAction/>
      <Calendar demo={JSON.stringify(demoData)}/>
    </div>
  );
}
