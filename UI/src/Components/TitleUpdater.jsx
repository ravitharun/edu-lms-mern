import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const TitleUpdater = () => {
  const location = useLocation();
  const path = location.pathname;

  const formattedPath =
    path === "/" ? "Dashboard" : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2);
    console.log(path,'path')

  return (
    <Helmet>
      <title>LMS | {formattedPath}</title>
      <meta name="description" content="Manage your projects and tasks" />
    </Helmet>
  );
};

export default TitleUpdater;
