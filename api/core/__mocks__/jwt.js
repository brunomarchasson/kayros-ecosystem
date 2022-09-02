/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {
  decodeJwt,
  importJWK,
  jwtVerify,
  SignJWT,
} from "jose";
import env from "../../env";

const user ={
  id: 123,
  email: "user@email.com",
  language: "userlang",
}

export async function createToken(user) {
  return new"TOKEN";
} 

export const verifyToken = jest.fn().mockResolvedValue({user})

export function decodeToken(token) {
  return {user}
}

export async function getPrivateKey() {
  if (!privateKeyPromise) privateKeyPromise = importJWK(env.PRIVATE_KEY);
  return await privateKeyPromise;
}
