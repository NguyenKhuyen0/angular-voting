import { KeycloakConfig } from 'keycloak-angular'

let keycloakConfig: KeycloakConfig = {
    url: 'https://id.360life.vn/auth/',
    realm: 'master',
    clientId: 'idesign-dev'
}

export const environment = {
    production: true,
    keycloak: keycloakConfig,
    SERVER: 'https://api.360life.vn/lostbird/',
    API: 'content/v1',
    NO_ADS: [2]
}
