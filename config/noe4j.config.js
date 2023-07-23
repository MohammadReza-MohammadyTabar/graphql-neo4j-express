import neo4j from 'neo4j-driver'


let driver

export async function initDriver(url, username, password) {
    driver = neo4j.driver(
        url,
        neo4j.auth.basic(
            username,
            password
        )
    )

    await driver.verifyConnectivity()

    return driver
}


export function getDriver() {
    return driver
}


export async function closeDriver() {
    if (driver) {
        await driver.close()
    }
}

