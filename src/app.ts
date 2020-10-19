import express from 'express'
import * as dotenv from 'dotenv'
import * as bodyParser from "body-parser"
import routes from './routes'
// import swaggerUi from 'swagger-ui-express'
// import YAML from 'yamljs'

// const swaggerDocument = YAML.load('./swagger.yaml')

dotenv.config()

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(authenticationController.isAuth);
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

routes.forEach(route => app.use(route))


app.listen(process.env.PORT, function () {
  console.log('Listening on '+ process.env.PORT)
})

// const option = {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// };

// mongoose
//   .connect(process.env.DB_URL, option)
//   .then(() => {
//     const server = app.listen(process.env.PORT, () => {
//       console.log("Listening on " + process.env.PORT);
//     });
//   })
//   .catch((err) => {
//     console.log(`Could not connect to the database. Exiting now...\n${err}`);
//     process.exit(); 
//   });

// // helpers.initAdmin();

// module.exports = app;
