const services = [
  {
    id: "female",
    name: "女陪",
    modes: [
      {
        id: "entertain",
        name: "娱乐陪",
        tiers: [
          { id: "1h", label: "1小时", price: 60 },
          { id: "5h", label: "包5小时", price: 279 }
        ]
      },
      {
        id: "top",
        name: "顶尖",
        tiers: [
          { id: "1h", label: "1小时", price: 120 },
          { id: "5h", label: "包5小时", price: 580 }
        ]
      }
    ]
  },
  {
    id: "male",
    name: "男陪",
    modes: [
      {
        id: "top",
        name: "顶尖",
        tiers: [
          { id: "1h", label: "1小时", price: 100 },
          { id: "5h", label: "包5小时", price: 469 }
        ]
      }
    ]
  },
  {
    id: "guarantee",
    name: "护航保底单",
    modes: [
      {
        id: "secret",
        name: "绝密累计",
        tiers: [
          { id: "188", label: "188保888", price: 188 },
          { id: "388", label: "388保1588", price: 388 }
        ]
      }
    ]
  }
]

module.exports = {
  services
}
