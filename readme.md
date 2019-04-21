## T-20 Match Simulation
----
Please follow the below steps to run the simulation
  1. Ensure node that your node version >=v8.10.0
  2. ensure yarn version >= 1.12.3 or npm version >=5.6.0
  3. clone the repo
      ``` git clone ```
  4. Inside the directory run
      ``` yarn install``` or ``` npm install ```
     1. Build the project ``` npm run build```
     2. To run the simulation ``` npm start```
     3. to run unit test ```npm run test```
  5. Below properties are defined in src/index.ts
     1. Name of team: anme of the team
     2. NUMBER_OF_OVERS : number of over's
     3. NUMBER_OF_WICKETS: number of wicket's
     4. WINNING_SCORE : Run's required to win the game
     5. Player Name's
     6. BALL_PROBABLITY_WEIGHTS: Probablity of occurance of an outcome
     7. No of iteration's to run the simulation