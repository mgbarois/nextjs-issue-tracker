import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const body = await req.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(z.prettifyError(validation.error), {
      status: 400,
    });
  }
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue)
    return NextResponse.json(
      { error: "Invalid issue" },
      {
        status: 404,
      }
    );

  const { title, status, description } = body;

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title, status, description },
  });
  return NextResponse.json(updatedIssue);
};
