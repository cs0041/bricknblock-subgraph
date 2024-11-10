
# Real World Asset (RWA) Transaction Platform for Real Estate - Subgraph

This subgraph indexes data for a Real World Asset (RWA) Transaction Platform, focusing on real estate-related transactions. It allows for efficient querying and provides organized data insights into smart contracts deployed on the bsc testnet .

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Building and Deploying](#building-and-deploying)
6. [Querying the Subgraph](#querying-the-subgraph)
7. [File Structure](#file-structure)
8. [Contributing](#contributing)
9. [License](#license)

## Overview

This subgraph is designed to index data for a Real World Asset (RWA) Transaction Platform focusing on real estate. It helps users query key data related to transactions, tokenization, governance mechanisms, fundraising, and more by integrating with smart contracts deployed on the bsc testnet .

## Prerequisites

- Node.js (version >= 14.x)
- Yarn (or npm)
- The Graph CLI

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

## Configuration

Edit the `subgraph.yaml` file as necessary to define your subgraph's data sources, entities, and mappings. For example:

- `subgraph.yaml` file defines the sources, such as smart contract addresses and ABI files.
- Ensure your `schema.graphql` defines the entities and relationships accurately to reflect the RWA transactions.

## Building and Deploying

To build and deploy the subgraph to a Graph Node or The Graph's hosted service, run:

```bash
yarn codegen
yarn build
yarn deploy --product hosted-service <GITHUB_USER>/<SUBGRAPH_NAME>
```

### Commands Explanation:

- `yarn codegen` - Generates types from the GraphQL schema and mappings.
- `yarn build` - Builds the subgraph using the configuration files.
- `yarn deploy` - Deploys the subgraph.

## Querying the Subgraph

Once deployed, you can query the subgraph using GraphQL queries. Visit the GraphQL Playground URL provided after deployment and use queries such as:

```graphql
{
  fundraisings(first: 5) {
    id
    address
    nft {
      id
    }
    owner
  }
}
```

## File Structure

- `schema.graphql` - Defines the data model for the subgraph.
- `subgraph.yaml` - Configures the data sources, mapping files, and contract details.
- Mapping files:
  - `factory-fundraising.ts`
  - `factory-fundraising-dao.ts`
  - `factory-token.ts`
  - `fundraising-dao-template.ts`
  - `fundraising-template.ts`
  - `nft.ts`
  - `property-governance.ts`
  - `property-token-template.ts`

Mapping files contain handlers that transform data from smart contracts into the schema-defined entities.

## Contributing

We welcome contributions! Please feel free to open issues, create pull requests, or give feedback to help improve this project.

## License

This project is licensed under the [MIT License](LICENSE).
