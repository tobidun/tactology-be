import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UnauthorizedException } from "@nestjs/common";

@Catch()
export class GqlExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    //@ts-ignore
    const gqlContext = GqlExecutionContext.create(host);
    const response = gqlContext.getContext().res;

    // Default values for error response
    let status = 500;
    let message = "An unexpected error occurred";
    let errorCode = "INTERNAL_SERVER_ERROR";
    let stacktrace: string | undefined;

    // Check if the exception is an instance of HttpException
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      errorCode = "CUSTOM_ERROR"; // Customize error codes as needed
      stacktrace =
        process.env.NODE_ENV === "development" ? exception.stack : undefined;

      // Handle specific exceptions like UnauthorizedException
      if (exception instanceof UnauthorizedException) {
        errorCode = "UNAUTHENTICATED";
        message = "Invalid credentials"; // You can customize the message
      }
    } else {
      // Handle non-HttpException errors
      message =
        exception instanceof Error ? exception.message : String(exception);
    }

    // Log the error only in development mode
    if (process.env.NODE_ENV === "development") {
      console.error(exception);
    }

    // Send the error response in GraphQL format
    response?.status(status).json({
      errors: [
        {
          message,
          error: errorCode,
          statusCode: status,
          extensions: {
            errorCode,
            stacktrace, // Include stack trace in development
          },
        },
      ],
      data: null,
    });
  }
}
