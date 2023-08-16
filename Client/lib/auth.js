import { jwtVerify } from 'jose';
export const verifyAuth = async (token) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.SECRET_KEY)
    );
    return verified.payload;
  } catch (err) {
    throw new Error('you token has expired');
  }
};
