import { IsNumber } from "class-validator";
import { EnvironmentVariable } from "../configuration";

export class JwtSecretSettings {
    constructor(private environmentVariables: EnvironmentVariable) {}
    @IsNumber()
    JWT_SECRET_KEY: number = Number(this.environmentVariables.JWT_SECRET_KEY);
}