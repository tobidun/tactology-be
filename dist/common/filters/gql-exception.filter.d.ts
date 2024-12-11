import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
export declare class GqlExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
