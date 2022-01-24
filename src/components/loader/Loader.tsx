import "./Loader.css";

export const Loader = () => {
  return (
    <svg viewBox="25 25 50 50" className="loader-svg">
      <circle cx="50" cy="50" r="10" className="loader-circle" />
    </svg>
  );
};

export const CenteredLoader = () => {
  return (
    <div className="loader-container">
      <Loader />
    </div>
  );
};
