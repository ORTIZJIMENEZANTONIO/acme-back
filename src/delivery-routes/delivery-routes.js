const getRoutesMaxScore = (req, res) => {
  const drivers = [
    {
      name: "James Lewis",
      routes: [],
    },
    {
      name: "Paul Gutierrez",
      routes: [],
    },
    {
      name: "Jack Brown",
      routes: [],
    },
    {
      name: "Amy Jones",
      routes: [],
    },
    {
      name: "Linda Henderson",
      routes: [],
    },
    {
      name: "Mitchell Huynh",
      routes: [],
    },
    {
      name: "Jacqueline Sandoval",
      routes: [],
    },
    {
      name: "Brandon Marshall",
      routes: [],
    },
    {
      name: "Albert Smith",
      routes: [],
    },
    {
      name: "Abigail Castillo DDS",
      routes: [],
    },
  ];
  const places = [
    {
      street: "4889 Yorkie Lane",
      city: "Climax",
      state: "Michigan",
      phoneNumber: "912-871-4199",
      zipCode: 49034,
    },
    {
      street: "492 Skips Lane",
      city: "Casa",
      state: "Arkansas",
      phoneNumber: "928-530-8895",
      zipCode: 72025,
    },
    {
      street: "1596 Cantebury Drive",
      city: "Mineola",
      state: "New York",
      phoneNumber: "646-584-5030",
      zipCode: 11501,
    },
    {
      street: "4313 Michael Street",
      city: "Houston",
      state: "Texas",
      phoneNumber: "713-800-4735",
      zipCode: 77002,
    },
    {
      street: "2928 Deer Haven Drive",
      city: "Sterling",
      state: "Michigan",
      phoneNumber: "864-314-4183",
      zipCode: 48659,
    },
    {
      street: "4787 Strother Street",
      city: "Birmingham",
      state: "Alabama",
      phoneNumber: "205-585-5085",
      zipCode: 35203,
    },
    {
      street: "3102 Hillhaven Drive",
      city: "Los Angeles",
      state: "California",
      phoneNumber: "323-921-8567",
      zipCode: 90071,
    },
    {
      street: "1151 Sampson Street",
      city: "Denver",
      state: "Colorado",
      phoneNumber: "303-615-4879",
      zipCode: 80202,
    },
    {
      street: "4622 Oliver Street",
      city: "Plano",
      state: "Texas",
      phoneNumber: "817-363-6314",
      zipCode: 75074,
    },
    {
      street: "195 Hamilton Drive",
      city: "Port Arthur",
      state: "Texas",
      phoneNumber: "409-989-0696",
      zipCode: 77640,
    },
  ];
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

const getSS = (streetName, name) => {
  let ss = 0;
  const vowelRegex = /[aeiou]/gi;
  const consonantRegex = /[^aeiou ]/gi;
  const nameLength = name.length;
  const streetNameLength = streetName.length;
  const streetNameLengthPair = streetNameLength % 2 == 0;
  const nameLengthPair = nameLength % 2 == 0;

  if (streetNameLengthPair) {
    const vowelQuantity = name.match(vowelRegex);
    ss = vowelQuantity.length * 1.5;
  } else {
    const consonantuantity = name.match(consonantRegex);
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
