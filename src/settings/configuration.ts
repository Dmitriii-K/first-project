export enum Environments {
    DEVELOPMENT = 'DEVELOPMENT',
    STAGING = 'STAGING',
    PRODUCTION = 'PRODUCTION',
    TEST = 'TEST',
}

export type EnvironmentVariable = { [key: string]: string | undefined };

export type ConfigurationType = ReturnType<typeof getConfig>;

const getConfig = (
    environmentVariables: EnvironmentVariable,
    currentEnvironment: Environments,
) => {
    return {
    apiSettings: {
        PORT: Number.parseInt(environmentVariables.PORT || '3003'),
        LOCAL_HOST: environmentVariables.LOCAL_HOST || 'http://localhost:3007', //"mongodb://0.0.0.0:27017" ???
        PUBLIC_FRIEND_FRONT_URL: environmentVariables.PUBLIC_FRIEND_FRONT_URL,
    },

    databaseSettings: {
        MONGO_CONNECTION_URI: environmentVariables.MONGO_CONNECTION_URI,
        MONGO_CONNECTION_URI_FOR_TESTS: environmentVariables.MONGO_CONNECTION_URI_FOR_TESTS
    },

    environmentSettings: {
        currentEnv: currentEnvironment,
        isProduction: currentEnvironment === Environments.PRODUCTION,
        isStaging: currentEnvironment === Environments.STAGING,
        isTesting: currentEnvironment === Environments.TEST,
        isDevelopment: currentEnvironment === Environments.DEVELOPMENT,
    },

    nodemailerSettings: {
        PASSWORD_BY_EMAIL: environmentVariables.PASSWORD_BY_EMAIL
    },

    jwtSecuritySettings: {
        JWT_SECRET_KEY: environmentVariables.JWT_SECRET_KEY
    },

    basicAuthSettings: {
        ADMIN_NAME: environmentVariables.ADMIN_NAME,
        ADMIN_PASS: environmentVariables.ADMIN_PASS
        // ADMIN: environmentVariables.ADMIN
    }
    };
};

export default () => {
    const environmentVariables = process.env;

    console.log('process.env.ENV =', environmentVariables.ENV);
    const currentEnvironment: Environments = environmentVariables.ENV as Environments;

    return getConfig(environmentVariables, currentEnvironment);
};