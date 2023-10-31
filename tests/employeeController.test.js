const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); 
const Employee = require('../models/Employee'); 
const { expect } = chai;

chai.use(chaiHttp);

describe('Employee Controller', () => {
  before(async () => {
    await Employee.destroy({ where: {} });
  });


   // Test getEmployees function
   describe('getEmployees', () => {
    it('should get a list of employees', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');

          done();
        });
    });

    it('should return an error if fetching employees fails', (done) => {
      Employee.findAll = () => {
        throw new Error('Simulated error');
      };

      chai
        .request(app)
        .get('/')
        .end((err, res) => {
            expect(res).to.have.status(500); 
            expect(res.body).to.have.property('error', 'Failed to fetch employees.'); 
            done();
        });
        });

  });

  // Test createEmployee function
  describe('createEmployee', () => {
    it('should create a new employee', (done) => {
        chai
        .request(app)
        .post('/')
        .send({
          lastName: 'Habelhames',
          firstName: 'Khadidja',
          department: 'Dev',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('lastName', 'Habelhames');
          expect(res.body).to.have.property('firstName', 'Khadidja');
          expect(res.body).to.have.property('department', 'Dev');
          done();
        });
      });
    
      
  });

 
});
