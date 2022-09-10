type BaseResponse = {
  ok?: boolean;
  message?: string;
};

export type User = {
  id: string;
  email: string;
  username: string;
};

export type Link = {
  id: string;
  user: Pick<User, "id">;
  name: string;
  url: string;
  icon?: string;
};

export type Profile = {
  email: Pick<User, "email">;
  username: Pick<User, "username">;
  links?: Link[];
} & BaseResponse;
