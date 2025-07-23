import { PageProps } from "@/.next/types/app/page";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import EditIssueLayout from "./EditIssueLayout";

const EditIssuePage = async ({ params }: PageProps) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();
  return <EditIssueLayout issue={issue} />;
};

export default EditIssuePage;
