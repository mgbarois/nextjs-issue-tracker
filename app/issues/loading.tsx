import IssueActions from "./IssueActions";
import IssuesTable from "./IssuesTable";

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
