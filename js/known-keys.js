let knownKeys = [
	{
		"name": "system accountNonce",
		"key": "0x26aa394eea5630e07c48ae0c9558cef79c2f82b23e5fd031fb54c292794b4cc4"
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
		"name": "randomnessCollectiveFlip randomMaterial",
		"key": "0xbd2a529379475088d3e29a918cd478721a39ec767bd5269111e6492a1675702a"
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
		"name": "timestamp now",
		"key": "0xf0c365c3cf59d671eb72da0e7a4113c49f1f0515f462cdcf84e0f1d6045dfcbb"
	},
	{
		"name": "timestamp didUpdate",
		"key": "0xf0c365c3cf59d671eb72da0e7a4113c4bbd108c4899964f707fdaffb82636065"
	},
	{
		"name": "indices nextEnumSet",
		"key": "0x1a736d37504c2e3fb73dad160c55b291b35b5a09b938edfd10fcbacc615abb0c"
	},
	{
		"name": "indices enumSet",
		"key": "0x1a736d37504c2e3fb73dad160c55b2917ac6a308d645671864cda07d358e7512"
	},
	{
		"name": "balances totalIssuance",
		"key": "0xc2261276cc9d1f8598ea4b6a74b15c2f57c875e4cff74148e4628f264b974c80"
	},
	{
		"name": "balances vesting",
		"key": "0xc2261276cc9d1f8598ea4b6a74b15c2f5f27b51b5ec208ee9cb25b55d8728243"
	},
	{
		"name": "balances freeBalance",
		"key": "0xc2261276cc9d1f8598ea4b6a74b15c2f6482b9ade7bc6657aaca787ba1add3b4"
	},
	{
		"name": "balances reservedBalance",
		"key": "0xc2261276cc9d1f8598ea4b6a74b15c2f3c22813def93ef32c365b55cb92f10f9"
	},
	{
		"name": "balances locks",
		"key": "0xc2261276cc9d1f8598ea4b6a74b15c2f218f26c73add634897550b4003b26bc6"
	},
	{
		"name": "transactionPayment nextFeeMultiplier",
		"key": "0xc2261276cc9d1f8598ea4b6a74b15c2f3f2edf3bdf381debe331ab7446addfdc"
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
		"key": "0x5f3e4907f716ac89b6347d15ececedca6a93112633bb3354e67952fcdd740cd5"
	},
	{
		"name": "staking nominators",
		"key": "0x5f3e4907f716ac89b6347d15ececedca56ef6227cecb2f07274cb0572d8fa4c2"
	},
	{
		"name": "staking stakers",
		"key": "0x5f3e4907f716ac89b6347d15ececedca83e585bbc5fdcec57219c0dc81ef5ff4"
	},
	{
		"name": "staking currentElected",
		"key": "0x5f3e4907f716ac89b6347d15ececedca0ea0ecac76457d0f9b39b981dd107012"
	},
	{
		"name": "staking currentEra",
		"key": "0x5f3e4907f716ac89b6347d15ececedca0b6a45321efae92aea15e0740ec7afe7"
	},
	{
		"name": "staking currentEraStart",
		"key": "0x5f3e4907f716ac89b6347d15ececedcaa66168f7e7259b6670a06f2565e3e5f2"
	},
	{
		"name": "staking currentEraStartSessionIndex",
		"key": "0x5f3e4907f716ac89b6347d15ececedca509a9b6efa93f5bb83f858f0babfd30b"
	},
	{
		"name": "staking currentEraPointsEarned",
		"key": "0x5f3e4907f716ac89b6347d15ececedcaeeb0c86795e1d21eadd270891cb8059a"
	},
	{
		"name": "staking slotStake",
		"key": "0x5f3e4907f716ac89b6347d15ececedca9cbd2f0b29a008a36009ac44cca0c969"
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
		"name": "staking storageVersion",
		"key": "0x5f3e4907f716ac89b6347d15ececedca308ce9615de0775a82f8a94dc3d285a1"
	},
	{
		"name": "offences reports",
		"key": "0xd5c41b52a371aa36c9254ce34324f2a5b262e9238fa402540c250bc3f5d6188d"
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
		"name": "grandpa authorities",
		"key": "0x2371e21684d2fae99bcb4d579242f74a5e0621c4869aa60c02be9adcc98a0d1d"
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
		"name": "sudo key",
		"key": "0x5c0d1176a568c1f92944340dbfed9e9c530ebca703c85910e7164cb7d1c9e47b"
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
		"name": "democracy preimages",
		"key": "0xf2794c22e353e9a839f12faab03a911bf68967d635641a7087e53f2bff1ecad3"
	},
	{
		"name": "democracy depositOf",
		"key": "0xf2794c22e353e9a839f12faab03a911b255521173d2e7e678ffbf1e6bb8a6257"
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
		"name": "democracy dispatchQueue",
		"key": "0xf2794c22e353e9a839f12faab03a911babdb959a4c964eaa1d1f0820bf948f28"
	},
	{
		"name": "democracy votersFor",
		"key": "0xf2794c22e353e9a839f12faab03a911b68dea82502521b3daa51008b68692b1b"
	},
	{
		"name": "democracy voteOf",
		"key": "0xf2794c22e353e9a839f12faab03a911b02a7afbcd5cd4ad2c68bbc63279ae52e"
	},
	{
		"name": "democracy proxy",
		"key": "0xf2794c22e353e9a839f12faab03a911b1809d78346727a0ef58c0fa03bafa323"
	},
	{
		"name": "democracy delegations",
		"key": "0xf2794c22e353e9a839f12faab03a911bc809e5baae97c181b47cc95a021f3e48"
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
		"name": "electionsPhragmen members",
		"key": "0xe2e62dd81c48a88f73b6f6463555fd8eba7fb8745735dc3be2a2c61a72c39e78"
	},
	{
		"name": "electionsPhragmen runnersUp",
		"key": "0xe2e62dd81c48a88f73b6f6463555fd8e40982df579bdf1315224f41e5f482063"
	},
	{
		"name": "electionsPhragmen electionRounds",
		"key": "0xe2e62dd81c48a88f73b6f6463555fd8e7657ad2ff3a6742e1071bbb898ce5431"
	},
	{
		"name": "electionsPhragmen votesOf",
		"key": "0xe2e62dd81c48a88f73b6f6463555fd8e17e1902017f25928e40b071bcad95d1c"
	},
	{
		"name": "electionsPhragmen stakeOf",
		"key": "0xe2e62dd81c48a88f73b6f6463555fd8ee7d0c42b25ce86cc50204950528688ea"
	},
	{
		"name": "electionsPhragmen candidates",
		"key": "0xe2e62dd81c48a88f73b6f6463555fd8e948ece45793d7f15c9c0b9574ddbc665"
	},
	{
		"name": "technicalMembership members",
		"key": "0x492a52699edf49c972c21db794cfcf57ba7fb8745735dc3be2a2c61a72c39e78"
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
		"name": "parachains authorities",
		"key": "0x0b76934f4cc08dee01012d059e1b83ee5e0621c4869aa60c02be9adcc98a0d1d"
	},
	{
		"name": "parachains code",
		"key": "0x0b76934f4cc08dee01012d059e1b83eeae01428f47990f2aefd44a980d4de151"
	},
	{
		"name": "parachains heads",
		"key": "0x0b76934f4cc08dee01012d059e1b83ee1b3c252fcb29d88eff4f3de5de4476c3"
	},
	{
		"name": "parachains watermarks",
		"key": "0x0b76934f4cc08dee01012d059e1b83ee6f83b6527ba224f06499b0feeb125c6d"
	},
	{
		"name": "parachains unroutedIngress",
		"key": "0x0b76934f4cc08dee01012d059e1b83eea0af70a84ed9666b2949ad745f26456a"
	},
	{
		"name": "parachains relayDispatchQueue",
		"key": "0x0b76934f4cc08dee01012d059e1b83eeb8c70d66fd452ea1e5830d5eb1b11491"
	},
	{
		"name": "parachains relayDispatchQueueSize",
		"key": "0x0b76934f4cc08dee01012d059e1b83eefad157e461d71fd4c1f936839a5f1f3e"
	},
	{
		"name": "parachains needsDispatch",
		"key": "0x0b76934f4cc08dee01012d059e1b83eeeec2d17a76153ff51817f12d9cfc3c7f"
	},
	{
		"name": "parachains didUpdate",
		"key": "0x0b76934f4cc08dee01012d059e1b83eebbd108c4899964f707fdaffb82636065"
	},
	{
		"name": "attestations recentParaBlocks",
		"key": "0xae394d879ddf7f99595bc0dd36e355b5deaf113faae552001507f41acaa8fd81"
	},
	{
		"name": "attestations paraBlockAttestations",
		"key": "0xae394d879ddf7f99595bc0dd36e355b562fda5648314c851805dc675c024442d"
	},
	{
		"name": "attestations didUpdate",
		"key": "0xae394d879ddf7f99595bc0dd36e355b5bbd108c4899964f707fdaffb82636065"
	},
	{
		"name": "slots auctionCounter",
		"key": "0x6ac983d82528bf1595ab26438ae5b2cfa532c79766d5a981efeca4da298f4e4f"
	},
	{
		"name": "slots managedIds",
		"key": "0x6ac983d82528bf1595ab26438ae5b2cfa8d750d83a217b5dc6dfcf8aec6108ab"
	},
	{
		"name": "slots deposits",
		"key": "0x6ac983d82528bf1595ab26438ae5b2cf74a614db8021c6bd0a028aafdf29dd08"
	},
	{
		"name": "slots auctionInfo",
		"key": "0x6ac983d82528bf1595ab26438ae5b2cfef0d899c73ce7f3705166b3e3e6512eb"
	},
	{
		"name": "slots winning",
		"key": "0x6ac983d82528bf1595ab26438ae5b2cf4a20667fb1dc58cb22bcadfd9ab7f67c"
	},
	{
		"name": "slots reservedAmounts",
		"key": "0x6ac983d82528bf1595ab26438ae5b2cf49ddb7db82ffb65f362833fd1102d66d"
	},
	{
		"name": "slots onboardQueue",
		"key": "0x6ac983d82528bf1595ab26438ae5b2cff866e860609824e29261664110e9ed0f"
	},
	{
		"name": "slots onboarding",
		"key": "0x6ac983d82528bf1595ab26438ae5b2cf85fd5f5a4b16953f824376f27da292af"
	},
	{
		"name": "slots offboarding",
		"key": "0x6ac983d82528bf1595ab26438ae5b2cff46fe7830e61b2961828a4bb22538341"
	},
	{
		"name": "registrar parachains",
		"key": "0x3fba98689ebed1138735e0e7a5a790ab0b76934f4cc08dee01012d059e1b83ee"
	},
	{
		"name": "registrar threadCount",
		"key": "0x3fba98689ebed1138735e0e7a5a790ab0d87bd2505058c6624f54d67234bc126"
	},
	{
		"name": "registrar selectedThreads",
		"key": "0x3fba98689ebed1138735e0e7a5a790ab21a5051453bd3ae7ed269190f4653f3b"
	},
	{
		"name": "registrar active",
		"key": "0x3fba98689ebed1138735e0e7a5a790ab0f41321f75df7ea5127be2db4983c8b2"
	},
	{
		"name": "registrar nextFreeId",
		"key": "0x3fba98689ebed1138735e0e7a5a790ab13fce7283338105a9c51d4ba7a10a852"
	},
	{
		"name": "registrar pendingSwap",
		"key": "0x3fba98689ebed1138735e0e7a5a790ab050d60f58013e1a094de5dc9f24ea109"
	},
	{
		"name": "registrar paras",
		"key": "0x3fba98689ebed1138735e0e7a5a790abcd710b30bd2eab0352ddcc26417aa194"
	},
	{
		"name": "registrar retryQueue",
		"key": "0x3fba98689ebed1138735e0e7a5a790abb984cfb497221deefcefb70073dcaac1"
	},
	{
		"name": "registrar debtors",
		"key": "0x3fba98689ebed1138735e0e7a5a790ab210ce0e0a66ab5951ed411b3902eddf0"
	}
]
