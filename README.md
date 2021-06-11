# Create Solana App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Cloning the repository & Installing dependencies
```bash
git clone https://github.com/figment-networks/create-solana-dapp.git
cd create-solana-dapp
yarn
```

Once you've cloned the repo, create an `env.local` file in the root directory. Look at `.env.example` for the required variables.
Check the [DataHub Services Dashboard](https://datahub.figment.io/services/solana) for the RPC node URL and your unique API key.

## Starting the development server

To start the development server and interact with the live application in your browser, run :

```bash
yarn start
```

## Pathway Outline

-  Connect to Solana
1. Create acccount 1
2. Request airdrop to fund account 1
3. Query the starting balance of account 1
4. Create account 2 to send funds to
5. Transfer tokens from account 1 to account 2
6. Query for ending balance of account 1 and account 2 to see changes after transfer


### Additional Materials
- Smart contracts. See example tutorial: https://jamesbachini.com/solana-tutorial/#deploying-a-contract-with-nodejs
