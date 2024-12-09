"use client";
import { Fugaz_One } from "next/font/google";
import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Loading from "./Loading";
import Signin from "./Signin";
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

interface MoodData {
  [year: number]: {
    [month: number]: {
      [day: number]: number; // Represents the mood value
    };
  };
}

export default function Dashboard() {
  const { currentUser, userData, setUserData, loading } = useAuth();
  const [data, setData] = useState<MoodData>({});
  const now = new Date()


  function countValues() {
    let total_number_of_days = 0
    let sum_moods = 0
    for (const year in data) {
      for (const month in data[year]) {
        for (const day in data[year][month]) {
          const days_mood = data[year][month][day]
          total_number_of_days++
          sum_moods += days_mood
        }
      }
    }
    return { num_days: total_number_of_days, average_mood: sum_moods / total_number_of_days }
  }

  const statuses = {
    ...countValues(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
  };

  async function handleSetMood(mood: number) {
    //update current state, global state, firebase
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    try {
      const newData = { ...userData };
      if (!newData?.[year]) {
        newData[year] = {};
      }

      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }

      newData[year][month][day] = mood;
      setData(newData);
      setUserData(newData);

      const docRef = doc(db, "users", currentUser.uid);
      await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (error) {
      console.log("Failed to set data: ", error);
    }
  }

  const moods = {
    Terrible: "😭",
    Sad: "😢",
    Existing: "😶",
    Good: "😄",
    Elated: "😍",
  };

  useEffect(() => {
    if (!currentUser || !userData) {
      return;
    }
    setData(userData);
  }, [currentUser, userData]);

 
  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Signin />;
  }

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-xl p-4 gap-4">
        {(Object.keys(statuses) as Array<keyof typeof statuses>).map(
          (status, statusIndex) => {
            return (
              <div key={statusIndex} className=" flex flex-col gap-1 sm:gap-2">
                <p className="font-medium capitalize text-xs sm:text-sm truncate">
                  {status.replaceAll("_", " ")}
                </p>
                <p
                  className={"text-base sm:text-lg truncate " + fugaz.className}
                >
                  {statuses[status]}{status === 'num_days' ? ' 🔥' : ''}
                </p>
              </div>
            );
          }
        )}
      </div>
      <h4
        className={
          "text-5xl sm:text-6xl md:text-7xl text-center " + fugaz.className
        }
      >
        How do you <span className="textGradient">feel</span> today?
      </h4>
      <div className="flex items-stretch flex-wrap gap-4">
        {(Object.keys(moods) as Array<keyof typeof moods>).map(
          (mood, moodIndex) => {
            return (
              <button
                className={
                  "p-4 px-5 rounded-xl purpleShadow duration-300 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col gap-2 items-center flex-1 "
                }
                key={moodIndex}
                onClick={() => {
                  const currentMoodValue = moodIndex + 1;
                  handleSetMood(currentMoodValue);
                }}
              >
                <p className="text-4xl sm:text-5xl md:text-6xl">
                  {moods[mood]}
                </p>
                <p
                  className={
                    "text-indigo-500 text-xs sm:text-sm md:text-base " +
                    fugaz.className
                  }
                >
                  {mood}
                </p>
              </button>
            );
          }
        )}
      </div>
      <Calendar completedData={data} handleSetMood={handleSetMood} />
    </div>
  );
}
