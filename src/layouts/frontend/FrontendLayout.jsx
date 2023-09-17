import Footer from "./Footer";
import Navbar from "./Navbar";
// import PropTypes from "prop-types";
const FrontendLayout = ({ children }) => {
  return (
    <div>
      <Navbar />

      <div className="container-fluid ">{children}</div>
      <Footer />
    </div>
  );
};
// FrontendLayout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default FrontendLayout;
