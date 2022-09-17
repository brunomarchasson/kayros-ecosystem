import { NextFunction, Request, Response } from 'express';
import authorizationMiddleware from './authJWT';
import {verifyToken} from "../core/jwt";
import { mockResponse } from '../utils/testUtils';

jest.mock('../core/jwt')
jest.mock('../core/db')

// const _mockResponse = () => {
//     const res = {};
//     res.status = (s) => {
//         res._status= s;
//         return res
//     };//jest.fn().mockReturnValue(res);
//     res.send = jest.fn().mockReturnValue(res);
//     return res;
//   };

describe('Authorization middleware', () => {
    let mockRequest;
    let res;
    let nextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {

        };
        res = mockResponse()
    });
    test('without headers', async () => {
        await authorizationMiddleware(mockRequest , res , nextFunction);

        expect(res._status).toBe(403)
        expect(nextFunction).not.toBeCalled();
        expect(res.send).toBeCalled()
    });

    test('without "authorization" header', async () => {
        const expectedResponse = {
            "error": "Missing JWT token from the 'Authorization' header"
        };
        mockRequest = {
            headers: {
            }
        }
        await authorizationMiddleware(mockRequest , res, nextFunction);

        expect(res._status).toBe(403)
        expect(nextFunction).not.toBeCalled();
        expect(res.send).toBeCalled()

    });

    test('with "bad authorization" header', async () => {
        mockRequest = {
            headers: {
                'x-access-token': 'XXX'
            }
        }
        verifyToken.mockRejectedValueOnce('')
        await authorizationMiddleware(mockRequest, res , nextFunction);
        expect(res._status).toBe(401)
        expect(res.send).toBeCalled()
        expect(nextFunction).not.toBeCalled();
    });
    test('with "authorization" header', async () => {
        mockRequest = {
            headers: {
                'x-access-token': 'XXX'
            }
        }
        await authorizationMiddleware(mockRequest, res , nextFunction);

        expect(res.send).not.toBeCalled()
        expect(nextFunction).toBeCalledTimes(1);
    });
});
