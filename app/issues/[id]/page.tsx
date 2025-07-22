import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import IssueDetailLayout from "./IssueDetailLayout";
import delay from "delay";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
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
