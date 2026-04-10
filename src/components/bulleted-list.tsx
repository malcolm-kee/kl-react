interface BulletedListProps extends React.HTMLAttributes<HTMLUListElement> {}

export function BulletedList(props: BulletedListProps) {
  return <ul className="list-disc pl-3" {...props} />;
}
