
use competitions

comp1 = {
  compName: 'Sofia2015',
  place: 'Borisova gradina Sofia',
  distanceWinner: {
  	'2km':'Georgi Georgiev',
  	'5km':'Ivan ivanov',
  	'10km': 'Todor Todorov'
  }
}

comp2 = {
  compName: 'Sofia2015',
  place: 'South park Sofia',
  distanceWinner: {
  	'2km':['Georgi Georgiev', 'Georgi Ivanov'],
  	'5km':'Ivan ivanov',
  	'10km': 'Todor Todorov'
  }
}

comp3 = {
  compName: 'Sofia2015',
  place: 'South park Sofia',
  distanceWinner: {
  	'2km':['Georgi Georgiev', 'Georgi Ivanov'],
  	'5km':'Ivan ivanov',
  	'10km': 'Todor Todorov'
  },
  duration : '3 hours'
}

comp4 = {
  compName: 'Varna2014',
  place: 'Borisova Varna',
  distanceWinner: {
  	'2km':['Georgi Georgiev', 'Georgi Ivanov'],
  	'5km':'Ivan ivanov',
  	'10km': 'Todor Todorov'
  }
}

comp5 = {
  compName: 'Burgas2015',
  place: 'North park Burgas',
  distanceWinner: {
  	'2km':['Georgi Georgiev', 'Georgi Ivanov'],
  	'5km':'Ivan ivanov',
  	'10km': 'Todor Todorov'
  }
}

db.runCompetitions.insert(comp1)
db.runCompetitions.insert(comp2)
db.runCompetitions.insert(comp3)
db.runCompetitions.insert(comp4)
db.runCompetitions.insert(comp5)

db.runCompetitions.find({place: /Sofia/}).pretty()

comp6 = {
  compName: '5km Run South Park',
  place: 'South Park Sofia',
  distanceWinner: {
  	'2km':['Georgi Georgiev', 'Georgi Ivanov'],
  	'5km':'Ivan ivanov',
  	'10km': 'Todor Todorov'
  }
}

db.runCompetitions.insert(comp6)

db.runCompetitions.update(
	{"compName": "5km Run South Park"},
	{"$set": {participants:10}}
)

// db.runCompetitions.update(
// 	{"compName": "Burgas2015"}, 
// 	{"$set": {
// 		participants:	['ivan', 'petkan']
// 		}
// 	}
// )
