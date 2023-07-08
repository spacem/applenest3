import { gql } from 'apollo-server-express'
import { print } from 'graphql';

export const CHARACTER_TYPES = [
gql`
# Users can have several characters in the game each character will have its own state and resources
type Character {
  _id: ID
  userId: String!
  name: String!
  icon: String!
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
# Bags define items the user is holding
type Bag {
  money: Int
  apples: Int
  seeds: Int
  buckets: Int
  water: Int
  weapon: Int
  shield: Int
}`,

gql`
type Query {
  # Fetch a single character by its id
  character(id: ID!): Character

  # Fetch all characters for a given user
  characters(userId: String): [Character]
}`,

gql`
type Mutation {
  # Create a new character for the user
  createCharacter(userId: String, name: String!, icon: String!): Character

  # Collect a small reward, used in case characters spend all their gold
  collectReward(characterId: ID!): ActionResult

  # Validate and complete event planner quests
  completeQuest(characterId: ID!): ActionResult

  # Exchange seeds for gold
  buySeeds(characterId: ID!, numSeeds: Int): ActionResult

  # Start the growth of a seed
  plantSeed(characterId: ID!): ActionResult

  # Validate readyness of crop and give apples
  harvestCrop(characterId: ID!): ActionResult

  performAction(characterId: ID!, action: String!, param: String): ActionResult
}`,

gql`
# Most mutations will return both an updated character state As well as a message to show the user
type ActionResult {
  message: String
  character: Character
}`
].map(g => print(g));
