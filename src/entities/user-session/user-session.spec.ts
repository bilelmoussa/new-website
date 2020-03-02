/* eslint-disable one-var */
/* eslint-disable max-len */
import makeFakeUserSession from '../../../mock/fakeUserSession';
import makeUserSession from './';
import faker from 'faker';

describe('user-session-test', () => {
  // Test session userId
  describe('userId', () => {
    it('add random number to userId, must have valid user id', () => {
      const id = faker.random.alphaNumeric(20);
      const userSession = makeFakeUserSession({userId: id});

      expect(()=> makeUserSession(userSession)).toThrow('user id is not valid');
    });
  });


  // Test session sessionId
  describe('sessionId', () => {
    it('add random number to sessionId, must have valid session id', () => {
      const id = faker.random.alphaNumeric(20);
      const userSession = makeFakeUserSession({sessionId: id});

      expect(()=> makeUserSession(userSession)).toThrow('session id is not valid');
    });
  });


  // Test session access Token/refresh Token
  describe('access Token / refresh Token', () => {
    it('add random alphaNumeric to accessToken, must have valid access token', () => {
      const accessToken = faker.random.alphaNumeric(20);
      const userSession = makeFakeUserSession({accessToken: accessToken});

      expect(()=> makeUserSession(userSession)).toThrow('jwt malformed');
    });

    it('add access token with different secret, must have valid access token', () => {
      const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNrN2FreGc1dTAwMDBoOHhwNWY1Z2I1Z2giLCJlbWFpbCI6IkNhcmV5NzBAaG90bWFpbC5jb20iLCJmdWxsTmFtZSI6eyJmaXJzdE5hbWUiOiJmaXJzdG5hbWV0ZXN0IiwibGFzdE5hbWUiOiJsYXN0bmFtZXRlc3QifSwicm9sZSI6MCwiY3JlYXRlZE9uIjoiMjAyMC0wMy0wMlQxNDo0OTozMi45NDdaIiwibW9kaWZpZWRPbiI6IjIwMjAtMDMtMDJUMTQ6NDk6MzIuOTQ3WiIsImlhdCI6MTU4MzE2MDU3MiwiZXhwIjoxNTgzMjUwNTcyfQ.wZkzhCog35HoDgvPaPRL1RpQD3inAYgeCM8yNP1InZE';
      const userSession = makeFakeUserSession({accessToken: accessToken});

      expect(()=> makeUserSession(userSession)).toThrow('invalid signature');
    });

    it('add expired token to accessToken, must have valid access token', () => {
      const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNrN2FsMXJoZTAwMDBsa3hwNnQzcjFmZWQiLCJlbWFpbCI6IkVkZW42MkBnbWFpbC5jb20iLCJmdWxsTmFtZSI6eyJmaXJzdE5hbWUiOiJmaXJzdG5hbWV0ZXN0IiwibGFzdE5hbWUiOiJsYXN0bmFtZXRlc3QifSwicm9sZSI6MCwiY3JlYXRlZE9uIjoiMjAyMC0wMy0wMlQxNDo1Mjo1NC4yNDJaIiwibW9kaWZpZWRPbiI6IjIwMjAtMDMtMDJUMTQ6NTI6NTQuMjQyWiIsImlhdCI6MTU4MzE2MDc3NCwiZXhwIjoxNTgzMTYwODI0fQ.2XRioGdDsZdBa5Yvxzmu1tv5oY36jGzWBeOhKr2JWPg';
      const userSession = makeFakeUserSession({accessToken: accessToken});

      expect(()=> makeUserSession(userSession)).toThrow('jwt expired');
    });

    it('add random alphaNumeric to refreshToken, must have valid refresh token', () => {
      const refreshToken = faker.random.alphaNumeric(20);
      const userSession = makeFakeUserSession({refreshToken: refreshToken});

      expect(()=> makeUserSession(userSession)).toThrow('jwt malformed');
    });

    it('add refresh token with different secret, must have valid refresh token', () => {
      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNrN2FsOGVpNzAwMDA2Z3hwYXUzd2JtdXoiLCJlbWFpbCI6IkxpbmRzYXkuV2lsbG1zNThAeWFob28uY29tIiwiZnVsbE5hbWUiOnsiZmlyc3ROYW1lIjoiZmlyc3RuYW1ldGVzdCIsImxhc3ROYW1lIjoibGFzdG5hbWV0ZXN0In0sInJvbGUiOjAsImNyZWF0ZWRPbiI6IjIwMjAtMDMtMDJUMTQ6NTg6MDQuMDE1WiIsIm1vZGlmaWVkT24iOiIyMDIwLTAzLTAyVDE0OjU4OjA0LjAxNVoiLCJpYXQiOjE1ODMxNjEwODQsImV4cCI6MTU4MzE2MTEzNH0.ZGCeYa5Cc5-hwY-hM0EcLGoqidjCRTsaNLqrLXlCfyA';
      const userSession = makeFakeUserSession({refreshToken: refreshToken});

      expect(()=> makeUserSession(userSession)).toThrow('invalid signature');
    });

    it('add expired token to refreshToken, must have valid refresh token', () => {
      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNrN2FsYjhpajAwMDBic3hwZnYzZWJ6anoiLCJlbWFpbCI6IldheWxvbl9IYWdlbmVzNzJAeWFob28uY29tIiwiZnVsbE5hbWUiOnsiZmlyc3ROYW1lIjoiZmlyc3RuYW1ldGVzdCIsImxhc3ROYW1lIjoibGFzdG5hbWV0ZXN0In0sInJvbGUiOjAsImNyZWF0ZWRPbiI6IjIwMjAtMDMtMDJUMTU6MDA6MTYuMjIwWiIsIm1vZGlmaWVkT24iOiIyMDIwLTAzLTAyVDE1OjAwOjE2LjIyMFoiLCJpYXQiOjE1ODMxNjEyMTYsImV4cCI6MTU4MzE2MTI2Nn0.zF32l9GMm7h96eO4ZEjAJ8MWGrmdNyKo8AbdcchTn5A';
      const userSession = makeFakeUserSession({refreshToken: refreshToken});

      expect(()=> makeUserSession(userSession)).toThrow('jwt expired');
    });
  });


  //  Test session userHash
  describe('user Hash', () => {
    it('add undefined user Hash, user session must have userHash', () => {
      const userHash = undefined;
      const userSession = makeFakeUserSession({userHash: userHash});

      expect(()=> makeUserSession(userSession)).toThrow('"userHash" is required');
    });

    it('add empty user Hash, user session must have userHash', () => {
      const userHash = '';
      const userSession = makeFakeUserSession({userHash: userHash});

      expect(()=> makeUserSession(userSession)).toThrow('"userHash" is not allowed to be empty');
    });

    it('add user Hash of type number, userHash must be of type string', () => {
      const userHash = faker.random.number(10);
      const userSession = makeFakeUserSession({userHash: userHash});

      expect(()=> makeUserSession(userSession)).toThrow('"userHash" must be a string');
    });

    it('add non alphaNumeric user Hash, userHash must be alphaNumeric', () => {
      const userHash = faker.random.alphaNumeric(5);
      const userSession = makeFakeUserSession({userHash: `${userHash} _?`});

      expect(()=> makeUserSession(userSession)).toThrow('"userHash" must only contain alpha-numeric characters');
    });
  });


  //  Test user session Role
  describe('user role', () => {
    it('add different value to userRole, user role must be one of 0 and 1', ()=>{
      const user = makeFakeUserSession({userRole: 2});

      expect(()=> makeUserSession(user)).toThrow('"userRole" must be one of [0, 1]');
    });

    it('add undefined userRole, user role must be 0 by default', ()=>{
      const user = makeFakeUserSession({role: undefined});

      expect(makeUserSession(user).userRole).toBe(0);
    });
  });
});

