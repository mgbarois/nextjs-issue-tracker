import { IssueStatusBadge, Skeleton } from "@/app/components";
import { Issue } from "@/generated/prisma";
import { Card, Flex, Heading } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue?: Issue }) => {
  return (
    <>
      <Heading>{issue ? issue.title : <Skeleton />}</Heading>
      <Flex gap="2" my="2">
        <p>
          {issue ? (
            <IssueStatusBadge status={issue.status} />
          ) : (
            <Skeleton size="xs" />
          )}
        </p>
        <p>{issue ? issue.createdAt.toDateString() : <Skeleton size="s" />}</p>
      </Flex>
      <Card className="prose" mt="5">
        {issue ? (
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        ) : (
          <Skeleton count={3} />
        )}
      </Card>
    </>
  );
};

export default IssueDetails;
