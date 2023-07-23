
import { config } from 'dotenv'
import { closeDriver, getDriver, initDriver } from '../config/noe4j.config.js'

describe('Initiate Driver', () => {
  beforeAll(() => config())
  afterAll(() => closeDriver())

  it('Should create a driver instance ', async () => {
    const {
      NEO4J_URL,
      NEO4J_PASS,
      NEO4J_USER,
    } = process.env

    expect(NEO4J_URL).toBeDefined()
    expect(NEO4J_USER).toBeDefined()
    expect(NEO4J_PASS).toBeDefined()

    await initDriver(NEO4J_URL, NEO4J_USER, NEO4J_PASS)
  })

  it('Driver has been instantiated', () => {
    const driver = getDriver()
    expect(driver).toBeDefined()

    expect(driver.constructor.name).toEqual('Driver')
  })

  it('Driver can verify connectivity', () => {
    const driver = getDriver()
    expect(driver).toBeDefined()
    expect(driver.constructor.name).toEqual('Driver')

    driver.verifyConnectivity()
        .then(() => {
          expect(true).toEqual(true)
        })
        .catch(e => {
          expect(e).toBeUndefined('Unable to verify connectivity')
        })
  })

})
