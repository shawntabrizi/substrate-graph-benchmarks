// This is a whitelist of full storage keys that we can skip the first read counter
let whitelist = [{
        name: "Total Issuance",
        key: "0xc2261276cc9d1f8598ea4b6a74b15c2f57c875e4cff74148e4628f264b974c80",
        read: true,
        write: true
    },
    {
        name: "Block Number",
        key: "0x26aa394eea5630e07c48ae0c9558cef702a5c1b19ab7a04f536c519aca4983ac",
        read: true,
        write: true
    },
    {
        name: "Execution Phase",
        key: "0x26aa394eea5630e07c48ae0c9558cef7ff553b5a9862a516939d82b3d3d8661a",
        read: true,
        write: true
    },
    {
        name: "Event Count",
        key: "0x26aa394eea5630e07c48ae0c9558cef70a98fdbe9ce6c55837576c60c7af3850",
        read: true,
        write: true
    },
    {
        name: "System Event",
        key: "0x26aa394eea5630e07c48ae0c9558cef780d41e5e16056765bc8461851072c9d7",
        read: true,
        write: true
    },
    {
        name: "Caller 0 Account",
        key: "0x26aa394eea5630e07c48ae0c9558cef7b99d880ec681799c0cf30e8886371da946c154ffd9992e395af90b5b13cc6f295c77033fce8a9045824a6690bbf99c6db269502f0a8d1d2a008542d5690a0749",
        read: true,
        write: true
    },
    {
        name: "Treasury Account",
        key: "0x26aa394eea5630e07c48ae0c9558cef7b99d880ec681799c0cf30e8886371da95ecffd7b6c0f78751baa9d281e0bfa3a6d6f646c70792f74727372790000000000000000000000000000000000000000",
        read: true,
        write: true
    }
]
