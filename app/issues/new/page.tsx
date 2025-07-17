"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { TextField, Button, Callout } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MdError } from "react-icons/md";

// Import SimpleMDE dynamically - Skip import at module evaluation during SSR,
// to avoid referencing document before render
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface IInputForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IInputForm>();
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<IInputForm> = async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("../issues");
    } catch {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5" color="red">
          <Callout.Icon>
            <MdError />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root placeholder="Title" {...register("title")} />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder={"Description"} {...field} />
          )}
        />
        <Button type="submit">Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
