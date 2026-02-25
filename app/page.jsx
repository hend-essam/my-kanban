"use client";
import { useState, useEffect } from "react";
import BoardContent from "./components/BoardContent";

const page = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <BoardContent />;
};

export default page;
