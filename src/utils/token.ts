import jwt from 'jsonwebtoken';
import Customer from '@/resources/customer/customer.interface';
import Token from '@/utils/interfaces/token.interface';

const createAccessToken = async (payload: object): Promise<string> => {
  return jwt.sign({ ...payload }, process.env.JWT_ACCESS_SECRET as jwt.Secret, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });
};

const createRefreshToken = async (payload: object): Promise<string> => {
  return jwt.sign(
    { ...payload },
    process.env.JWT_REFRESH_SECRET as jwt.Secret,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN },
  );
};

export const genarateToken = async (customer: Customer) => {
  const accessToken = await createAccessToken({ id: customer._id });
  const refreshToken = await createRefreshToken({ ...customer });
  
  return { accessToken, refreshToken };
};

export const verifyToken = async (
  token: string,
): Promise<jwt.VerifyErrors | Token> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as jwt.Secret,
      (err, payload) => {
        if (err) return reject(err);

        resolve(payload as Token);
      },
    );
  });
};

export default {
  genarateToken,
  verifyToken,
};
