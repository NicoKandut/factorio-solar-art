import { combine } from "../../logic/classnames";
import "./Section.css";

interface Props {
  className?: string;
  children:
    | [React.ReactNode, React.ReactNode]
    | [React.ReactNode, React.ReactNode, React.ReactNode];
}

export const Section = (props: Props) => {
  const { children, className } = props;
  const header = children[0];
  const actions = children.length === 3 ? children[1] : null;
  const content = children.length === 3 ? children[2] : children[1];

  return (
    <section className={combine("section", className)}>
      <div className="section-title">
        {header}
        <div className="section-spacer" />
        {actions}
      </div>
      <div className="section-content">{content}</div>
    </section>
  );
};
