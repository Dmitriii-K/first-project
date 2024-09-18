import { IsString } from "class-validator";
import { EnvironmentVariable } from "../configuration";

export class NodemailerSettings {
    constructor(private environmentVariables: EnvironmentVariable) {}
    @IsString()
    PASSWORD_BY_EMAIL: number = Number(this.environmentVariables.PASSWORD_BY_EMAIL);
}