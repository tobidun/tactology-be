import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { AuthModule } from "./auth/auth.module";
import { DepartmentModule } from "./department/department.module";
import { UserModule } from "./user/user.module";
import { join } from "path";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join("schema.gql"),
      sortSchema: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("db.host"),
        port: configService.get<number>("db.port"),
        username: configService.get<string>("db.username"),
        password: configService.get<string>("db.password"),
        database: configService.get<string>("db.database"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    DepartmentModule,
    UserModule,
  ],
})
export class AppModule {}
