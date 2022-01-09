import Header from "src/features/header";
import {
  AnchorLink,
  Footer,
  LandingMain,
  Main,
} from "src/features/shared-styles";
import { Emoji } from "src/features/ui/Emoji";
import { colors } from "src/utils/styles";
import styled from "styled-components";

const SignInLink = styled(AnchorLink)`
  display: grid;
  justify-self: center;
  border-bottom: 1px solid ${colors.greyish()};
  color: ${colors.black()};
`;

const UnauthorizedAccess = () => {
  return (
    <>
      <Header title="Drello" />
      <LandingMain>
        <h1>Login to see this board</h1>
        <p>
          <Emoji label="thinking-face" symbol="🤔" />
          Sorry, looks like you need to login to have access to the board!
        </p>
        <SignInLink href="/signin">
          <a>Go here to Sign In</a>
        </SignInLink>
      </LandingMain>
      <Footer>&copy; 2021 Setunas Team</Footer>
    </>
  );
};

export default UnauthorizedAccess;
