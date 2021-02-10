import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json',
        },
    },
    verbose: true,
    slowTestThreshold: 30000,
    projects: ['<rootDir>'],
    testEnvironment: "node",
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    testPathIgnorePatterns: ['/(?:production_)?node_modules/', '.d.ts$'],
    transform: {
        '^.+\\.[jt]sx?$': 'ts-jest'
    },
    setupFilesAfterEnv: ['./jest.setup.ts'],
    reporters: [
        "default",
        [
            "jest-junit",
            {
                classNameTemplate: (vars) => {
                    return vars.classname;
                },
                titleTemplate: (vars) => {
                    return vars.title;
                }
            }
        ]
    ]
};

export default config;
