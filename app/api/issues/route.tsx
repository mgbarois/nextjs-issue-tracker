import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import { createIssueSchema } from "@/app/validationSchemas";

export const GET = async () => {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(z.prettifyError(validation.error), {
      status: 400,
    });
  }
  const { title, description } = body;
  const newIssue = await prisma.issue.create({
    data: { title, description },
  });
  return NextResponse.json(newIssue, { status: 201 });
};
