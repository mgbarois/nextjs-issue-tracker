import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validationSchemas";

interface requestProps {
  params: { id: string };
}

export const PATCH = async (req: NextRequest, { params }: requestProps) => {
  const body = await req.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(z.prettifyError(validation.error), {
      status: 400,
    });
  }
  const issueId = await parseInt(params.id);
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue)
    return NextResponse.json(
      { error: "Invalid issue" },
      {
        status: 404,
      }
    );

  const { title, description } = body;

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title, description },
  });
  return NextResponse.json(updatedIssue);
};
