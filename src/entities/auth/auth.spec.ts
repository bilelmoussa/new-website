/* eslint-disable max-len */
import {refreshTokenSecret, accessTokenSecret} from '../../config';
import {generateToken} from '../token';
import auth from './';


const payload = {
  fullname: {
    firstName: 'test',
    lastName: 'test123',
  },
  email: 'test@gmail.com',
  role: 1,
};


const expiresIn = 90000;


describe('auth-test', () => {
  it('add valid tokens to auth, must succeed', async () => {
    const refreshToken = generateToken({payload, expiresIn, secret: refreshTokenSecret});
    const accessToken = generateToken({payload, expiresIn, secret: accessTokenSecret});

    const authResp = await auth({accessToken, refreshToken});

    expect(authResp).toBeTruthy();
  });


  it('add empty refresh token to auth, must throw an error', async () => {
    const refreshToken = '';
    const accessToken = generateToken({payload, expiresIn, secret: accessTokenSecret});

    await expect(auth({accessToken, refreshToken})).rejects.toThrowError('"token" is not allowed to be empty');
  });


  it('add empty access token to auth, must throw an error', async () => {
    const refreshToken = generateToken({payload, expiresIn, secret: refreshTokenSecret});
    const accessToken = '';

    await expect(auth({accessToken, refreshToken})).rejects.toThrowError('"token" is not allowed to be empty');
  });


  it('add access token with diffrent secret to auth, must throw an error', async () => {
    const refreshToken = generateToken({payload, expiresIn, secret: refreshTokenSecret});
    const accessToken = generateToken({payload, expiresIn, secret: refreshTokenSecret});

    await expect(auth({accessToken, refreshToken})).rejects.toThrowError('invalid signature');
  });


  it('add refresh token with diffrent secret to auth, must throw an error', async () => {
    const refreshToken = generateToken({payload, expiresIn, secret: accessTokenSecret});
    const accessToken = generateToken({payload, expiresIn, secret: accessTokenSecret});

    await expect(auth({accessToken, refreshToken})).rejects.toThrowError('invalid signature');
  });


  it('add expired access token, must throw and error', async () => {
    const jwtExpiredAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6eyJmaXJzdE5hbWUiOiJ0ZXN0IiwibGFzdE5hbWUiOiJ0ZXN0MTIzIn0sImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJyb2xlIjoxLCJpYXQiOjE1ODI2MzY1MzMsImV4cCI6MTU4MjYzNjU4M30.RvmZHmuNUqirmXxzqkuxM2-2vGIv0ZVqEvU0ufN5xUs';
    const refreshToken = generateToken({payload, expiresIn, secret: refreshTokenSecret});

    await expect(auth({accessToken: jwtExpiredAccessToken, refreshToken})).rejects.toThrowError('jwt expired');
  });


  it('add expired refresh token, must throw and error', async () => {
    const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6eyJmaXJzdE5hbWUiOiJ0ZXN0IiwibGFzdE5hbWUiOiJ0ZXN0MTIzIn0sImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJyb2xlIjoxLCJpYXQiOjE1ODI2MzY5MTQsImV4cCI6MTU4MjYzNzAwNH0.UJ6Bfa-aBCxY42MnaxHoZpdCe-B6VLwYFWXIf0NUVuA';
    const accessToken = generateToken({payload, expiresIn, secret: accessTokenSecret});

    await expect(auth({accessToken, refreshToken})).rejects.toThrowError('jwt expired');
  });


  it('add not usable refresh token, must throw and error', async () => {
    const refreshToken = '<script></script>';
    const accessToken = generateToken({payload, expiresIn, secret: accessTokenSecret});

    await expect(auth({accessToken, refreshToken})).rejects.toThrowError('refresh Token is not usable');
  });


  it('add not usable access token, must throw and error', async () => {
    const refreshToken = generateToken({payload, expiresIn, secret: refreshTokenSecret});
    const accessToken = '<script></script>';

    await expect(auth({accessToken, refreshToken})).rejects.toThrowError('access Token is not usable');
  });


  it('add usable access string but not valid jwt token, must throw and error', async () => {
    const refreshToken = generateToken({payload, expiresIn, secret: refreshTokenSecret});
    const accessToken = '<script></script>testing sanitize-html';

    await expect(auth({accessToken, refreshToken})).rejects.toThrowError('jwt malformed');
  });


  it('add usable refresh token string but not valid jwt token, must throw and error', async () => {
    const refreshToken = '<script></script>testing sanitize-html';
    const accessToken = generateToken({payload, expiresIn, secret: accessTokenSecret});

    await expect(auth({accessToken, refreshToken})).rejects.toThrowError('jwt malformed');
  });


  it('add bad access jwt token, sanitize the bad token, auth must succeed', async () => {
    const refreshToken = generateToken({payload, expiresIn, secret: refreshTokenSecret});
    const accessToken = generateToken({payload, expiresIn, secret: accessTokenSecret});
    const badAccessToken = `<script></script>${accessToken}`;

    await expect(auth({accessToken: badAccessToken, refreshToken})).resolves.toBeTruthy();
  });

  it('add bad refresh jwt token, sanitize the bad token, auth must succeed', async () => {
    const refreshToken = generateToken({payload, expiresIn, secret: refreshTokenSecret});
    const accessToken = generateToken({payload, expiresIn, secret: accessTokenSecret});
    const badRefreshToken = `<script></script>${refreshToken}`;

    await expect(auth({accessToken, refreshToken: badRefreshToken})).resolves.toBeTruthy();
  });
});
