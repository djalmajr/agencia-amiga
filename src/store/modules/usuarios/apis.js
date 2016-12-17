import { createHash } from 'crypto';
import { Url } from '~/constants';
import { postForm } from '~/helpers/ajax';

export const login = (username, password) => {
  const data = {
    userName: username,
    password: createHash('sha512').update(password).digest('hex'),
    password2: createHash('md5').update(password).digest('hex'),
  };

  return postForm(`${Url.BASE}/authorization`, data, { cors: false });
};

export const logout = () => postForm(
  `${Url.BASE}/authorization`,
  { action: 'logout' },
  { cors: false },
);
