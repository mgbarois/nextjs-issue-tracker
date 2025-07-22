import { Skeleton } from "@/app/components";
import Link from "next/link";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Issue } from "@/app/generated/prisma";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { BsPencilFill } from "react-icons/bs";

interface Props {
  issue?: Issue;
}

const IssueDetail = ({ issue }: Props) => {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box className="max-w-xl">
        <Heading>{issue ? issue.title : <Skeleton />}</Heading>
        <Flex gap="2" my="2">
          <p>
            {issue ? (
              <IssueStatusBadge status={issue.status} />
            ) : (
              <Skeleton size="xs" />
            )}
          </p>
          <p>
            {issue ? issue.createdAt.toDateString() : <Skeleton size="s" />}
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
      <Box className="max-w-xl">
        {issue ? (
          <Button>
            <BsPencilFill />
            <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
          </Button>
        ) : (
          <Skeleton size="s" height="2rem" />
        )}
      </Box>
    </Grid>
  );
};

export default IssueDetail;
