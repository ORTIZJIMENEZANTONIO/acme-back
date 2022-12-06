/*
IN: {
  drivers: [
    {
      "name": String,
      "routes": []
    }
  ],
  places: [ 
    {
      "street": String,
      "city": String,
      "state": String,
      "phoneNumber": String,
      "zipCode": Number
    }
  ]
}
OUT: {
  "routes": [
    {
      "street": String,
      "driver": String,
      "ss": Number
    }
  ],
  "total": Number
}
*/
const getRoutesMaxScore = (req, res) => {
  const { drivers, places } = req.body;
  const maxRoutes = [];

  while (drivers.length != 0 && places.length != 0) {
    const maxSSUsers = [];
    const deleteAvailableRoute = (element) => {
      maxRoutes.push(element);
      const indexDriverToDlt = drivers.findIndex(
        (el) => el.name == element.driver
      );
      const indexAddressToDlt = places.findIndex(
        (el) => el.street == element.street
      );
      drivers.splice(indexDriverToDlt, 1);
      places.splice(indexAddressToDlt, 1);
    };

    drivers.map((driver) => {
      places.map((place, index) => {
        const newElement = {
          street: place.street,
          driver: driver.name,
          ss: getSS(place.street, driver.name),
        };

        driver.routes[0]?.ss <= newElement.ss || !index
          ? (driver.routes = []) && driver.routes.push(newElement)
          : null;
      });

      maxSSUsers.push(driver.routes[0]);
      driver.routes = [];
    });

    const search = maxSSUsers.reduce((acc, persona) => {
      acc[persona.street] = ++acc[persona.street] || 0;
      return acc;
    }, {});

    const duplicates = maxSSUsers.filter((persona) => {
      return search[persona.street];
    });

    if (duplicates.length == 0) {
      maxSSUsers.map((user) => {
        deleteAvailableRoute(user);
        maxRoutes.push(user);
      });
    } else {
      duplicates.sort((a, b) => b.ss - a.ss);
      deleteAvailableRoute(duplicates[0]);
    }
  }

  const data = {
    routes: maxRoutes,
    total: maxRoutes.reduce((carry, el) => carry + el.ss, 0),
  };

  return res.json(data);
};

/*
IN: 
  streetName: String,
  driverName: String

OUT:
  ss: Number
*/
const getSS = (streetName, driverName) => {
  let ss = 0;
  const vowelRegex = /[aeiou]/gi;
  const consonantRegex = /[^aeiou ]/gi;
  const alphabetRegex = /[a-z]/gi;
  const nameLength = driverName.match(alphabetRegex).length;
  const streetNameLength = streetName.match(alphabetRegex).length;
  const streetNameLengthPair = streetNameLength % 2 == 0;
  const nameLengthPair = nameLength % 2 == 0;

  if (streetNameLengthPair) {
    const vowelQuantity = driverName.match(vowelRegex);
    ss = vowelQuantity.length * 1.5;
  } else {
    const consonantuantity = driverName.match(consonantRegex);
    ss = consonantuantity.length;
  }

  if (
    (streetNameLengthPair && nameLengthPair) ||
    getMaxCommonDivisor(nameLength, streetNameLength) != 1
  ) {
    ss = ss * 1.5;
  }

  return ss;
};

/*
IN: 
  a: Number,
  b: Number

OUT:
  c: Number
*/
const getMaxCommonDivisor = (a, b) => {
  let z;
  let x = a > b ? a : b;
  let y = a < b ? a : b;

  while (y) {
    z = y;
    y = x % y;
    x = z;
  }

  return x;
};

module.exports = {
  getRoutesMaxScore,
};
