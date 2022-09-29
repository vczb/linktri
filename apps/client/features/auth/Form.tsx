import { FormEvent } from "react";
import { Button, Heading, media, TextField } from "sagu-ui/lib";
import styled, { css } from "styled-components";

const BaseForm = styled.form`
  ${({ theme }) => css`
    width: fit-content;
    height: fit-content;
    box-shadow: ${theme.shadows.default};
    padding: ${theme.spacings.xsmall};
    display: grid;
    grid-gap: ${theme.spacings.xsmall};

    ${media.sm`
      min-width: 40rem;
    `}
  `}
`;

type FormProps = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  title: string;
  callToAction: string;
  hasUsername?: boolean;
};

const Form = ({
  handleSubmit,
  title,
  callToAction,
  hasUsername,
}: FormProps) => {
  return (
    <BaseForm onSubmit={handleSubmit}>
      <Heading lineColor="primary" lineLeft>
        {title}
      </Heading>
      <TextField name="email" label="email" required />
      {hasUsername && <TextField name="username" label="username" required />}
      <TextField name="password" label="password" type="password" required />
      <Button type="submit" variant="filled">
        {callToAction}
      </Button>
    </BaseForm>
  );
};

export default Form;
