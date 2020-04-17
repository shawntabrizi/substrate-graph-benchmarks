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
        key: "0x26aa394eea5630e07c48ae0c9558cef7b99d880ec681799c0cf30e8886371da90b62d024edddc449732df6d96164aa793566ce92da0aa0490930eea6a068c3dabbbad5fdaf44582c01a936714f97bea1",
        read: true,
        write: true
    }
]
