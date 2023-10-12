import { useEffect } from "react";
import Nav from "./nav";

const Layout = (props) => {
  useEffect(() => {
    if (props.title) {
      document.title = props.title;
    }
  }, [props.title]);
  return (
    <>
      <Nav />
      <div class="container">{props.children}</div>
    </>
  );
};

export default Layout;
