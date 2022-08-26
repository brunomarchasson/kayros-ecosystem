/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {
  decodeJwt,
  importJWK,
  jwtVerify,
  SignJWT,
} from "jose";
import env from "../env";

let privateKeyPromise;

export async function createToken(user) {
  const now = Math.floor(Date.now() / 1000);

  return await new SignJWT({
    user
  })
    .setProtectedHeader({ typ: "JWT", alg: "RS256" })
    .setIssuer(env.APP_ORIGIN)
    .setAudience(env.APP_ORIGIN)
    .setSubject(user.id)
    .setIssuedAt(now)
    .setExpirationTime(now + env.SESSION_EXPIRES)
    .sign(await getPrivateKey());
}

export async function verifyToken(token) {
  const result = await jwtVerify(token, await getPrivateKey(), {
    issuer: env.APP_ORIGIN,
    audience: env.APP_ORIGIN,
  });

  return result.payload;
}

export function decodeToken(token) {
  return decodeJwt(token);
}

export async function getPrivateKey() {
  if (!privateKeyPromise) privateKeyPromise = importJWK(env.PRIVATE_KEY);
  return await privateKeyPromise;
}
