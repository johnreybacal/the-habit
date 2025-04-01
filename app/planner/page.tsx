"use client";

import FormModal from "@/components/FormModal";
import Header from "@/components/Header";
import List from "@/components/List";

export default function Planner() {
  return (
    <div className="px-4 py-8 mx-auto flex flex-col items-center justify-center">
      <Header />
      <List />
      <FormModal />
    </div>
  );
}
