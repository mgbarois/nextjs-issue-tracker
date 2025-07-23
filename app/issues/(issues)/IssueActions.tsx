import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { BiPlus } from "react-icons/bi";

const IssueActions = () => {
  return (
    <div className="mb-5">
      <Button>
        <BiPlus />
        <Link href="/issues/new">Create new issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
