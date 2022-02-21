module.exports = {
    contracts_build_directory: './nextjs-frontend/src/contracts',
    
    networks: {
        development: {
            host: "127.0.0.1", // Localhost (default: none)
            port: 7545, // Standard Ethereum port (default: none)
            network_id: "5777", // Any network (default: none)
        }
    },

    compilers: {
        solc: {
            version: "^0.8.7",
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },

    // Set default mocha options here, use special reporters etc. 
    mocha: {
        // timeout: 100000
    }
};