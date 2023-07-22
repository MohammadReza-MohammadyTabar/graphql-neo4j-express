

export const typeDefs = `#graphql
type Person{
    username:String!
    password:String!
    todos:[Task!]! @relationship(type: "HAVE_TO_DO", direction: OUT)
}
type Task{
    taskName:String!
    state:State! @relationship(type: "HAVE_STATE", direction: IN)
    person: Person! @relationship(type: "HAVE_TO_DO", direction: IN)
    expDate:DateTime
    madeData:DateTime!
}
type State{
    stateName:String!
}

`;
