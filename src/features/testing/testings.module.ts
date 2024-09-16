import { Module } from "@nestjs/common";
import { TestingController } from "./api/testing.controller";
import { TestingService } from "./application/testing.service";


@Module({
    imports: [],// нужно ли импортировать модели и сущности ???
    controllers: [TestingController],
    providers: [TestingService],
})
export class TestingsModule {
}