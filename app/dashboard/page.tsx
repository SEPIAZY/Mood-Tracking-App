"use client";
import Dashboard from "@/components/Dashboard";
import Loading from "@/components/Loading";
import Main from "@/components/Main";
import Signin from "@/components/Signin";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function DashboardPage() {
  return (
    <Main>
      <Dashboard />
    </Main>
  );
}
