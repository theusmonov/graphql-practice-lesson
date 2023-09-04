import fs, { fdatasync } from "fs";
import path from 'path';


const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src", "model", "user.json")))

const resolvers = {
    Query: {
      users: () => data
    },
    Mutation: {
        userCreate: (_, newUser) => {
    
            const {username, job} = newUser
            const newBaza = {id: data.at(-1)?.id + 1 || 1, username, job}
            data.push(newBaza)
            fs.writeFileSync(path.join(process.cwd(), "src", "model", "user.json"), JSON.stringify(data, null, 4));
            return newBaza
        },

        userUpdate: (_, user) => {
            const {id, username, job} = user

            const findUser = data.find((e) => e.id === id)
            findUser.username = username || findUser.username
            findUser.job = job || findUser.job
            fs.writeFileSync(path.join(process.cwd(), "src", "model", "user.json"), JSON.stringify(data, null, 4));
            return findUser
        },
        userDelete: (_, delUser) => {
          const {id} = delUser
          const findDelUser = data.filter((e) => e.id != id)
          fs.writeFileSync(path.join(process.cwd(), "src", "model", "user.json"), JSON.stringify(findDelUser, null, 4));
          return {
            message: `User with ID ${id} has been deleted`,
          };
        }
    
    }
  };

  export default resolvers;