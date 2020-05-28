const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`
    ));

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is : ${val}`);
    if (req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
};

// TODO: Check when we not put the name or price in the request then we receive an error
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
      return res.status(400).json({
         status: 'fail',
         message: 'Missing name or price'
      });
  }
  next();
};

// TODO: Get all tours
exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
}

// TODO: Get tour
exports.getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
}

// TODO: Create tour
exports.createTour = (req, res) => {
    // console.log(req.body);  // this case is for change on postman parameter body -> row -> application/json
    // Generated the new Id
    const newId = tours[tours.length - 1].id + 1;
    // Add Id to the request
    const newTour = Object.assign({id: newId}, req.body);
    // Add data to the last file of API
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour
                }
            });
        }
    );
}

// TODO: Update tour
exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '< Update tour here ... >'
        }
    });
}

// TODO: Delete tour
exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    });
}