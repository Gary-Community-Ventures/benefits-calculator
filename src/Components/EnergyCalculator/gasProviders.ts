export function getProviderNames() {
  const providerNames: { [key: string]: string } = {};

  for (const providers of Object.values(GAS_PROVIDERS)) {
    for (const [code, name] of Object.entries(providers)) {
      providerNames[code] = name;
    }
  }

  return providerNames;
}

type GasProviders = {
  [key: string]: { [key: string]: string };
};

export const GAS_PROVIDERS: GasProviders = {
  'Adams County': {
    'co-colorado-natural-gas': 'Colorado Natural Gas',
    'co-eastern-colorado-utility-company': 'Eastern Colorado Utility Company',
    'co-xcel-energy': 'Xcel Energy',
  },
  'Alamosa County': {
    'co-center-municipal-gas': 'Center Municipal Gas',
    'co-xcel-energy': 'Xcel Energy',
  },
  'Arapahoe County': {
    'co-colorado-natural-gas': 'Colorado Natural Gas',
    'co-eastern-colorado-utility-company': 'Eastern Colorado Utility Company',
    'co-xcel-energy': 'Xcel Energy',
  },
  'Archuleta County': {
    'co-citizens-utility-company': 'Citizens Utility Company',
  },
  'Baca County': {
    'co-atmos-energy': 'Atmos Energy',
  },
  'Bent County': {
    'co-atmos-energy': 'Atmos Energy',
    'co-citizens-utility-company': 'Citizens Utility Company',
  },
  'Boulder County': {
    'co-colorado-natural-gas': 'Colorado Natural Gas',
    'co-xcel-energy': 'Xcel Energy',
  },
  'Broomfield County': {
    'co-xcel-energy': 'Xcel Energy',
  },
  'Chaffee County': {
    'co-atmos-energy': 'Atmos Energy',
  },
  'Cheyenne County': {
    'co-black-hills-energy': 'Black Hills Energy',
    'co-atmos-energy': 'Atmos Energy',
  },
  'Clear Creek County': {
    'co-xcel-energy': 'Xcel Energy',
  },
  'Conejos County': {
    'co-xcel-energy': 'Xcel Energy',
  },
  'Costilla County': {
    'co-xcel-energy': 'Xcel Energy',
  },
  'Crowley County': {
    'co-citizens-utility-company': 'Citizens Utility Company',
  },
  'Custer County': {},
  'Delta County': {
    'co-black-hills-energy': 'Black Hills Energy',
  },
  'Denver County': {
    'co-xcel-energy': 'Xcel Energy',
  },
  'Dolores County': {
    'co-atmos-energy': 'Atmos Energy',
    'co-black-hills-energy': 'Black Hills Energy',
  },
  'Douglas County': {
    'co-black-hills-energy': 'Black Hills Energy',
    'co-xcel-energy': 'Xcel Energy',
  },
  'Eagle County': {
    'co-black-hills-energy': 'Black Hills Energy',
    'co-xcel-energy': 'Xcel Energy',
  },
  'El Paso County': {
    'co-black-hills-energy': 'Black Hills Energy',
    'co-colorado-springs-utilities': 'Colorado Springs Utilities',
  },
  'Elbert County': {
    'co-black-hills-energy': 'Black Hills Energy',
    'co-colorado-natural-gas': 'Colorado Natural Gas',
  },
  'Fremont County': {
    'co-atmos-energy': 'Atmos Energy',
  },
  'Garfield County': {
    'co-black-hills-energy': 'Black Hills Energy',
    'co-xcel-energy': 'Xcel Energy',
  },
  'Gilpin County': {
    'co-colorado-natural-gas': 'Colorado Natural Gas',
    'co-xcel-energy': 'Xcel Energy',
  },
  'Grand County': {
    'co-walden-gas': 'Walden Gas',
    'co-xcel-energy': 'Xcel Energy',
  },
  'Gunnison County': {
    'co-atmos-energy': 'Atmos Energy',
  },
  'Hinsdale County': {},
  'Huerfano County': {
    'co-city-of-walsenburg': 'City of Walsenburg',
  },
  'Jackson County': {
    'co-atmos-energy': 'Atmos Energy',
    'co-walden-gas': 'Walden Gas',
  },
  'Jefferson County': {
    'co-colorado-natural-gas': 'Colorado Natural Gas',
    'co-xcel-energy': 'Xcel Energy',
  },
  'Kiowa County': {
    'co-atmos-energy': 'Atmos Energy',
    'co-black-hills-energy': 'Black Hills Energy',
    'co-colorado-natural-gas': 'Colorado Natural Gas',
  },
  'Kit Carson County': {
    'co-black-hills-energy': 'Black Hills Energy',
    'co-colorado-natural-gas': 'Colorado Natural Gas',
  },
  'La Plata County': {
    'co-atmos-energy': 'Atmos Energy',
    'co-citizens-utility': 'Citizens Utility',
    'co-town-of-ignacio': 'Town of Ignacio',
  },
  'Lake County': {
    'co-black-hills-energy': 'Black Hills Energy',
    'co-xcel-energy': 'Xcel Energy',
  },
  'Larimer County': {
    'co-xcel-energy': 'Xcel Energy',
  },
  'Las Animas County': {
    'co-atmos-energy': 'Atmos Energy',
    'co-town-of-aguilar': 'Town of Aguilar',
    'co-city-of-trinidad': 'City of Trinidad',
  },
  'Lincoln County': {
    'co-black-hills-energy': 'Black Hills Energy',
  },
  'Logan County': {
    'co-black-hills-energy': 'Black Hills Energy',
    'co-xcel-energy': 'Xcel Energy',
  },
  'Mesa County': {
    'co-atmos-energy': 'Atmos Energy',
    'co-black-hills-energy': 'Black Hills Energy',
    'co-xcel-energy': 'Xcel Energy',
  },
  'Mineral County': {
    'co-center-municipal-gas': 'Center Municipal Gas',
    'co-xcel-energy': 'Xcel Energy',
  },
  'Moffat County': {
    'co-atmos-energy': 'Atmos Energy',
  },
  'Montezuma County': {
    'co-atmos-energy': 'Atmos Energy',
  },
  'Montrose County': {
    'co-black-hills-energy': 'Black Hills Energy',
  },
  'Morgan County': {
    'co-city-of-fort-morgan': 'City of Fort Morgan',
    'co-xcel-energy': 'Xcel Energy',
  },
  'Otero County': {
    'co-citizens-utility-company': 'Citizens Utility Company',
  },
  'Ouray County': {
    'co-black-hills-energy': 'Black Hills Energy',
  },
  'Park County': {
    'co-colorado-natural-gas': 'Colorado Natural Gas',
  },
  'Phillips County': {
    'co-black-hills-energy': 'Black Hills Energy',
  },
  'Pitkin County': {
    'co-atmos-energy': 'Atmos Energy',
    'co-black-hills-energy': 'Black Hills Energy',
  },
  'Prowers County': {
    'co-atmos-energy': 'Atmos Energy',
  },
  'Pueblo County': {
    'co-colorado-natural-gas': 'Colorado Natural Gas',
    'co-xcel-energy': 'Xcel Energy',
  },
  'Rio Blanco County': {
    'co-town-of-rangely': 'Town of Rangely',
    'co-atmos-energy': 'Atmos Energy',
  },
  'Rio Grande County': {
    'co-center-municipal-gas': 'Center Municipal Gas',
    'co-xcel-energy': 'Xcel Energy',
  },
  'Routt County': {
    'co-atmos-energy': 'Atmos Energy',
    'co-walden-gas': 'Walden Gas',
  },
  'Saguache County': {
    'co-atmos-energy': 'Atmos Energy',
    'co-xcel-energy': 'Xcel Energy',
    'co-center-municipal-gas': 'Center Municipal Gas',
  },
  'San Juan County': {
    'co-black-hills-energy': 'Black Hills Energy',
  },
  'San Miguel County': {
    'co-black-hills-energy': 'Black Hills Energy',
    'co-atmos-energy': 'Atmos Energy',
  },
  'Sedgwick County': {
    'co-black-hills-energy': 'Black Hills Energy',
  },
  'Summit County': {
    'co-black-hills-energy': 'Black Hills Energy',
    'co-colorado-natural-gas': 'Colorado Natural Gas',
    'co-xcel-energy': 'Xcel Energy',
  },
  'Teller County': {
    'co-atmos-energy': 'Atmos Energy',
    'co-black-hills-energy': 'Black Hills Energy',
    'co-colorado-natural-gas': 'Colorado Natural Gas',
  },
  'Washington County': {
    'co-black-hills-energy': 'Black Hills Energy',
  },
  'Weld County': {
    'co-atmos-energy': 'Atmos Energy',
    'co-xcel-energy': 'Xcel Energy',
  },
  'Yuma County': {
    'co-black-hills-energy': 'Black Hills Energy',
  },
};

console.log(getProviderNames())
