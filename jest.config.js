/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	clearMocks: true,
	coverageProvider: 'v8',
	testTimeout: 50000,
	forceExit: true,
	detectOpenHandles: true,
};
