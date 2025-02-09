"use client";

import Header from "@/components/Header";
import List from "@/components/List";

export default function Home() {
  return (
    <div className="px-4 py-8 mx-auto flex flex-col items-center justify-center">
      <Header />
      <List habits={[]} />
    </div>
  );
}
