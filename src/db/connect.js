import { Sequelize } from "sequelize";


export const newSequelize = new Sequelize("postgres://postgres:2003@localhost:5432/graphql", {
    logging: false
})

