import { FormEvent, useCallback, useState } from "react";
import { GridMain, Heading, Radio } from "sagu-ui/lib";
import styled, { css } from "styled-components";
import Form from "./Form";

enum TypeOfForms {
  Register,
  Login,
}

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

const RadioGroup = styled.div`
  ${({ theme }) => css`
    grid-template-columns: 1fr 1fr;
    grid-gap: ${theme.spacings.xsmall};
  `}
`;

const ErrorMessage = styled.b`
  ${({ theme }) => css`
    color: ${theme.colors.base.alert};
  `}
`;

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Auth() {
  const [switchForm, setSwitchForm] = useState<TypeOfForms>(TypeOfForms.Login);
  const [error, setError] = useState("");

  const handleSignIn = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    const email = data?.get("email");
    const password = data?.get("password");

    const url = BASE_URL + "/signin";

    const user = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());

    if (!user.ok) {
      setError(user?.message || "Unexpected error, try again later");
      return;
    }

    console.log(user);
  }, []);
  const handleSignUp = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    const email = data?.get("email");
    const username = data?.get("username");
    const password = data?.get("password");

    const url = BASE_URL + "/signup";

    const user = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    }).then((res) => res.json());

    if (!user.ok) {
      setError(user?.message || "Unexpected error, try again later");
      return;
    }

    console.log(user);
  }, []);
  const handleSwitchForm = useCallback((value) => {
    setError("");
    setSwitchForm(value);
  }, []);

  return (
    <GridMain>
      <Wrapper>
        <Heading>We are so glad having you here!</Heading>
        <RadioGroup>
          <Radio
            title="Login"
            name="switchForm"
            checked={switchForm === TypeOfForms.Login}
            onChange={() => handleSwitchForm(TypeOfForms.Login)}
          />
          <Radio
            title="Register"
            name="switchForm"
            checked={switchForm === TypeOfForms.Register}
            onChange={() => handleSwitchForm(TypeOfForms.Register)}
          />
        </RadioGroup>
        <>
          {switchForm === TypeOfForms.Login && (
            <Form
              handleSubmit={handleSignIn}
              title="Welcome back"
              callToAction="Login"
            />
          )}
          {switchForm === TypeOfForms.Register && (
            <Form
              handleSubmit={handleSignUp}
              title="Create account"
              callToAction="Register"
              hasUsername
            />
          )}
        </>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Wrapper>
    </GridMain>
  );
}
