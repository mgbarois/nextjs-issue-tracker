import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import IssueDetailLayout from "./IssueDetailLayout";
import delay from "delay";
import { PageProps } from "@/.next/types/app/page";

const IssueDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  await delay(2000);

  if (!issue) {
    notFound();
  }

  return <IssueDetailLayout issue={issue} />;
};

export default IssueDetailPage;
