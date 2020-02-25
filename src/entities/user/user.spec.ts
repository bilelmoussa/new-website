import makeFakeUser from '../../../mock/fakeUser';
import {makeUser} from './';
import faker from 'faker';
import argon2 from 'argon2';


describe('user', () => {
  //  Test User ID
  it('must have valid id', ()=>{
    const id = faker.random.alphaNumeric(20);
    const user = makeFakeUser({_id: id});
    expect(()=> makeUser(user)).toThrow('user must have a valid id.');
  });

  //  Test User First Name
  it('must have a first name', ()=>{
    const user = makeFakeUser({firstName: undefined});
    expect(() =>
      makeUser(user))
        .toThrow('"fullName.firstName" is required');
  });


  it('first name not allowed to be empty', ()=>{
    const user = makeFakeUser({firstName: '  '});
    expect(() =>
      makeUser(user))
        .toThrow('"fullName.firstName" is not allowed to be empty');
  });


  it('first name must be of Type string', ()=>{
    const firstName = faker.random.number(10);
    const user = makeFakeUser({firstName: firstName});
    expect(() =>
      makeUser(user)).toThrow('"fullName.firstName" must be a string');
  });


  it('first name must only contain alpha-numeric characters', ()=>{
    const firstName = faker.random.alphaNumeric(5);
    const user = makeFakeUser({firstName: `${firstName} _?`});
    expect(()=>
      makeUser(user))
        .toThrow(
            '"fullName.firstName" must only contain alpha-numeric characters',
        );
  });


  it('first name must be at least 3 characters long', ()=>{
    const firstName = faker.random.alphaNumeric(2);
    const user = makeFakeUser({firstName: firstName});
    expect(()=> makeUser(user))
        .toThrow(
            '"fullName.firstName" length must be at least 3 characters long',
        );
  });


  it('first name must be less than or equal to 30 characters long', ()=>{
    const firstName = faker.random.alphaNumeric(31);
    const user = makeFakeUser({firstName: firstName});
    expect(()=> makeUser(user))
        .toThrow(
            // eslint-disable-next-line max-len
            '"fullName.firstName" length must be less than or equal to 30 characters long',
        );
  });

  //  Test User Last Name
  it('must have a last name', ()=>{
    const user = makeFakeUser({lastName: undefined});
    expect(() =>
      makeUser(user))
        .toThrow('"fullName.lastName" is required');
  });


  it('last name not allowed to be empty', ()=>{
    const user = makeFakeUser({lastName: ''});
    expect(() =>
      makeUser(user))
        .toThrow('"fullName.lastName" is not allowed to be empty');
  });


  it('last name must be of Type string', ()=>{
    const lastName = faker.random.number(10);
    const user = makeFakeUser({lastName: lastName});
    expect(()=> makeUser(user)).toThrow('"fullName.lastName" must be a string');
  });


  it('last name must only contain alpha-numeric characters', ()=>{
    const lastName = faker.random.alphaNumeric(5);
    const user = makeFakeUser({lastName: `${lastName} _?`});
    expect(()=>
      makeUser(user))
        .toThrow(
            '"fullName.lastName" must only contain alpha-numeric characters',
        );
  });


  it('last name must be less than or equal to 30 characters long', ()=>{
    const lastName = faker.random.alphaNumeric(31);
    const user = makeFakeUser({lastName: lastName});
    expect(()=> makeUser(user))
        .toThrow(
            // eslint-disable-next-line max-len
            '"fullName.lastName" length must be less than or equal to 30 characters long',
        );
  });


  //  Test User Email
  it('must have an email', ()=>{
    const user = makeFakeUser({email: undefined});
    expect(()=> makeUser(user))
        .toThrow('"email" is required');
  });


  it('email must be of Type string', ()=>{
    const email = faker.random.number(10);
    const user = makeFakeUser({email: email});
    expect(()=> makeUser(user)).toThrow('"email" must be a string');
  });


  it('email not allowed to be empty', ()=>{
    const user = makeFakeUser({email: ''});
    expect(()=> makeUser(user))
        .toThrow('"email" is not allowed to be empty');
  });


  it('must have a valid email', ()=>{
    const notValidEmail = faker.random.alphaNumeric(8);
    const user = makeFakeUser({email: notValidEmail});
    expect(()=> makeUser(user))
        .toThrow('"email" must be a valid email');
  });


  //  Test User Role
  it('must have a role', ()=>{
    const user = makeFakeUser({role: 2});
    expect(()=> makeUser(user))
        .toThrow('"role" must be one of [0, 1]');
  });
  it('role must be 0 by default', ()=>{
    const user = makeFakeUser({role: undefined});
    expect(makeUser(user).role).toBe(0);
  });


  //  Test User Password
  it('must have a password', ()=>{
    const user = makeFakeUser({password: undefined});
    expect(()=> makeUser(user))
        .toThrow('"password" is required');
  });


  it('password is not allowed to be empty', ()=>{
    const user = makeFakeUser({password: ''});
    expect(()=> makeUser(user))
        .toThrow('"password" is not allowed to be empty');
  });


  it('password must be of Type string', ()=>{
    const user = makeFakeUser({password: 12356});
    expect(()=> makeUser(user)).toThrow('"password" must be a string');
  });


  it('password must be at least 8 characters long', ()=>{
    const password = faker.random.alphaNumeric(7);
    const user = makeFakeUser({password: password});
    expect(()=> makeUser(user))
        .toThrow('"password" length must be at least 8 characters long');
  });


  it('password must only contain alpha-numeric characters', ()=>{
    const password = faker.random.alphaNumeric(9);
    const user = makeFakeUser({password: `${password} ?_`});
    expect(()=>
      makeUser(user))
        .toThrow(
            '"password" must only contain alpha-numeric characters',
        );
  });


  it('password must be less than or equal to 30 characters long', ()=>{
    const password = faker.random.alphaNumeric(31);
    const user = makeFakeUser({password: password});
    expect(()=> makeUser(user))
        .toThrow(
            // eslint-disable-next-line max-len
            '"password" length must be less than or equal to 30 characters long',
        );
  });


  it('Check Password hash', async ()=>{
    const password = 'Test123456789';
    const fakeUser =
    makeFakeUser({password: password, repeatPassword: password});
    const user = makeUser(fakeUser);
    const hashPswd = await user.makePswHash();
    const result = await argon2.verify(hashPswd, password);
    const result2 = await argon2.verify(hashPswd, 'randomtext');
    expect(result).toBeDefined();
    expect(result).toBeTruthy();
    expect(result2).toBeDefined();
    expect(result2).toBeFalsy();
  });


  //  Test User Repeat Password
  it('must have a repeat password', ()=>{
    const user = makeFakeUser({repeatPassword: undefined});
    expect(()=> makeUser(user))
        .toThrow('"repeatPassword" is required');
  });
  it('repeat password must be equal to password', ()=>{
    const user = makeFakeUser(
        {
          password: faker.random.alphaNumeric(14),
          repeatPassword: faker.random.alphaNumeric(20),
        },
    );
    expect(()=> makeUser(user))
        .toThrow('"repeatPassword" must be [ref:password]');
  });


  //  Test User CreatedOn
  it('createdOn is required', ()=>{
    const user = makeFakeUser({createdOn: undefined});
    expect(()=> makeUser(user))
        .toThrow('"createdOn" is required');
  });


  it('createdOn must be valid date', ()=>{
    const createdOn = faker.random.number(4);
    const user = makeFakeUser({createdOn: createdOn});
    expect(()=> makeUser(user))
        .toThrow('"createdOn" must be a valid date');
  });


  it('createdOn must be of Type ISO 8601 date format', ()=>{
    const createdOn = new Date().toString();
    const user = makeFakeUser({createdOn: createdOn});
    expect(()=> makeUser(user))
        .toThrow('"createdOn" must be in ISO 8601 date format');
  });


  // eslint-disable-next-line max-len
  it('createdOn must be larger than or equal to 2019-12-31T23:00:00 ', ()=>{
    const createdOn = new Date(2019, 11, 31, 23, 59, 59, 0);
    const user = makeFakeUser({createdOn: createdOn});
    expect(()=> makeUser(user))
        // eslint-disable-next-line max-len
        .toThrow('"createdOn" must be larger than or equal to "2019-12-31T23:00:00.000Z"');
  });


  // Test User ModifiedOn
  it('modifiedOn is required', ()=>{
    const user = makeFakeUser({modifiedOn: undefined});
    expect(()=> makeUser(user))
        .toThrow('"modifiedOn" is required');
  });


  it('modifiedOn must be valid date', ()=>{
    const modifiedOn = faker.random.number(4);
    const user = makeFakeUser({modifiedOn: modifiedOn});
    expect(()=> makeUser(user))
        .toThrow('"modifiedOn" must be a valid date');
  });


  it('modifiedOn must be of Type ISO 8601 date format', ()=>{
    const modifiedOn = new Date().toString();
    const user = makeFakeUser({modifiedOn: modifiedOn});
    expect(()=> makeUser(user))
        .toThrow('"modifiedOn" must be in ISO 8601 date format');
  });


  // eslint-disable-next-line max-len
  it('modifiedOn must be larger than or equal to 2019-12-31T23:00:00 ', ()=>{
    const modifiedOn = new Date(2019, 11, 31, 23, 59, 59, 0);
    const user = makeFakeUser({modifiedOn: modifiedOn});
    expect(()=> makeUser(user))
        // eslint-disable-next-line max-len
        .toThrow('"modifiedOn" must be larger than or equal to "2019-12-31T23:00:00.000Z"');
  });


  //  Test MakeHash
  it('include a Hash', ()=>{
    const fakeUser = makeFakeUser(
        {
          _id: 'ck5zix9rm0000ckxpc7q789xp',
          firstName: 'firstnametest',
          lastName: 'lastnametest',
          email: 'test@gmail.com',
          role: 0,
        },
    );
    const user = makeUser(fakeUser);
    const hash = user.makeHash();
    expect(hash).toEqual('2cefc1123ec95238a0abef083f733421');
  });
});
