"use client";
import { ErrorMessage, IssueStatusBadge } from "@/app/components";
import { Issue } from "@/app/generated/prisma";
import { issueSchema, statusEnum } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Callout,
  Select,
  Spinner,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdError } from "react-icons/md";
import { z } from "zod";

// Import SimpleMDE dynamically - Skip import at module evaluation during SSR,
// to avoid referencing document before render
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
        router.push(`../${issue.id}`);
      } else {
        await axios.post("/api/issues", data);
        router.push("../issues");
      }
    } catch {
      setIsSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    <Box className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5" color="red">
          <Callout.Icon>
            <MdError />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Title"
          defaultValue={issue?.title}
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <div className="mb-3">
          <Controller
            name="status"
            control={control}
            defaultValue={issue?.status || "OPEN"}
            render={({ field }) => (
              <Select.Root onValueChange={field.onChange} {...field}>
                <Select.Trigger />
                <Select.Content variant="soft" color="gray">
                  {statusEnum.map((status) => (
                    <Select.Item key={status} value={status}>
                      <IssueStatusBadge status={status} />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          />
        </div>
        <ErrorMessage>{errors.status?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description || ""}
          render={({ field }) => (
            <SimpleMDE placeholder={"Description"} {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button type="submit" disabled={isSubmitting}>
          {issue ? "Save Changes" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Box>
  );
};

export default IssueForm;
