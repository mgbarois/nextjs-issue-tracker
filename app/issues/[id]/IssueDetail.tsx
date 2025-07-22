import { Skeleton } from "@/app/components";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Issue } from "@/app/generated/prisma";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

interface Props {
  issue?: Issue;
}

const IssueDetail = ({ issue }: Props) => {
  return (
    <Box className="max-w-xl">
      <Heading>{issue ? issue.title : <Skeleton />}</Heading>
      <Flex gap="2" my="2">
        <p>
          {issue ? (
            <IssueStatusBadge status={issue.status} />
          ) : (
            <Skeleton width="3rem" />
          )}
        </p>
        <p>
          {issue ? issue.createdAt.toDateString() : <Skeleton width="7rem" />}
        </p>
      </Flex>
      <Card className="prose" mt="5">
        {issue ? (
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        ) : (
          <Skeleton count={3} />
        )}
      </Card>
    </Box>
  );
};

export default IssueDetail;
