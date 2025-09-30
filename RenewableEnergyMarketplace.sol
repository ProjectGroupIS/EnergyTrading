// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title RenewableEnergyMarketplace - Energy trading using GreenToken
import "./GreenToken.sol";

contract RenewableEnergyMarketplace {
    GreenToken public token;

    struct Producer {
        string name;
        uint256 energyProduced; // in kWh
        uint256 pricePerKWh;    // in token units
        bool registered;
    }

    mapping(address => Producer) public producers;

    event ProducerRegistered(address indexed producer, string name);
    event EnergyBought(address indexed buyer, address indexed producer, uint256 amount, uint256 cost);
    event EnergyProduced(address indexed producer, uint256 amount);

    constructor(address tokenAddress) {
        token = GreenToken(tokenAddress);
    }

    /// @notice Register a renewable energy producer
    function registerProducer(string calldata name, uint256 pricePerKWh) external {
        require(!producers[msg.sender].registered, "Already registered");
        producers[msg.sender] = Producer(name, 0, pricePerKWh, true);
        emit ProducerRegistered(msg.sender, name);
    }

    /// @notice Producers add their energy production
    function addEnergyProduction(uint256 amount) external {
        require(producers[msg.sender].registered, "Not a producer");
        producers[msg.sender].energyProduced += amount;
        emit EnergyProduced(msg.sender, amount);
    }

    /// @notice Buy energy from a producer
    function buyEnergy(address producerAddr, uint256 kWh) external {
        Producer storage prod = producers[producerAddr];
        require(prod.registered, "Producer not found");
        require(prod.energyProduced >= kWh, "Not enough energy available");

        uint256 cost = kWh * prod.pricePerKWh;
        require(token.transferFrom(msg.sender, producerAddr, cost), "Token transfer failed");

        prod.energyProduced -= kWh;
        emit EnergyBought(msg.sender, producerAddr, kWh, cost);
    }

    /// @notice View available energy from a producer
    function availableEnergy(address producerAddr) external view returns (uint256) {
        return producers[producerAddr].energyProduced;
    }

    /// @notice View price per kWh of a producer
    function getPrice(address producerAddr) external view returns (uint256) {
        return producers[producerAddr].pricePerKWh;
    }
}
