import React from "react";
import IssuesTable from "./IssuesTable";
import IssueActions from "./IssueActions";

const LoadingIssuesPage = () => {
  const issues: undefined[] = Array(6).fill(undefined);

  return (
    <>
      <IssueActions />
      <IssuesTable issues={issues} />
    </>
  );
};

export default LoadingIssuesPage;
