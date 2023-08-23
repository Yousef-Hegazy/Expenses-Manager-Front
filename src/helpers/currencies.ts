import { Currency } from "../models/userModels";

const currencies: Currency[] = [
  {
    code: "AED",
    countryName: "United Arab Emirates Dirham",
  },
  {
    code: "AFN",
    countryName: "Afghanistan Afghani",
  },
  {
    code: "ALL",
    countryName: "Albania Lek",
  },
  {
    code: "AMD",
    countryName: "Armenia Dram",
  },
  {
    code: "ANG",
    countryName: "Netherlands Antilles Guilder",
  },
  {
    code: "AOA",
    countryName: "Angola Kwanza",
  },
  {
    code: "ARS",
    countryName: "Argentina Peso",
  },
  {
    code: "AUD",
    countryName: "Australia Dollar",
  },
  {
    code: "AWG",
    countryName: "Aruba Guilder",
  },
  {
    code: "AZN",
    countryName: "Azerbaijan Manat",
  },
  {
    code: "BAM",
    countryName: "Bosnia and Herzegovina Convertible Mark",
  },
  {
    code: "BBD",
    countryName: "Barbados Dollar",
  },
  {
    code: "BDT",
    countryName: "Bangladesh Taka",
  },
  {
    code: "BGN",
    countryName: "Bulgaria Lev",
  },
  {
    code: "BHD",
    countryName: "Bahrain Dinar",
  },
  {
    code: "BIF",
    countryName: "Burundi Franc",
  },
  {
    code: "BMD",
    countryName: "Bermuda Dollar",
  },
  {
    code: "BND",
    countryName: "Brunei Darussalam Dollar",
  },
  {
    code: "BOB",
    countryName: "Bolivia Bolíviano",
  },
  {
    code: "BRL",
    countryName: "Brazil Real",
  },
  {
    code: "BSD",
    countryName: "Bahamas Dollar",
  },
  {
    code: "BTN",
    countryName: "Bhutan Ngultrum",
  },
  {
    code: "BWP",
    countryName: "Botswana Pula",
  },
  {
    code: "BYN",
    countryName: "Belarus Ruble",
  },
  {
    code: "BZD",
    countryName: "Belize Dollar",
  },
  {
    code: "CAD",
    countryName: "Canada Dollar",
  },
  {
    code: "CDF",
    countryName: "Congo/Kinshasa Franc",
  },
  {
    code: "CHF",
    countryName: "Switzerland Franc",
  },
  {
    code: "CLP",
    countryName: "Chile Peso",
  },
  {
    code: "CNY",
    countryName: "China Yuan Renminbi",
  },
  {
    code: "COP",
    countryName: "Colombia Peso",
  },
  {
    code: "CRC",
    countryName: "Costa Rica Colon",
  },
  {
    code: "CUC",
    countryName: "Cuba Convertible Peso",
  },
  {
    code: "CUP",
    countryName: "Cuba Peso",
  },
  {
    code: "CVE",
    countryName: "Cape Verde Escudo",
  },
  {
    code: "CZK",
    countryName: "Czech Republic Koruna",
  },
  {
    code: "DJF",
    countryName: "Djibouti Franc",
  },
  {
    code: "DKK",
    countryName: "Denmark Krone",
  },
  {
    code: "DOP",
    countryName: "Dominican Republic Peso",
  },
  {
    code: "DZD",
    countryName: "Algeria Dinar",
  },
  {
    code: "EGP",
    countryName: "Egypt Pound",
  },
  {
    code: "ERN",
    countryName: "Eritrea Nakfa",
  },
  {
    code: "ETB",
    countryName: "Ethiopia Birr",
  },
  {
    code: "EUR",
    countryName: "Euro Member Countries",
  },
  {
    code: "FJD",
    countryName: "Fiji Dollar",
  },
  {
    code: "FKP",
    countryName: "Falkland Islands (Malvinas) Pound",
  },
  {
    code: "GBP",
    countryName: "United Kingdom Pound",
  },
  {
    code: "GEL",
    countryName: "Georgia Lari",
  },
  {
    code: "GGP",
    countryName: "Guernsey Pound",
  },
  {
    code: "GHS",
    countryName: "Ghana Cedi",
  },
  {
    code: "GIP",
    countryName: "Gibraltar Pound",
  },
  {
    code: "GMD",
    countryName: "Gambia Dalasi",
  },
  {
    code: "GNF",
    countryName: "Guinea Franc",
  },
  {
    code: "GTQ",
    countryName: "Guatemala Quetzal",
  },
  {
    code: "GYD",
    countryName: "Guyana Dollar",
  },
  {
    code: "HKD",
    countryName: "Hong Kong Dollar",
  },
  {
    code: "HNL",
    countryName: "Honduras Lempira",
  },
  {
    code: "HRK",
    countryName: "Croatia Kuna",
  },
  {
    code: "HTG",
    countryName: "Haiti Gourde",
  },
  {
    code: "HUF",
    countryName: "Hungary Forint",
  },
  {
    code: "IDR",
    countryName: "Indonesia Rupiah",
  },
  {
    code: "ILS",
    countryName: "Israel Shekel",
  },
  {
    code: "IMP",
    countryName: "Isle of Man Pound",
  },
  {
    code: "INR",
    countryName: "India Rupee",
  },
  {
    code: "IQD",
    countryName: "Iraq Dinar",
  },
  {
    code: "IRR",
    countryName: "Iran Rial",
  },
  {
    code: "ISK",
    countryName: "Iceland Krona",
  },
  {
    code: "JEP",
    countryName: "Jersey Pound",
  },
  {
    code: "JMD",
    countryName: "Jamaica Dollar",
  },
  {
    code: "JOD",
    countryName: "Jordan Dinar",
  },
  {
    code: "JPY",
    countryName: "Japan Yen",
  },
  {
    code: "KES",
    countryName: "Kenya Shilling",
  },
  {
    code: "KGS",
    countryName: "Kyrgyzstan Som",
  },
  {
    code: "KHR",
    countryName: "Cambodia Riel",
  },
  {
    code: "KMF",
    countryName: "Comorian Franc",
  },
  {
    code: "KPW",
    countryName: "Korea (North) Won",
  },
  {
    code: "KRW",
    countryName: "Korea (South) Won",
  },
  {
    code: "KWD",
    countryName: "Kuwait Dinar",
  },
  {
    code: "KYD",
    countryName: "Cayman Islands Dollar",
  },
  {
    code: "KZT",
    countryName: "Kazakhstan Tenge",
  },
  {
    code: "LAK",
    countryName: "Laos Kip",
  },
  {
    code: "LBP",
    countryName: "Lebanon Pound",
  },
  {
    code: "LKR",
    countryName: "Sri Lanka Rupee",
  },
  {
    code: "LRD",
    countryName: "Liberia Dollar",
  },
  {
    code: "LSL",
    countryName: "Lesotho Loti",
  },
  {
    code: "LYD",
    countryName: "Libya Dinar",
  },
  {
    code: "MAD",
    countryName: "Morocco Dirham",
  },
  {
    code: "MDL",
    countryName: "Moldova Leu",
  },
  {
    code: "MGA",
    countryName: "Madagascar Ariary",
  },
  {
    code: "MKD",
    countryName: "Macedonia Denar",
  },
  {
    code: "MMK",
    countryName: "Myanmar (Burma) Kyat",
  },
  {
    code: "MNT",
    countryName: "Mongolia Tughrik",
  },
  {
    code: "MOP",
    countryName: "Macau Pataca",
  },
  {
    code: "MRU",
    countryName: "Mauritania Ouguiya",
  },
  {
    code: "MUR",
    countryName: "Mauritius Rupee",
  },
  {
    code: "MVR",
    countryName: "Maldives (Maldive Islands) Rufiyaa",
  },
  {
    code: "MWK",
    countryName: "Malawi Kwacha",
  },
  {
    code: "MXN",
    countryName: "Mexico Peso",
  },
  {
    code: "MYR",
    countryName: "Malaysia Ringgit",
  },
  {
    code: "MZN",
    countryName: "Mozambique Metical",
  },
  {
    code: "NAD",
    countryName: "Namibia Dollar",
  },
  {
    code: "NGN",
    countryName: "Nigeria Naira",
  },
  {
    code: "NIO",
    countryName: "Nicaragua Cordoba",
  },
  {
    code: "NOK",
    countryName: "Norway Krone",
  },
  {
    code: "NPR",
    countryName: "Nepal Rupee",
  },
  {
    code: "NZD",
    countryName: "New Zealand Dollar",
  },
  {
    code: "OMR",
    countryName: "Oman Rial",
  },
  {
    code: "PAB",
    countryName: "Panama Balboa",
  },
  {
    code: "PEN",
    countryName: "Peru Sol",
  },
  {
    code: "PGK",
    countryName: "Papua New Guinea Kina",
  },
  {
    code: "PHP",
    countryName: "Philippines Peso",
  },
  {
    code: "PKR",
    countryName: "Pakistan Rupee",
  },
  {
    code: "PLN",
    countryName: "Poland Zloty",
  },
  {
    code: "PYG",
    countryName: "Paraguay Guarani",
  },
  {
    code: "QAR",
    countryName: "Qatar Riyal",
  },
  {
    code: "RON",
    countryName: "Romania Leu",
  },
  {
    code: "RSD",
    countryName: "Serbia Dinar",
  },
  {
    code: "RUB",
    countryName: "Russia Ruble",
  },
  {
    code: "RWF",
    countryName: "Rwanda Franc",
  },
  {
    code: "SAR",
    countryName: "Saudi Arabia Riyal",
  },
  {
    code: "SBD",
    countryName: "Solomon Islands Dollar",
  },
  {
    code: "SCR",
    countryName: "Seychelles Rupee",
  },
  {
    code: "SDG",
    countryName: "Sudan Pound",
  },
  {
    code: "SEK",
    countryName: "Sweden Krona",
  },
  {
    code: "SGD",
    countryName: "Singapore Dollar",
  },
  {
    code: "SHP",
    countryName: "Saint Helena Pound",
  },
  {
    code: "SLL",
    countryName: "Sierra Leone Leone",
  },
  {
    code: "SOS",
    countryName: "Somalia Shilling",
  },
  {
    code: "SPL*",
    countryName: "Seborga Luigino",
  },
  {
    code: "SRD",
    countryName: "Suriname Dollar",
  },
  {
    code: "STN",
    countryName: "São Tomé and Príncipe Dobra",
  },
  {
    code: "SVC",
    countryName: "El Salvador Colon",
  },
  {
    code: "SYP",
    countryName: "Syria Pound",
  },
  {
    code: "SZL",
    countryName: "eSwatini Lilangeni",
  },
  {
    code: "THB",
    countryName: "Thailand Baht",
  },
  {
    code: "TJS",
    countryName: "Tajikistan Somoni",
  },
  {
    code: "TMT",
    countryName: "Turkmenistan Manat",
  },
  {
    code: "TND",
    countryName: "Tunisia Dinar",
  },
  {
    code: "TOP",
    countryName: "Tonga Pa'anga",
  },
  {
    code: "TRY",
    countryName: "Turkey Lira",
  },
  {
    code: "TTD",
    countryName: "Trinidad and Tobago Dollar",
  },
  {
    code: "TVD",
    countryName: "Tuvalu Dollar",
  },
  {
    code: "TWD",
    countryName: "Taiwan New Dollar",
  },
  {
    code: "TZS",
    countryName: "Tanzania Shilling",
  },
  {
    code: "UAH",
    countryName: "Ukraine Hryvnia",
  },
  {
    code: "UGX",
    countryName: "Uganda Shilling",
  },
  {
    code: "USD",
    countryName: "United States Dollar",
  },
  {
    code: "UYU",
    countryName: "Uruguay Peso",
  },
  {
    code: "UZS",
    countryName: "Uzbekistan Som",
  },
  {
    code: "VEF",
    countryName: "Venezuela Bolívar",
  },
  {
    code: "VND",
    countryName: "Viet Nam Dong",
  },
  {
    code: "VUV",
    countryName: "Vanuatu Vatu",
  },
  {
    code: "WST",
    countryName: "Samoa Tala",
  },
  {
    code: "XAF",
    countryName: "Communauté Financière Africaine (BEAC) CFA Franc BEAC",
  },
  {
    code: "XCD",
    countryName: "East Caribbean Dollar",
  },
  {
    code: "XDR",
    countryName: "International Monetary Fund (IMF) Special Drawing Rights",
  },
  {
    code: "XOF",
    countryName: "Communauté Financière Africaine (BCEAO) Franc",
  },
  {
    code: "XPF",
    countryName: "Comptoirs Français du Pacifique (CFP) Franc",
  },
  {
    code: "YER",
    countryName: "Yemen Rial",
  },
  {
    code: "ZAR",
    countryName: "South Africa Rand",
  },
  {
    code: "ZMW",
    countryName: "Zambia Kwacha",
  },
  {
    code: "ZWD",
    countryName: "Zimbabwe Dollar",
  },
];

export default currencies;
