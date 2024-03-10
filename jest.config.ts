import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  rootDir: 'src',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom'
}

export default config
