/* eslint-disable max-len */
import {generateToken} from './';
import {verify} from 'jsonwebtoken';

const testSecret = 'testsecret';

const payload = {
  fullname: {
    firstName: 'test',
    lastName: 'test123',
  },
  email: 'test@gmail.com',
  role: 1,
};

const testExpiresIn = 90000;

describe('token-test', () => {
  it('generate token, must be valid token', () => {
    const token = generateToken({payload, expiresIn: testExpiresIn, secret: testSecret});

    const tokenInfo: any = verify(token, testSecret);

    expect(tokenInfo).toBeDefined();
    expect(tokenInfo.fullname.firstName).toEqual(payload.fullname.firstName);
    expect(tokenInfo.fullname.lastName).toEqual(payload.fullname.lastName);
    expect(tokenInfo.email).toEqual(payload.email);
  });


  it('add expired token, verify token, validation must failed', async () => {
    try {
      const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJ0ZXN0IiwibGFzdE5hbWUiOiJ0ZXN0MTIzIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTU4MjU1MjcxMCwiZXhwIjoxNTgyNTUyODAwfQ.UIaU4r3ptmr5Obz6ZdpSQoTtOVraHQ33Aggn8A5UZI4';

      verify(expiredToken, testSecret);
    } catch (err) {
      expect(err.message).toEqual('jwt expired');
    }
  });


  it('add token, verify token with different secret, validation must failed', async () => {
    try {
      const token = generateToken({payload, expiresIn: testExpiresIn, secret: testSecret});

      verify(token, 'fakeTestSecret');
    } catch (err) {
      expect(err.message).toEqual('invalid signature');
    }
  });
});
