import { styled } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const Logo = styled("div", {
  shouldForwardProp: (propName) => propName !== "url",
})<{ url: string }>(({ url }) => {
  return {
    height: "75px",
    width: "300px",
    backgroundImage: `url(${url})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };
});

const Header = styled("header")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(0, 2),
  borderBottom: "1px solid #ccc",
  "& nav ul": {
    display: "flex",
    listStyle: "none",
    gap: "1rem",
    "& li": {
      "& a": {
        textDecoration: "none",
        color: "black",
      },
    },
  },
}));

const Footer = styled("footer")({
  display: "flex",
  justifyContent: "flex-end",
  padding: "1rem",
  borderTop: "1px solid #ccc",
});

const Main = styled("main")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100vw",
  flexGrow: 1,
  width: "100%",
  overflow: "auto",
  padding: theme.spacing(2),
}));

const MainLayout = () => {
  return (
    <>
      <Header>
        <Logo url="https://cdn.cookielaw.org/logos/def475f4-349f-4a30-b4ca-7276dca9c3e2/b0f91e07-7649-4235-b2bf-60b844418843/9b26ee76-30d1-44f6-b134-576632222639/ec-logo.jpg" />
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/parcs">Parcs</Link>
            </li>
            <li>
              <a
                href="https://www.eurocamp.co.uk/information/about-eurocamp"
                target="_blank"
              >
                About
              </a>
            </li>
          </ul>
        </nav>
      </Header>
      <Main>
        <Outlet />
      </Main>
      <Footer>
        <p>&copy; Aaron Harper Mayo X EuroCamp</p>
      </Footer>
    </>
  );
};

export default MainLayout;
