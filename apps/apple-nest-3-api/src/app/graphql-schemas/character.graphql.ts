import { gql } from 'apollo-server-express'
import { print } from 'graphql';

export const CHARACTER_TYPES = [
gql`
type Character {
  _id: ID
  name: String!
  bag: Bag
  weaponLevel: Int
  armourLevel: Int
  lastRewardDate: Float
  seedReadyDate: Float
  megaSeedReadyDate: Float
  legendarySeedReadyDate: Float
  rankBeaten: Int
  questNumber: String
}`,

gql`
type Bag {
  money: Int
  apples: Int
  seeds: Int
}`,

gql`
type Query {
  character(id: ID!): Character
  characters: [Character]
}`,

gql`
type Mutation {
  createCharacter(name: String!): Character
  collectReward(characterId: ID!): ActionResult
  completeQuest(characterId: ID!): ActionResult
  buySeeds(characterId: ID!, numSeeds: Int): ActionResult
  plantSeed(characterId: ID!): ActionResult
  harvestCrop(characterId: ID!): ActionResult
}`,

gql`
type ActionResult {
  message: String
  character: Character
}`
].map(g => print(g));
