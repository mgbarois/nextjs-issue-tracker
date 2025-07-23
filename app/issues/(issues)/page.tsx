import React from "react";
import prisma from "@/prisma/client";
import IssuesTable from "./IssuesTable";
import IssueActions from "./IssueActions";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <>
      <IssueActions />
      <IssuesTable issues={issues} />
    </>
  );
};

// Full Route Cache (cache on the server) stores output of statically-
// rendered routes (in file system) permanently, until re-deployment.

// - Static route (rendered at build time) - w/o parameters
// - Dynamic route (rendered at request/run time) - w/ parameters

// Specify route segment config to opt out of static rendering
// (i.e. render static page as dynamic) and avoid inappropriate caching:
export const dynamic = "force-dynamic";

export default IssuesPage;
