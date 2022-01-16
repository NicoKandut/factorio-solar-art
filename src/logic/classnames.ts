export const combine = (...classNames: Array<string | null | undefined>) => {
  return classNames.filter((classname) => Boolean(classname)).join(" ");
};
