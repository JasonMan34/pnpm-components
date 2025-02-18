import path from 'path'
import { createAllowBuildFunction } from './policy'

it('should neverBuiltDependencies', () => {
  const allowBuild = createAllowBuildFunction({
    neverBuiltDependencies: ['foo'],
  })
  expect(allowBuild('foo')).toBeFalsy()
  expect(allowBuild('bar')).toBeTruthy()
})

it('should onlyBuiltDependencies', () => {
  const allowBuild = createAllowBuildFunction({
    onlyBuiltDependencies: ['foo'],
  })
  expect(allowBuild('foo')).toBeTruthy()
  expect(allowBuild('bar')).toBeFalsy()
})

it('should onlyBuiltDependencies set via a file', () => {
  const allowBuild = createAllowBuildFunction({
    onlyBuiltDependenciesFile: path.join(__dirname, 'onlyBuild.json'),
  })
  expect(allowBuild('zoo')).toBeTruthy()
  expect(allowBuild('qar')).toBeTruthy()
  expect(allowBuild('bar')).toBeFalsy()
})

it('should onlyBuiltDependencies set via a file and config', () => {
  const allowBuild = createAllowBuildFunction({
    onlyBuiltDependencies: ['bar'],
    onlyBuiltDependenciesFile: path.join(__dirname, 'onlyBuild.json'),
  })
  expect(allowBuild('zoo')).toBeTruthy()
  expect(allowBuild('qar')).toBeTruthy()
  expect(allowBuild('bar')).toBeTruthy()
  expect(allowBuild('esbuild')).toBeFalsy()
})

it('should return undefined if no policy is set', () => {
  expect(createAllowBuildFunction({})).toBeUndefined()
})
