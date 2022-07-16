import styles, { globalStyles } from "./styles";

const AppLayout = ({ children }) => (
  <>
    <div>
      <main>{children}</main>
    </div>
    <style jsx>{styles}</style>
    <style global jsx>
      {globalStyles}
    </style>
  </>
);

export default AppLayout;
