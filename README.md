<h1 align=center>Blockchain Technology (example)</h1>

## Features
Uses `sha256` for hash identities of the blocks which can be found [here]().

The WebSocket and ExpressJS HTTPS server packages are implemented but not used during the demo execution of `run.js` in `/lib` given that this project is for example purposes.

## Analysis
### Block and Blockchain Defined
### The Proof-of-Work Puzzle
In the context of blockchain technology, "Proof-of-Work" is, at its simplest, a hash puzzle that the computer must solve. The key to Proof-of-Work is that *it must be costly to solve*, in terms of technical resources, but *easy to verify* by peers. Blockchain **mining** is the act of solving this puzzle.

By incorporating "Proof-of-Work" into blockchain design, we gain a few advantages. First, Last, and perhaps most importantly,

#### Mining, Difficulty and "Finding" a Block
This concept is where *mining* really derives its significance. Imagine mining for diamonds in a volcanic tunnel with a pickaxe. Every time your pickaxe hits that rock, you experience a chance to find a diamond. But, it's difficult -- the more you mine, the deeper you traverse the volcanic tunnel which increasingly becomes more rock and less diamond ore.

Blockchain mining is very similar. The action of striking the rock, in the paragraph above, is analogous to a computer's **hash rate**. The fact that the volcanic tunnel is becoming more like rock as you mine can be thought of as the **difficulty** to find a diamond -- or a block in our terms. Furthermore, finding a diamond is closely analogous to **finding** or "mining" a block.

More technically, the difficulty is set globally on the peep-to-peer network which governs how quickly computer hardware can hash a given block on average. *Mining* is the action of taking the hash from a valid block (formed by the current client) and, given a specified algorithm, rehashing it with a "nonce" until the resulting hash matches a given requirement. In the case of Bitcoin, should the current client be first in discovering a nonce to produce the required result, that client is credited with "Finding a Block", awarded an incentive, and the block is added to the ledger after a peer consensus. Obviously, the faster the hash rate, the greater the odds of mining a block successfully before all other peers on the network.

#### Consensus

#### Proof-of-Work vs Proof-of-Stake
Proof-of-Work (a concept most popularized by Bitcoin) is defined by a protocol that governs how blocks are mined.

[Bitcoin](https://en.bitcoin.it/wiki/Proof_of_work) is the most notable implementation of blockchain technology to use Proof-of-Work; however, other blockchain variations, such as [Ethereum](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ), have popularize the use of Proof-of-Stake. "Proof-of-Stake" (PoS)
#### Incentive
### Transactions
### The Wallet

### Peer-to-Peer Architecture

## Disclaimer
This project is meant to be a personal knowledge-base and example of blockchain technology principles. Several features, such as Automatic Peer Discovery, Merkle Tree implementation, or security, are intentionally missing. While the repository will grow with new research, examples and algorithms, it is never recommended to be used for production.

## Resources
+ *Satoshi Nakamoto's [Whitepaper](http://nakamotoinstitute.org/bitcoin/)* - Original Whitepaper on Bitcoin
+ *Lauri Hartikka's [Github](https://github.com/lhartikk)* - Finnish developer for simple blockchain development
+ *[Proof-of-Work vs Proof-of-Stake: Basic Mining Guide](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)*
+ *Blockchain [Tutorial](https://lhartikk.github.io) in TypeScript*
