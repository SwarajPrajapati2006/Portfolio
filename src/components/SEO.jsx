import { Helmet } from "react-helmet-async";

const SEO = ({ title, description }) => (
  <Helmet>
    <title>{title || "Swaraj Prajapati | Full Stack Developer"}</title>
    <meta name="description" content={description || "Portfolio of Swaraj Prajapati"} />
  </Helmet>
);

export default SEO;
