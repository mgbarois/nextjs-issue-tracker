import { z } from "zod";
import { Status } from "./generated/prisma";

export const statusEnum: Status[] = ["OPEN", "IN_PROGRESS", "CLOSED"];

export const issueSchema = z.object({
  title: z.string().min(1, { error: "Title is required." }).max(255),
  status: z.enum(statusEnum),
  description: z.string().min(1, "Description is required."),
});
