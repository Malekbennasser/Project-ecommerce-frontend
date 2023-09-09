import Navbar from "./Navbar";
// import PropTypes from "prop-types";

const FrontendLayout = ({ children }) => {
  return (
    <div>
      <Navbar />

      <div>{children}</div>
    </div>
  );
};
// FrontendLayout.propTypes = {
//   children: PropTypes.node.isRequired, // Validez que children est de type 'node'
// };
export default FrontendLayout;
