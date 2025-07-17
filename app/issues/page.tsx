import React from "react";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

const IssuesPage = () => {
  return (
    <div>
      <Link href="/issues/new">
        <Button>Create new issue</Button>
      </Link>
    </div>
  );
};

export default IssuesPage;
