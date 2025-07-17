import React from "react";
import IssuesTable from "../components/IssuesTable";
import IssueActions from "./IssueActions";

export type IssueSkeleton = {
  id: number;
  title: null;
  status: null;
  createdAt: null;
};

const LoadingIssuesPage = () => {
  const issues: IssueSkeleton[] = [1, 2, 3, 4, 5, 6].map((id) => ({
    id,
    title: null,
    status: null,
    createdAt: null,
  }));
  return (
    <>
      <IssueActions />
      <IssuesTable issues={issues} />
    </>
  );
};

export default LoadingIssuesPage;
