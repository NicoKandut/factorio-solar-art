import { combine } from "../../logic/classnames";
import "./Section.css";

interface Props {
  className?: string;
  title: string;
  children: React.ReactNode | [React.ReactNode, React.ReactNode];
}

export const Section = (props: Props) => {
  const { title, children, className } = props;
  const actions = Array.isArray(children) ? children[0] : null;
  const content = Array.isArray(children) ? children[1] : children;

  return (
    <section className={combine("section", className)}>
      <div className="section-title">
        <span>{title}</span>
        <div className="section-spacer" />
        {actions}
      </div>
      <div className="section-content">{content}</div>
    </section>
  );
};
