# [2.2.0](https://github.com/coinranking/supplies/compare/v2.1.0...v2.2.0) (2020-08-10)


### Features

* french digital reserve driver - fdr ([64f72d4](https://github.com/coinranking/supplies/commit/64f72d46e61e69e4c84e95139f72552eecb8e2ac))
* namebase driver ([f29bc0f](https://github.com/coinranking/supplies/commit/f29bc0fc921b29411bfa1513aceaf926e6799043))
* siastats driver ([cc934b8](https://github.com/coinranking/supplies/commit/cc934b8e3cff8d7557a2399c20d6f2a26734aed8))
* verge driver ([b3db3fc](https://github.com/coinranking/supplies/commit/b3db3fced504877d437c4c2eeeff1428ecb44209))

# [2.1.0](https://github.com/coinranking/supplies/compare/v2.0.0...v2.1.0) (2020-08-10)


### Bug Fixes

* support object ([b4e3849](https://github.com/coinranking/supplies/commit/b4e38491c8b2a3a30755e310a8f02b1bdb47d408))


### Features

* cryptoid extend with digibyte blockchain ([6cebb59](https://github.com/coinranking/supplies/commit/6cebb592bfd80959c221998592660ad6aa4fa1e4))
* idena driver ([b352a2c](https://github.com/coinranking/supplies/commit/b352a2cf15b758d9afaae13f8b5695403b51bed6))

# [2.0.0](https://github.com/coinranking/supplies/compare/v1.42.1...v2.0.0) (2020-08-03)


* feat!: support for multiple and optional blockchains ([b584f00](https://github.com/coinranking/supplies/commit/b584f00a9076c70cecaabbe061a8134b78f008c9))


### Bug Fixes

* blockchain info for some drivers ([794f7d1](https://github.com/coinranking/supplies/commit/794f7d1b610665aecd4b6026f74a975989ecbe80))
* change blockchain information for ripple and ryo ([94e2f78](https://github.com/coinranking/supplies/commit/94e2f7859e80950d13e23be737320ff0dececee5))
* eslint ([a91614a](https://github.com/coinranking/supplies/commit/a91614ac999c4ecc3d9f1e92568e751a34e4fdc1))
* lib functions support multiple blockchains ([4b70111](https://github.com/coinranking/supplies/commit/4b701119425140e36ae52741fdb4dce79ce576f9))
* typo ([9cb847f](https://github.com/coinranking/supplies/commit/9cb847f6e7a297dd94fbe32cbf8a22545280d08a))


### Features

* coins in one fixutres ([e69e881](https://github.com/coinranking/supplies/commit/e69e8818a4b855634270a569bcad941c2128814b))
* fix fixture for blockchair driver ([2ef1733](https://github.com/coinranking/supplies/commit/2ef1733a2919d646c6fb0e554b3ad226342b7c6a))
* fix test file ([cc3b367](https://github.com/coinranking/supplies/commit/cc3b3674e2dfe6dd921db6526989d5ae201ae78f))
* merged ([fadd9d3](https://github.com/coinranking/supplies/commit/fadd9d3a87563ecae1220cb66b557c060dd7b449))
* merged ([488d2c5](https://github.com/coinranking/supplies/commit/488d2c5d1d147f225b37f2182c9fb5e1aecf97ee))
* multi-blockchain support ([cf862a6](https://github.com/coinranking/supplies/commit/cf862a60fbd112f79d23be7e9fe9ee3028872039))
* multiblockchain fixtures update ([1e95881](https://github.com/coinranking/supplies/commit/1e95881ef60a4ed9f94083f2fc69995114c0243c))
* run eslint to files ([03d9828](https://github.com/coinranking/supplies/commit/03d9828e796dceaf44ec2fcdacb90a49b5d54d93))
* support multiblockchain fixtures ([cd882f8](https://github.com/coinranking/supplies/commit/cd882f8640cc9a87b9e7d83004fd7736a5cc2bc2))
* tested and moved to multi-blockchain support ([c5c14ea](https://github.com/coinranking/supplies/commit/c5c14ead3df220446120c180b722b430c3ab7196))
* update descriptions JSDocs ([7208ab1](https://github.com/coinranking/supplies/commit/7208ab13bd820b99f70bca95bf5a30c859ae82ba))


### BREAKING CHANGES

* drivers handle blockchains differently now. Some don’t mention a blockchain (like Tether and Btse), some have multiple (like Blockchair and CryptoID) and some are renamed (like XRP to XRP Ledger).

Co-authored-by: Nick Pater <nick@coinranking.com>
Co-authored-by: Stella <sajcic.stella@gmail.com>

## [1.42.1](https://github.com/coinranking/supplies/compare/v1.42.0...v1.42.1) (2020-07-21)


### Bug Fixes

* **blockscan:** fix the supply of Grin ([ac84185](https://github.com/coinranking/supplies/commit/ac84185651a45d499215d571e1806b97d3039bb9))

# [1.42.0](https://github.com/coinranking/supplies/compare/v1.41.0...v1.42.0) (2020-07-10)


### Features

* delete the Documentation.md ([7305ff4](https://github.com/coinranking/supplies/commit/7305ff40e6d3868c1e66fa278dba8bc177dfb948))

# [1.41.0](https://github.com/coinranking/supplies/compare/v1.40.0...v1.41.0) (2020-07-10)


### Features

* change the docs to only include the classes ([a14cd66](https://github.com/coinranking/supplies/commit/a14cd66ac52236af54c4ac25b71c5304a9aac5c1))

# [1.40.0](https://github.com/coinranking/supplies/compare/v1.39.0...v1.40.0) (2020-06-22)


### Features

* ergo explorer add modifier ([3e30edb](https://github.com/coinranking/supplies/commit/3e30edbd6c46fe3597a5b22fcae0d73a28e2f7ba))
* ergo explorer update ([39400ff](https://github.com/coinranking/supplies/commit/39400ff57cb2c0bc9ed1e16b2cc230382f6f9a4c))

# [1.39.0](https://github.com/coinranking/supplies/compare/v1.38.0...v1.39.0) (2020-05-29)


### Features

* **docs:** force updating the docs automatically with this minor update ([c83793e](https://github.com/coinranking/supplies/commit/c83793ef6f4d6d11b9dd8d6d1d947022b84192a9))

# [1.38.0](https://github.com/coinranking/supplies/compare/v1.37.0...v1.38.0) (2020-05-14)


### Features

* btse driver ([8330ed4](https://github.com/coinranking/supplies/commit/8330ed40ae1f2438860fa5cc349660e4ab9b3785))

# [1.37.0](https://github.com/coinranking/supplies/compare/v1.36.0...v1.37.0) (2020-05-01)


### Features

* piratechain driver ([91d5748](https://github.com/coinranking/supplies/commit/91d57481514f3b15d8eb89c3c3a32646986db8ce))

# [1.36.0](https://github.com/coinranking/supplies/compare/v1.35.0...v1.36.0) (2020-04-28)


### Features

* change ethereum in dai inside the oasis driver ([b7725d4](https://github.com/coinranking/supplies/commit/b7725d4df64edcd119977ad3702225aae3bfd9c2))
* oasis driver ([d4a6abe](https://github.com/coinranking/supplies/commit/d4a6abe0d4ec632610c26cf556a9f1e7acd1c2ca))

# [1.35.0](https://github.com/coinranking/supplies/compare/v1.34.0...v1.35.0) (2020-04-15)


### Bug Fixes

* tether circulating supply support ([f2ca732](https://github.com/coinranking/supplies/commit/f2ca732aa1b0da3fc5b4c6c398ac533b7b3beab9))


### Features

* tether driver ([1447a2b](https://github.com/coinranking/supplies/commit/1447a2b125db19af9cdf26bb71046289baf68ec1))

# [1.34.0](https://github.com/coinranking/supplies/compare/v1.33.0...v1.34.0) (2020-04-01)


### Features

* readdcoin fixture ([19158fa](https://github.com/coinranking/supplies/commit/19158fa8a2ab2b47fff485a4fb5422fcb08be999))
* reddcoin driver ([35e40e0](https://github.com/coinranking/supplies/commit/35e40e0b81fc11f30b8db848f750184950289bb4))

# [1.33.0](https://github.com/coinranking/supplies/compare/v1.32.0...v1.33.0) (2020-03-25)


### Bug Fixes

* blockscan blockchain and circulating supply ([d3367ab](https://github.com/coinranking/supplies/commit/d3367ab262284e0a3ff0fd5419e280fb622d1978))


### Features

* blockscan driver ([101afbb](https://github.com/coinranking/supplies/commit/101afbbbfb6bcfef7b8ac6caac314868edf93a22))

# [1.32.0](https://github.com/coinranking/supplies/compare/v1.31.0...v1.32.0) (2020-03-25)


### Bug Fixes

* urls for fetching balance and total supply ([34b4a61](https://github.com/coinranking/supplies/commit/34b4a61a0506aba861431ad153d4f5845ae6cc5d))


### Features

* create fixure ([ab6f1f0](https://github.com/coinranking/supplies/commit/ab6f1f0be928ae59b4d8972b0d6fbe6f484968a5))

# [1.31.0](https://github.com/coinranking/supplies/compare/v1.30.0...v1.31.0) (2020-03-18)


### Bug Fixes

* format ([44a30ab](https://github.com/coinranking/supplies/commit/44a30abfc609effb2a9272efdc475fd7c61c5a26))
* format ([5cbaf74](https://github.com/coinranking/supplies/commit/5cbaf7462b925654e3e495ca6e67f32bd4ed441e))


### Features

* uca driver ([6d0bfb1](https://github.com/coinranking/supplies/commit/6d0bfb1161085790ced52bb685f2be5647e2f900))
* uca driver ([80b7651](https://github.com/coinranking/supplies/commit/80b7651c7246f119618eeed3b54acdd6436484e6))

# [1.30.0](https://github.com/coinranking/supplies/compare/v1.29.0...v1.30.0) (2020-03-13)


### Bug Fixes

* dont parse JSON in the hedera driver ([bcc70ad](https://github.com/coinranking/supplies/commit/bcc70ad75062c9d5dba64f5e52e6524a40bf4f77))
* options in driver ([8ff6b27](https://github.com/coinranking/supplies/commit/8ff6b276fa8b075b2a717120264dcebe4b2bdf48))
* remove fetchBalance and maxSupply ([6317d4b](https://github.com/coinranking/supplies/commit/6317d4ba5c428c3e1fac6bb609192109c74167ef))
* respect the new eslint standard ([ceb174f](https://github.com/coinranking/supplies/commit/ceb174fa922f76bca7197aca8030542c1d5e99e5))


### Features

* blockstack ([3742501](https://github.com/coinranking/supplies/commit/3742501923bd73ae12f562b0ba59f65998648c8c))
* hedera hashgraph driver ([63e4c71](https://github.com/coinranking/supplies/commit/63e4c719b12bb9a942dea88bf066b9f22967249a))
* remove balance ([9c78974](https://github.com/coinranking/supplies/commit/9c78974fca3adbb2030d8ae8adf1962cd6733a1e))

# [1.29.0](https://github.com/coinranking/supplies/compare/v1.28.0...v1.29.0) (2020-03-10)


### Features

* zilliqa driver ([c8f9f03](https://github.com/coinranking/supplies/commit/c8f9f031e89549392fcb5057852d4b3d2dda0140))

# [1.28.0](https://github.com/coinranking/supplies/compare/v1.27.0...v1.28.0) (2020-03-04)


### Features

* add a coverage badge ([0cdb967](https://github.com/coinranking/supplies/commit/0cdb9670a84b2c98c7b1056407af245e008139d1))
* change the description inside the readme ([402e412](https://github.com/coinranking/supplies/commit/402e412ef721eb3080a74217cf3b0ff58e6e0fc6))

# [1.27.0](https://bitbucket.org/trinarydigital/supplies/compare/v1.26.1...v1.27.0) (2020-03-03)


### Features

* ravencoin driver ([b60ce05](https://bitbucket.org/trinarydigital/supplies/commits/b60ce05007b23fc8b942988bca21f3ac0172e788))

## [1.26.1](https://bitbucket.org/trinarydigital/supplies/compare/v1.26.0...v1.26.1) (2020-03-03)


### Bug Fixes

* get the correct totalsupply for Algorand ([3e4d6f3](https://bitbucket.org/trinarydigital/supplies/commits/3e4d6f3f16d73b0c32b55924d8fcb5261d429043))

# [1.26.0](https://bitbucket.org/trinarydigital/supplies/compare/v1.25.2...v1.26.0) (2020-02-28)


### Bug Fixes

* blockchain info and supports object ([93e36d5](https://bitbucket.org/trinarydigital/supplies/commits/93e36d56628d5d816379e4d378cbd9f67a3cddf2))
* dunscan change endpoints for supplies ([075b5fd](https://bitbucket.org/trinarydigital/supplies/commits/075b5fd2ae6b0c9c01bb1743b1cf635e8d225d42))
* set the DunExplorer to the correct blockchain ([54e997f](https://bitbucket.org/trinarydigital/supplies/commits/54e997f4280140f988fc0ecf39f05c404b8fe922))


### Features

* dunscan explorer driver ([0ed6d32](https://bitbucket.org/trinarydigital/supplies/commits/0ed6d3246ff9d36b4fa86d1a21a06edc4a40c245))

## [1.25.2](https://bitbucket.org/trinarydigital/supplies/compare/v1.25.1...v1.25.2) (2020-02-28)


### Bug Fixes

* decimal places ([0580296](https://bitbucket.org/trinarydigital/supplies/commits/05802966eafef2fa2ea260c1c59f1a07b5a07a73))
* set a default throttle and fix helpico ([9e28d70](https://bitbucket.org/trinarydigital/supplies/commits/9e28d7046d8fc5f17e8b1b8913e86cd3ad9f2d28))

## [1.25.1](https://bitbucket.org/trinarydigital/supplies/compare/v1.25.0...v1.25.1) (2020-02-28)


### Bug Fixes

* changed the CryptoNote blockchain to SpesCoin ([1b0e045](https://bitbucket.org/trinarydigital/supplies/commits/1b0e045f62caeb317b1b167f635fc94963d8abc8))

# [1.25.0](https://bitbucket.org/trinarydigital/supplies/compare/v1.24.0...v1.25.0) (2020-02-28)


### Bug Fixes

* add decimals ([11d9f39](https://bitbucket.org/trinarydigital/supplies/commits/11d9f39eaef7e6d02542a156a39ea31321ed5241))
* change blockchain ([6905f7f](https://bitbucket.org/trinarydigital/supplies/commits/6905f7f4cba8e22d5213d34d7127e218908a81ea))
* decimals ([636b717](https://bitbucket.org/trinarydigital/supplies/commits/636b71781a90fbfbdb9a0df51faec50e4378f7c3))
* test pass for vsystem ([59b6069](https://bitbucket.org/trinarydigital/supplies/commits/59b606978033933ec0b1764e0e8995b5fc3c0366))


### Features

* vsystem supply ([8d53f36](https://bitbucket.org/trinarydigital/supplies/commits/8d53f36bb62e3294ae9cfe96fbe40d6a04c8906f))
* xenios coin driver ([c36d609](https://bitbucket.org/trinarydigital/supplies/commits/c36d609c7d6bbce00ae414d29d5e45c4344e04b7))

# [1.24.0](https://bitbucket.org/trinarydigital/supplies/compare/v1.23.2...v1.24.0) (2020-02-26)


### Bug Fixes

* regenerate fixtures for BinanceDex ([0e9d06a](https://bitbucket.org/trinarydigital/supplies/commits/0e9d06afd3763a9608976a02fb408b199168808d))


### Features

* add support for MillenEOS ([76e0b22](https://bitbucket.org/trinarydigital/supplies/commits/76e0b2200d184336267645981431f37d6e367282))
* remove Bloks because it was incomplete ([a9addac](https://bitbucket.org/trinarydigital/supplies/commits/a9addac5dbcff1fb65b62e28a51d4795ddd876f7))

## [1.23.2](https://bitbucket.org/trinarydigital/supplies/compare/v1.23.1...v1.23.2) (2020-02-26)


### Bug Fixes

* return 0 when balance is not there ([4c697a3](https://bitbucket.org/trinarydigital/supplies/commits/4c697a3feab5ebdc7dda8d54d9484b1fdf06eee5))

## [1.23.1](https://bitbucket.org/trinarydigital/supplies/compare/v1.23.0...v1.23.1) (2020-02-26)


### Bug Fixes

* return 0 in tokenbalances on waves ([1689db4](https://bitbucket.org/trinarydigital/supplies/commits/1689db45c67a33879e6911e6830416862c5a0a81))

# [1.23.0](https://bitbucket.org/trinarydigital/supplies/compare/v1.22.0...v1.23.0) (2020-02-25)


### Features

* 2x2 driver ([82e73f7](https://bitbucket.org/trinarydigital/supplies/commits/82e73f7f23bc7e44e5aebe6317e964c255b505f6))
* sierracoin driver ([88d8ec7](https://bitbucket.org/trinarydigital/supplies/commits/88d8ec7202cb24848f2a5985886b351e94e8b432))

# [1.22.0](https://bitbucket.org/trinarydigital/supplies/compare/v1.21.0...v1.22.0) (2020-02-25)


### Features

* ether1 driver ([423c554](https://bitbucket.org/trinarydigital/supplies/commits/423c554990beb1e17b4937153452d9aa5b39c7f6))

# [1.21.0](https://bitbucket.org/trinarydigital/supplies/compare/v1.20.0...v1.21.0) (2020-02-25)


### Bug Fixes

* add circulating supply ([aa30394](https://bitbucket.org/trinarydigital/supplies/commits/aa3039414dd0be8d192bcc81e544925389884e6c))
* bitcoinrh driver remove circulation ([25f9c00](https://bitbucket.org/trinarydigital/supplies/commits/25f9c0030dc251e1a19ee4bb458b375a197e996d))


### Features

* bitcoinrh driver ([93baa8c](https://bitbucket.org/trinarydigital/supplies/commits/93baa8cc84c2a453aede4b04c86628a55f360aa0))

# [1.20.0](https://bitbucket.org/trinarydigital/supplies/compare/v1.19.0...v1.20.0) (2020-02-24)


### Bug Fixes

* options and description ([f28e8f5](https://bitbucket.org/trinarydigital/supplies/commits/f28e8f5d6c84ae44610232e085c76eae1745978d))


### Features

* beyondcoin explorer driver ([620f137](https://bitbucket.org/trinarydigital/supplies/commits/620f137a9982d69db744168ca5f1bdab3e34b624))
* rapids driver ([f7c98b2](https://bitbucket.org/trinarydigital/supplies/commits/f7c98b23d7948751280e7a6de835372cd91b142e))

# [1.19.0](https://bitbucket.org/trinarydigital/supplies/compare/v1.18.0...v1.19.0) (2020-02-24)


### Features

* doge cash driver ([dd11503](https://bitbucket.org/trinarydigital/supplies/commits/dd11503cabbf643c9ae817ac4c94d29bcc9e825d))
* konjungate driver ([cd836ca](https://bitbucket.org/trinarydigital/supplies/commits/cd836ca2412a7a3f3fa39b27996d45a9b03244b2))
* prux driver ([2ac6ef3](https://bitbucket.org/trinarydigital/supplies/commits/2ac6ef36ef99504645f9d3f354052f03d3ecd53a))

# [1.18.0](https://bitbucket.org/trinarydigital/supplies/compare/v1.17.0...v1.18.0) (2020-02-24)


### Features

* myspes explorer driver ([2d29463](https://bitbucket.org/trinarydigital/supplies/commits/2d2946324df97cb72a20b9e9669ab4da8e17faa5))

# [1.17.0](https://bitbucket.org/trinarydigital/supplies/compare/v1.16.0...v1.17.0) (2020-02-24)


### Bug Fixes

* add comment param ([f83f2ff](https://bitbucket.org/trinarydigital/supplies/commits/f83f2ffa11b744997875410f2056ee42086c70d8))


### Features

* stash explorer driver ([94381d2](https://bitbucket.org/trinarydigital/supplies/commits/94381d29acdb3aa57bd94f5a90f21a0c07fdad3a))

# [1.16.0](https://bitbucket.org/trinarydigital/supplies/compare/v1.15.0...v1.16.0) (2020-02-24)


### Features

* add total and max for Ryo Currency ([69a6fb5](https://bitbucket.org/trinarydigital/supplies/commits/69a6fb5286513f10709290c47cbb978b761c4e35))
* ryo explorer ([eb671fc](https://bitbucket.org/trinarydigital/supplies/commits/eb671fc2b9c33c6032bfa789f235a8a86e90975c))

# [1.15.0](https://bitbucket.org/trinarydigital/supplies/compare/v1.14.0...v1.15.0) (2020-02-24)


### Bug Fixes

* smartholdem option fix ([36b4367](https://bitbucket.org/trinarydigital/supplies/commits/36b4367b12d77d16763a4ef98ff449edaef0507e))


### Features

* smartholdem driver ([0a8bfac](https://bitbucket.org/trinarydigital/supplies/commits/0a8bfaca90824f081f3662e03ca3ddeef2f33ae9))

# [1.14.0](https://bitbucket.org/trinarydigital/supplies/compare/v1.13.0...v1.14.0) (2020-02-14)


### Bug Fixes

* convert array to string ([2d52560](https://bitbucket.org/trinarydigital/supplies/commits/2d525607e778c18541946ac17627556d951efa00))


### Features

* xaya driver ([0c27404](https://bitbucket.org/trinarydigital/supplies/commits/0c274042d2c1d599aebe28d2ea5b7fbafd90f9dd))

# [1.13.0](https://bitbucket.org/trinarydigital/supplies/compare/v1.12.0...v1.13.0) (2020-02-14)


### Bug Fixes

* convert array to string ([49b2e3c](https://bitbucket.org/trinarydigital/supplies/commits/49b2e3c5206f9f4b26950d07673eb34f8029ca7c))


### Features

* bare driver ([7549628](https://bitbucket.org/trinarydigital/supplies/commits/7549628d631d32fcfea0af7291b00ee773da0888))

# [1.12.0](https://bitbucket.org/trinarydigital/supplies/compare/v1.11.0...v1.12.0) (2020-02-14)


### Bug Fixes

* add comments ([490a534](https://bitbucket.org/trinarydigital/supplies/commits/490a5347853052c7d19fa7adecb52c7476b21121))
* remove hardcoded options ([4655984](https://bitbucket.org/trinarydigital/supplies/commits/465598411eef83aab43b3188e24395af79e94311))


### Features

* blocks eos driver ([f5abda7](https://bitbucket.org/trinarydigital/supplies/commits/f5abda7d2ccc49e2dde7d85eb4096ddf88fc9c86))
* helpico driver ([dc22100](https://bitbucket.org/trinarydigital/supplies/commits/dc221000e0dc7dce5b0e735365ba1c17e7aadcb2))

# [1.11.0](https://bitbucket.org/trinarydigital/supplies/compare/v1.10.5...v1.11.0) (2020-02-14)


### Bug Fixes

* comments and remove fetchCirculatingSupply ([bd5ec4c](https://bitbucket.org/trinarydigital/supplies/commits/bd5ec4c576cc84947a429ee058c28becad499a62))
* remove hardcoded options ([9137b0b](https://bitbucket.org/trinarydigital/supplies/commits/9137b0b1599817b90232a02b42235e5d935b0d7d))
* remove supports circulating ([0a1432b](https://bitbucket.org/trinarydigital/supplies/commits/0a1432b38da4ea8db66a2d1114612697ac428209))


### Features

* balance function ([d719045](https://bitbucket.org/trinarydigital/supplies/commits/d719045e8ef0dce519bda7982c8b2fd1e9227307))
* fetch balance and total supply ([72a7f9b](https://bitbucket.org/trinarydigital/supplies/commits/72a7f9b574532693c5cd01715b0064bc99a867ff))

## [1.10.5](https://bitbucket.org/trinarydigital/supplies/compare/v1.10.4...v1.10.5) (2020-02-13)


### Bug Fixes

* respect the support options in the happy path tests ([6e224fe](https://bitbucket.org/trinarydigital/supplies/commits/6e224fe4bcb9d309a1df18390c57901e9a46383b))

## [1.10.4](https://bitbucket.org/trinarydigital/supplies/compare/v1.10.3...v1.10.4) (2020-02-13)


### Bug Fixes

* **etherscan:** tokens with 0 decimals no longer default to 18 ([40734e7](https://bitbucket.org/trinarydigital/supplies/commits/40734e70eac1016b13b599622a59b49cec6a6c22))
* **etherscan:** tokens with 0 decimals no longer default to 18 ([4d08125](https://bitbucket.org/trinarydigital/supplies/commits/4d08125c4ebe285c561cbecb185d60201a307c50))

## [1.10.3](https://bitbucket.org/trinarydigital/supplies/compare/v1.10.2...v1.10.3) (2020-02-12)


### Bug Fixes

* remove hardcoded useCache options ([f38b1d6](https://bitbucket.org/trinarydigital/supplies/commits/f38b1d658786344cf04fdfb737b00f26d66de9f3))
* replace the fixtures ([60644b9](https://bitbucket.org/trinarydigital/supplies/commits/60644b909976735173f9c6f808785570a9a7026f))

## [1.10.2](https://bitbucket.org/trinarydigital/supplies/compare/v1.10.1...v1.10.2) (2020-02-12)


### Bug Fixes

* **waves:** address balances are returned as decimal instead of integer ([8b103e8](https://bitbucket.org/trinarydigital/supplies/commits/8b103e8d45f09c750da52d5d308ff3704701f2cb))

## [1.10.1](https://bitbucket.org/trinarydigital/supplies/compare/v1.10.0...v1.10.1) (2020-02-12)


### Bug Fixes

* remove duplicates from the blockchains ([d393357](https://bitbucket.org/trinarydigital/supplies/commits/d393357cbd3bbb6a4acc144b0f056e59e7e27ecd))

# [1.10.0](https://bitbucket.org/trinarydigital/supplies/compare/v1.9.0...v1.10.0) (2020-02-11)


### Bug Fixes

* change blockchain for driver ([cea1ac6](https://bitbucket.org/trinarydigital/supplies/commits/cea1ac6a4f4b84b47373bf737f0ab0c98c2f8b42))
* update docs ([f0a764a](https://bitbucket.org/trinarydigital/supplies/commits/f0a764a33f32993cd78b69a9826345d16df4a327))


### Features

* blockchair bitcoin cash driver ([2a81e25](https://bitbucket.org/trinarydigital/supplies/commits/2a81e25ac368d9fe0ac1f6bbbd10fb060f419cc7))
