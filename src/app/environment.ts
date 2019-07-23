import { KeycloakConfig } from 'keycloak-angular'

let keycloakConfig: KeycloakConfig = {
    url: 'https://id.360life.vn/auth/',
    realm: 'master',
    clientId: 'voting-dev'
}

export const environment = {
    production: true,
    keycloak: keycloakConfig,
    SERVER: 'https://api.360life.vn/lostbird/',
    API: 'content/v1',
    NO_ADS: [2],
    optionsUrlAPI: 'http://voting.local:8000/api/v1/options',
    questionsUrlAPI: 'http://voting.local:8000/api/v1/questions',
    votingUrlAPI: 'http://voting.local:8000/api/v1/votings',
    voteUrl:  'http://voting.local:8000/api/v1/vote',
    votesUrl: 'http://voting.local:8000/api/v1/votes',
    urlMedia: 'http://voting.local:8000/images/',
}

