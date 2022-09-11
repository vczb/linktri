import { FormEvent, useCallback } from "react";
import { GridMain, Heading, media } from "sagu-ui/lib";
import styled, { css } from "styled-components";
import Form from "./Form";

const Wrapper = styled.div`
  ${({ theme }) => css`
    place-self: center;
    justify-self: center;
    display: grid;
    grid-gap: ${theme.spacings.xsmall};
    grid-gap: ${theme.spacings.xsmall};
    &:first-child {
      margin: ${theme.spacings.large} 0;
    }
  `}
`;

const FormGroup = styled(Wrapper)`
  ${media.sm`
    grid-template-columns: 1fr 1fr;  
  `}
`;

export default function Auth() {
  const handleSignIn = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data?.get("email");
    const password = data?.get("password");
    console.log(email, password);
  }, []);
  const handleSignUp = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data?.get("email");
    const password = data?.get("password");
    console.log(email, password);
  }, []);

  return (
    <GridMain>
      <Wrapper>
        <Heading>We are so glad having you here!</Heading>
        <FormGroup>
          <Form
            handleSubmit={handleSignIn}
            title="Welcome back"
            callToAction="Login"
          />
          <Form
            handleSubmit={handleSignUp}
            title="Create account"
            callToAction="Register"
          />
        </FormGroup>
      </Wrapper>
    </GridMain>
  );
}
