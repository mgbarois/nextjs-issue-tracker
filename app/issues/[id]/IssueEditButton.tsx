import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { BsPencilFill } from "react-icons/bs";

const IssueEditButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <BsPencilFill />
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  );
};

export default IssueEditButton;
