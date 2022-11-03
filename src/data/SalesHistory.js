const sales = [
    {
        customerName: "홍길동",
        phone: "010-1234-1234",
        code: "IPHONE14P-256SV",
        count: 1,
        price: 1354000,
        dateOfSale: new Date("2022-10-19T00:00:00"),
        dateOfDelivery: new Date("2022-10-19T00:00:00"),
        dateOfCancellation: new Date("9999-12-31T00:00:00")
    },
    {
        customerName: "홍길동",
        phone: "010-1234-1234",
        code: "RF60B99Z2APG",
        count: 1,
        price: 3490000,
        dateOfSale: new Date("2022-10-19T00:00:00"),
        dateOfDelivery: new Date("2022-10-31T00:00:00"),
        dateOfCancellation: new Date("2022-10-20T00:00:00")
    },
    {
        customerName: "김하마",
        phone: "010-1234-5678",
        code: "AF23AX977VFN",
        count: 1,
        price: 4150000,
        dateOfSale: new Date("2022-10-21T00:00:00"),
        dateOfDelivery: new Date("2022-10-24T00:00:00"),
        dateOfCancellation: new Date("9999-12-31T00:00:00")
    },
    {
        customerName: "부천중동불명",
        phone: "010-3456-7890",
        code: "MWVU2FE/A",
        count: 1,
        price: 5000,
        dateOfSale: new Date("2022-10-11T00:00:00"),
        dateOfDelivery: new Date("2022-10-11T00:00:00"),
        dateOfCancellation: new Date("9999-12-31T00:00:00")
    },
    {
        customerName: "김하마",
        phone: "010-1234-5678",
        code: "CRT-SPS0640BW",
        count: 1,
        price: 659000,
        dateOfSale: new Date("2022-10-11T00:00:00"),
        dateOfDelivery: new Date("2022-10-12T00:00:00"),
        dateOfCancellation: new Date("9999-12-31T00:00:00")
    },
    {
        customerName: "최고참",
        phone: "010-1234-1111",
        count: 1,
        price: 899000,
        dateOfSale: new Date("2022-10-11T00:00:00"),
        dateOfDelivery: new Date("2022-10-13T00:00:00"),
        dateOfCancellation: new Date("2022-10-12T00:00:00")
    },
    {
        customerName: "이리와",
        phone: "010-1234-2222",
        code: "HW-Q600B/KR",
        count: 1,
        price: 519000,
        dateOfSale: new Date("2022-10-11T00:00:00"),
        dateOfDelivery: new Date("2022-10-12T00:00:00"),
        dateOfCancellation: new Date("9999-12-31T00:00:00")
    },
    {
        customerName: "부천중동불명",
        phone: "010-3456-7890",
        code: "UN-A1010",
        count: 1,
        price: 48000,
        dateOfSale: new Date("2022-10-12T00:00:00"),
        dateOfDelivery: new Date("2022-10-12T00:00:00"),
        dateOfCancellation: new Date("9999-12-31T00:00:00")
    },
    {
        customerName: "박하사",
        phone: "010-1234-3333",
        code: "MEW-2016C",
        count: 1,
        price: 95000,
        dateOfSale: new Date("2022-10-12T00:00:00"),
        dateOfDelivery: new Date("2022-10-13T00:00:00"),
        dateOfCancellation: new Date("2022-10-12T00:00:00")
    },
    {
        customerName: "서로소",
        phone: "010-1234-4444",
        code: "OLED65A2HNA.AKRG",
        count: 1,
        price: 2401000,
        dateOfSale: new Date("2022-10-12T00:00:00"),
        dateOfDelivery: new Date("2022-10-28T00:00:00"),
        dateOfCancellation: new Date("9999-12-31T00:00:00")
    },
    {
        customerName: "서로소",
        phone: "010-1234-4444",
        code: "OLW480C.AKR",
        count: 1,
        price: 100000,
        dateOfSale: new Date("2022-10-12T00:00:00"),
        dateOfDelivery: new Date("2022-10-28T00:00:00"),
        dateOfCancellation: new Date("9999-12-31T00:00:00")
    },
    {
        customerName: "서로소",
        phone: "010-1234-4444",
        code: "M873GBB272.AKOR",
        count: 1,
        price: 3626000,
        dateOfSale: new Date("2022-10-12T00:00:00"),
        dateOfDelivery: new Date("2022-10-28T00:00:00"),
        dateOfCancellation: new Date("9999-12-31T00:00:00")
    },
    {
        customerName: "서로소",
        phone: "010-1234-4444",
        code: "BEI3MQT.AKOR",
        count: 1,
        price: 1656200,
        dateOfSale: new Date("2022-10-12T00:00:00"),
        dateOfDelivery: new Date("2022-10-28T00:00:00"),
        dateOfCancellation: new Date("9999-12-31T00:00:00")
    },
    {
        customerName: "정하리",
        phone: "010-1234-5555",
        code: "CRP-HUF1080HM",
        count: 1,
        price: 249000,
        dateOfSale: new Date("2022-10-13T00:00:00"),
        dateOfDelivery: new Date("2022-10-19T00:00:00"),
        dateOfCancellation: new Date("2022-10-14T00:00:00")
    },
    {
        customerName: "정하리",
        phone: "010-1234-5555",
        code: "WARRANTY50",
        count: 1,
        price: 7100,
        dateOfSale: new Date("2022-10-13T00:00:00"),
        dateOfDelivery: new Date("2022-10-19T00:00:00"),
        dateOfCancellation: new Date("2022-10-14T00:00:00")
    },
    {
        customerName: "송아지",
        phone: "010-1234-6666",
        code: "MNJV3KH/A",
        count: 1,
        price: 359000,
        dateOfSale: new Date("2022-10-13T00:00:00"),
        dateOfDelivery: new Date("2022-10-13T00:00:00"),
        dateOfCancellation: new Date("9999-12-31T00:00:00")
    },
    {
        customerName: "이미래",
        phone: "010-1234-7777",
        code: "IPHONE14P-128U",
        count: 1,
        price: 1502050,
        dateOfSale: new Date("2022-10-13T00:00:00"),
        dateOfDelivery: new Date("2022-10-13T00:00:00"),
        dateOfCancellation: new Date("9999-12-31T00:00:00")
    },
    {
        customerName: "부천중동불명",
        phone: "010-1234-8888",
        code: "SK-MSDACTION(32GB)(N)",
        count: 1,
        price: 14700,
        dateOfSale: new Date("2022-10-14T00:00:00"),
        dateOfDelivery: new Date("2022-10-14T00:00:00"),
        dateOfCancellation: new Date("9999-12-31T00:00:00")
    },
    {
        customerName: "부천중동불명",
        phone: "010-1234-8888",
        code: "MWYK2FE/A",
        count: 1,
        price: 5000,
        dateOfSale: new Date("2022-10-14T00:00:00"),
        dateOfDelivery: new Date("2022-10-14T00:00:00"),
        dateOfCancellation: new Date("9999-12-31T00:00:00")
    },
    {
        customerName: "김여울",
        phone: "010-1234-9999",
        code: "IPHONE14P-128U",
        count: 1,
        price: 1402050,
        dateOfSale: new Date("2022-10-14T00:00:00"),
        dateOfDelivery: new Date("2022-10-14T00:00:00"),
        dateOfCancellation: new Date("2022-10-15T00:00:00")
    },
    {
        customerName: "김여울",
        phone: "010-1234-9999",
        code: "ACCGIFT-006",
        count: 1,
        price: 37950,
        dateOfSale: new Date("2022-10-14T00:00:00"),
        dateOfDelivery: new Date("2022-10-14T00:00:00"),
        dateOfCancellation: new Date("2022-10-15T00:00:00")
    },
    {
        customerName: "부천중동불명",
        phone: "010-1234-1010",
        code: "MX0E2FE/A",
        count: 1,
        price: 5000,
        dateOfSale: new Date("2022-10-14T00:00:00"),
        dateOfDelivery: new Date("2022-10-14T00:00:00"),
        dateOfCancellation: new Date("9999-12-31T00:00:00")
    },
    {
        customerName: "이겨울",
        phone: "010-1234-1212",
        code: "MX0E2FE/A",
        count: 1,
        price: 599000,
        dateOfSale: new Date("2022-10-14T00:00:00"),
        dateOfDelivery: new Date("2022-10-15T00:00:00"),
        dateOfCancellation: new Date("9999-12-31T00:00:00")
    },
];

export{
    sales
}
