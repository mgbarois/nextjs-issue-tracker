import React from "react";
import prisma from "@/prisma/client";
import IssuesTable from "../components/IssuesTable";
import IssueActions from "./IssueActions";
import delay from "delay";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  await delay(2000);
  return (
    <>
      <IssueActions />
      <IssuesTable issues={issues} />
    </>
  );
};

export default IssuesPage;
