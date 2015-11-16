
db = db.getSiblingDB('competitions')

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

//0.
db.runCompetitions.insert([comp1, comp2, comp3, comp4, comp5])

//1. Three competitions with the most participants
db.runCompetitions.find({place: /Burgas/}).sort({participants:-1}).limit(3).pretty()

//2.
db.runCompetitions.update( {"distanceWinner.42km" :{ $exists: true }}, {"$set": {maraton:true}}, {multi: true})


//3. remove
db.runCompetitions.remove({ $or : [{"distanceWinner.2km" : /Peter Petrov/}, {"distanceWinner.2km" : /Maria Ivanova/}]})

//4.Add distance of 5 km
db.runCompetitions.update( {"sponsor" :{ $exists: true }}, {"$push": { "distanceWinner.5km" : ["Georgi Georgiev"] }})


//To start script
// load("fn61559_zad2.js")
