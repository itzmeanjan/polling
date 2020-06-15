# polling
Ethereum based dApp for conducting Poll :boom:

## motivation

Well I was wondering if I could create one online polling system, where users can create poll & participants can vote on given options, for specified amount of active poll period. But I was considering make this system little more transparent, so I've started building it on ethereum.

What **polling** aims to attain is nothing but, create a very transparent, immutable, distributed & easy to use platform so any ether holder can participate in this network.

## progress

- Started writing smart contracts for controlling whole polling ops on **[09/06/2020]**
- Completed primary features of smart contract on **[12/06/2020]**
- Going to frontend work on **[12/06/2020]**
- Completed implementing JavaScript API for interacting with smart contract **[15/06/2020]**

_**More coming soon ...**_

## features

- Any ether holder can create an account in this network, by simply putting their name
- Any account holder can create poll
- Once poll is created, poll options needed to be set
- Then creator will require to make poll live, by supplying an activation period of poll, in terms of hour(s)
- As poll goes live, contract will emit certain event which can be listened from frontend
- Users will be notified of apperance of new poll, which they can plan to vote on
- After user votes, we can show them progress of vote i.e. winner status
- After activation period is over, user can announce result of poll, which will be published by emitting event


**In active development, more coming soon ...**
