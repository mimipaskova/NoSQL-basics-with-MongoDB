comp1 = {
  compName: 'Burgas2015',
  place: 'Borisova gradina Burgas',
  distanceWinner: {
    '2km':['Peter Petrov'],
    '42km':['Ivan ivanov'],
    '10km': ['Todor Todorov']
  },
  participants: 10
}

comp2 = {
  compName: 'Burgas2015',
  place: 'South park Burgas',
  distanceWinner: {
    '2km':['Georgi Georgiev', 'Georgi Ivanov'],
    '5km':['Ivan ivanov'],
    '10km': ['Todor Todorov']
  },
  participants: 20
}

comp3 = {
  compName: 'Sofia2015',
  place: 'South park Burgas',
  distanceWinner: {
    '2km':['Georgi Georgiev', 'Maria Ivanova', 'Georgi Ivanov'],
    '5km':['Ivan ivanov'],
    '10km': ['Todor Todorov']
  },
  duration : '3 hours',
  participants: 50
}

comp4 = {
  compName: 'Burgas2014',
  place: 'Borisova Burgas',
  distanceWinner: {
    '2km':['Georgi Georgiev', 'Georgi Ivanov'],
    '5km':['Ivan ivanov'],
    '10km': ['Todor Todorov']
  },
  participants: 18,
  sponsor: 'Astea'
}

comp5 = {
  compName: 'Burgas2015',
  place: 'North park Burgas',
  distanceWinner: {
    '42km':['Georgi Georgiev', 'Georgi Ivanov'],
    '2km':['Peter Petrov'],
    '5km':['Ivan ivanov'],
    '10km': ['Todor Todorov']
  },
  participants: 23,
  sponsor: 'FMI'
}



var MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost/competitions', function(err, db) {
    if (err) {
        console.error('Cannot connect to the database', err);
        return;
    }

    // deleteCompetitionss(db, function() {
    //    db.close();
    // });

    insertCompetitions(db, function() {
        findCompetitions(db, function() {
            addInformation(db, function() {
                DeletesomeCompetitions(db, function() {
                    addDistance(db, function() {
                        findCompetitionss(db, function() {
                            db.close();
                        });
                    });
                });
            });
        });
    });

});


var deleteCompetitionss = function(db, callback) {

    var collection = db.collection('runCompetitions');
    collection.deleteMany({}, function(err, res) {
        if (err) {
            console.error('Cannot find competitions', err);
            return;
        }

        console.log("Found result is:");
        console.log(res);
        callback(res);
    });
}


var findCompetitionss = function(db, callback) {

    var collection = db.collection('runCompetitions');
    collection.find({}).toArray(function(err, res) {
        if (err) {
            console.error('Cannot find competitions', err);
            return;
        }

        console.log("Found result is:");
        console.log(res);
        callback(res);
    });
}


//0.
var insertCompetitions = function(db, callback) {

    var collection = db.collection('runCompetitions');
    collection.insertMany([comp1, comp2, comp3, comp4, comp5], function(err, res) {
        if (err) {
            console.error('Cannot insert competition', err);
            return;
        }

        console.log('0000000');
        console.log("Inserted 3 documents into the document collection");
        console.log(comp1);
        callback(res);
    });
}

//1 find
var findCompetitions = function(db, callback) {

    var collection = db.collection('runCompetitions');
    collection.find({
            place: /Burgas/
        }).sort({
            participants: -1
        }).limit(3).toArray(function(err, res) {
        if (err) {
            console.error('Cannot find competitions', err);
            return;
        }
        console.log('1111111');
        console.log("Found result is:");
        console.log(res);
        callback(res);
    });
}


//2
var addInformation = function(db, callback) {
    var collection = db.collection('runCompetitions');
    collection.updateMany({
        "distanceWinner.42km" :{ $exists: true }
    }, {
        "$set": {maraton:true}
    }, function(err, res) {
        if (err) {
            console.error('Cannot update competition', err);
            return;
        }

        console.log('222222222');
        console.log("Found result is:");
        console.log(res);
        callback(res);
    });

}

//3
var DeletesomeCompetitions = function(db, callback) {
    var collection = db.collection('runCompetitions');

    collection.deleteMany({
        $or : [
        {"distanceWinner.2km" : /Peter Petrov/}, 
        {"distanceWinner.2km" : /Maria Ivanova/}]
    }, function(err, res) {
        if (err) {
            console.error('Cannot delete competitions', err);
            return;
        }

        console.log('333333333');
        console.log("Found result is:");
        console.log(res);
        callback(res);
    });
}


//4
var addDistance = function(db, callback) {
    var collection = db.collection('runCompetitions');

    collection.updateMany({
        "sponsor" :{ $exists: true }
    }, {
        "$push": { "distanceWinner.5km" : ["Georgi Georgiev"]}
    }, function(err, res) {
        if (err) {
            console.error('Cannot update competition', err);
            return;
        }

        console.log('44444444444444');
        console.log("Found result is:");
        console.log(res);
        callback(res);
    });
}
