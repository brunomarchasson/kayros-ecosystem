import { NextFunction, Request, Response } from 'express';
import authorizationMiddleware from './authJWT';
import {verifyToken} from "../core/jwt";
import { mockedResponse } from '../utils/testUtils';

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
    let mockResponse;
    let nextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {

        };
        mockResponse = mockedResponse()
    });
    test('without headers', async () => {
        await authorizationMiddleware(mockRequest , mockResponse , nextFunction);

        expect(mockResponse._status).toBe(403)
        expect(nextFunction).not.toBeCalled();
        expect(mockResponse.send).toBeCalled()
    });

    test('without "authorization" header', async () => {
        const expectedResponse = {
            "error": "Missing JWT token from the 'Authorization' header"
        };
        mockRequest = {
            headers: {
            }
        }
        await authorizationMiddleware(mockRequest , mockResponse, nextFunction);

        expect(mockResponse._status).toBe(403)
        expect(nextFunction).not.toBeCalled();
        expect(mockResponse.send).toBeCalled()

    });

    test('with "bad authorization" header', async () => {
        mockRequest = {
            headers: {
                'x-access-token': 'XXX'
            }
        }
        verifyToken.mockRejectedValueOnce('')
        await authorizationMiddleware(mockRequest, mockResponse , nextFunction);
        expect(mockResponse._status).toBe(401)
        expect(mockResponse.send).toBeCalled()
        expect(nextFunction).not.toBeCalled();
    });
    test('with "authorization" header', async () => {
        mockRequest = {
            headers: {
                'x-access-token': 'XXX'
            }
        }
        await authorizationMiddleware(mockRequest, mockResponse , nextFunction);

        expect(mockResponse.send).not.toBeCalled()
        expect(nextFunction).toBeCalledTimes(1);
    });
});
