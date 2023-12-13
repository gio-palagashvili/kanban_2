import { FC } from "react";

interface LargeHeadingProps {
  children: React.ReactNode;
}

const LargeHeading: FC<LargeHeadingProps> = ({ children }) => {
  // todo add variants
  return <h1 className="text-lg font-bold">{children}</h1>;
};

export default LargeHeading;
