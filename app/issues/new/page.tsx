"use client";
import React from "react";
import dynamic from "next/dynamic";
import { TextField, Button } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";

// Import SimpleMDE dynamically - Skip import at module evaluation during SSR,
// to avoid referencing document before render
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title" />
      <SimpleMDE />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
