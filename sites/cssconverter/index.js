export const UNIT_CONVERSION = {
  twip: {
    title: "Twentieth of a point",
    type: 'length',
    ratio: {
      params: [
        {name: "dpi", default: 96}
      ],
      compute: "return p.dpi / 1440"
    },
  },
  mm: {
    title: "Millimeters",
    type: 'length',
    ratio: {
      params: [
        {name: "dpi", default: 96}
      ],
      compute: "return p.dpi / 25.4"
    },
  },
  cm: {
    title: "Centimeters",
    type: 'length',
    ratio: {
      params: [
        {name: "dpi", default: 96}
      ],
      compute: "return p.dpi / 2.54"
    },
  },
  px: {
    title: "Pixels",
    type: 'length',
    ratio: {
      params: [],
      compute: "return 1"
    }
  },
  rem: {
    title: "rem",
    type: 'length',
    ratio: {
      params: [{name: "root font-size", default: 16}],
      compute: "return p['root font-size']"
    }
  },
  em: {
    title: "em",
    type: 'length',
    ratio: {
      params: [{name: "root font-size", default: 16}],
      compute: "return p['root font-size']"
    }
  },
  in: {
    title: "Inches",
    type: 'length',
    ratio: {
      params: [],
      compute: "return 96"
    }
  }
}

export const INFO = {
  base: "px",
  domain: {
    en: "PXConverter.com"
  },
  name: {
    en: "PX Converter"
  },
  tagline: {
    en: "For better design experience"
  },
  desc: {
    en: "Best application to convert pixels, cm, mm, and inches... to each others with formula and common conversion."
  },
  testRanges: [0.2, 0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100]
}
