import { Logger, NestMiddleware, Req } from "@nestjs/common";

export class loggerMiddleware implements NestMiddleware{
    private logger:Logger = new Logger();
    use(req: Request, res: Response, next: Function){
        let dateNow = new Date(Date.now());
        const logObject =  {
            Date: dateNow.toString(),
            url: req.url,
            Method: req.method,
        }
        this.logger.debug(logObject)
        next();
    }
}