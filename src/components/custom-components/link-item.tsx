import Link from "next/link";
import { ReactChild } from "react";

interface LinkItemProps {
  path: string;
  children: React.ReactChild[] | ReactChild;
}

export const LinkItem = ({ path, children }: LinkItemProps) => {
  return (
    <Link href={path}>
      <a>{children}</a>
    </Link>
  );
};
