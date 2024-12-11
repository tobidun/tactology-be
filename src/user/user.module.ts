import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { UserResolver } from "./user.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRepository, UserResolver],
  exports: [UserService],
})
export class UserModule {}
