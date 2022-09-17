/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {
  importJWK,
} from "jose";
import env from "../../env";

const user ={
  id: 123,
  email: "user@email.com",
  language: "userlang",
}

export async function createToken(user) {
  return "TOKEN";
}

export const verifyToken = jest.fn().mockResolvedValue({user})
