const mongoose = require("mongoose")
const createServer = require("../server")
const supertest = require("supertest");
const Contact = require('../models/contactModel')

const app = createServer()

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb+srv://admin:admin@cluster0.z2fotjd.mongodb.net/myContactsManager?retryWrites=true&w=majority&appName=Cluster0");
    //console.log('Connected to MongoDB');
  } catch (error) {
    //console.error('Error connecting to MongoDB:', error);
    throw error; 
  }
}
beforeEach(async () => {
	await connectToDatabase()
})

afterEach(async () => {
	await mongoose.disconnect()
})

describe('GET /api/contacts', () => {
  
  it('should return 200 and contacts if they exists', async() => {
  
    await supertest(app)
      .get('/api/contacts')
      .then((response) => {
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
      })
  });

  it('should return 200 and a json string when contacts dont exist', async() => {
    await supertest(app)
      .get('/api/contacts')
      .then((response) => {
        expect(response.status).toBe(200)
        expect(typeof response.text).toBe('string')
      })
  })
})

// describe('POST /api/contacts', () => {
//   it('should create a new contact and return 201', async () => {
//     const newContact = await Contact.create({
//       name: "Alice Smith",
//       email: "alice@example.com",
//       phones: ["5555555555"]
//     });
//     await supertest(app)
//       .post('/api/contacts')
//       .send(newContact)
//       .then((response) => {
//         expect(response.status).toBe(201)
//         expect(typeof response.text).toBe('string')
//       })
//   });

//   it('should return 409 if phone no already exists', async () => {
//     const newContact = await Contact.create({
//       "name": "Alice Smith",
//       "email": "alice@example.com",
//       "phones": ["5555555555"]
//     });
//     await supertest(app)
//       .post('/api/contacts')
//       .send(newContact)
//       .then((response) => {
//         expect(response.status).toBe(409)
//         expect(typeof response.text).toBe('string')
//       })
//   });
// });



