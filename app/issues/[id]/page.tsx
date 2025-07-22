import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import IssueDetail from "./IssueDetail";
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

  return <IssueDetail issue={issue} />;
};

export default IssueDetailPage;
