interface AsideProps extends React.HTMLAttributes<HTMLElement> {}

export function Aside(props: AsideProps) {
  return (
    <aside
      className="rounded-md border-l-4 border-primary-500 bg-primary-100 pl-3 pr-4 py-2 text-justify"
      {...props}
    />
  );
}
