// for (module in api.query) {
//     if (module == "substrate") { continue; }
//     for (storage in api.query[module]) {
//         let query = api.query[module][storage];
//         try {
//             results.push({
//                 name: module + " " + storage,
//                 key: query.key()
//             });
//         } catch {
//             results.push({
//                 name: module + " " + storage,
//                 key: query.keyPrefix()
//             });
//         }
//     }
// }

// This is a list of the "well_known_keys" in Substrate
let wellKnownKeys = [{
        "name": ":code",
        "key": "0x3a636f6465"
    },
    {
        "name": ":heappages",
        "key": "0x3a686561707061676573"
    },
    {
        "name": ":extrinsic_index",
        "key": "0x3a65787472696e7369635f696e646578"
    },
    {
        "name": ":changes_trie",
        "key": "0x3a6368616e6765735f74726965"
    },
    {
        "name": ":child_storage:",
        "key": "0x3a6368696c645f73746f726167653a"
    }
];

// This is a list of storage prefixes in Substrate Storage
let storageKeys = [{
        "name": "system account",
        "key": "0x26aa394eea5630e07c48ae0c9558cef7b99d880ec681799c0cf30e8886371da9"
    },
    {
        "name": "system extrinsicCount",
        "key": "0x26aa394eea5630e07c48ae0c9558cef7bdc0bd303e9855813aa8a30d4efc5112"
    },
    {
        "name": "system allExtrinsicsWeight",
        "key": "0x26aa394eea5630e07c48ae0c9558cef7e1eb15a16fabe2e4811de3e43b129e56"
    },
    {
        "name": "system allExtrinsicsLen",
        "key": "0x26aa394eea5630e07c48ae0c9558cef7a86da5a932684f199539836fcb8c886f"
    },
    {
        "name": "system blockHash",
        "key": "0x26aa394eea5630e07c48ae0c9558cef7a44704b568d21667356a5a050c118746"
    },
    {
        "name": "system extrinsicData",
        "key": "0x26aa394eea5630e07c48ae0c9558cef7df1daeb8986837f21cc5d17596bb78d1"
    },
    {
        "name": "system number",
        "key": "0x26aa394eea5630e07c48ae0c9558cef702a5c1b19ab7a04f536c519aca4983ac"
    },
    {
        "name": "system parentHash",
        "key": "0x26aa394eea5630e07c48ae0c9558cef78a42f33323cb5ced3b44dd825fda9fcc"
    },
    {
        "name": "system extrinsicsRoot",
        "key": "0x26aa394eea5630e07c48ae0c9558cef7b06c3320c6ac196d813442e270868d63"
    },
    {
        "name": "system digest",
        "key": "0x26aa394eea5630e07c48ae0c9558cef799e7f93fc6a98f0874fd057f111c4d2d"
    },
    {
        "name": "system events",
        "key": "0x26aa394eea5630e07c48ae0c9558cef780d41e5e16056765bc8461851072c9d7"
    },
    {
        "name": "system eventCount",
        "key": "0x26aa394eea5630e07c48ae0c9558cef70a98fdbe9ce6c55837576c60c7af3850"
    },
    {
        "name": "system eventTopics",
        "key": "0x26aa394eea5630e07c48ae0c9558cef7bb94e1c21adab714983cf06622e1de76"
    },
    {
        "name": "system lastRuntimeUpgrade",
        "key": "0x26aa394eea5630e07c48ae0c9558cef7f9cce9c888469bb1a0dceaa129672ef8"
    },
    {
        "name": "system executionPhase",
        "key": "0x26aa394eea5630e07c48ae0c9558cef7ff553b5a9862a516939d82b3d3d8661a"
    },
    {
        "name": "utility multisigs",
        "key": "0xd5e1a2fa16732ce6906189438c0a82c63cd15a3fd6e04e47bee3922dbfa92c8d"
    },
    {
        "name": "babe epochIndex",
        "key": "0x1cb6f36e027abb2091cfb5110ab5087f38316cbf8fa0da822a20ac1c55bf1be3"
    },
    {
        "name": "babe authorities",
        "key": "0x1cb6f36e027abb2091cfb5110ab5087f5e0621c4869aa60c02be9adcc98a0d1d"
    },
    {
        "name": "babe genesisSlot",
        "key": "0x1cb6f36e027abb2091cfb5110ab5087f678711d15ebbceba5cd0cea158e6675a"
    },
    {
        "name": "babe currentSlot",
        "key": "0x1cb6f36e027abb2091cfb5110ab5087f06155b3cd9a8c9e5e9a23fd5dc13a5ed"
    },
    {
        "name": "babe randomness",
        "key": "0x1cb6f36e027abb2091cfb5110ab5087f7a414cb008e0e61e46722aa60abdd672"
    },
    {
        "name": "babe nextRandomness",
        "key": "0x1cb6f36e027abb2091cfb5110ab5087f7ce678799d3eff024253b90e84927cc6"
    },
    {
        "name": "babe segmentIndex",
        "key": "0x1cb6f36e027abb2091cfb5110ab5087f66e8f035c8adbe7f1547b43c51e6f8a4"
    },
    {
        "name": "babe underConstruction",
        "key": "0x1cb6f36e027abb2091cfb5110ab5087fb9093659d7a856809757134d2bc86e62"
    },
    {
        "name": "babe initialized",
        "key": "0x1cb6f36e027abb2091cfb5110ab5087ffa92de910a7ce2bd58e99729c69727c1"
    },
    {
        "name": "babe lateness",
        "key": "0x1cb6f36e027abb2091cfb5110ab5087f0323475657e0890fbdbf66fb24b4649e"
    },
    {
        "name": "timestamp now",
        "key": "0xf0c365c3cf59d671eb72da0e7a4113c49f1f0515f462cdcf84e0f1d6045dfcbb"
    },
    {
        "name": "timestamp didUpdate",
        "key": "0xf0c365c3cf59d671eb72da0e7a4113c4bbd108c4899964f707fdaffb82636065"
    },
    {
        "name": "authorship uncles",
        "key": "0xd57bce545fb382c34570e5dfbf338f5ea36180b5cfb9f6541f8849df92a6ec93"
    },
    {
        "name": "authorship author",
        "key": "0xd57bce545fb382c34570e5dfbf338f5e326d21bc67a4b34023d577585d72bfd7"
    },
    {
        "name": "authorship didSetUncles",
        "key": "0xd57bce545fb382c34570e5dfbf338f5ebddf84c5eb23e6f53af725880d8ffe90"
    },
    {
        "name": "indices accounts",
        "key": "0x1a736d37504c2e3fb73dad160c55b2918ee7418a6531173d60d1f6a82d8f4d51"
    },
    {
        "name": "balances totalIssuance",
        "key": "0xc2261276cc9d1f8598ea4b6a74b15c2f57c875e4cff74148e4628f264b974c80"
    },
    {
        "name": "balances account",
        "key": "0xc2261276cc9d1f8598ea4b6a74b15c2fb99d880ec681799c0cf30e8886371da9"
    },
    {
        "name": "balances locks",
        "key": "0xc2261276cc9d1f8598ea4b6a74b15c2f218f26c73add634897550b4003b26bc6"
    },
    {
        "name": "balances storageVersion",
        "key": "0xc2261276cc9d1f8598ea4b6a74b15c2f308ce9615de0775a82f8a94dc3d285a1"
    },
    {
        "name": "transactionPayment nextFeeMultiplier",
        "key": "0x3f1467a096bcd71a5b6a0c8155e208103f2edf3bdf381debe331ab7446addfdc"
    },
    {
        "name": "staking historyDepth",
        "key": "0x5f3e4907f716ac89b6347d15ececedcaac0a2cbf8e355f5ea6cb2de8727bfb0c"
    },
    {
        "name": "staking validatorCount",
        "key": "0x5f3e4907f716ac89b6347d15ececedca138e71612491192d68deab7e6f563fe1"
    },
    {
        "name": "staking minimumValidatorCount",
        "key": "0x5f3e4907f716ac89b6347d15ececedcab49a2738eeb30896aacb8b3fb46471bd"
    },
    {
        "name": "staking invulnerables",
        "key": "0x5f3e4907f716ac89b6347d15ececedca5579297f4dfb9609e7e4c2ebab9ce40a"
    },
    {
        "name": "staking bonded",
        "key": "0x5f3e4907f716ac89b6347d15ececedca3ed14b45ed20d054f05e37e2542cfe70"
    },
    {
        "name": "staking ledger",
        "key": "0x5f3e4907f716ac89b6347d15ececedca422adb579f1dbf4f3886c5cfa3bb8cc4"
    },
    {
        "name": "staking payee",
        "key": "0x5f3e4907f716ac89b6347d15ececedca9220e172bed316605f73f1ff7b4ade98"
    },
    {
        "name": "staking validators",
        "key": "0x5f3e4907f716ac89b6347d15ececedca88dcde934c658227ee1dfafcd6e16903"
    },
    {
        "name": "staking nominators",
        "key": "0x5f3e4907f716ac89b6347d15ececedca9c6a637f62ae2af1c7e31eed7e96be04"
    },
    {
        "name": "staking currentEra",
        "key": "0x5f3e4907f716ac89b6347d15ececedca0b6a45321efae92aea15e0740ec7afe7"
    },
    {
        "name": "staking activeEra",
        "key": "0x5f3e4907f716ac89b6347d15ececedca487df464e44a534ba6b0cbb32407b587"
    },
    {
        "name": "staking erasStartSessionIndex",
        "key": "0x5f3e4907f716ac89b6347d15ececedcaad811cd65a470ddc5f1d628ff0550982"
    },
    {
        "name": "staking erasStakers",
        "key": "0x5f3e4907f716ac89b6347d15ececedca8bde0a0ea8864605e3b68ed9cb2da01b"
    },
    {
        "name": "staking erasStakersClipped",
        "key": "0x5f3e4907f716ac89b6347d15ececedca42982b9d6c7acc99faa9094c912372c2"
    },
    {
        "name": "staking erasValidatorPrefs",
        "key": "0x5f3e4907f716ac89b6347d15ececedca682db92dde20a10d96d00ff0e9e221c0"
    },
    {
        "name": "staking erasValidatorReward",
        "key": "0x5f3e4907f716ac89b6347d15ececedca7e6ed2ee507c7b4441d59e4ded44b8a2"
    },
    {
        "name": "staking erasRewardPoints",
        "key": "0x5f3e4907f716ac89b6347d15ececedca80cc6574281671b299c1727d7ac68cab"
    },
    {
        "name": "staking erasTotalStake",
        "key": "0x5f3e4907f716ac89b6347d15ececedcaa141c4fe67c2d11f4a10c6aca7a79a04"
    },
    {
        "name": "staking forceEra",
        "key": "0x5f3e4907f716ac89b6347d15ececedcaf7dad0317324aecae8744b87fc95f2f3"
    },
    {
        "name": "staking slashRewardFraction",
        "key": "0x5f3e4907f716ac89b6347d15ececedcac29a0310e1bb45d20cace77ccb62c97d"
    },
    {
        "name": "staking canceledSlashPayout",
        "key": "0x5f3e4907f716ac89b6347d15ececedca28dccb559b95c40168a1b2696581b5a7"
    },
    {
        "name": "staking unappliedSlashes",
        "key": "0x5f3e4907f716ac89b6347d15ececedca042824170a5db4381fe3395039cabd24"
    },
    {
        "name": "staking bondedEras",
        "key": "0x5f3e4907f716ac89b6347d15ececedcaea07de2b8f010516dca3f7ef52f7ac5a"
    },
    {
        "name": "staking validatorSlashInEra",
        "key": "0x5f3e4907f716ac89b6347d15ececedcaad6e15ee7bfd5d55eba1012487d3af54"
    },
    {
        "name": "staking nominatorSlashInEra",
        "key": "0x5f3e4907f716ac89b6347d15ececedca815008e8210b6d6cf701e22e5bf27141"
    },
    {
        "name": "staking slashingSpans",
        "key": "0x5f3e4907f716ac89b6347d15ececedcaab6a212bc08a5603828f33f90ec4a139"
    },
    {
        "name": "staking spanSlash",
        "key": "0x5f3e4907f716ac89b6347d15ececedcae62f6f797ebe9138dfced942977fea50"
    },
    {
        "name": "staking earliestUnappliedSlash",
        "key": "0x5f3e4907f716ac89b6347d15ececedca605b2c046b5509037f3f158b9741d037"
    },
    {
        "name": "staking snapshotValidators",
        "key": "0x5f3e4907f716ac89b6347d15ececedca7e006c26d69c4c97f65648ab815a2744"
    },
    {
        "name": "staking snapshotNominators",
        "key": "0x5f3e4907f716ac89b6347d15ececedcaf7e257c9436fe67e2c4d9d4ced7d454c"
    },
    {
        "name": "staking queuedElected",
        "key": "0x5f3e4907f716ac89b6347d15ececedca506d22b33505b67f525d81bd005b1687"
    },
    {
        "name": "staking queuedScore",
        "key": "0x5f3e4907f716ac89b6347d15ececedcab3b6930af377ba74f7e8379e44b2c77f"
    },
    {
        "name": "staking eraElectionStatus",
        "key": "0x5f3e4907f716ac89b6347d15ececedcae1791577e4efcb083fdc3cb21e85b2e4"
    },
    {
        "name": "staking isCurrentSessionFinal",
        "key": "0x5f3e4907f716ac89b6347d15ececedcaa3f6dd299ad3afa68580a25a73f6eabf"
    },
    {
        "name": "staking storageVersion",
        "key": "0x5f3e4907f716ac89b6347d15ececedca308ce9615de0775a82f8a94dc3d285a1"
    },
    {
        "name": "staking migrateEra",
        "key": "0x5f3e4907f716ac89b6347d15ececedcaaa657324113feab08288289a58ec7c3a"
    },
    {
        "name": "session validators",
        "key": "0xcec5070d609dd3497f72bde07fc96ba088dcde934c658227ee1dfafcd6e16903"
    },
    {
        "name": "session currentIndex",
        "key": "0xcec5070d609dd3497f72bde07fc96ba072763800a36a99fdfc7c10f6415f6ee6"
    },
    {
        "name": "session queuedChanged",
        "key": "0xcec5070d609dd3497f72bde07fc96ba09450bfa4b96a3fa7a3c8f40da6bf32e1"
    },
    {
        "name": "session queuedKeys",
        "key": "0xcec5070d609dd3497f72bde07fc96ba0e0cdd062e6eaf24295ad4ccfc41d4609"
    },
    {
        "name": "session disabledValidators",
        "key": "0xcec5070d609dd3497f72bde07fc96ba05a9a74be4a5a7df60b01a6c0326c5e20"
    },
    {
        "name": "session nextKeys",
        "key": "0xcec5070d609dd3497f72bde07fc96ba04c014e6bf8b8c2c011e7290b85696bb3"
    },
    {
        "name": "session keyOwner",
        "key": "0xcec5070d609dd3497f72bde07fc96ba0726380404683fc89e8233450c8aa1950"
    },
    {
        "name": "democracy publicPropCount",
        "key": "0xf2794c22e353e9a839f12faab03a911bbdcb0c5143a8617ed38ae3810dd45bc6"
    },
    {
        "name": "democracy publicProps",
        "key": "0xf2794c22e353e9a839f12faab03a911b49d40ca9ee2e46158745d0ab5442ac80"
    },
    {
        "name": "democracy depositOf",
        "key": "0xf2794c22e353e9a839f12faab03a911b255521173d2e7e678ffbf1e6bb8a6257"
    },
    {
        "name": "democracy preimages",
        "key": "0xf2794c22e353e9a839f12faab03a911bf68967d635641a7087e53f2bff1ecad3"
    },
    {
        "name": "democracy referendumCount",
        "key": "0xf2794c22e353e9a839f12faab03a911b7f17cdfbfa73331856cca0acddd7842e"
    },
    {
        "name": "democracy lowestUnbaked",
        "key": "0xf2794c22e353e9a839f12faab03a911be2f6cb0456905c189bcb0458f9440f13"
    },
    {
        "name": "democracy referendumInfoOf",
        "key": "0xf2794c22e353e9a839f12faab03a911bb9e0c7dac4238b700a83735192cb921c"
    },
    {
        "name": "democracy votingOf",
        "key": "0xf2794c22e353e9a839f12faab03a911be470c6afbbbc027eb288ade7595953c2"
    },
    {
        "name": "democracy proxy",
        "key": "0xf2794c22e353e9a839f12faab03a911b1809d78346727a0ef58c0fa03bafa323"
    },
    {
        "name": "democracy locks",
        "key": "0xf2794c22e353e9a839f12faab03a911b218f26c73add634897550b4003b26bc6"
    },
    {
        "name": "democracy lastTabledWasExternal",
        "key": "0xf2794c22e353e9a839f12faab03a911bfe9f3e7f80c2c73ce03922baf72a23fd"
    },
    {
        "name": "democracy nextExternal",
        "key": "0xf2794c22e353e9a839f12faab03a911b0ef76b8bae2d5abecdf27038f43d62d9"
    },
    {
        "name": "democracy blacklist",
        "key": "0xf2794c22e353e9a839f12faab03a911bb7612c99e31defd01cd5a28e9967e208"
    },
    {
        "name": "democracy cancellations",
        "key": "0xf2794c22e353e9a839f12faab03a911be6e976fedc31c7b8cf73483554bd2be2"
    },
    {
        "name": "council proposals",
        "key": "0x11f3ba2e1cdd6d62f2ff9b5589e7ff8188c2f7188c6fdd1dffae2fa0d171f440"
    },
    {
        "name": "council proposalOf",
        "key": "0x11f3ba2e1cdd6d62f2ff9b5589e7ff81e9d6db8868a37d79930bc3f7f33950d1"
    },
    {
        "name": "council voting",
        "key": "0x11f3ba2e1cdd6d62f2ff9b5589e7ff8171cd3068e6118bfb392b798317f63a89"
    },
    {
        "name": "council proposalCount",
        "key": "0x11f3ba2e1cdd6d62f2ff9b5589e7ff816254e9d55588784fa2a62b726696e2b1"
    },
    {
        "name": "council members",
        "key": "0x11f3ba2e1cdd6d62f2ff9b5589e7ff81ba7fb8745735dc3be2a2c61a72c39e78"
    },
    {
        "name": "council prime",
        "key": "0x11f3ba2e1cdd6d62f2ff9b5589e7ff81cb3136ee16886ac28a54f39e605b387a"
    },
    {
        "name": "technicalCommittee proposals",
        "key": "0x8985776095addd4789fccbce8ca77b2388c2f7188c6fdd1dffae2fa0d171f440"
    },
    {
        "name": "technicalCommittee proposalOf",
        "key": "0x8985776095addd4789fccbce8ca77b23e9d6db8868a37d79930bc3f7f33950d1"
    },
    {
        "name": "technicalCommittee voting",
        "key": "0x8985776095addd4789fccbce8ca77b2371cd3068e6118bfb392b798317f63a89"
    },
    {
        "name": "technicalCommittee proposalCount",
        "key": "0x8985776095addd4789fccbce8ca77b236254e9d55588784fa2a62b726696e2b1"
    },
    {
        "name": "technicalCommittee members",
        "key": "0x8985776095addd4789fccbce8ca77b23ba7fb8745735dc3be2a2c61a72c39e78"
    },
    {
        "name": "technicalCommittee prime",
        "key": "0x8985776095addd4789fccbce8ca77b23cb3136ee16886ac28a54f39e605b387a"
    },
    {
        "name": "elections members",
        "key": "0xe2e62dd81c48a88f73b6f6463555fd8eba7fb8745735dc3be2a2c61a72c39e78"
    },
    {
        "name": "elections runnersUp",
        "key": "0xe2e62dd81c48a88f73b6f6463555fd8e40982df579bdf1315224f41e5f482063"
    },
    {
        "name": "elections electionRounds",
        "key": "0xe2e62dd81c48a88f73b6f6463555fd8e7657ad2ff3a6742e1071bbb898ce5431"
    },
    {
        "name": "elections voting",
        "key": "0xe2e62dd81c48a88f73b6f6463555fd8e71cd3068e6118bfb392b798317f63a89"
    },
    {
        "name": "elections candidates",
        "key": "0xe2e62dd81c48a88f73b6f6463555fd8e948ece45793d7f15c9c0b9574ddbc665"
    },
    {
        "name": "technicalMembership members",
        "key": "0x492a52699edf49c972c21db794cfcf57ba7fb8745735dc3be2a2c61a72c39e78"
    },
    {
        "name": "technicalMembership prime",
        "key": "0x492a52699edf49c972c21db794cfcf57cb3136ee16886ac28a54f39e605b387a"
    },
    {
        "name": "grandpa state",
        "key": "0x2371e21684d2fae99bcb4d579242f74af39a107f2d8d3854c9aba9b021f43d9c"
    },
    {
        "name": "grandpa pendingChange",
        "key": "0x2371e21684d2fae99bcb4d579242f74a2ff65991b1c915dd6cc8d4825eacfcb4"
    },
    {
        "name": "grandpa nextForced",
        "key": "0x2371e21684d2fae99bcb4d579242f74a01d7818126bd9b3074803e91f4c91b59"
    },
    {
        "name": "grandpa stalled",
        "key": "0x2371e21684d2fae99bcb4d579242f74a7ddd013461b72c3004f9c0ca3faf9ebe"
    },
    {
        "name": "grandpa currentSetId",
        "key": "0x2371e21684d2fae99bcb4d579242f74a8a2d09463effcc78a22d75b9cb87dffc"
    },
    {
        "name": "grandpa setIdSession",
        "key": "0x2371e21684d2fae99bcb4d579242f74ad47cb8f5328af743ddfb361e7180e7fc"
    },
    {
        "name": "treasury proposalCount",
        "key": "0x89d139e01a5eb2256f222e5fc5dbe6b36254e9d55588784fa2a62b726696e2b1"
    },
    {
        "name": "treasury proposals",
        "key": "0x89d139e01a5eb2256f222e5fc5dbe6b388c2f7188c6fdd1dffae2fa0d171f440"
    },
    {
        "name": "treasury approvals",
        "key": "0x89d139e01a5eb2256f222e5fc5dbe6b33c9c1284130706f5aea0c8b3d4c54d89"
    },
    {
        "name": "treasury tips",
        "key": "0x89d139e01a5eb2256f222e5fc5dbe6b32c5de123c468aef7f3ac2ab3a76f87ce"
    },
    {
        "name": "treasury reasons",
        "key": "0x89d139e01a5eb2256f222e5fc5dbe6b3d834d1db4313872258a93b9fc45d488b"
    },
    {
        "name": "contracts gasSpent",
        "key": "0x4342193e496fab7ec59d615ed0dc5530d8ac468c253672afe17416173f0853ce"
    },
    {
        "name": "contracts currentSchedule",
        "key": "0x4342193e496fab7ec59d615ed0dc5530d2d505c0e6f76fd7ce0796ebe187401c"
    },
    {
        "name": "contracts pristineCode",
        "key": "0x4342193e496fab7ec59d615ed0dc55304d6c2b03b90028f3bf407eb433e96389"
    },
    {
        "name": "contracts codeStorage",
        "key": "0x4342193e496fab7ec59d615ed0dc553022fca90611ba8b7942f8bdb3b97f6580"
    },
    {
        "name": "contracts accountCounter",
        "key": "0x4342193e496fab7ec59d615ed0dc5530ead1f2be31b521965bfb6018d2bd3a06"
    },
    {
        "name": "contracts contractInfoOf",
        "key": "0x4342193e496fab7ec59d615ed0dc5530060e99e5378e562537cf3bc983e17b91"
    },
    {
        "name": "contracts gasPrice",
        "key": "0x4342193e496fab7ec59d615ed0dc55304a9d2f70e9ee596bc867d128cd9ec759"
    },
    {
        "name": "sudo key",
        "key": "0x5c0d1176a568c1f92944340dbfed9e9c530ebca703c85910e7164cb7d1c9e47b"
    },
    {
        "name": "imOnline heartbeatAfter",
        "key": "0x2b06af9719ac64d755623cda8ddd9b948aa1f2c9844f11024c1d204e705a6217"
    },
    {
        "name": "imOnline keys",
        "key": "0x2b06af9719ac64d755623cda8ddd9b949f99a2ce711f3a31b2fc05604c93f179"
    },
    {
        "name": "imOnline receivedHeartbeats",
        "key": "0x2b06af9719ac64d755623cda8ddd9b94cc5a1aa6e3716372f36ef103b7e3ae67"
    },
    {
        "name": "imOnline authoredBlocks",
        "key": "0x2b06af9719ac64d755623cda8ddd9b94b1c371ded9e9c565e89ba783c4d5f5f9"
    },
    {
        "name": "offences reports",
        "key": "0xd5c41b52a371aa36c9254ce34324f2a5b262e9238fa402540c250bc3f5d6188d"
    },
    {
        "name": "offences deferredOffences",
        "key": "0xd5c41b52a371aa36c9254ce34324f2a53b996bb988ea8ee15bad3ffd2f68dbda"
    },
    {
        "name": "offences concurrentReportsIndex",
        "key": "0xd5c41b52a371aa36c9254ce34324f2a560dc8ef000cdbdc859dd352229ce16fb"
    },
    {
        "name": "offences reportsByKindIndex",
        "key": "0xd5c41b52a371aa36c9254ce34324f2a53589c0dac50da6fb3a3611eb32bcd27e"
    },
    {
        "name": "randomnessCollectiveFlip randomMaterial",
        "key": "0xbd2a529379475088d3e29a918cd478721a39ec767bd5269111e6492a1675702a"
    },
    {
        "name": "identity identityOf",
        "key": "0x2aeddc77fe58c98d50bd37f1b90840f9cd7f37317cd20b61e9bd46fab8704714"
    },
    {
        "name": "identity superOf",
        "key": "0x2aeddc77fe58c98d50bd37f1b90840f943a953ac082e08b6527ce262dbd4abf2"
    },
    {
        "name": "identity subsOf",
        "key": "0x2aeddc77fe58c98d50bd37f1b90840f96ee5a0b09e7e9a96219dd66f0f74c37e"
    },
    {
        "name": "identity registrars",
        "key": "0x2aeddc77fe58c98d50bd37f1b90840f91f7f3f3eb1c2a69978da998d19f74ec5"
    },
    {
        "name": "society founder",
        "key": "0x426e15054d267946093858132eb537f195999521c6c89cd80b677e53ce20f98c"
    },
    {
        "name": "society rules",
        "key": "0x426e15054d267946093858132eb537f1ad8964373ae14fde6a1b12a2ccb7aebd"
    },
    {
        "name": "society candidates",
        "key": "0x426e15054d267946093858132eb537f1948ece45793d7f15c9c0b9574ddbc665"
    },
    {
        "name": "society suspendedCandidates",
        "key": "0x426e15054d267946093858132eb537f1bbf9723cdae80db599c0e53c5a470cd2"
    },
    {
        "name": "society pot",
        "key": "0x426e15054d267946093858132eb537f1a47a9ff5cd5bf4d848a80a0b1a947dc3"
    },
    {
        "name": "society head",
        "key": "0x426e15054d267946093858132eb537f105fe52c2045750c3c492ccdcf62e2b9c"
    },
    {
        "name": "society members",
        "key": "0x426e15054d267946093858132eb537f1ba7fb8745735dc3be2a2c61a72c39e78"
    },
    {
        "name": "society suspendedMembers",
        "key": "0x426e15054d267946093858132eb537f14961503206762969ef4828521ef92a35"
    },
    {
        "name": "society bids",
        "key": "0x426e15054d267946093858132eb537f1c4f1521904024343c14aea2e016c84d7"
    },
    {
        "name": "society vouching",
        "key": "0x426e15054d267946093858132eb537f105eef273131bee9ab1033b8db9e5ab8c"
    },
    {
        "name": "society payouts",
        "key": "0x426e15054d267946093858132eb537f119f4459916c774a1c3287d8ac99e98b9"
    },
    {
        "name": "society strikes",
        "key": "0x426e15054d267946093858132eb537f10da61bea5fc7de17ebdf361b9914e50b"
    },
    {
        "name": "society votes",
        "key": "0x426e15054d267946093858132eb537f1b4adc6a1ce4f7cc2e696ed0fd06bd01c"
    },
    {
        "name": "society defender",
        "key": "0x426e15054d267946093858132eb537f1d3bcf3722b2e2300078c9d1795079f6e"
    },
    {
        "name": "society defenderVotes",
        "key": "0x426e15054d267946093858132eb537f191ca57b0c4b20b29ae7e99d6201d680c"
    },
    {
        "name": "society maxMembers",
        "key": "0x426e15054d267946093858132eb537f1d0b4a3f7631f0c0e761898fe198211de"
    },
    {
        "name": "recovery recoverable",
        "key": "0xa2ce73642c549ae79c14f0a671cf45f9a3f57184ab60571b3be8a355d07be414"
    },
    {
        "name": "recovery activeRecoveries",
        "key": "0xa2ce73642c549ae79c14f0a671cf45f9dff9094d7baf1e2d9b2e3a4253b096f8"
    },
    {
        "name": "recovery proxy",
        "key": "0xa2ce73642c549ae79c14f0a671cf45f91809d78346727a0ef58c0fa03bafa323"
    },
    {
        "name": "vesting vesting",
        "key": "0x5f27b51b5ec208ee9cb25b55d87282435f27b51b5ec208ee9cb25b55d8728243"
    },
    {
        "name": "scheduler agenda",
        "key": "0x3db7a24cfdc9de785974746c14a99df91643f5419718219c95679ddd2d825574"
    },
    {
        "name": "scheduler lookup",
        "key": "0x3db7a24cfdc9de785974746c14a99df9891ad457bf4da54990fa84a2acb148a2"
    },
    {
        "name": "claims claims",
        "key": "0x9c5d795d0297be56027a4b2464e333979c5d795d0297be56027a4b2464e33397"
    },
    {
        "name": "claims total",
        "key": "0x9c5d795d0297be56027a4b2464e33397f43d6436dec51f09c3b71287a8fc9d48"
    },
    {
        "name": "claims vesting",
        "key": "0x9c5d795d0297be56027a4b2464e333975f27b51b5ec208ee9cb25b55d8728243"
    },
    {
        "name": "claims signing",
        "key": "0x9c5d795d0297be56027a4b2464e33397c0793c53db77bf57f00ed54aa9119289"
    },
    {
        "name": "claims preclaims",
        "key": "0x9c5d795d0297be56027a4b2464e3339763e6d3c1fb15805edfd024172ea4817d"
    }
];

let knownKeys = wellKnownKeys.concat(storageKeys);
