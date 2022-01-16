import { combine } from "../../logic/classnames";
import "./Section.css";

interface Props {
  className?: string;
  children: [React.ReactNode, React.ReactNode];
}

export const Section = (props: Props) => {
  const { children, className } = props;
  const [header, content] = children;

  return (
    <section className={combine("section", className)}>
      <div className="section-title">{header}</div>
      <div className="section-content">{content}</div>
    </section>
  );
};
