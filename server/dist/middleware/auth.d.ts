import { Request, Response, NextFunction } from 'express';
interface AuthenticatedRequest extends Request {
    userId?: string;
    userRole?: string;
}
export declare const authenticateToken: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=auth.d.ts.map