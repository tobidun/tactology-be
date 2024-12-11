import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as passport from "passport";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  app.enableCors({
    origin: "http://localhost:3001", // Replace with your frontend's URL
    credentials: true, // Enable credentials (e.g., cookies)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", // Allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
