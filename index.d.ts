import * as express from "express-serve-static-core";

// how to extend Request Interface

declare global {
  namespace Express {
    interface Request {
      customField?: string;
    }
  }
}
