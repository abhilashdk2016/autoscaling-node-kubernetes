import { Express, Request, Response } from 'express';
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from './controller/product.controller';
import { createUserSessionHandler, deleteSessionHandler, getuserSessionsHandler } from './controller/session.controller';
import { createUserhandler } from './controller/user.controller';
import { requireUser } from './middleware/requireUser';
import validate from './middleware/validateResource';
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from './schema/product.schema';
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';
function routes(app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    app.post('/api/users', validate(createUserSchema), createUserhandler);
    app.post('/api/sessions', validate(createSessionSchema), createUserSessionHandler);
    app.get('/api/sessions', requireUser, getuserSessionsHandler);
    app.get('/api/sessions', requireUser, deleteSessionHandler);

    app.post('/api/products', [requireUser, validate(createProductSchema)], createProductHandler);
    app.put('/api/products/:productId', [requireUser, validate(updateProductSchema)], updateProductHandler);
    app.get('/api/products/:productId', [validate(getProductSchema)], getProductHandler);
    app.delete('/api/products/:productId', [requireUser, validate(deleteProductSchema)], deleteProductHandler);
}



export default routes;