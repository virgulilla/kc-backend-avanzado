import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.4",
    info: {
      title: "NodeApp API",
      version: "1.0.0",
    },
  },
  apis: ["swagger.yaml"],
  //apis: ["./controllers/**/*.js"], // files containing annotations as above
};

const specification = swaggerJSDoc(options);

export default [swaggerUi.serve, swaggerUi.setup(specification)];
