const { urlencoded } = require('body-parser');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.port || 3000;
const departmentRoutes = require('./routes/DepartmentRoutes');
const productRoutes = require('./routes/ProductRoutes');
const db = require('./conf/db');
const cors = require('cors');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Customer API',
            description: 'Customer API Information',
            contact: {
                name: 'Amazing developer'
            },
            servers: ["http://localhost:5000"]
        }
    },
    //apis: ["index.js"]
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));




app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
db();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
	app.use(cors());
	next();
});



app.use("/", departmentRoutes);
app.use("/", productRoutes);


app.listen(port, () => {
    console.log(`It works! on port ${port}`);
});