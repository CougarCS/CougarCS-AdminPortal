type skeletonProps = {
  height: string;
  width: string;
};

export const Skeleton = ({ height, width }: skeletonProps) => {
  return (
    <div
      className={`${height} ${width} animate-pulse rounded-sm bg-zinc-800`}
    ></div>
  );
};
