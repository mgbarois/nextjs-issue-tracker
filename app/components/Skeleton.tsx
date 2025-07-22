import ReactSkeleton, { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props extends SkeletonProps {
  size?: "xs" | "s";
}

const sizeMap = {
  xs: "3em",
  s: "7em",
  m: "12em",
};

const Skeleton = (props: Props) => {
  //   const skeletonProps = size ? { width: sizeMap[size] } : {};

  const skeletonProps = {
    ...props,
    ...(props.size ? { width: sizeMap[props.size] } : {}),
  };

  return <ReactSkeleton {...skeletonProps} />;
};

export default Skeleton;
